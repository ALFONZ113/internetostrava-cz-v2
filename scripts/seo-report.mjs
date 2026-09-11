// Slozi z auditu (reports/seo/audit-latest.json) a dat z GSC (data/gsc/*.json)
// cesky report do reports/seo/YYYY-MM-DD.md vcetne prioritizovaneho seznamu ukolu.
// Funguje i bez GSC dat - pak obsahuje jen technickou cast.

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(".");
const keywords = JSON.parse(readFileSync(join(root, "data/seo/keywords.json"), "utf8"));

const auditPath = join(root, "reports/seo/audit-latest.json");
if (!existsSync(auditPath)) {
  console.error("Chybi reports/seo/audit-latest.json - spustte nejdriv `npm run seo:audit`.");
  process.exit(1);
}
const audit = JSON.parse(readFileSync(auditPath, "utf8"));

/* ---------- nacteni nejnovejsich GSC dat ---------- */

const gscDir = join(root, "data/gsc");
const gscFiles = existsSync(gscDir)
  ? readdirSync(gscDir).filter((name) => name.endsWith(".json")).sort()
  : [];
const gsc = gscFiles.length ? JSON.parse(readFileSync(join(gscDir, gscFiles.at(-1)), "utf8")) : null;

/* ---------- pomocne funkce ---------- */

const num = (value, digits = 1) => (Number.isFinite(value) ? value.toFixed(digits).replace(".", ",") : "-");
const pct = (value) => `${num(value * 100, 2)} %`;
const routeOf = (url) => url.replace(/^https?:\/\/[^/]+/, "") || "/";
const plural = (count, one, few, many) => `${count} ${count === 1 ? one : count >= 2 && count <= 4 ? few : many}`;

const totals = (rows = []) => rows.reduce(
  (accumulator, row) => ({
    clicks: accumulator.clicks + row.clicks,
    impressions: accumulator.impressions + row.impressions,
    weighted: accumulator.weighted + row.position * row.impressions
  }),
  { clicks: 0, impressions: 0, weighted: 0 }
);

function delta(current, previous, digits = 0, invert = false) {
  if (!Number.isFinite(previous)) return "";
  const difference = current - previous;
  if (Math.abs(difference) < 0.05) return " (beze zmeny)";
  const better = invert ? difference < 0 : difference > 0;
  const sign = difference > 0 ? "+" : "";
  return ` (${sign}${num(difference, digits)}, ${better ? "lepsi" : "horsi"})`;
}

const foldDiacritics = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

const clusterIndex = new Map();
for (const cluster of keywords.clusters) {
  for (const entry of cluster.queries) clusterIndex.set(foldDiacritics(entry.query), { cluster, entry });
}
const queryCluster = { get: (query) => clusterIndex.get(foldDiacritics(query)) };

const lines = [];
const push = (line = "") => lines.push(line);
const tasks = [];

/* ---------- hlavicka ---------- */

const reportDate = new Date().toISOString().slice(0, 10);
push(`# SEO report ${reportDate}`);
push();
push("Vygenerovano automaticky (`npm run seo:report`). Cisla z Google Search Console, technicke nalezy z `npm run seo:audit`.");
push();

/* ---------- 1. vykon ---------- */

push("## 1. Vykon ve vyhledavani");
push();

const gscErrorPath = join(root, "reports/seo/gsc-error.json");
const gscError = existsSync(gscErrorPath) ? JSON.parse(readFileSync(gscErrorPath, "utf8")) : null;

if (gscError) {
  push(`**Stahovani dat ze Search Console selhalo** (${gscError.failedAt.slice(0, 16).replace("T", " ")} UTC).`);
  push();
  push(`> ${gscError.message}`);
  push();
  if (gscError.hint) push(gscError.hint);
  push();
  tasks.push({ weight: 95, text: `Opravit pristup ke Search Console API - ${gscError.hint || gscError.message}` });
}

if (!gsc) {
  if (!gscError) {
    push("Data z Search Console zatim nejsou. Nastavte `GSC_SERVICE_ACCOUNT_JSON` podle `docs/SEO-AUTOMATION.md`;");
    push("do te doby report obsahuje jen technickou cast.");
  }
  push();
} else {
  // Souhrn se bere z neagregovaneho dotazu bez dimenzi. Soucet po dimenzi query
  // je nizsi, protoze Google anonymizovane dotazy z vysledku vyrazuje - starsi
  // datove soubory jeste totals nemaji, tam se scita jako drive.
  const summarize = (period) => {
    if (period.totals) {
      return {
        clicks: period.totals.clicks,
        impressions: period.totals.impressions,
        ctr: period.totals.ctr,
        position: period.totals.position
      };
    }
    const sum = totals(period.queries);
    return {
      clicks: sum.clicks,
      impressions: sum.impressions,
      ctr: sum.impressions ? sum.clicks / sum.impressions : 0,
      position: sum.impressions ? sum.weighted / sum.impressions : NaN
    };
  };

  const current = summarize(gsc.current);
  const previous = summarize(gsc.previous);
  const currentCtr = current.ctr;
  const previousCtr = previous.ctr;
  const currentPosition = current.position;
  const previousPosition = previous.position;
  const estimated = !gsc.current.totals;

  push(`Obdobi **${gsc.current.startDate} az ${gsc.current.endDate}**, porovnano s ${gsc.previous.startDate} az ${gsc.previous.endDate}.`);
  push();
  if (estimated) {
    push("> Pozn.: tato data jsou z doby pred opravou souhrnu, cisla jsou secteny po dimenzi `query`");
    push("> a jsou proto nizsi nez skutecnost. Dalsi beh uz ulozi presny souhrn.");
    push();
  }
  push("| Metrika | Aktualne | Predchozi | Zmena |");
  push("|---|---:|---:|---|");
  push(`| Kliky | ${current.clicks} | ${previous.clicks} | ${delta(current.clicks, previous.clicks).trim() || "-"} |`);
  push(`| Zobrazeni | ${current.impressions} | ${previous.impressions} | ${delta(current.impressions, previous.impressions).trim() || "-"} |`);
  push(`| CTR | ${pct(currentCtr)} | ${pct(previousCtr)} | ${delta(currentCtr * 100, previousCtr * 100, 2).trim() || "-"} |`);
  push(`| Prumerna pozice | ${num(currentPosition)} | ${num(previousPosition)} | ${delta(currentPosition, previousPosition, 1, true).trim() || "-"} |`);
  push();

  if (gsc.current.devices?.length) {
    push("| Zarizeni | Kliky | Zobrazeni | CTR | Pozice |");
    push("|---|---:|---:|---:|---:|");
    for (const device of gsc.current.devices.sort((a, b) => b.clicks - a.clicks)) {
      push(`| ${device.key} | ${device.clicks} | ${device.impressions} | ${pct(device.ctr)} | ${num(device.position)} |`);
    }
    push();
  }
}

/* ---------- 2. prilezitosti ---------- */

push("## 2. Prilezitosti");
push();

if (gsc) {
  const previousByQuery = new Map(gsc.previous.queries.map((row) => [row.key, row]));

  // Dotazy tesne za dosahem prvni stranky - nejvyssi navratnost prace.
  const striking = gsc.current.queries
    .filter((row) => row.position >= 4 && row.position <= 20 && row.impressions >= 5)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15);

  push("### 2.1 Dotazy na pozici 4-20 (na dosah prvni stranky)");
  push();
  if (striking.length) {
    push("| Dotaz | Pozice | Zmena | Zobrazeni | Kliky | Cluster |");
    push("|---|---:|---|---:|---:|---|");
    for (const row of striking) {
      const before = previousByQuery.get(row.key);
      const known = queryCluster.get(row.key);
      push(`| ${row.key} | ${num(row.position)} |${delta(row.position, before?.position, 1, true) || " -"} | ${row.impressions} | ${row.clicks} | ${known ? known.cluster.label : "-"} |`);
    }
    const top = striking.filter((row) => !queryCluster.get(row.key)?.cluster.watchOnly).slice(0, 3);
    for (const row of top) {
      const target = queryCluster.get(row.key)?.entry.page;
      tasks.push({
        weight: 20 + row.impressions,
        text: `Posilit obsah pro dotaz "${row.key}" (pozice ${num(row.position)}, ${row.impressions} zobrazeni)${target ? ` na strance \`${target}\`` : ""}.`
      });
    }
  } else {
    push("Zadny dotaz zatim v tomto pasmu.");
  }
  push();

  // Nulove prokliky maji dve ruzne priciny a kazda chce jinou praci.
  // Na prvni strane vysledku stranku uzivatel VIDI a neklikne - to je problem
  // snippetu. Od druhe strany dal ji prakticky nikdo nevidi, takze prepis title
  // a description nic neprinese; tam je problem pozice, tedy obsahu a odkazu.
  const SNIPPET_POSITION_LIMIT = 10;
  const zeroClicks = gsc.current.pages
    .filter((row) => row.clicks === 0 && row.impressions >= 15)
    .sort((a, b) => b.impressions - a.impressions);
  const noClicks = zeroClicks.filter((row) => row.position <= SNIPPET_POSITION_LIMIT).slice(0, 10);
  const buriedPages = zeroClicks.filter((row) => row.position > SNIPPET_POSITION_LIMIT).slice(0, 10);

  push("### 2.2 Viditelne stranky bez prokliku (problem snippetu)");
  push();
  push(`Stranky do pozice ${SNIPPET_POSITION_LIMIT}, ktere uzivatel ve vysledcich vidi a presto neklikne.`);
  push("Tady pomuze title a description, ne dalsi obsah.");
  push();
  const pairsByPage = new Map();
  for (const pair of gsc.current.pairs || []) {
    const bucket = pairsByPage.get(pair.page) || [];
    bucket.push(pair);
    pairsByPage.set(pair.page, bucket);
  }

  if (noClicks.length) {
    push("| Stranka | Zobrazeni | Pozice | Na jake dotazy rankuje |");
    push("|---|---:|---:|---|");
    for (const row of noClicks) {
      const top = (pairsByPage.get(row.key) || [])
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 3)
        .map((pair) => `${pair.query} (${pair.impressions})`);
      push(`| ${routeOf(row.key)} | ${row.impressions} | ${num(row.position)} | ${top.length ? top.join("; ") : "-"} |`);
      tasks.push({
        weight: 15 + row.impressions,
        text: `Prepsat title a description na \`${routeOf(row.key)}\` (${row.impressions} zobrazeni, 0 kliku, pozice ${num(row.position)})${top.length ? ` - rankuje na: ${top.join("; ")}` : ""}.`
      });
    }
    if (!gsc.current.pairs) {
      push();
      push("> Sloupec s dotazy je prazdny - tato data jsou z doby pred pridanim dimenze `page`+`query`.");
    }
  } else {
    push("Zadna stranka v tomto stavu.");
  }
  push();

  push("### 2.2b Stranky, ktere nikdo nevidi (problem pozice)");
  push();
  push(`Zobrazeni maji, ale az za pozici ${SNIPPET_POSITION_LIMIT}. Prepis snippetu je tu k nicemu -`);
  push("potrebuji hlubsi a konkretnejsi obsah a interni odkazy.");
  push();
  if (buriedPages.length) {
    push("| Stranka | Zobrazeni | Pozice | Na jake dotazy rankuje |");
    push("|---|---:|---:|---|");
    for (const row of buriedPages) {
      const top = (pairsByPage.get(row.key) || [])
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 3)
        .map((pair) => `${pair.query} (${pair.impressions})`);
      const words = audit.wordCounts?.[routeOf(row.key)];
      push(`| ${routeOf(row.key)} | ${row.impressions} | ${num(row.position)} | ${top.length ? top.join("; ") : "-"} |`);
      tasks.push({
        weight: 10 + row.impressions / 2,
        text: `Prohloubit \`${routeOf(row.key)}\` (pozice ${num(row.position)}, ${row.impressions} zobrazeni${words ? `, ${words} slov` : ""})${top.length ? ` - rankuje na: ${top.join("; ")}` : ""}.`
      });
    }
  } else {
    push("Zadna stranka v tomto stavu.");
  }
  push();

  // Indexace - primo odpovida na otevrenou otazku z docs/SEO-PLAN.md.
  const notIndexed = (gsc.inspection || []).filter((row) => row.verdict !== "PASS");
  push("### 2.3 Stav indexace");
  push();
  if (!gsc.inspection?.length) {
    push("URL Inspection nebyla spustena.");
  } else if (notIndexed.length) {
    push("| URL | Verdikt | Stav |");
    push("|---|---|---|");
    for (const row of notIndexed) push(`| ${routeOf(row.url)} | ${row.verdict} | ${row.coverageState} |`);
    tasks.push({
      weight: 60,
      text: `Vyresit indexaci ${notIndexed.length} URL bez verdiktu PASS (viz sekce 2.3) - dokud nejsou v indexu, obsah na nich nema efekt.`
    });
  } else {
    push(`Vsech ${gsc.inspection.length} URL ze sitemapy je zaindexovanych.`);
  }
  push();
} else {
  push(gscError
    ? "Prilezitosti nelze vyhodnotit, dokud se neopravi pristup ke Search Console (viz sekce 1)."
    : "Bez dat z Search Console nelze prilezitosti vyhodnotit.");
  push();
}

/* ---------- 3. technicky stav ---------- */

push("## 3. Technicky stav webu");
push();
push(`Zkontrolovano ${audit.pages} stranek (${audit.adsZonePages} v Ads zone), ${audit.schemaBlocks} JSON-LD bloku.`);
push(`Nalezeno **${plural(audit.errors.length, "chyba", "chyby", "chyb")}** a ${plural(audit.warnings.length, "varovani", "varovani", "varovani")}.`);
push();

if (audit.errors.length) {
  push("### 3.1 Chyby (blokuji automaticky push na main)");
  push();
  for (const finding of audit.errors) {
    push(`- **[${finding.check}]** \`${finding.page}\` - ${finding.message}`);
    tasks.push({ weight: 100, text: `Opravit chybu auditu [${finding.check}] na \`${finding.page}\`: ${finding.message}` });
  }
  push();
}

const byCheck = new Map();
for (const finding of audit.warnings) {
  const bucket = byCheck.get(finding.check) || [];
  bucket.push(finding);
  byCheck.set(finding.check, bucket);
}

if (byCheck.size) {
  push("### 3.2 Varovani podle typu");
  push();
  push("| Typ | Pocet | Priklad |");
  push("|---|---:|---|");
  for (const [check, group] of [...byCheck].sort((a, b) => b[1].length - a[1].length)) {
    push(`| ${check} | ${group.length} | ${group[0].page}: ${group[0].message.slice(0, 90)} |`);
  }
  push();

  const faqWarnings = byCheck.get("faq") || [];
  if (faqWarnings.length >= 3) {
    const affected = new Set(faqWarnings.map((finding) => finding.page));
    tasks.push({
      weight: 80,
      text: `Sladit FAQPage schema s viditelnym obsahem na ${affected.size} strankach - Google vyzaduje, aby otazky ve schematu byly na strance videt.`
    });
  }
}

if (audit.thinPages.length) {
  push("### 3.3 Nejtenci stranky");
  push();
  push("| Stranka | Slov |");
  push("|---|---:|");
  for (const page of audit.thinPages.slice(0, 12)) push(`| ${page.route} | ${page.words} |`);
  push();
  // Kontakt, ochrana udaju nebo rozcestnik jsou kratke opravnene - navrhujeme prohloubit
  // jen stranky, ktere jsou v keywords.json cilem nejakeho dotazu.
  const targetRoutes = new Set(keywords.clusters.flatMap((cluster) => cluster.queries.map((entry) => entry.page)));
  const worst = audit.thinPages.find((page) => targetRoutes.has(page.route));
  if (worst) {
    tasks.push({
      weight: 40,
      text: `Prohloubit \`${worst.route}\` (${worst.words} slov) - je to cilova stranka pro dotazy z keywords.json.`
    });
  }
}

/* ---------- 3.4 stav produkce ---------- */

const livePath = join(root, "reports/seo/live-latest.json");
if (existsSync(livePath)) {
  const live = JSON.parse(readFileSync(livePath, "utf8"));
  push("### 3.4 Produkcni web");
  push();
  push(`Zkontrolovano ${live.checked} URL na ${live.origin}, medianova odezva ${live.medianMs} ms.`);
  push();
  if (live.problems.length) {
    for (const problem of live.problems) push(`- ${problem}`);
    tasks.push({ weight: 90, text: `Opravit ${plural(live.problems.length, "problem", "problemy", "problemu")} na produkci (viz sekce 3.4).` });
  } else {
    push("Vsechny URL vraci 200 a canonical odpovida.");
  }
  push();
}

/* ---------- 4. clustery ---------- */

push("## 4. Cilove clustery");
push();
push("| Cluster | Priorita | Dotazu | Poznamka |");
push("|---|---:|---:|---|");
for (const cluster of keywords.clusters) {
  push(`| ${cluster.label} | ${cluster.priority} | ${cluster.queries.length} | ${cluster.watchOnly ? "jen sledovat, necilit" : cluster.note.slice(0, 80)} |`);
}
push();

/* ---------- 5. ukoly ---------- */

push("## 5. Ukoly pro tento cyklus");
push();
push("Serazeno podle ocekavaneho dopadu. Agent vrstvy B bere shora a dela **nejvyse tri** polozky za beh.");
push();

const ranked = tasks.sort((a, b) => b.weight - a.weight).slice(0, 10);
if (ranked.length) {
  ranked.forEach((task, index) => push(`${index + 1}. ${task.text}`));
} else {
  push("Zadne automaticky odvozene ukoly - web je technicky v poradku a data neukazuji zjevnou prilezitost.");
}
push();

/* ---------- 6. mimo repozitar ---------- */

push("## 6. Mimo repozitar (musi udelat majitel)");
push();
push("Automatizace tyhle veci nedokaze udelat, ale jsou to nejvetsi paky:");
push();
push("1. **Google Business Profile** - Milan Terc, ICO 75546230, service-area business. Nazev nesmi obsahovat \"PODA\".");
push("2. **Sjednotit NAP** napric weby (internetostrava.cz, overdostupnost.cz, popri.cz): jedno telefonni cislo, spravne ICO, odstranit rozporne spojeni \"nezavisly\" + \"obchodni zastupce PODA\".");
push("3. **Zapis na Firmy.cz** kvuli Seznamu - Seznam nema verejne API, automat jeho pozice merit neumi.");
push("4. **Realne recenze od zakazniku** - vymyslene recenze jsou proti publishing-rules a proti pravidlum Google.");
push();

/* ---------- zapis ---------- */

mkdirSync(join(root, "reports/seo"), { recursive: true });
const file = join(root, "reports/seo", `${reportDate}.md`);
writeFileSync(file, `${lines.join("\n")}\n`);
writeFileSync(join(root, "reports/seo/latest.md"), `${lines.join("\n")}\n`);

console.log(`Report zapsan: ${file} (${ranked.length} ukolu, ${audit.errors.length} chyb, ${audit.warnings.length} varovani).`);
