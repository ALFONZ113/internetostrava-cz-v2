// Jednorazovy hlubkovy vytah ze Search Console pro kompletni prehled dotazu.
// Na rozdil od gsc-report.mjs (28denni okno, tydenni beh) tahne celou dostupnou
// historii a vsechny uzitecne dimenze. Spousti se rucne pres workflow SEO research.
//
// Vystup: data/gsc/research-<datum>.json

import { createSign } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(".");
const SITE_URL = process.env.GSC_SITE_URL || "sc-domain:internetostrava.cz";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const API = "https://searchconsole.googleapis.com";
const REQUEST_TIMEOUT_MS = 60000;

// Search Console drzi 16 mesicu. Zacneme drive, nez web vznikl - prazdne dny nevadi.
const START_DATE = process.env.GSC_RESEARCH_START || "2026-05-01";
const LAG_DAYS = 3;

const base64url = (input) => Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

function loadCredentials() {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw || !raw.trim()) return null;
  const text = raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
  return JSON.parse(text);
}

async function getAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(JSON.stringify({ iss: credentials.client_email, scope: SCOPE, aud: TOKEN_URL, exp: now + 3600, iat: now }));
  const signature = createSign("RSA-SHA256").update(`${header}.${claims}`).end()
    .sign(credentials.private_key).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${header}.${claims}.${signature}` })
  });
  if (!response.ok) throw new Error(`token: ${response.status} ${await response.text()}`);
  return (await response.json()).access_token;
}

async function query(token, body) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${API}/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
    return (await response.json()).rows || [];
  } finally {
    clearTimeout(timer);
  }
}

const shiftDays = (days) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
};

const map1 = (rows) => rows.map((r) => ({ key: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }));
const map2 = (rows) => rows.map((r) => ({ a: r.keys[0], b: r.keys[1], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }));

async function main() {
  const credentials = loadCredentials();
  if (!credentials) {
    console.log("GSC research: preskoceno, GSC_SERVICE_ACCOUNT_JSON neni nastaven.");
    process.exit(0);
  }

  const endDate = shiftDays(LAG_DAYS);
  const token = await getAccessToken(credentials);
  console.log(`GSC research: ${SITE_URL}, cele obdobi ${START_DATE} az ${endDate}`);

  const window = { startDate: START_DATE, endDate, type: "web", rowLimit: 25000 };
  const run = (dimensions, extra = {}) => query(token, { ...window, dimensions, ...extra });

  const [queries, pages, pairs, countries, devices, dates, appearance] = await Promise.all([
    run(["query"]).then(map1),
    run(["page"]).then(map1),
    run(["page", "query"]).then(map2),
    run(["country"]).then(map1),
    run(["device"]).then(map1),
    run(["date"]).then(map1),
    run(["searchAppearance"]).then(map1).catch(() => [])
  ]);

  // Totals bez dimenzi - soucet po dimenzi je kvuli anonymizaci nizsi nez skutecnost.
  const totalsRows = await query(token, { ...window, dimensions: [], rowLimit: 1 });
  const totals = totalsRows[0] || { clicks: 0, impressions: 0, ctr: 0, position: null };

  // Jeste jednou vse pro Cesko samotne - zbytek sveta je vetsinou sum.
  const czQueries = await query(token, {
    ...window,
    dimensions: ["query"],
    dimensionFilterGroups: [{ filters: [{ dimension: "country", operator: "equals", expression: "cze" }] }]
  }).then(map1);

  const payload = {
    generatedAt: new Date().toISOString(),
    siteUrl: SITE_URL,
    period: { startDate: START_DATE, endDate },
    totals,
    queries, pages, pairs, countries, devices, dates, appearance, czQueries
  };

  mkdirSync(join(root, "data/gsc"), { recursive: true });
  const file = join(root, "data/gsc", `research-${endDate}.json`);
  writeFileSync(file, `${JSON.stringify(payload, null, 2)}\n`);

  console.log(`GSC research: ${totals.clicks} kliku / ${totals.impressions} zobrazeni celkem`);
  console.log(`  dotazu ${queries.length}, stranek ${pages.length}, paru ${pairs.length}, zemi ${countries.length}, dnu ${dates.length}, typu vysledku ${appearance.length}`);
  console.log(`  -> ${file}`);
}

main().catch((error) => {
  console.error(`GSC research selhalo: ${error.message}`);
  process.exit(1);
});
