/* ===========================================================================
   Generátor lokalitních stránek „Lokalita v3" (PODA SEO zóna)
   ---------------------------------------------------------------------------
   Kostra (hlavička, hero s formulářem, tarify, kroky, sousedé, formulář,
   patička, modal, schema) je společná. Unikátní obsah každé stránky je
   v data/lokality.json. Generátor přepíše <slug>/index.html celý.

   Použití:   node scripts/build-lokality.mjs            (všechny v datech)
              node scripts/build-lokality.mjs <slug>     (jedna stránka)
   Po spuštění vždy: npm run check && npm run seo:audit
   =========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://internetostrava.cz";
const CACHE = "r30";
const PHONE = { tel: "tel:+420777425230", display: "777 425 230" };
const EMAIL = "terc@obchod.poda.cz";

/* Ceny a názvy tarifů v PODA zóně – shodné s /poda-internet-ostrava/. */
const TARIFFS = [
  { name: "1 Giga + TV Basic", price: 300, tag: "Oblíbená", featured: true, down: 1000, up: 1000,
    sub: "Optický internet PODA a televize Basic.",
    points: ["Televize Basic", "Optika vedená až do domu", "Nejnižší částka z nabídky"] },
  { name: "1 Giga + TV Mých 10", price: 440, tag: "S výběrem stanic", down: 1000, up: 1000,
    sub: "Televize Mých 10: 103 stanic a k tomu 10 prémiových podle vašeho výběru.",
    points: ["103 + 10 prémiových stanic", "Pro domácnost, která televizi sleduje", "Optika vedená až do domu"] },
  { name: "2 Giga internet", price: 570, tag: "Samostatný internet", down: 2000, up: 2000,
    sub: "Dvojnásobná rychlost pro více zařízení a náročný provoz.",
    points: ["Bez televize", "Home office, velké soubory, hraní", "Optika vedená až do domu"] },
];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = (s) => String(s).replace(/<[^>]*>/g, "");
const chars = (s) => [...s].length;
const fmt = (n) => new Intl.NumberFormat("cs-CZ").format(n).replace(/ /g, " ");
const czDate = (iso) => { const [y, m, d] = iso.split("-").map(Number); return `${d}. ${m}. ${y}`; };

const ICON = {
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6-5.686-6-10a6 6 0 0 1 12 0c0 4.314-6 10-6 10Z"/><circle cx="12" cy="11" r="2.5"/></svg>',
  tel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.5a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>',
};
const ARR = '<span class="v3-arr" aria-hidden="true">→</span>';

function schema(p) {
  const url = `${ORIGIN}/${p.slug}/`;
  const crumbs = [{ name: "Domů", item: `${ORIGIN}/` }];
  if (p.parent) crumbs.push({ name: p.parent.name, item: `${ORIGIN}/${p.parent.slug}/` });
  crumbs.push({ name: p.name, item: url });
  const area = { "@type": "AdministrativeArea", name: p.obvod, containedInPlace: { "@type": "City", name: "Ostrava" } };
  const graph = [
    {
      "@type": "WebPage", "@id": `${url}#webpage`, url, name: p.title, description: p.description, inLanguage: "cs",
      isPartOf: { "@id": `${ORIGIN}/#website` }, about: { "@id": `${url}#place` }, breadcrumb: { "@id": `${url}#breadcrumb` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${ORIGIN}/assets/og/${p.ogImage}.jpg` },
      dateModified: p.updated,
      author: { "@type": "Person", name: "Milan Terč", jobTitle: "Obchodní zástupce PODA a.s. pro Ostravu" },
    },
    {
      "@type": "Place", "@id": `${url}#place`, name: p.placeName || p.name,
      containedInPlace: p.obvod === p.name ? { "@type": "City", name: "Ostrava" } : area,
    },
    {
      "@type": "Service", "@id": `${url}#service`, name: p.serviceName, serviceType: "Internetové připojení",
      areaServed: { "@id": `${url}#place` },
      provider: { "@type": "Organization", name: "PODA a.s.", url: "https://www.poda.cz/" },
      broker: { "@type": "Organization", "@id": `${ORIGIN}/#organization`, name: "InternetOstrava.cz", url: `${ORIGIN}/` },
      offers: TARIFFS.map((t) => ({
        "@type": "Offer", name: t.name, price: String(t.price), priceCurrency: "CZK",
        description: `Měsíční cena. Optický internet ${fmt(t.down)}/${fmt(t.up)} Mb/s. Dostupnost se potvrzuje podle přesné adresy.`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: strip(q), acceptedAnswer: { "@type": "Answer", text: strip(a) } })),
    },
    {
      "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })),
    },
  ];
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2).split("\n").map((l) => "  " + l).join("\n");
  return `  <script type="application/ld+json">\n${json}\n  </script>`;
}

function field(id, name, label, icon, attrs, wide = true) {
  return `<div class="field${wide ? " wide" : ""}">
                <label for="${id}">${label}</label>
                <div class="input-wrap">
                  ${icon}
                  <input id="${id}" name="${name}" ${attrs}>
                </div>
              </div>`;
}

function page(p) {
  const url = `${ORIGIN}/${p.slug}/`;
  const breadcrumb = p.parent
    ? `<a href="/">Domů</a> / <a href="/${p.parent.slug}/">${esc(p.parent.name)}</a> / ${esc(p.name)}`
    : `<a href="/">Domů</a> / ${esc(p.name)}`;
  const bar = (label, v, max) => `<div class="v3-bar"><div class="row"><span>${label}</span><b>${fmt(v)} Mb/s</b></div><div class="tr"><i style="width:${Math.round((v / max) * 100)}%"></i></div></div>`;
  const tariffs = TARIFFS.map((t) => `          <article class="v3-tc${t.featured ? " is-ft" : ""}">
            <span class="v3-tc__tag">${esc(t.tag)}</span>
            <h3>${esc(t.name)}</h3>
            <p class="v3-tc__sub">${esc(t.sub)}</p>
            <div class="v3-tc__pr"><b>${t.price}</b><span>Kč / měsíc</span></div>
            ${bar("↓ Stahování", t.down, 2000)}
            ${bar("↑ Odesílání", t.up, 2000)}
            <ul>${t.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
            <a class="btn ${t.featured ? "btn-primary" : "btn-dark"}" href="#overeni" data-open-lead-modal data-lead-intent="order" data-tariff="${esc(t.name)}" data-tariff-price="${t.price} Kč / měsíc">Chci tento tarif</a>
          </article>`).join("\n");
  const neighbours = p.neighbours.map((n) => `            <a class="loc-card" href="/${n.slug}/"><h3>${esc(n.name)}</h3><p>${esc(n.desc)}</p><b>Průvodce lokalitou →</b></a>`).join("\n");
  const faq = p.faq.map(([q, a], i) => `          <details${i === 0 ? " open" : ""}><summary>${q}<span aria-hidden="true"></span></summary><p>${a}</p></details>`).join("\n");
  const facts = p.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join("");
  const footerLinks = [`<a href="/lokality/">Všechny lokality</a>`, ...p.footerLinks.map((n) => `<a href="/${n.slug}/">${esc(n.name)}</a>`)].join("");

  return `<!doctype html>
<html lang="cs">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(p.title)}</title>
  <meta name="description" content="${esc(p.description)}">
  <link rel="canonical" href="${url}"><link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png?v=2"><link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png?v=2"><link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><meta name="theme-color" content="#0a0f13"><meta name="geo.region" content="CZ-80"><meta name="geo.placename" content="${esc(p.geo.placename)}"><meta name="geo.position" content="${p.geo.position}"><meta name="ICBM" content="${p.geo.position.replace(";", ", ")}">
  <link rel="preload" as="image" href="/assets/${p.heroImg}" fetchpriority="high">
  <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/oswald-latin-ext.woff2" crossorigin>
  <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/oswald-latin.woff2" crossorigin>
  <link rel="stylesheet" href="/assets/redesign.css?v=${CACHE}">
  <meta property="og:title" content="${esc(p.title)}">
  <meta property="og:description" content="${esc(p.ogDescription)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${ORIGIN}/assets/og/${p.ogImage}.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:type" content="image/jpeg">
  <meta name="twitter:card" content="summary_large_image">
${schema(p)}
  <meta name="gtm-id" content="">
  <script src="/assets/analytics.js?v=${CACHE}" defer></script>
</head>
<body class="home-redesign loc-v3">
  <header class="site-header">
    <div class="wrap nav">
      <a class="logo logo-combo" href="/" aria-label="Internet Ostrava domů"><img class="logo-favicon" src="/assets/icon-192x192.png?v=logo-original-3" alt="" aria-hidden="true"><span class="logo-text"><span>INTERNET</span><strong>OSTRAVA<small>.CZ</small></strong></span></a>
      <button class="nav-toggle" type="button" aria-label="Otevřít menu" aria-expanded="false">☰</button>
      <nav class="nav-links" aria-label="Hlavní navigace">
        <a href="/poda-internet-ostrava/">PODA internet</a>
        <a href="/tarify/">Tarify</a>
        <a href="/dostupnost/">Dostupnost</a>
        <a href="/poradna/">Poradna</a>
        <a href="/lokality/">Lokality</a>
        <a href="/kontakt/">Kontakt</a>
        <a class="btn btn-ghost" href="${PHONE.tel}">${PHONE.display}</a>
        <a class="btn btn-primary" href="#overeni" data-open-lead-modal>Ověřit adresu</a>
      </nav>
    </div>
  </header>
  <main>
  <div class="city-marquee" aria-hidden="true">
    <div class="city-marquee-track">
      <div class="city-marquee-group">
        <span><i>&bull;</i> Ověření adresy zdarma</span>
        <span><i>&bull;</i> Odpověď do 30 minut</span>
        <span><i>&bull;</i> Nezávazná poptávka</span>
        <span><i>&bull;</i> Optika i bez optiky &ndash; podle domu</span>
        <span><i>&bull;</i> Bez skrytých poplatků za ověření</span>
        <span><i>&bull;</i> Telefon 777 425 230</span>
      </div>
      <div class="city-marquee-group"></div>
    </div>
  </div>
    <!-- HERO: adresa rovnou v první obrazovce -->
    <section class="v3-hero" aria-labelledby="loc-title">
      <img class="v3-hero__bg" src="/assets/${p.heroImg}" alt="${esc(p.heroAlt)}" width="1600" height="900" fetchpriority="high">
      <div class="wrap v3-hero__in">
        <div>
          <div class="breadcrumbs">${breadcrumb}</div>
          <span class="eyebrow">${esc(p.eyebrow)}</span>
          <h1 id="loc-title">${p.h1}</h1>
          <p class="lead">${p.lead}</p>
          <form class="v3-hero__form" name="overeni-hero-${p.slug}" action="/api/leads" method="post" data-lead-form>
            <input type="hidden" name="lead_type" value="availability">
            <input type="hidden" name="poznamka" value="${esc(p.formNote)}">
            <div class="field hp-field" aria-hidden="true"><label for="hero-website">Web</label><input id="hero-website" name="website" tabindex="-1" autocomplete="off"></div>
            <div class="v3-addr">
              <label class="v3-addr__f" for="hero-address">${ICON.pin}<span><small>Ulice a číslo domu</small><input id="hero-address" name="adresa" autocomplete="street-address" placeholder="${esc(p.addressPlaceholder)}" required></span></label>
              <label class="v3-addr__f" for="hero-phone">${ICON.tel}<span><small>Telefon</small><input id="hero-phone" name="telefon" type="tel" autocomplete="tel" placeholder="+420 …" required></span></label>
              <button class="btn btn-primary" type="submit">Ověřit adresu ${ARR}</button>
            </div>
            <label class="consent"><input type="checkbox" name="souhlas" required> <span>Souhlasím se zpracováním údajů pro vyřízení dotazu podle <a href="/ochrana-udaju/">zásad ochrany údajů</a></span></label>
          </form>
          <div class="v3-checks">
            <span>${ICON.ok}Zdarma a nezávazně</span>
            <span>${ICON.ok}Ozve se člověk do 30 minut</span>
            <span>${ICON.ok}Rozhoduje dům, ne čtvrť</span>
          </div>
        </div>
        <aside class="v3-spec" aria-label="${esc(p.name)} v kostce">
          <div class="v3-spec__lab">${esc(p.name)} v kostce</div>
          <dl class="v3-facts">${facts}</dl>
        </aside>
      </div>
      <div class="v3-sigline" aria-hidden="true"></div>
    </section>

    <!-- 01 OBSAH O ZÁSTAVBĚ -->
    <section class="v3-sec v3-paper">
      <div class="wrap">
        <div class="v3-secno"><b>01 / ${esc(p.name)}</b><div class="v3-sigline" aria-hidden="true"></div></div>
        <div class="v3-body">
          <div class="prose">
            <p class="v3-updated"><i class="v3-node" aria-hidden="true"></i><span>Aktualizováno <time datetime="${p.updated}">${czDate(p.updated)}</time> · připravil Milan Terč, místní zástupce pro Ostravu</span></p>
            <div class="answer-box">
              <p><strong>Rychlá odpověď:</strong> ${p.answer}</p>
            </div>
${p.body}
          </div>
          <aside class="v3-side">
            <div class="v3-call"><small>Raději zavoláte?</small><a href="${PHONE.tel}">${PHONE.display}</a><span>V pracovní dny. Večer a o víkendu se ozveme další pracovní den ráno.</span></div>
            <a class="btn btn-primary" href="#overeni" data-open-lead-modal>Ověřit adresu ${esc(p.nameLoc)} ${ARR}</a>
          </aside>
        </div>
      </div>
    </section>

    <!-- 02 TARIFY A CENY -->
    <section class="v3-sec v3-conc" id="tarify">
      <div class="wrap">
        <div class="v3-secno"><b>02 / Tarify a ceny</b><div class="v3-sigline" aria-hidden="true"></div></div>
        <div class="v3-head">
          <h2 class="v3-h2">Kolik stojí internet ${esc(p.nameLoc)}.</h2>
          <p class="lead">${p.tariffLead}</p>
        </div>
        <div class="v3-tariffs">
${tariffs}
        </div>
        <div class="v3-tnote">
          <p>Ceny jsou měsíční a stejné v celé Ostravě. Zda jde vybraný tarif zapojit u vašeho domu, potvrdíme podle přesné adresy.</p>
          <a class="v3-link" href="#overeni" data-open-lead-modal data-lead-intent="order" data-tariff="Individuální tarif" data-tariff-price="na míru">Levnější nebo senior varianta ${ARR}</a>
        </div>
      </div>
    </section>

    <!-- 03 JAK OVĚŘENÍ PROBÍHÁ -->
    <section class="v3-sec v3-paper">
      <div class="wrap">
        <div class="v3-secno"><b>03 / Jak ověření probíhá</b><div class="v3-sigline" aria-hidden="true"></div></div>
        <ol class="v3-steps">
          <li class="v3-step"><div class="v3-step__k">01</div><h3>Pošlete adresu</h3><p>Ulice, číslo domu a telefon. U bytového domu napište i vchod.</p><span class="v3-tag">Zdarma</span></li>
          <li class="v3-step"><div class="v3-step__k">02</div><h3>Ověříme váš dům</h3><p>Zjistíme, co je zavedené přímo u vás – přípojku, rozvod a dostupné tarify.</p><span class="v3-tag">Pracovní dny</span></li>
          <li class="v3-step"><div class="v3-step__k">03</div><h3>Zavoláme do 30 minut</h3><p>Řekneme cenu i to, co u vás nejde. Rozhodnete se v klidu, nezávazně.</p><span class="v3-tag">Bez závazku</span></li>
        </ol>
        <div class="v3-send">
          <b>Co poslat</b>
          <span><i class="v3-node" aria-hidden="true"></i>ulici a číslo domu</span>
          <span><i class="v3-node" aria-hidden="true"></i>telefon</span>
          <span><i class="v3-node" aria-hidden="true"></i>jen internet, nebo i televizi</span>
          <span><i class="v3-node" aria-hidden="true"></i>poznámku k domácnosti</span>
        </div>
      </div>
    </section>

    <!-- 04 FAQ -->
    <section class="v3-sec v3-conc" id="faq">
      <div class="wrap v3-faq">
        <div>
          <div class="v3-secno"><b>04 / Časté dotazy</b><div class="v3-sigline" aria-hidden="true"></div></div>
          <h2 class="v3-h2">Časté dotazy ${esc(p.faqFor)}.</h2>
        </div>
        <div class="v3-acc">
${faq}
        </div>
      </div>
    </section>

    <!-- 05 OKOLÍ -->
    <section class="v3-sec v3-paper">
      <div class="wrap">
        <div class="v3-secno"><b>05 / Okolí</b><div class="v3-sigline" aria-hidden="true"></div></div>
        <div class="v3-head">
          <h2 class="v3-h2">${esc(p.neighboursTitle)}</h2>
          <p class="lead">${p.neighboursLead}</p>
        </div>
        <div class="loc-grid">
${neighbours}
            <a class="loc-card" href="/lokality/"><h3>Všechny lokality</h3><p>Obvody i jednotlivé části Ostravy podle oblasti.</p><b>Přehled lokalit →</b></a>
        </div>
      </div>
    </section>

    <!-- OVĚŘENÍ: formulář -->
    <section class="v3-sec v3-cta" id="overeni" aria-label="Ověření dostupnosti">
      <div class="wrap">
        <div>
          <span class="eyebrow">Ověření zdarma</span>
          <h2 class="v3-h2">Ověřte internet <span class="v3-yel">${esc(p.nameLoc)}.</span></h2>
          <p class="lead">Pošlete přesnou adresu. Ověříme, co je u vašeho domu skutečně zavedené, a ozveme se do 30 minut v pracovní dny.</p>
          <div class="v3-mini">
            <div><b>Adresa</b><span>ulice a číslo domu</span></div>
            <div><b>Ověření</b><span>přímo pro váš dům</span></div>
            <div><b>Hovor</b><span>do 30 minut</span></div>
          </div>
        </div>
        <form class="form-panel" name="overeni-${p.slug}" action="/api/leads" method="post" data-lead-form>
          <h3>Ověřit dostupnost ${esc(p.nameLoc)}</h3>
          <p>Formulář je nezávazný. Odeslání není objednávka.</p>
          <div class="form-grid">
            <input type="hidden" name="lead_type" value="availability">
            <input type="hidden" name="poznamka" value="${esc(p.formNote)}">
            <div class="field hp-field" aria-hidden="true"><label for="website">Web</label><input id="website" name="website" tabindex="-1" autocomplete="off"></div>
            ${field("address", "adresa", "Ulice a číslo domu", ICON.pin, `autocomplete="street-address" placeholder="${esc(p.addressPlaceholder)}" required`).replace('class="field wide"', 'class="field primary wide"')}
            ${field("phone", "telefon", "Telefon", ICON.tel, 'type="tel" autocomplete="tel" placeholder="+420 ..." required')}
            ${field("email", "email", "E-mail <small>· volitelné</small>", ICON.mail, 'type="email" autocomplete="email" placeholder="vas@email.cz"')}
            <label class="consent"><input type="checkbox" name="souhlas" required> <span>Souhlasím se zpracováním údajů podle <a href="/ochrana-udaju/">zásad ochrany údajů</a></span></label>
            <button class="btn btn-primary" type="submit" style="grid-column:1/-1">Odeslat nezávazný dotaz ${ARR}</button>
            <div class="form-reassure">${ICON.shield} Nezávazné · Ozveme se do 30 minut</div>
          </div>
        </form>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div><a class="logo logo-combo footer-logo" href="/" aria-label="Internet Ostrava domů"><img class="logo-favicon" src="/assets/icon-192x192.png?v=logo-original-3" alt="" aria-hidden="true"><span class="logo-text"><span>INTERNET</span><strong>OSTRAVA<small>.CZ</small></strong></span></a><p>Tento web provozuje autorizovaný obchodní zástupce PODA a.s., nikoli samotná společnost PODA a.s.</p></div>
        <div><h4>Lokality</h4><div class="footer-links">${footerLinks}</div></div>
        <div><h4>Kontakt</h4><div class="footer-links"><a href="${PHONE.tel}">${PHONE.display}</a><a href="mailto:${EMAIL}">${EMAIL}</a><a href="/kontakt/">Napsat nám</a><a href="/poradna/">Poradna</a></div></div>
      </div>
      <div class="footer-bottom">© 2026 InternetOstrava.cz · obchodní zástupce PODA a.s.</div>
    </div>
  </footer>

  <!-- LEAD MODAL (mobilní lišta, tlačítka tarifů) -->
  <div class="lead-modal" id="lead-modal" hidden>
    <div class="lead-modal__backdrop" data-close-lead-modal></div>
    <section class="lead-modal__panel" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
      <button class="lead-modal__close" type="button" aria-label="Zavřít okno" data-close-lead-modal>×</button>
      <span class="eyebrow" data-modal-eyebrow>Rychlé ověření</span>
      <h3 id="lead-modal-title" data-modal-title>Ověřit adresu</h3>
      <p data-modal-intro>Pošlete adresu a telefon. Ozveme se do 30 minut s možnostmi pro váš dům.</p>
      <div class="modal-tariff" data-modal-tariff hidden>
        <span class="modal-tariff__label">Vybraný tarif</span>
        <span class="modal-tariff__name" data-modal-tariff-name></span>
        <span class="modal-tariff__price" data-modal-tariff-price></span>
      </div>
      <form name="modal-overeni-${p.slug}" action="/api/leads" method="post" data-lead-form>
        <div class="form-grid">
          <input type="hidden" name="lead_type" value="availability" data-modal-type-input>
          <input type="hidden" name="tarif" value="" data-modal-tariff-input>
          <input type="hidden" name="poznamka" value="${esc(p.formNote)}">
          <div class="field hp-field" aria-hidden="true"><label for="modal-website">Web</label><input id="modal-website" name="website" tabindex="-1" autocomplete="off"></div>
          ${field("modal-address", "adresa", "Ulice a číslo domu", ICON.pin, `autocomplete="street-address" placeholder="${esc(p.addressPlaceholder)}" required`).replace('class="field wide"', 'class="field primary wide"')}
          ${field("modal-phone", "telefon", "Telefon", ICON.tel, 'type="tel" autocomplete="tel" placeholder="+420 ..." required', false)}
          ${field("modal-email", "email", "E-mail <small>· volitelné</small>", ICON.mail, 'type="email" autocomplete="email" placeholder="vas@email.cz"', false)}
          <label class="consent"><input type="checkbox" name="souhlas" required> <span>Souhlasím se zpracováním údajů podle <a href="/ochrana-udaju/">zásad ochrany údajů</a></span></label>
          <button class="btn btn-primary" type="submit" style="grid-column:1/-1">Odeslat nezávazný dotaz →</button>
          <div class="form-reassure">${ICON.shield} Nezávazné · Ozveme se do 30 minut</div>
        </div>
      </form>
    </section>
  </div>

  <script src="/assets/main.js?v=${CACHE}" defer></script>
  <script src="/assets/motion.js?v=${CACHE}" defer></script>
</body>
</html>
`;
}

/* ---------- kontroly dat, aby generátor nevypustil rozbitou stránku ---------- */
function check(p) {
  const errs = [];
  if (chars(p.title) < 30 || chars(p.title) > 60) errs.push(`title ${chars(p.title)} znaků`);
  if (chars(p.description) < 70 || chars(p.description) > 160) errs.push(`description ${chars(p.description)} znaků`);
  if (p.faq.length < 4) errs.push(`jen ${p.faq.length} FAQ`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.updated)) errs.push("updated není YYYY-MM-DD");
  if (!fs.existsSync(path.join(ROOT, "assets", p.heroImg))) errs.push(`chybí assets/${p.heroImg}`);
  if (!fs.existsSync(path.join(ROOT, "assets/og", `${p.ogImage}.jpg`))) errs.push(`chybí assets/og/${p.ogImage}.jpg`);
  for (const n of [...p.neighbours, ...p.footerLinks, ...(p.parent ? [p.parent] : [])]) {
    if (!fs.existsSync(path.join(ROOT, n.slug, "index.html"))) errs.push(`odkaz na neexistující /${n.slug}/`);
  }
  if (errs.length) throw new Error(`${p.slug}: ${errs.join("; ")}`);
}

const data = JSON.parse(fs.readFileSync(path.join(ROOT, "data/lokality.json"), "utf8"));
const only = process.argv[2];
const list = data.pages.filter((p) => !only || p.slug === only);
if (!list.length) { console.error(`Slug "${only}" není v data/lokality.json`); process.exit(1); }
for (const p of list) {
  check(p);
  const out = path.join(ROOT, p.slug, "index.html");
  fs.writeFileSync(out, page(p));
  console.log(`${p.slug}/index.html  (title ${chars(p.title)} zn., description ${chars(p.description)} zn., FAQ ${p.faq.length})`);
}
