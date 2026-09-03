// SEO audit pro internetostrava.cz - bezi offline, bez credentials.
// Doplnuje scripts/check-site.mjs: ten kontroluje existenci, tenhle kvalitu a obchodni pravidla.
// Vystup: lidsky souhrn na stdout + reports/seo/audit-latest.json pro scripts/seo-report.mjs.
// Exit 1, pokud je nalezena aspon jedna chyba zavaznosti "error".

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(".");
const ignored = new Set([".git", "node_modules", "reports", "data", ".github"]);
const facts = JSON.parse(readFileSync(join(root, "data/seo/facts.json"), "utf8"));

const findings = [];
const add = (severity, check, page, message) => findings.push({ severity, check, page, message });
const error = (check, page, message) => add("error", check, page, message);
const plural = (count, one, few, many) => `${count} ${count === 1 ? one : count < 5 ? few : many}`;
const warn = (check, page, message) => add("warn", check, page, message);

/* ---------- pomocne funkce ---------- */

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const fullPath = join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

// Delka v ZNACICH, ne v bajtech. Ceska diakritika ma v UTF-8 2 bajty a bajtove
// mereni vysledek nafoukne zhruba 1,3x (viz poznamka v docs/SEO-PLAN.md).
const chars = (value) => [...value].length;

function globToRegExp(pattern) {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^${escaped.replace(/\*\*/g, "\u0000").replace(/\*/g, "[^/]*").replace(/\u0000/g, ".*")}$`);
}

const adsZoneMatchers = facts.adsZone.map(globToRegExp);
const isAdsZone = (label) => adsZoneMatchers.some((matcher) => matcher.test(label));

const decode = (value) => value
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&[a-z]+;/gi, " ");

const stripTags = (html) => decode(
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
).replace(/\s+/g, " ").trim();

const bodyOf = (html) => (html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i) || [, html])[1];

// Telo bez hlavicky a paticky - navigacni odkazy se do grafu odkazu nepocitaji.
const contentOf = (html) => bodyOf(html)
  .replace(/<header\b[\s\S]*?<\/header>/gi, " ")
  .replace(/<footer\b[\s\S]*?<\/footer>/gi, " ");

const attr = (html, re) => (html.match(re) || [, ""])[1];

// "index.html" -> "/", "tarify/index.html" -> "/tarify/"
function routeOf(label) {
  if (label === "index.html") return "/";
  if (label.endsWith("/index.html")) return `/${label.slice(0, -"index.html".length)}`;
  return `/${label}`;
}

/* ---------- nacteni stranek ---------- */

const pages = walk(root)
  .filter((path) => extname(path) === ".html")
  .map((path) => {
    const label = relative(root, path).split("\\").join("/");
    const html = readFileSync(path, "utf8");
    return {
      label,
      route: routeOf(label),
      html,
      zone: isAdsZone(label) ? "ads" : "poda",
      title: decode(attr(html, /<title>([^<]*)<\/title>/)),
      description: decode(attr(html, /<meta name="description" content="([^"]*)"/)),
      h1: decode(stripTags(attr(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/) || "")),
      canonical: attr(html, /<link rel="canonical" href="([^"]*)"/),
      robots: attr(html, /<meta name="robots" content="([^"]*)"/),
      words: stripTags(bodyOf(html)).split(" ").filter(Boolean).length
    };
  })
  .sort((a, b) => a.label.localeCompare(b.label));

const indexable = pages.filter((page) => page.label !== "404.html" && !/noindex/i.test(page.robots));

/* ---------- 1. zonova poistka: 0 vyskytu "poda" v Ads zone ---------- */

for (const page of pages.filter((p) => p.zone === "ads")) {
  const hits = page.html.match(/poda/gi) || [];
  if (hits.length) {
    error("zona", page.label, `${hits.length}x retezec "poda" v Ads zone (musi byt 0 - PODA zakazala znacku v Google Ads)`);
  }
}

/* ---------- 2.-5. metadata, duplicity, tenky obsah ---------- */

const [titleMin, titleMax] = facts.titleChars;
const [descMin, descMax] = facts.descriptionChars;
const seen = { title: new Map(), description: new Map(), h1: new Map() };

for (const page of indexable) {
  const titleLength = chars(page.title);
  if (titleLength > titleMax) warn("title", page.label, `title ma ${titleLength} znaku (limit ${titleMax}): "${page.title}"`);
  else if (titleLength < titleMin) warn("title", page.label, `title ma jen ${titleLength} znaku (doporuceno od ${titleMin})`);

  const descLength = chars(page.description);
  if (descLength > descMax) warn("description", page.label, `description ma ${descLength} znaku (limit ${descMax})`);
  else if (descLength < descMin) warn("description", page.label, `description ma jen ${descLength} znaku (doporuceno od ${descMin})`);

  if (page.words < facts.thinContentWords) {
    warn("tenky-obsah", page.label, `jen ${page.words} slov (prah ${facts.thinContentWords}) - riziko doorway hodnoceni, prohloubit nebo slouceni`);
  }

  for (const field of ["title", "description", "h1"]) {
    const value = page[field];
    if (!value) continue;
    const bucket = seen[field].get(value) || [];
    bucket.push(page.label);
    seen[field].set(value, bucket);
  }
}

for (const field of ["title", "description", "h1"]) {
  for (const [value, labels] of seen[field]) {
    if (labels.length > 1) {
      warn("duplicita", labels.join(", "), `stejny ${field} na ${labels.length} strankach: "${value.slice(0, 70)}"`);
    }
  }
}

/* ---------- 6. JSON-LD + soulad FAQPage s viditelnymi FAQ ---------- */

let schemaBlocks = 0;

const normalize = (value) => decode(value).replace(/\s+/g, " ").trim().toLowerCase();

for (const page of pages) {
  const visibleQuestions = [...page.html.matchAll(/<summary>([\s\S]*?)<\/summary>/gi)]
    .map(([, raw]) => normalize(stripTags(raw)));
  const visibleFaq = visibleQuestions.length;
  const schemaQuestions = [];
  let schemaFaq = 0;

  for (const [, raw] of page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    schemaBlocks += 1;
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (parseError) {
      error("schema", page.label, `nevalidni JSON-LD: ${parseError.message}`);
      continue;
    }
    const nodes = [parsed, ...(parsed["@graph"] || [])].flatMap((node) => (Array.isArray(node) ? node : [node]));
    for (const node of nodes) {
      if (node && node["@type"] === "FAQPage") {
        for (const question of node.mainEntity || []) {
          schemaFaq += 1;
          schemaQuestions.push(normalize(question.name || ""));
        }
      }
    }
  }

  if (schemaFaq && visibleFaq && schemaFaq !== visibleFaq) {
    warn("faq", page.label, `FAQPage schema ma ${schemaFaq} otazek, viditelnych <details> je ${visibleFaq} (projekt drzi 1:1)`);
  }
  if (schemaFaq && !visibleFaq) {
    error("faq", page.label, `FAQPage schema s ${schemaFaq} otazkami, ale zadny viditelny FAQ obsah`);
  }
  // Google vyzaduje, aby se obsah FAQ schematu shodoval s viditelnym obsahem stranky.
  for (const question of schemaQuestions) {
    if (visibleFaq && !visibleQuestions.includes(question)) {
      warn("faq", page.label, `otazka ve schematu neni doslovne ve viditelnem obsahu: "${question.slice(0, 70)}"`);
    }
  }
}

/* ---------- 7. graf internich odkazu ---------- */

const inbound = new Map(indexable.map((page) => [page.route, new Set()]));

for (const page of pages) {
  for (const [, href] of contentOf(page.html).matchAll(/href="(\/[^"#?]*)/g)) {
    const target = href.endsWith("/") || href.includes(".") ? href : `${href}/`;
    if (inbound.has(target) && target !== page.route) inbound.get(target).add(page.route);
  }
}

for (const [route, sources] of inbound) {
  if (route === "/") continue;
  if (sources.size === 0) {
    warn("sirota", route, "zadny kontextovy interni odkaz (odkazy z navigace a paticky se nepocitaji)");
  }
}

/* ---------- 8. konzistence cache tokenu ---------- */

const tokens = new Map();
for (const page of pages) {
  for (const [, token] of page.html.matchAll(/\?v=(r\d+)/g)) {
    tokens.set(token, (tokens.get(token) || 0) + 1);
  }
}
if (tokens.size > 1) {
  const summary = [...tokens].sort((a, b) => b[1] - a[1]).map(([token, count]) => `${token} (${count}x)`).join(", ");
  const stale = [...tokens].sort((a, b) => b[1] - a[1]).slice(1).map(([token]) => token);
  const where = pages
    .filter((page) => stale.some((token) => page.html.includes(`?v=${token}`)))
    .map((page) => page.label)
    .join(", ");
  error("cache-token", where, `nekonzistentni cache-busting token: ${summary} - CDN muze servirovat stary asset`);
}

/* ---------- 9. canonical a noindex ---------- */

for (const page of pages) {
  if (page.label === "404.html") continue;
  const expected = `${facts.canonicalOrigin}${page.route}`;
  if (!page.canonical) error("canonical", page.label, "chybi canonical");
  else if (page.canonical !== expected) error("canonical", page.label, `canonical "${page.canonical}" neodpovida vlastni URL "${expected}"`);
}

for (const required of facts.noindex) {
  const page = pages.find((candidate) => candidate.label === required);
  if (!page) error("noindex", required, "stranka chybi");
  else if (!/noindex/i.test(page.robots)) error("noindex", required, "musi mit <meta name=\"robots\" content=\"noindex,...\">");
}

/* ---------- 10. chranene obchodni hodnoty ---------- */

for (const page of pages) {
  for (const forbidden of facts.phone.forbidden) {
    if (page.html.includes(forbidden)) error("kontakt", page.label, `zastarale telefonni cislo "${forbidden}" (platne je ${facts.phone.display})`);
  }

  for (const [, tel] of page.html.matchAll(/href="(tel:[^"]*)"/g)) {
    if (tel !== facts.phone.tel) error("kontakt", page.label, `tel: odkaz "${tel}" neodpovida ${facts.phone.tel}`);
  }

  for (const [amount] of page.html.matchAll(/\d{2,4}(?:&nbsp;| )Kč/g)) {
    const normalized = amount.replace(/&nbsp;/g, " ");
    if (!facts.prices.includes(normalized)) {
      error("cena", page.label, `cena "${normalized}" neni v potvrzenem cenniku (${facts.prices.join(", ")}) - zmenu cen potvrzuje majitel`);
    }
  }

  const expectedEmail = page.zone === "ads" ? facts.email.ads : facts.email.poda;
  const otherEmail = page.zone === "ads" ? facts.email.poda : facts.email.ads;
  if (page.html.includes(otherEmail) && !page.html.includes(expectedEmail)) {
    warn("kontakt", page.label, `stranka v ${page.zone} zone pouziva ${otherEmail} misto ${expectedEmail}`);
  }
}

/* ---------- 11. parita sitemap / soubory / llms.txt ---------- */

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const sitemapRoutes = new Set();
const today = new Date().toISOString().slice(0, 10);

for (const [, loc] of sitemap.matchAll(/<loc>https:\/\/internetostrava\.cz([^<]*)<\/loc>/g)) sitemapRoutes.add(loc);
for (const [, lastmod] of sitemap.matchAll(/<lastmod>([^<]*)<\/lastmod>/g)) {
  if (lastmod > today) error("sitemap", "sitemap.xml", `lastmod ${lastmod} je v budoucnosti`);
}

for (const page of indexable) {
  if (!sitemapRoutes.has(page.route)) warn("sitemap", page.label, `route ${page.route} chybi v sitemap.xml`);
}

const llms = readFileSync(join(root, "llms.txt"), "utf8");
for (const page of indexable) {
  if (!llms.includes(page.route)) warn("llms", page.label, `route ${page.route} chybi v llms.txt`);
}

/* ---------- vystup ---------- */

const errors = findings.filter((finding) => finding.severity === "error");
const warnings = findings.filter((finding) => finding.severity === "warn");

const report = {
  generatedAt: new Date().toISOString(),
  pages: pages.length,
  indexable: indexable.length,
  schemaBlocks,
  adsZonePages: pages.filter((page) => page.zone === "ads").length,
  thinPages: indexable
    .filter((page) => page.words < facts.thinContentWords)
    .map((page) => ({ route: page.route, words: page.words }))
    .sort((a, b) => a.words - b.words),
  wordCounts: Object.fromEntries(indexable.map((page) => [page.route, page.words])),
  errors,
  warnings
};

mkdirSync(join(root, "reports/seo"), { recursive: true });
writeFileSync(join(root, "reports/seo/audit-latest.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(`SEO audit: ${pages.length} stranek (${report.adsZonePages} v Ads zone), ${schemaBlocks} JSON-LD bloku.`);

for (const finding of errors) console.error(`CHYBA  [${finding.check}] ${finding.page}: ${finding.message}`);
for (const finding of warnings) console.warn(`varovani [${finding.check}] ${finding.page}: ${finding.message}`);

if (errors.length) {
  console.error(`\nAudit selhal: ${plural(errors.length, "chyba", "chyby", "chyb")}, ${warnings.length} varovani.`);
  process.exit(1);
}

console.log(`Audit prosel: 0 chyb, ${warnings.length} varovani.`);
