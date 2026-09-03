// Stahne data z Google Search Console API a ulozi je do data/gsc/YYYY-MM-DD.json.
// Zadne npm zavislosti - RS256 JWT se podepisuje pres node:crypto, HTTP jde pres globalni fetch.
//
// Promenne prostredi:
//   GSC_SERVICE_ACCOUNT_JSON  JSON klic service accountu (nebo jeho base64 podoba)
//   GSC_SITE_URL              napr. "sc-domain:internetostrava.cz" (vychozi)
//
// Bez credentials skript skonci kodem 0 a poznamkou - audit i workflow musi bezet i bez GSC.

import { createSign } from "node:crypto";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(".");
const SITE_URL = process.env.GSC_SITE_URL || "sc-domain:internetostrava.cz";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const API = "https://searchconsole.googleapis.com";

// GSC data maji zpozdeni zhruba dva az tri dny, proto okno konci pred tremi dny.
const LAG_DAYS = 3;
const WINDOW_DAYS = 28;

// URL Inspection je pomale API (jednotky az desitky sekund na URL). Timeout na
// jeden pozadavek a rozpocet na celou kontrolu drzi beh v rozumnem case i kdyz
// Google odpovida pomalu nebo pozadavek uvizne.
const REQUEST_TIMEOUT_MS = Number(process.env.GSC_REQUEST_TIMEOUT_MS || 30000);
const INSPECTION_BUDGET_MS = Number(process.env.GSC_INSPECTION_BUDGET_MS || 240000);

function loadCredentials() {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw || !raw.trim()) return null;
  const text = raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
  const parsed = JSON.parse(text);
  if (!parsed.client_email || !parsed.private_key) throw new Error("service account JSON nema client_email nebo private_key");
  return parsed;
}

const base64url = (input) => Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function getAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(JSON.stringify({
    iss: credentials.client_email,
    scope: SCOPE,
    aud: TOKEN_URL,
    exp: now + 3600,
    iat: now
  }));
  const signature = createSign("RSA-SHA256").update(`${header}.${claims}`).end()
    .sign(credentials.private_key)
    .toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`
    })
  });

  if (!response.ok) throw new Error(`vymena JWT za access token selhala: ${response.status} ${await response.text()}`);
  return (await response.json()).access_token;
}

async function apiPost(token, path, body, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${API}${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`${path} -> ${response.status} ${await response.text()}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

const shiftDays = (days) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
};

// Dimenze se dotazuji zvlast. Grupovani po query A page zaroven je podle kvot
// Google nejdrazsi dotaz a rychle vycerpa denni load quota.
async function searchAnalytics(token, dimension, startDate, endDate) {
  const path = `/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;
  const data = await apiPost(token, path, {
    startDate,
    endDate,
    dimensions: [dimension],
    type: "web",
    rowLimit: 25000
  });
  return (data.rows || []).map((row) => ({
    key: row.keys[0],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position
  }));
}

// Parovani dotaz -> stranka. Podle kvot Google je to nejdrazsi typ dotazu, ale pri
// radu stovek zobrazeni mesicne je to zanedbatelne a bez nej nelze rict, na co
// ktera stranka rankuje - a tim padem ani smysluplne prepsat jeji snippet.
async function searchAnalyticsPairs(token, startDate, endDate) {
  const path = `/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;
  const data = await apiPost(token, path, {
    startDate,
    endDate,
    dimensions: ["page", "query"],
    type: "web",
    rowLimit: 25000
  });
  return (data.rows || []).map((row) => ({
    page: row.keys[0],
    query: row.keys[1],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position
  }));
}

async function searchAnalyticsTotals(token, startDate, endDate) {
  const path = `/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;
  const data = await apiPost(token, path, { startDate, endDate, dimensions: [], type: "web", rowLimit: 1 });
  const row = (data.rows || [])[0];
  return row
    ? { clicks: row.clicks, impressions: row.impressions, ctr: row.ctr, position: row.position }
    : { clicks: 0, impressions: 0, ctr: 0, position: null };
}

function sitemapRoutes() {
  const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
  return [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map(([, loc]) => loc);
}

async function inspectUrls(token, urls) {
  const results = [];
  const deadline = Date.now() + INSPECTION_BUDGET_MS;

  for (const url of urls) {
    if (Date.now() > deadline) {
      console.warn(`GSC: rozpocet na kontrolu indexace vycerpan, preskoceno ${urls.length - results.length} URL.`);
      break;
    }
    try {
      const data = await apiPost(token, "/v1/urlInspection/index:inspect", {
        inspectionUrl: url,
        siteUrl: SITE_URL,
        languageCode: "cs"
      });
      const status = data.inspectionResult?.indexStatusResult || {};
      results.push({
        url,
        verdict: status.verdict || "UNKNOWN",
        coverageState: status.coverageState || "",
        lastCrawlTime: status.lastCrawlTime || null,
        robotsTxtState: status.robotsTxtState || "",
        indexingState: status.indexingState || ""
      });
      console.log(`  [${results.length}/${urls.length}] ${status.verdict || "UNKNOWN"} ${url}`);
    } catch (inspectionError) {
      results.push({ url, verdict: "ERROR", coverageState: String(inspectionError.message).slice(0, 200) });
    }
  }
  return results;
}

async function main() {
  let credentials;
  try {
    credentials = loadCredentials();
  } catch (credentialsError) {
    console.error(`GSC: neplatny GSC_SERVICE_ACCOUNT_JSON - ${credentialsError.message}`);
    process.exit(1);
  }

  if (!credentials) {
    console.log("GSC: preskoceno, GSC_SERVICE_ACCOUNT_JSON neni nastaven (navod v docs/SEO-AUTOMATION.md).");
    process.exit(0);
  }

  const endDate = shiftDays(LAG_DAYS);
  const startDate = shiftDays(LAG_DAYS + WINDOW_DAYS - 1);
  const previousEnd = shiftDays(LAG_DAYS + WINDOW_DAYS);
  const previousStart = shiftDays(LAG_DAYS + 2 * WINDOW_DAYS - 1);

  const token = await getAccessToken(credentials);
  console.log(`GSC: ${SITE_URL}, obdobi ${startDate} az ${endDate} (predchozi ${previousStart} az ${previousEnd}).`);

  const [queries, pagesRows, devices, totals, pairs, previousQueries, previousPages, previousTotals] = await Promise.all([
    searchAnalytics(token, "query", startDate, endDate),
    searchAnalytics(token, "page", startDate, endDate),
    searchAnalytics(token, "device", startDate, endDate),
    searchAnalyticsTotals(token, startDate, endDate),
    searchAnalyticsPairs(token, startDate, endDate),
    searchAnalytics(token, "query", previousStart, previousEnd),
    searchAnalytics(token, "page", previousStart, previousEnd),
    searchAnalyticsTotals(token, previousStart, previousEnd)
  ]);

  const inspection = await inspectUrls(token, sitemapRoutes());

  const payload = {
    generatedAt: new Date().toISOString(),
    siteUrl: SITE_URL,
    current: { startDate, endDate, totals, queries, pages: pagesRows, devices, pairs },
    previous: { startDate: previousStart, endDate: previousEnd, totals: previousTotals, queries: previousQueries, pages: previousPages },
    inspection
  };

  rmSync(join(root, "reports/seo/gsc-error.json"), { force: true });
  mkdirSync(join(root, "data/gsc"), { recursive: true });
  const file = join(root, "data/gsc", `${endDate}.json`);
  writeFileSync(file, `${JSON.stringify(payload, null, 2)}\n`);

  const notIndexed = inspection.filter((row) => row.verdict !== "PASS").length;
  console.log(`GSC: ${totals.clicks} kliku / ${totals.impressions} zobrazeni, ulozeno ${queries.length} dotazu, ${pagesRows.length} stranek, ${inspection.length} URL zkontrolovano (${notIndexed} bez verdiktu PASS) -> ${file}`);
}

main().catch((mainError) => {
  const message = String(mainError.message);
  console.error(`GSC selhalo: ${message}`);

  // Zapsat duvod, aby report rozlisil "jeste nenastaveno" od "nastaveno, ale selhalo".
  const hint = /403|sufficient permission/.test(message)
    ? "Service account neni pridany v Search Console property, nebo GSC_SITE_URL neodpovida typu property (sc-domain: vs https://). Viz docs/SEO-AUTOMATION.md, krok 3."
    : /invalid_grant|401|token/i.test(message)
    ? "Problem s klicem service accountu - zkontrolujte secret GSC_SERVICE_ACCOUNT_JSON."
    : "";

  mkdirSync(join(root, "reports/seo"), { recursive: true });
  writeFileSync(
    join(root, "reports/seo/gsc-error.json"),
    `${JSON.stringify({ failedAt: new Date().toISOString(), message: message.slice(0, 500), hint }, null, 2)}\n`
  );
  process.exit(1);
});
