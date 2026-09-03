// Overi produkcni web pres HTTP: stavove kody, canonical, title a doba odezvy.
// Bezi v GitHub Actions - lokalni prostredi Claude Code nema odchozi pristup na internet.
// Vystup: reports/seo/live-latest.json. Nikdy neshodi build kvuli jedne pomale odpovedi.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(".");
const ORIGIN = process.env.SITE_ORIGIN || "https://internetostrava.cz";
const TIMEOUT_MS = 15000;

const routes = [...readFileSync(join(root, "sitemap.xml"), "utf8").matchAll(/<loc>([^<]*)<\/loc>/g)]
  .map(([, loc]) => loc.replace(/^https?:\/\/[^/]+/, ""));

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const startedAt = Date.now();
  try {
    const response = await fetch(url, { redirect: "manual", signal: controller.signal });
    const body = response.status < 400 ? await response.text() : "";
    return { status: response.status, ms: Date.now() - startedAt, body, location: response.headers.get("location") };
  } finally {
    clearTimeout(timer);
  }
}

const results = [];
const problems = [];

for (const route of routes) {
  const url = `${ORIGIN}${route}`;
  try {
    const { status, ms, body, location } = await fetchWithTimeout(url);
    const canonical = (body.match(/<link rel="canonical" href="([^"]*)"/) || [, ""])[1];
    const title = (body.match(/<title>([^<]*)<\/title>/) || [, ""])[1];
    results.push({ route, status, ms, canonical, title, location });

    if (status !== 200) problems.push(`${route}: HTTP ${status}${location ? ` -> ${location}` : ""}`);
    else if (canonical !== url) problems.push(`${route}: canonical "${canonical}" neodpovida "${url}"`);
  } catch (requestError) {
    results.push({ route, status: 0, error: String(requestError.message).slice(0, 200) });
    problems.push(`${route}: ${requestError.message}`);
  }
}

for (const file of ["/robots.txt", "/sitemap.xml", "/llms.txt"]) {
  try {
    const { status, ms } = await fetchWithTimeout(`${ORIGIN}${file}`);
    results.push({ route: file, status, ms });
    if (status !== 200) problems.push(`${file}: HTTP ${status}`);
  } catch (requestError) {
    problems.push(`${file}: ${requestError.message}`);
  }
}

const timings = results.filter((row) => Number.isFinite(row.ms) && row.status === 200).map((row) => row.ms);
const payload = {
  generatedAt: new Date().toISOString(),
  origin: ORIGIN,
  checked: results.length,
  medianMs: timings.length ? timings.sort((a, b) => a - b)[Math.floor(timings.length / 2)] : null,
  slowest: results.filter((row) => row.status === 200).sort((a, b) => b.ms - a.ms).slice(0, 5).map((row) => ({ route: row.route, ms: row.ms })),
  problems,
  results
};

mkdirSync(join(root, "reports/seo"), { recursive: true });
writeFileSync(join(root, "reports/seo/live-latest.json"), `${JSON.stringify(payload, null, 2)}\n`);

console.log(`Live check: ${results.length} URL, median ${payload.medianMs} ms, ${problems.length} problemu.`);
for (const problem of problems) console.warn(`  ${problem}`);
