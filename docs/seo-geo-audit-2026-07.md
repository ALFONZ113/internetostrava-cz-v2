# SEO + GEO + AIO audit — internetostrava.cz

Datum: 2026-07-31 · Revize: `ca6a50b` · Rozsah: 34 HTML stránek, `robots.txt`, `sitemap.xml`, `llms.txt`, `vercel.json`

---

## 0. Co jsem NEMOHL ověřit (omezení přístupu)

Uvádím na začátku, aby nikde níže nebyly domyšlené údaje.

| Co | Proč | Důsledek pro audit |
|---|---|---|
| Živý HTTP dotaz na `internetostrava.cz` | Egress policy prostředí vrací `403` na CONNECT (`curl` i WebFetch). Není to chyba webu. | Neověřeny: reálné hlavičky, HTTP status, `robots.txt` na produkci, vyrenderovaný DOM, TTFB |
| Živý dotaz na `overdostupnost.cz` | Stejné `403` z proxy | Sesterský web hodnocen **jen ze SERP snippetů**, ne z jeho kódu |
| PageSpeed Insights API | `429 Too Many Requests` (bez API klíče) | **Žádná lab ani field data CWV.** Sekce 1.4 je statická analýza kódu, ne měření |
| `site:internetostrava.cz` | Dostupný web search operátor `site:` nepodporuje a indexuje US výsledky | **Nelze uvést počet indexovaných stránek.** Viz 1.2 pro to, co ověřit lze |
| Google Search Console, GA | Bez přístupu | Žádná data o impresích, pozicích, CTR |
| AI Overviews / Perplexity / ChatGPT odpovědi | Nemám přístup k těmto povrchům | Citovanost v AI neověřena přímo; viz 3.4 pro nepřímý důkaz |

**Ověřeno bylo:** celý kód repozitáře (100 %) a konkurenční prostředí přes web search (5 dotazů).

---

## 0b. Korekce zadání

Tři premisy zadání kód nepotvrzuje. Zbytek auditu pracuje se skutečným stavem.

1. **`CityPage.tsx` + `cityData` pattern neexistuje.** `find . -name "*.tsx"` → 0 výsledků. Web je čistý statický HTML bez build kroku, 34 ručně psaných `index.html`. Nové lokality se dnes zakládají kopií šablony, ne datovým souborem.
2. **Hub NENÍ `/internet-ostrava`.** Ta cesta je 301 redirect na `/` (`vercel.json:11`). Skutečné huby jsou dva: `/lokality/` (neutrální) a `/poda-internet-ostrava/` (PODA zóna).
3. **`overdostupnost.cz` není jen „paralelní" web.** Je to přímý konkurent v SERP, který na cílových dotazech vyhrává — a drží URL vzory, které tento web nemá. Detail v sekci 4.

---

## 1. Executive summary

Technický základ je nadprůměrný a čistý: 34/34 stránek má unikátní title i description, přesně jedno H1, self-referenční canonical; sitemapa sedí na routy; nulové externí requesty (žádné fonty, žádná analytika, žádný third-party JS); FAQPage schema na 30 stránkách; `llms.txt` je přesný a aktuální. Oddělení Ads a PODA zóny **drží — grep na `poda` přes všech 8 souborů Ads zóny vrací 0.**

Nejhorší jsou tři věci. **(1) Kanibalizace sesterským webem:** `overdostupnost.cz` (stejný provozovatel, stejný lead e-mail `terc@obchod.poda.cz`) má `/internet-ostrava-hrabuvka` proti zdejšímu `/internet-hrabuvka/`, ranguje na 1. místě na „PODA internet Ostrava dostupnost" — a `internetostrava.cz` se **neobjevil v žádném z 5 provedených web searchů, ani na exact-match dotaz na vlastní doménu.** Mezi weby není deklarovaný žádný vztah — ani cross-domain canonical, ani rozdělení témat. **(2) E-E-A-T je pohřbené:** IČO 75546230 a jméno Milan Terč jsou na celém webu právě jednou, na `/ochrana-udaju/` s prioritou 0.2 — `/kontakt/` nemá IČO ani právní jméno, `LocalBusiness` schema chybí úplně (0 výskytů). **(3) GEO obsah nemá čím odpovídat:** web nikde neuvádí dobu instalace, „GPON" ani „pracovních dnů" — přesně ta fakta, kterými sesterský web a `poda.cz` obsazují AI odpovědi.

Menší, ale reálné: PODA hub `/poda-internet-ostrava/` odkazuje jen na 2 z 18 lokalit; dvojice `pustkovec`/`trebovice` má 0.61 slovní překryv, což naráží na vlastní pravidlo z `docs/SEO-PLAN.md` „Nevytvářet desítky téměř stejných městských stránek".

---

## 2. Technické SEO

### 2.1 robots.txt — stav: OK, s jednou mezerou

Obsah (`robots.txt`, 3 řádky):

```
User-agent: *
Allow: /

Sitemap: https://internetostrava.cz/sitemap.xml
```

**Stav:** funkční. `Allow: /` pokrývá i AI crawlery (GPTBot, ClaudeBot, PerplexityBot, Google-Extended), takže nic není blokováno.
**Mezera:** žádná explicitní direktiva pro AI crawlery. Implicitní povolení stačí technicky, ale explicitní blok je čitelný signál a chrání před budoucí změnou defaultu.
**Dopad:** nízký. Neblokuje nic.

### 2.2 sitemap.xml — stav: OK

**Důkaz:** 33 `<loc>` záznamů. `npm run check` prochází (`scripts/check-site.mjs:50` ověřuje, že každý `<loc>` má existující routu) — **Site check passed**.

Ověřil jsem i opačný směr, který checker nedělá: všech **18/18** district stránek je v sitemapě. Chybí jen `/dekujeme/` a `404.html` — obojí správně, obě mají `noindex,follow`.

**Slabina:** `lastmod` je statický a ručně udržovaný — Wave 0 lokality nesou `2026-06-18`, Wave 1 `2026-07-24`, ale soubory byly reálně měněny později (cache token `r23`). Nepřesné `lastmod` Google postupně ignoruje.
**Dopad:** nízký.

### 2.3 Canonical, meta robots, indexovanost — stav: OK v kódu, riziko cross-domain

- **Canonical:** 34/34 stránek (mimo `404.html`, správně). Všechny self-referenční, všechny absolutní `https://internetostrava.cz/…`. Vynucuje checker (`scripts/check-site.mjs:33`).
- **meta robots:** pouze `404.html` a `/dekujeme/` mají `noindex,follow`. Ostatní bez direktivy = indexovatelné. Správně.
- **Indexovanost:** **nelze změřit** (viz sekce 0). Nepřímý důkaz níže.

**Riziko duplicity s overdostupnost.cz — nejzávažnější technické zjištění.**

| | internetostrava.cz | overdostupnost.cz |
|---|---|---|
| Hrabůvka | `/internet-hrabuvka/` | `/internet-ostrava-hrabuvka` |
| Poruba | `/internet-ostrava-poruba/` | `/internet-ostrava-poruba` |
| Ostrava hub | `/internet-ostrava` → **301 na `/`** | `/internet-ostrava` (živá stránka) |
| Karviná | `/poda-karvina/` | `/internet-karvina` |
| PODA hub | `/poda-internet-ostrava/` | `/poda` |
| Lead e-mail | `terc@obchod.poda.cz` (43× v repu) | `terc@obchod.poda.cz` (dle SERP) |
| Telefon | 777 425 230 (77× v repu) | 730 431 313 (dle SERP) |

Dva weby stejného provozovatele, stejné město, stejné okresy, stejný poskytovatel, **žádný deklarovaný vztah** — a rozdílné telefonní číslo, tedy nekonzistentní NAP.

**Dopad: vysoký.** Google si mezi dvěma téměř identickými dokumenty vybere jeden; z SERP důkazu (4.1) vybírá `overdostupnost.cz`.

### 2.4 Rychlost / Core Web Vitals — stav: nezměřeno, statická analýza příznivá

**Nezměřeno** — PSI API vrátilo 429. Následující je analýza kódu, ne měření.

Pozitivní:
- **Nulové externí requesty.** Grep na externí URL v HTML+CSS vrací jediný výskyt: `https://schema.org` (JSON-LD namespace, nestahuje se). Žádné Google Fonts, žádná analytika, žádný third-party JS.
- Hero video `preload="none"` s `poster` webp a preload hintem na poster (`index.html:106`, `index.html:19`). Video 1.7 MB mp4 / 2.1 MB webm se tedy **nestahuje při načtení** — správně řešeno.
- Statický hosting, `Cache-Control: immutable, max-age=31536000` na `/assets/*` (`vercel.json`), cache-busting přes `?v=r23`.
- `width`/`height` na hero elementu → rezerva proti CLS.
- `loading="lazy"` na district thumbnailech.

Rizikové:
- **Jediný render-blocking CSS soubor 36.5 KB** (`assets/redesign.css?v=r23`) bez critical-CSS inline. Na 4G to je jeden extra round-trip před prvním vykreslením.
- **Plnotučné lokalitní obrázky 312–410 KB:** `loc-moravska-ostrava.webp` 409 828 B, `loc-poruba.webp` 352 856 B, `loc-vitkovice.webp` 352 124 B, `loc-slezska.webp` 346 778 B, `loc-jih.webp` 323 376 B, `loc-marianske-hory.webp` 312 490 B. Bez `srcset` — mobil stahuje desktopovou variantu.
- `icon-512x512.png` 240 KB je zbytečně velký pro manifest ikonu.

**Dopad:** střední. Základ je zdravý, ale bez měření nelze potvrdit, že LCP je v zeleném.

### 2.5 Mobile-friendliness — stav: OK

`<meta name="viewport" content="width=device-width, initial-scale=1">` na všech 34 stránkách, `theme-color`, `site.webmanifest`, mobilní lišta v `main.js` přebírající telefon z `tel:` odkazu. **Nezměřeno živě**, ale kód nevykazuje anti-pattern.

### 2.6 Structured data — stav: dobrý základ, tři konkrétní díry

Ověřeno extrakcí všech `"@type"` hodnot ze všech 34 stránek.

Přítomno: `Organization` (většina stránek), `WebSite` (homepage), `Service`, `FAQPage`+`Question`+`Answer` (30 stránek), `BreadcrumbList`+`ListItem`, `Place` (18 district), `City`, `CollectionPage`+`ItemList` (`/lokality/`, `/poradna/`), `Article` (5 poradna článků), `Person` (1× `/poda-internet-ostrava/`).

**Díra 1 — `LocalBusiness` chybí úplně.** `grep -rl LocalBusiness` → **0 výskytů.** Web reprezentuje konkrétní fyzickou osobu s IČO, adresou a telefonem v Ostravě, ale deklaruje se jen jako `Organization`. Pro lokální dotazy a pro AI systémy, které entitu ověřují, je to zásadní rozdíl.

**Díra 2 — tři konverzní stránky mají osiřelý entity graph.** `/dostupnost/`, `/tarify/` a `/kontakt/` mají **pouze** `FAQPage`/`Question`/`Answer` — chybí jim `Organization` i `BreadcrumbList`. Nejsou napojeny na `#organization` node.

**Díra 3 — `/lokality/` nemá `Organization` ani `FAQPage`.** Má jen `CollectionPage`+`ItemList`+`BreadcrumbList`. Je to hub linkovaný z navigace obou zón — zaslouží si plný graph.

Kosmetika: `geo.region`, `geo.placename`, `geo.position`, `ICBM` na homepage (`index.html:16-19`) jsou legacy meta tagy, které Google nepoužívá. Neškodí, ale nenahrazují `LocalBusiness`.

**Dopad:** vysoký pro GEO, střední pro klasické SEO.

---

## 3. On-page SEO

### 3.1 Title a meta description — stav: dobrý, 6 drobných překročení

**Unikátnost: 34/34 titles unikátních, 34/34 descriptions unikátních.** Žádná duplicita.

Překročení doporučené délky:

| Stránka | Problém |
|---|---|
| `poradna/jaka-rychlost-internetu-pro-domacnost/` | title 65 zn. |
| `internet-muglinov/` | title 63 zn. |
| `poradna/dostupnost-optickeho-internetu-ostrava/` | title 62 zn. |
| `internet-belsky-les/` | title 61 zn. |
| `poradna/` | desc 171 zn. |
| `lokality/` | desc 168 zn. |

**Keyword targeting:** district tituly jsou konzistentní a dobře cílené — vzor `Internet <Lokalita> | PODA připojení <Obvod> podle adresy`. Homepage cílí `Internet Ostrava – optické připojení až 2 Gb/s`.

**Dopad:** nízký. Kosmetické zkrácení.

### 3.2 Heading struktura — stav: OK

Přesně jedno `<h1>` na každé z 34 stránek — vynuceno checkerem (`scripts/check-site.mjs:36`). H1 jsou unikátní a popisné (`Internet pro Hrabůvku.`, `Internet pro Zábřeh.`). H2/H3 hierarchie odpovídá sekcím; district thumbnaily na homepage používají `<h3>` uvnitř odkazu — validní.

### 3.3 Interní prolinkování — stav: hub→spoke výborný, PODA hub selhává

**Funguje:**
- `/lokality/` → **všech 18** district stránek. Kompletní hub.
- Každá district stránka → 3 sousední lokality + `/poda-internet-ostrava/` + `/lokality/` + rodičovský obvod. Solidní spoke↔spoke mesh (např. `internet-zabreh` → `hrabuvka`, `ostrava-dubina`, `ostrava-jih`).
- Homepage → 6 lokalit přes vizuální dlaždice s neutrálním anchor textem („Průvodce lokalitou →").
- `/internet-ostrava-jih/` → všech 5 svých částí.

**Selhává:**

1. **`/poda-internet-ostrava/` odkazuje jen na 2 z 18 lokalit** — `/internet-ostrava-jih/` a `/internet-ostrava-poruba/`. Přitom je to hlavní PODA hub a všech 18 district stránek má PODA v title. Hub nedistribuuje autoritu na 16 stránek, které ji nejvíc potřebují.
2. **`/poda-dostupnost/` a `/poda-karvina/` neodkazují na žádnou district stránku.**
3. **4 z 5 poradna článků neodkazují na žádnou lokalitu.** Jen `/poradna/dostupnost-optickeho-internetu-ostrava/` odkazuje (na moravska-ostrava, ostrava-jih, ostrava-poruba). Obsah tedy neteče na money pages.
4. `/ochrana-udaju/` neodkazuje na `/lokality/` ani `/poradna/` — nejchudší stránka webu, přitom jediná nesoucí IČO.

**Dopad:** střední až vysoký. Bod 1 je nejlevnější velká výhra celého auditu.

### 3.4 Kvalita a jedinečnost district obsahu — stav: ucházející, ale s doorway rizikem

Měřeno Jaccardovou podobností slovních množin mezi všemi 153 páry z 18 stránek:

- **Medián párového překryvu: 0.35**
- Nejpodobnější páry: `pustkovec`↔`trebovice` **0.61**, `michalkovice`↔`trebovice` 0.56, `michalkovice`↔`muglinov` 0.56, `muglinov`↔`svinov` 0.56, `muglinov`↔`vyskovice` 0.55

Rozsah textu 356–466 slov (mimo nav a patičku): nejtenčí `internet-ostrava-vitkovice` **356**, nejbohatší `internet-hrabuvka` **466**.

Obsah je fakticky unikátní — každá stránka popisuje reálnou zástavbu (secesní činžáky v Přívoze, hornické kolonie v Michálkovicích, Šídlovec v Hrabůvce). To je poctivá práce a lepší než u většiny lead-gen webů.

**Ale:** medián 0.35 s vrcholy nad 0.6 u malých lokalit (Pustkovec, Třebovice, Muglinov — všechny „klidná rodinná zástavba") znamená, že se rozdíly stírají právě tam, kde je obsahu nejmíň. To naráží na **vlastní pravidlo v `docs/SEO-PLAN.md`**: „Nevytvářet desítky téměř stejných městských stránek." Web má dnes 18.

**Dopad:** střední. Zatím pod hranicí, ale Wave 3 stejným tempem hranici překročí.

---

## 4. GEO / AIO

### 4.1 Odpovědní formát a konkrétní fakta — stav: nejslabší část webu

FAQPage schema je na **30 z 34 stránek**, což je nad standardem. Ale hustota je nízká: **district stránky mají jen 2 otázky**, homepage 3, poradna články 3–4. Maximum je 4 (`/poradna/caste-otazky-pred-zmenou-poskytovatele/`).

Horší je, čím web odpovídá. Ověřil jsem výskyt konkrétních, citovatelných faktů:

| Fakt | Výskyt na webu |
|---|---|
| „30 minut" (doba odezvy) | **32 stránek** ✅ |
| Doba instalace („4-5", „4–5") | **0 stránek** ❌ |
| „instalace"/„instalač" | **0 stránek** ❌ |
| „24 hod" (vybavení objednávky) | **0 stránek** ❌ |
| „GPON" | **0 stránek** ❌ |
| „Gb/s" | **3 stránky** ❌ |

Zadání zmiňuje fakta „24h vybavení objednávky, 4–5 dní instalace" — **na tomto webu nejsou nikde.** Objevují se v SERP snippetu sesterského `overdostupnost.cz` („standard installation in Ostrava usually takes 4-5 business days"). Stejně tak „GPON" drží v SERP `overdostupnost.cz` a `poda.cz`.

Web má jediný silný citovatelný fakt („do 30 minut") a jeden správný, ale nekvantifikovaný postoj („dostupnost se ověřuje podle adresy"). AI systém, který skládá odpověď na „jak dlouho trvá instalace internetu v Ostravě", tady nemá co odebrat.

**Poznámka k rovnováze:** absence procent pokrytí je **záměrná a správná** (`publishing-rules.md`) — grep na `% pokrytí` vrací 0, web je čistý. Chybějící fakta o instalaci a technologii ale nejsou nepodložené superlativy; jsou to ověřitelné provozní údaje, které lze doplnit bez porušení pravidel.

**Dopad: vysoký.** Toto je hlavní důvod, proč web nemá čím vstoupit do AI odpovědí.

### 4.2 E-E-A-T signály — stav: špatný

**Kdo web provozuje, se dá zjistit jen z jedné stránky.**

`grep -rn 'IČO'` přes celý web → **jediný výskyt**, `ochrana-udaju/index.html:48`:

> Správce: **Milan Terč**, zahraniční fyzická osoba · Sídlo: Porubská 944/5, 708 00 Ostrava-Poruba · **IČO: 75546230** · E-mail: info@internetostrava.cz · Telefon: +420 777 425 230
> Provozovatel webu je autorizovaný obchodní zástupce poskytovatele připojení, nikoli samotný poskytovatel.

Ta stránka má v sitemapě **prioritu 0.2** — nejnižší na webu — a odkazuje se na ni jen z patiček.

Konkrétně chybí:
- **`/kontakt/` nemá IČO ani právní jméno.** Má telefon, e-mail a text „Ozveme se do 30 minut", ale ne identitu provozovatele.
- **`LocalBusiness` schema: 0 výskytů** (viz 2.6).
- **`Person` schema jen na 1 stránce** z 34 (`/poda-internet-ostrava/`). Poradna články nemají autora — 5 článků s `Article` schema, žádný `author`.
- Disclosure „obchodní zástupce PODA a.s." je v PODA zóně přítomný a korektní ✅ — to je dobře udělané a je to silný signál transparentnosti. Jen ho nedoprovází dohledatelná právní identita.

**Dopad: vysoký.** AI systémy i Google potřebují propojit web s ověřitelnou entitou. Dnes je to schované na GDPR stránce.

### 4.3 llms.txt — stav: výborný

Přesný, aktuální, kompletní: uvádí všech 18 district stránek, 5 poradna článků, vysvětluje split-brand („The homepage and conversion pages are provider-neutral; the dedicated PODA pages … are operated by a sales representative of PODA a.s., not by PODA a.s. itself"), a dokonce dokumentuje redirect aliasy. Explicitně uvádí „No coverage percentages are used."

Je to nejlépe udržovaný GEO artefakt na webu. **Ponechat beze změny.**

### 4.4 Viditelnost v AI a SERP — stav: nepřímý důkaz je špatný

Přímé ověření AI Overviews/Perplexity nemám (sekce 0). Nepřímý důkaz z 5 web searchů:

| Dotaz | Objevil se internetostrava.cz? | Kdo vyhrál |
|---|---|---|
| `internetostrava.cz PODA internet Ostrava dostupnost` | **Ne** | **overdostupnost.cz (#1)**, poda.cz, popri.cz |
| `overdostupnost.cz` | **Ne** | overdostupnost.cz (8 URL) |
| `internet Ostrava Hrabůvka optika dostupnost` | **Ne** | rychlost.cz, **overdostupnost.cz/internet-ostrava-hrabuvka**, poda.cz, wia.cz, nasi.cz |
| `optika Zábřeh Ostrava internet poskytovatel` | **Ne** | rychlost.cz, poda.cz, **overdostupnost.cz**, wia.cz, eri-internet.cz |
| `"internetostrava.cz" internet Ostrava` (exact match) | **Ne** | nejpripojeni.cz, porovnejsito.cz, nej.cz, rychlost.cz, tlapnet.cz, o2.cz |

**0 z 5**, včetně dotazu s doménou v uvozovkách. `overdostupnost.cz` se objevil ve **4 z 5**.

**Nutná výhrada:** tento index je US-orientovaný a nereprezentuje `google.cz`. **Nelze z toho tvrdit, že web není indexován.** Lze z toho tvrdit, že na stejném indexu, kde je sesterský web opakovaně a silně přítomný, tento web přítomný není — a to je při shodném provozovateli a shodném tématu relevantní srovnání. Definitivní odpověď dá **jen Search Console**, ke které nemám přístup.

---

## 5. Konkurenční kontext

### 5.1 overeni-dostupnosti.cz a overit-dostupnost.online — nenalezeny

Cílený dotaz na obě domény nevrátil ani jednu z nich. Vrátil generické srovnávače (dsl.cz, kalkulator.cz, pripojto.cz, cetin.cz, porovnejsito.cz).

**Nemohu potvrdit, že tyto weby existují nebo že jsou relevantní konkurent.** Neuvádím o nich žádné SEO/GEO signály. Pokud je majitel viděl v SERP na `google.cz`, je třeba je doložit URL.

### 5.2 Skutečné konkurenční pole (ověřeno)

**Affiliate weby na PODA (stejný nebo příbuzný provozovatel):**
- **`overdostupnost.cz`** — hlavní. `/`, `/internet-ostrava`, `/internet-ostrava-poruba`, `/internet-ostrava-hrabuvka`, `/internet-karvina`, `/internet-havirov`, `/internet-orlova`, `/internet-policka`, `/poda`, `/mobil`, `/blog/…`. Širší geografie než jen Ostrava.
- **`popri.cz`** — `/internet-ostrava`, „Nejvýhodnější PODA Internet Ostrava | Gigabit + TV zdarma". V `docs/SEO-PLAN.md` už vedený jako konkurent s „rozsáhlou sitemapou".

**Agregátory a srovnávače (drží informační dotazy):** `rychlost.cz` (nejsilnější — objevil se ve 3 z 5 dotazů), `nasi.cz`, `porovnejsito.cz`, `nejpripojeni.cz`, `adsl.cz`, `dsl.cz`, `kalkulator.cz`.

**Poskytovatelé:** `poda.cz` sám (má `/dostupnost/ostrava-554821/cast/<lokalita>/` pro každou část — přímý konkurent district stránkám), `o2.cz`, `wia.cz`, `eri-internet.cz`, `tlapnet.cz`, `nordictelecom.cz`, `nej.cz`.

**Vodafone / T-Mobile se v žádném z ostravských dotazů neobjevily** — na rozdíl od premisy zadání. Lokální hráči (rychlost.cz, wia, eri, tlapnet) jsou reálná konkurence.

### 5.3 Čím overdostupnost.cz vyhrává

Ze SERP snippetů: „97 % pokrytí všech 8 obvodů", „PODA covers 98% of Ostrava", „95%", stránka „PODA internet recenze 2026 — zkušenosti partnera", konkrétní ceny (300 Kč), konkrétní doba instalace (4–5 pracovních dnů), callback do 30 minut, `/blog/`.

**To je nepříjemné zjištění:** sesterský web outranking-uje tento web mimo jiné tím, co `publishing-rules.md` tomuto webu **zakazuje** — procenta pokrytí a recenze.

**Nedoporučuji ta pravidla rušit.** Jsou obranou proti nepodloženým tvrzením a jsou správná. Ale rozdíl je nutné dohnat tím, co zakázané není: konkrétní provozní fakta (instalace, technologie, proces), hlubší FAQ, silnější entity signály. Sekce 6 je podle toho sestavená.

---

## 6. Prioritizovaný action list

### Quick wins — do 1 týdne

| # | Akce | Odůvodnění | Soubory |
|---|---|---|---|
| 1 | **Rozhodnout vztah k `overdostupnost.cz`** a zapsat ho. Buď rozdělit témata/geografii (např. `internetostrava.cz` = Ostrava + obvody, `overdostupnost.cz` = ostatní města), nebo nastavit cross-domain canonical u překryvných dvojic. | Nejzávažnější zjištění. Bez rozhodnutí je vše ostatní práce proti vlastnímu webu. | rozhodnutí majitele + `docs/SEO-PLAN.md` |
| 2 | **Doplnit IČO, právní jméno a sídlo na `/kontakt/`** | Dnes je identita jen na stránce s prioritou 0.2. Nejlevnější E-E-A-T oprava. | `kontakt/index.html` |
| 3 | **Přidat `LocalBusiness` schema** (name, IČO jako `identifier`, address, telephone, areaServed, `openingHours`) na `/kontakt/` a homepage | 0 výskytů na webu. Klíčové pro lokální a AI entity resolution. | `kontakt/index.html`, `index.html` |
| 4 | **Prolinkovat `/poda-internet-ostrava/` na všech 18 lokalit** (dnes 2) | Hub nedistribuuje autoritu. Nejvyšší poměr efekt/práce v celém auditu. | `poda-internet-ostrava/index.html` |
| 5 | **Doplnit `Organization` + `BreadcrumbList` na `/dostupnost/`, `/tarify/`, `/kontakt/`, `/lokality/`** | Osiřelý entity graph na 3 konverzních stránkách a hlavním hubu. | 4 soubory |
| 6 | **Zkrátit 4 titles a 2 descriptions** přes limit (seznam v 3.1) | Truncation v SERP. | 6 souborů |
| 7 | **Sjednotit NAP se sesterským webem** — jedno telefonní číslo, nebo explicitně oddělené entity | Dnes 777 425 230 vs 730 431 313 při shodném e-mailu. | dohoda + `kontakt/index.html` |

### Střední investice — do 1 měsíce

| # | Akce | Odůvodnění |
|---|---|---|
| 8 | **Doplnit citovatelná provozní fakta** na hub a district stránky: doba vyřízení objednávky, doba instalace v pracovních dnech, použitá technologie (GPON/FTTH), co si připravit. Bez procent pokrytí. | 0 výskytů „instalace", „GPON", „4-5". Hlavní GEO mezera. Fakta musí potvrdit majitel před publikací. |
| 9 | **Rozšířit FAQ z 2 na 4–6 otázek** na district stránkách, s lokálně specifickými odpověďmi | Dnes 2 Q&A/stránku. Přímý vstup do AI odpovědí a rozšíření tenkého obsahu zároveň. |
| 10 | **Přidat `author` (`Person`) do `Article` schema** všech 5 poradna článků + viditelný podpis autora | 5 článků bez autora. E-E-A-T u informačního obsahu. |
| 11 | **Posílit tok poradna → lokality:** kontextové odkazy ze 4 zbývajících článků na relevantní district stránky | Dnes odkazuje 1 z 5. Obsah neteče na money pages. |
| 12 | **Doplnit `srcset` a zmenšit `loc-*.webp`** (312–410 KB) + `icon-512x512.png` (240 KB) | Mobil stahuje desktopové varianty. |
| 13 | **Rozšířit nejtenčí a nejpodobnější stránky:** `vitkovice` (356 slov), `pustkovec`/`trebovice` (překryv 0.61), `muglinov` | Zabránit tomu, aby se hranice doorway pages překročila. |
| 14 | **Explicitní AI crawler direktivy v `robots.txt`** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot) | Dnes implicitně povoleno. Explicitní signál + ochrana před změnou defaultu. |

### Větší refactor

| # | Akce | Odůvodnění |
|---|---|---|
| 15 | **Změřit skutečné CWV** přes PSI s API klíčem nebo lokální Lighthouse; podle výsledku zvážit inline critical CSS pro 36.5 KB `redesign.css` | V tomto auditu **nezměřeno**. Optimalizovat naslepo nemá smysl — nejdřív změřit. |
| 16 | **Ověřit indexovanost v Search Console** — `site:` operátor nebyl dostupný. Zkontrolovat Coverage report, duplicity a případné „Duplicate, Google chose different canonical" vůči `overdostupnost.cz` | Jediný způsob, jak potvrdit nebo vyvrátit hypotézu z 4.4. **Udělat dřív než #17.** |
| 17 | **Zavést datový generátor district stránek** (JSON/JS data + generátor, jak předpokládá `CLAUDE.md`) místo ručního kopírování šablony | Při 18 stránkách a plánované Wave 3 je ruční údržba kostry (nav, patička, formulář, cache token, schema) hlavní zdroj driftu. Umožní hromadné doplnění schema a FAQ z bodů 3, 9, 10. |
| 18 | **Aktualizovat `docs/SEO-PLAN.md`** — dnes popisuje stav ze `2026-06-02` („tři unikátní lokální landing pages", `overdostupnost.cz` vedený jako cizí konkurent). Reálně je 18 lokalit, 5 článků a `overdostupnost.cz` je sesterský web. | Toto je ten „zastaralý self-description" ze zadání. Nejde o text na webu — `llms.txt` a patičky jsou přesné a aktuální — ale o interní strategický dokument, který dnes vede k chybným rozhodnutím. |
| 19 | **Rozšířit `lastmod` v sitemapě na automatické generování** z git historie | Ruční `lastmod` už neodpovídá realitě. |

---

## 7. Co ověřit hned, jak bude přístup

1. **Search Console:** počet indexovaných stránek, „Duplicate, Google chose different canonical" vůči `overdostupnost.cz`, imprese district stránek po 28 dnech (jak požaduje `SEO-PLAN.md`).
2. **PSI s API klíčem:** mobilní LCP/CLS/INP pro `/`, `/lokality/`, jednu district stránku.
3. **`google.cz` ručně:** `site:internetostrava.cz`, `internet Ostrava Hrabůvka`, `PODA dostupnost` — a zda se zobrazí AI Overview a koho cituje.
4. **Živý `curl -I`** na produkci: HTTP status, hlavičky, `robots.txt`, funkčnost 16 redirectů z `vercel.json`.
5. **Doložit `overeni-dostupnosti.cz` / `overit-dostupnost.online`** URL, pokud jsou reálné.
