# SEO a GEO plán pro InternetOstrava.cz

## Cíl

Získávat relevantní návštěvy z lokálních dotazů na internet v Ostravě a převádět je na nezávazná ověření adresy.

První pozici v Google nelze garantovat. Cílem je vytvořit lepší uživatelský výsledek než jednostránkový konkurent a rozhodovat další kroky podle Search Console dat.

## Výchozí porovnání

Kontrolováno 2026-06-02:

- `internet-ostrava.cz` má přesnou doménu, jednoduchý jednostránkový web, robots.txt a sitemapu pouze s homepage.
- `overdostupnost.cz` má širší sitemapu s lokalitami a obsahovými články.
- `popri.cz` má rozsáhlou sitemapu s tarify, lokalitami a blogem.
- Nový web má být úzce zaměřený na ostravský záměr hledání a nemá kopírovat existující weby.

## Implementováno v první verzi

- unikátní title a meta description pro každou indexovatelnou stránku,
- canonical URL,
- responzivní rychlý statický web,
- interní odkazy,
- `robots.txt` a `sitemap.xml`,
- Organization, WebSite, Service a FAQ structured data na homepage,
- jasné vysvětlení závislosti nabídky na přesné adrese,
- tři unikátní lokální landing pages,
- `llms.txt` jako doplňkový orientační soubor pro AI systémy,
- statický lead formulář, který lokálně připraví e-mail návštěvníka bez předávání osobních údajů cizím službám.

## Obsahový backlog

Publikovat postupně podle Search Console dotazů:

1. Jak zjistit dostupnost optického internetu na konkrétní adrese v Ostravě
2. Optika vs. bezdrátové připojení v ostravském bytě
3. Jak vybrat internet pro home office v Ostravě
4. Jakou rychlost internetu potřebuje domácnost s více zařízeními
5. Internet Ostrava: nejčastější otázky před změnou připojení

## Pravidla

- Nevytvářet desítky téměř stejných městských stránek.
- Nekopírovat konkurenta.
- Nevkládat neověřené superlativy, procenta pokrytí ani falešné recenze.
- Aktualizovat nabídku pouze po potvrzení.
- Vyhodnocovat Search Console po 28 dnech a prioritizovat stránky podle reálných impresí.

## Zdroje

- [Google Search Central: Spam policies a doorway abuse](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google Search Central: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Vercel: Import an existing project](https://vercel.com/docs/getting-started-with-vercel/import)
- [Vercel: Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain)

## Implementovano 2026-06-03

- Pridana hlavni SEO stranka `/poda-internet-ostrava/` pro dotazy typu `PODA internet Ostrava`, `PODA Ostrava` a overeni dostupnosti podle adresy.
- Rozsirena stranka `/internet-ostrava-poruba/` pro dotazy `PODA Poruba` a `internet Ostrava-Poruba`.
- Pridany lokalni stranky `/internet-moravska-ostrava/`, `/internet-ostrava-vitkovice/` a `/internet-slezska-ostrava/`.
- Homepage nove odkazuje na hlavni PODA stranku a sirsi sadu lokalnich stranek.
- Aktualizovany `sitemap.xml` a `llms.txt`.

Dalsi krok: po napojeni finalni domeny overit web v Google Search Console, odeslat sitemapu a po 28 dnech rozhodovat dalsi obsah podle realnych impresi.

## Implementovano 2026-06-10 - Split-brand: Ads zona a PODA SEO zona

Duvod: PODA a.s. zakazala obchodnimu zastupci pouzivat znacku PODA v Google Ads reklamach. Na klicova slova typu `poda internet` lze inzerovat, ale text reklamy nesmi znacku obsahovat. Organicky chceme na PODA dotazy dale cilit. Web je proto rozdelen na dve zony (pravidla take v CLAUDE.md).

### Ads zona (nula vyskytu retezce "poda" v HTML, vcetne e-mailu terc@obchod.poda.cz)

- `/` (homepage) - neutralni "Internet Ostrava - opticke pripojeni az 2 Gb/s", bez PODA v title, meta, OG, schema, textu i patici; tarify prejmenovany neutralne (Giga 1000 + TV za 300 Kc, Giga 1000 + TV 10 programu za 440 Kc, Giga 2000 za 570 Kc - ceny beze zmeny),
- `/tarify/` - stejne neutralni nazvy tarifu, hlavni landing page pro kampane,
- `/dostupnost/` - landing page pro overeni dostupnosti,
- `/kontakt/`, `/dekujeme/` (noindex), `/ochrana-udaju/`, `404.html`.

Pravidla pro Ads zonu:

- zadny vyskyt "PODA" ani "poda" (vcetne mailto terc@obchod.poda.cz) ve viditelnem obsahu, title, meta, schema, navigaci a patici,
- patice: "Nezavisly poradensky web pro pripojeni v Ostrave a okoli.",
- z Ads zony se viditelne neodkazuje na `/poda-*` stranky (jednosmerne odkazovani: PODA stranky odkazuji do Ads zony, ne naopak),
- kampane lze smerovat na homepage, `/tarify/` i `/dostupnost/`; nikdy na `/poda-*` a lokalni stranky,
- v reklamach nepouzivat slovo PODA v textu, nadpisech ani v zobrazene URL ceste.

### PODA SEO zona (organicke dotazy se znackou)

- `/poda-internet-ostrava/` - hub: `PODA internet Ostrava`, `PODA Ostrava`, `PODA internet`; H1 "PODA internet Ostrava.", viditelny disclosure o autorizovanem obchodnim zastupci hned pod H1, tarify s puvodnimi PODA nazvy (1 Giga + TV Basic, 1 Giga + TV Mych 10, 2 Giga),
- `/poda-dostupnost/` - `poda dostupnost`, `poda pokryti`, `poda overeni dostupnosti`,
- `/poda-karvina/` - `poda karvina`, `poda internet karvina`,
- lokalni stranky `internet-*` zustavaji v SEO zone; navigace obsahuje polozku "PODA internet" -> hub a kazdy side-card odkazuje na hub.

Interni odkazy na hub vedou z 6 lokalnich stranek, 2 PODA satelitu a sitemapy. Homepage na PODA stranky zamerne neodkazuje (rozhodnuti majitele - striktni oddeleni).

Aliasy v `vercel.json`: `/poda`, `/poda-internet`, `/poda-ostrava`, `/poda-pokryti`, `/poda-overeni-dostupnosti`, `/poda-internet-karvina`, `/internet-karvina`, `/poda-poruba`.

Pozn.: leady nadale chodi na terc@obchod.poda.cz (api/leads.js, env LEAD_TO_EMAIL; fallback mailto v assets/main.js) - jde o funkcni kontakt mimo viditelny obsah. Pripadnou vymenu za neutralni adresu (napr. info@internetostrava.cz) rozhodne majitel.

## Implementovano 2026-09-11 - Kanibalizace hlavniho dotazu

Po pridani dimenze page+query do sberu dat (viz nize) slo poprve rict, ktera stranka
na jaky dotaz rankuje. Ukazalo to necekany nalez.

### Nalez

Na dva nejsilnejsi obecne dotazy webu rankovaly tri stranky zaroven:

| Dotaz | Homepage | /kontakt/ | /tarify/ |
|---|---:|---:|---:|
| internet ostrava | 37,3 | **26,4** | 60,9 |
| internet v ostrave | 30,4 | **19,4** | 60,8 |

Kontaktni stranka predbihala homepage o zhruba deset pozic. Duvod byl primo v jejim
kodu: mela H2 "Obchodni zastupce pro internet v Ostrave", tedy presnou shodu s dotazem,
a metapopis "pro overeni dostupnosti internetu v Ostrave". Vysledek: 83 zobrazeni,
nula kliku - clovek hleda "internet Ostrava", dostane stranku s telefonnim cislem.

### Co se NEudelalo a proc

Puvodni uvaha byla prohloubit homepage. Kontrola ukazala, ze homepage na ten dotaz
slaba neni - ma H2 "Internet v Ostrave zacina overenim presne adresy" (presna shoda)
a 35 zminek Ostravy v textu. Pridavat dalsi obsah by bylo keyword stuffing bez efektu.
Problem nebyl ve slabe homepage, ale v tom, ze ji prehlusovala vlastni kontaktni stranka.

### Implementovano

- `/kontakt/` zuzena na kontaktni temata: title "Kontakt - zastupce pro Ostravu |
  Telefon 777 425 230" (52 znaku, drive 26 a hlaseno jako prilis kratke), metapopis
  a og bez frazi o overovani dostupnosti, H2 "Obchodni zastupce pro internet v Ostrave"
  -> "Na koho se dostanete". Retezec "internet v Ostrave" uz na strance neni.
- `/poradna/internet-vypadava-co-delat/` doplnen title o wifi: rankuje na "proc vypadava
  wifi" (poz. 11) a "vypadek wifi" (poz. 30), ale slovo wifi v title nemela.
- `scripts/seo-report.mjs` deli stranky s nulovym CTR na dve sekce podle pozice.
  Drive hlasil vse jako "problem snippetu" bez ohledu na pozici, coz vedlo k zavery,
  ze u Poruby (poz. 22,5) a Slezske (poz. 24,8) staci prepsat snippet. Na treti strane
  vysledku ale stranku prakticky nikdo nevidi - tam je problem pozice, ne snippetu.

### Vedome neudelano

`/internet-marianske-hory/` (poz. 8,6) a `/poradna/vysoky-ping-pri-hrani/` (poz. 5,1)
maji nulove prokliky a dobrou pozici, ale GSC pro ne nevraci zadne dotazy - objem je
pod prahem anonymizace. Bez dat by prepis snippetu byl hadani, proto se odklada.

## Implementovano 2026-09-01 - SEO automatizace (mereni + prace)

Duvod: dosavadni cyklus byl cely rucni. GSC se vyhodnotilo jednou (export 2026-08-18), zonova
pojistka "0 vyskytu poda v Ads zone" se kontrolovala rucnim grepem a dalsi vyhodnoceni bylo
naplanovane jen jako veta v tomto dokumentu. Nahrazeno dvema vrstvami, popis v `docs/SEO-AUTOMATION.md`.

### Vrstva A - mereni (GitHub Actions, tydne v pondeli)

`.github/workflows/seo-monitor.yml` spousti:

- `scripts/seo-audit.mjs` - offline audit bez credentials: zonova pojistka, delky title a
  description v ZNACICH, duplicity, tenky obsah, validita JSON-LD, soulad FAQPage s viditelnym
  obsahem, graf internich odkazu a sirotci, parita sitemap/llms.txt, konzistence cache tokenu,
  canonical, noindex a chranene obchodni hodnoty z `data/seo/facts.json`.
- `scripts/gsc-report.mjs` - Search Console API bez npm zavislosti (RS256 JWT pres `node:crypto`).
  Dve 28denni obdobi, dimenze query/page/device zvlast (grupovani po query a page zaroven je
  podle kvot Google nejdrazsi) a URL Inspection pro vsech 39 URL ze sitemapy.
- `scripts/live-check.mjs` - HTTP kontrola produkce (stavove kody, canonical, odezva).
- `scripts/seo-report.mjs` - slozi cesky report do `reports/seo/YYYY-MM-DD.md` vcetne
  prioritizovaneho seznamu ukolu.

Data a reporty se commituji do repozitare, ale `.vercelignore` je vylucuje z deploye - dotazy
ze Search Console nemaji byt verejne na webu.

### Vrstva B - prace (Claude Routine, 1. a 15. v mesici)

Naplanovana session precte nejnovejsi report, provede nejvyse tri upravy a pushne na main -
ale jen kdyz `npm run check` i `npm run seo:audit` projdou bez chyby. Jinak otevre pull request.
Ceny, telefon, e-maily a pravni texty agent nemeni nikdy.

Rozdeleni na dve vrstvy ma technicky duvod: prostredi Claude Code nema odchozi pristup na
internet, GitHub Actions runner ano.

### Nalezy prvniho behu auditu

1. **Nekonzistentni cache token** (severity error): `?v=r17` na 6 mistech (hero video a poster
   v `index.html` a `poda-internet-ostrava/index.html`) proti `?v=r23` na 82 mistech.
2. **FAQPage schema neodpovida viditelnemu obsahu na 18 strankach.** U 12 lokalit vlny 1 jsou
   ve schematu dve otazky, ktere na strance vubec nejsou (napr. `/internet-zabreh/` ma ve
   schematu "Jak overim internet v Zabrehu?" a "Je Zabreh jedna technicka zona?", zatimco
   viditelne jsou tri uplne jine). Na homepage ma schema 3 otazky proti 4 viditelnym a treti
   se lisi ve formulaci. Google vyzaduje, aby obsah FAQ schematu byl na strance videt - tohle je
   kandidat na vysvetleni, proc vlna 1 za 3,5 tydne vyrobila jen ~5 zobrazeni.
3. 11 stranek pod 400 slov, z toho `/internet-ostrava-vitkovice/` (349) je cilova stranka dotazu.
4. `/ochrana-udaju/` chybi v `llms.txt`.

Zadny z nalezu nebyl v tomto kroku opraven - zmena zamerne pridava jen nastroje, aby prvni beh
automatu ukazal, ze audit chyta realne veci.

## Implementovano 2026-08-18 (2) - Vyzkum konkurence + 6 novych clanku

### Vyzkum konkurence

Konkurencni pole se deli na dve nespojite casti:

- **Znackove dotazy `poda *`** (tam rankujeme, poz. 5,5-20): poda.cz (oficialni), overdostupnost.cz a popri.cz (majitelove vlastni weby), **overit-dostupnost.online - novy nalez, jde o jineho obchodniho zastupce PODA (Jakub Rydl, ICO 76235084, tel. 607 086 800, rydl@poda.cz)**, internet-ostrava.online/poskytovatele/poda (koleguv portal, ~1200 slov, 6 tarifu PODA, lead formular) a firmy.cz. Sedm webu na cluster s ~130 zobrazenimi mesicne.
- **Obecne dotazy `internet Ostrava`** (poz. 28-41): srovnavace rychlost.cz, porovnejsito.cz, kalkulator.cz, dsl.cz, pripojto.cz + narodni ISP (Vodafone, O2, Nordic Telecom, nej.cz, ERI) + 23 lokalnich ISP. **Zaver: prvni pozice na `internet Ostrava` neni v dohlednu dosazitelna, energii smerovat na dlouhy chvost.**

Koleguv portal internet-ostrava.online ma ~97 URL ve trech vrstvach: 23 lokalit po 3500-4000 slovech, 23 profilu poskytovatelu a 23 clanku poradny v 5 kategoriich. Pouziva data CTU jako signal duveryhodnosti. Slabiny beze zmeny: zadny telefon, zadna konkretni osoba, zadne realne ceny, procenta pokryti bez doloziteľneho zdroje.

**Profily cizich poskytovatelu nekopirovat** - rozhodnuti z 2026-07-13 ("falesna nezavislost") plati dal a vyzkum ho potvrdil.

### NAP nekonzistence napric majitelovymi weby (nalez k reseni mimo repo)

| Web | Telefon | ICO | Popis |
|---|---|---|---|
| internetostrava.cz | 777 425 230 | 75546230 | Milan Terc |
| overdostupnost.cz | 730 431 313 | - | "nezavisly obchodni zastupce PODA a.s." |
| popri.cz | 730 431 313 | **75456230** | "Popri.cz - Autorizovany partner PODA" |

Tri problemy: dve ruzna telefonni cisla pro jednu osobu; ICO na popri.cz ma prehozene cislice oproti ARES (75546230); spojeni "nezavisly" + "obchodni zastupce PODA" si protireci a je v rozporu s [[commission-disclosure]]. Lokalni hodnoceni a overeni Google Business Profile stoji na konzistentnim NAP - tohle je nutne spravit **pred** zalozenim GBP. Kanibalizace mezi weby se tim neresi, to je vedome rozhodnuti majitele.

### Technika - overeno merenim na produkci

TTFB 31 ms, nacteni dokonceno 1197 ms, 271 KB prenesenych dat, 10 pozadavku. Rychlost ani technicke SEO web nebrzdi; do teto oblasti dalsi praci neinvestovat.

### Implementovano - 6 novych clanku

Nova kategorie poradny "Kdyz neco nefunguje" - u konkurenta 5 clanku, u nas dosud nula. Podklad z GSC: dlouhe otazkove dotazy nam funguji (napr. "ktera internetova sit funguje nejstabilneji pri bource nebo vichrici?" poz. 8,5).

Ads zona (0 vyskytu retezce "poda", overeno):

- `/poradna/internet-vypadava-co-delat/` (763 slov)
- `/poradna/pomaly-internet-vecer/` (754 slov)
- `/poradna/vysoky-ping-pri-hrani/` (721 slov)
- `/poradna/slaba-wifi-v-panelaku/` (717 slov)
- `/poradna/problem-u-poskytovatele-nebo-doma/` (711 slov)

PODA SEO zona:

- `/poda-kdy-nedava-smysl/` (819 slov) - poctivy vycet peti situaci, kdy se pripojeni nevyplati, vcetne otevreneho priznani provize. Diferenciace vuci anonymni konkurenci; zadny konkurencni web takovy obsah nema. Umisteno do PODA zony, protoze obsahuje znacku - do `/poradna/` patrit nemuze.

Kazdy clanek: answer-box, `.compare-table` nebo `.checklist`, 4-5 FAQ, Article + FAQPage + BreadcrumbList schema (FAQ schema sladena 1:1 s viditelnym obsahem), aside lead formular s vlastni poznamkou, kontextove interni odkazy.

Dale: hub `/poradna/` rozsiren na 10 karet ve dvou sekcich (ItemList schema 5 -> 10, upraveny lead i description), `/poda-internet-ostrava/` doplnen o odkaz na novy clanek v textu i v aside, `sitemap.xml` +6 URL (celkem 39), `llms.txt` +6 zaznamu.

Overeno: `npm run check` prochazi, 0 vyskytu "poda" v Ads zone vcetne vsech 10 clanku poradny, 45 JSON-LD bloku validnich, bez preteceni na desktopu i mobilu.

### Dalsi kroky

1. Sjednotit telefon a opravit ICO na popri.cz, odstranit "nezavisly" u zastupce (mimo tento repozitar).
2. Google Business Profile + realne recenze od zakazniku + zapis na Firmy.cz.
3. Prohloubit `/internet-ostrava-poruba/` - ~90 zobrazeni porubskeho zameru, 0 kliku.
4. Vytahnout osobu zastupce vys na lokalni stranky (fotka, jmeno, ICO) - koleguv portal je anonymni, to je nase vyhoda.
5. Znovu vyhodnotit GSC cca 2026-09-15.

## Vyhodnoceni Search Console 2026-08-18 + prvni optimalizace podle dat

Prvni vyhodnoceni realnych dat (export GSC z 2026-08-18, typ Web, obdobi 2026-07-07 az 2026-08-16, tj. 41 dni).

### Namerena data

- Celkem 30 kliku, ~880 zobrazeni, CTR ~3,3 %, prumerna pozice 20,7. Cesko: 28 kliku / 812 zobrazeni.
- Mobil 26 kliku / 466 zobrazeni (CTR 5,58 %, poz. 21,3), desktop 4 kliky / 410 zobrazeni (CTR 0,98 %, poz. 19,1). Desktop rankuje lepe a konvertuje 5,7x hure.
- 12 z 33 URL v sitemape neziskalo ani jedno zobrazeni: `/lokality/`, 8 lokalnich stranek vlny 1 (hrabuvka, zabreh, vyskovice, hulvaky, svinov, trebovice, muglinov, michalkovice), 2 clanky poradny (home-office, caste-otazky) a `/ochrana-udaju/`.

### Hlavni zjisteni

1. **Rankujeme na znacce, ne na objemu.** Znackove dotazy: `poda mapa pokryti` poz. 5,5; `poda internet ostrava` 7,5; `poda dostupnost` 10,3; `poda karvina` 12,7; `poda internet` 18,9; `poda ostrava` 20,1. Obecne lokalni dotazy: `internet ostrava` poz. 40,6; `internet v ostrave` 28,3; `internet poruba` 26,9; `internet ostrava poruba` 32,1; `nejlevnejsi internet ostrava` 38,3. PODA SEO zona funguje, neutralni Ads zona organicky ne (`/tarify/` poz. 43,1).
2. **Cluster "podle adresy" byl nevyuzity.** ~50 zobrazeni napric variantami (`internet podle adresy` 15, `dostupnost internetu podle adresy` 15, `poskytovatele internetu podle adresy` 8, `overeni dostupnosti internetu` 8 a dalsi) na pozicich 30-63 - pritom jde o claim, na kterem stoji cely web. `/dostupnost/` mela pritom jen 226 slov.
3. **Vlna 1 lokalit je neviditelna.** 12 stranek publikovanych 2026-07-24 vyrobilo za 3,5 tydne ~5 zobrazeni.
4. **Problem s CTR je oddeleny od problemu s pozici.** `/poradna/dostupnost-optickeho-internetu-ostrava/` na poz. 7,2 ma 26 zobrazeni a 0 kliku.
5. Kliky se koncentruji do 9.-12. 7. (19 z 30) s CTR 13-26 % na pozici 21-28, coz je organicky nedosazitelne - pravdepodobne vlastni nebo preposlane kliky. Drivejsi baseline "24 kliku" je tim nafouknuty; realne organicke CTR je spis 1-3 %.

### Implementovano 2026-08-18

- **Meta delky:** zkraceny 4 titulky nad 60 znaku (`/internet-belsky-les/`, `/internet-muglinov/`, 2 clanky poradny) a 2 description nad 160 znaku (`/lokality/`, `/poradna/`). Pozn. k mereni: pocitat ZNAKY, ne bajty - `${#var}` v bashi vraci bajty a ceska diakritika ma v UTF-8 2 bajty, coz vysledek nafoukne zhruba 1,3x a vyrobi falesne poplachy.
- **Prohloubena `/dostupnost/`** z 226 na 1023 slov, cilena na cluster "podle adresy" (Ads zona, overeno 0 vyskytu retezce "poda"). Nove sekce: answer-box, "Proc se dostupnost overuje podle adresy, ne podle ctvrti", "Co na konkretni adrese rozhoduje" (checklist: typ domu, pripojka, rozvod, souhlas SVJ, technologie v ulici), "Proc obecne mapy pokryti nestaci", "Co si pripravit pred overenim", "Jake tarify se na adrese overuji" (3 neutralni tarify s cenami + odkaz na `/tarify/`), "Dostupnost podle mestske casti Ostravy". FAQ rozsirena z 2 na 8 otazek, schema doplneno o Service + BreadcrumbList a FAQPage rozsirena na 8. Zadna procenta pokryti, zadne superlativy, vsude veta o overeni podle presne adresy.
- **Interni prolinkovani:** `/dostupnost/` nove odkazuje kontextove (v textu, ne jen v navigaci) na `/lokality/`, `/tarify/`, `/kontakt/` a 4 clanky poradny. Merene prichozi odkazy: `/poradna/dostupnost-optickeho-internetu-ostrava/` a `/poradna/caste-otazky-pred-zmenou-poskytovatele/` 1 -> 2, `/poradna/optika-vs-bezdratovy-internet/` a `/poradna/jaka-rychlost-internetu-pro-domacnost/` 3 -> 4. Pozn.: `/lokality/` orphan nebyl (33 prichozich odkazu, ale vsechny z navigace) - jeho nulova zobrazeni maji jinou pricinu; kontextovy odkaz mu prida relevanci, ne novou odkazujici stranku. Footer sloupec "Informace" doplnen o Lokality.
- **Snippety 5 stranek s dobrou pozici a nulovym CTR:** `/poradna/dostupnost-optickeho-internetu-ostrava/` (poz. 7,2), `/internet-marianske-hory/` (10,3 - title prepsan z "... | Overeni" na znackovy vzor), `/poda-karvina/` (11,3), `/internet-ostrava-poruba/` (22,7 a 83 zobrazeni, nejvice na webu - title prepsan na "PODA internet Ostrava-Poruba | Dostupnost podle adresy"), `/internet-slezska-ostrava/` (25,7). Vsude doplnena konkretni pobidka konzistentni se zbytkem webu (nezavazne / do 30 minut).
- **Prohlouben hub `/poda-internet-ostrava/`** z 630 na 1374 slov - stranka s 170 zobrazenimi a 13 kliky, tj. 43 % veskereho provozu webu (poz. 16,7). Nove sekce: answer-box, "Co PODA v Ostrave nabizi" (checklist), "PODA pokryti v Ostrave: proc mapa nestaci" (cili na `poda pokryti` poz. 12,7 a `poda mapa pokryti` poz. 5,5), "Internet PODA s televizi" (`poda tv internet`), "PODA v jednotlivych castech Ostravy" (odkazy na 6 lokalnich stranek + `/lokality/` + `/poda-karvina/`), "Co resi obchodni zastupce a co primo PODA" (`.compare-table` s delbou roli - cili na `poda klientska zona` a zaroven posiluje disclosure). FAQ z 3 na 9 otazek, `FAQPage` schema sladena 1:1 s viditelnym obsahem (9/9). Kotva `#tarify` na sekci tarifu, aside odkazy rozsirene o Porubu, Ostravu-Jih a `/lokality/`.
- `sitemap.xml`: lastmod 2026-08-18 pro 12 zmenenych URL. Cache token nebumpovan - CSS ani JS se nemenily.

### Rozhodnuto

- **Vlna 2 lokalit se odklada**, dokud vlna 1 nezacne generovat zobrazeni. 12 tenkych stranek = ~5 zobrazeni za 3,5 tydne; dalsich 14 stranek stejneho typu by riziko doorway hodnoceni jen zvysilo, aniz by pribyl provoz.

### Dalsi kroky podle ocekavaneho dopadu

1. Overit v GSC > Indexovani stranek, zda je 12 URL s nulovymi zobrazenimi vubec zaindexovanych.
2. Prohloubit `/internet-ostrava-poruba/` - ~90 zobrazeni porubskeho zameru napric dotazy, 0 kliku. Latka kvality: konkurencni stranka ma ~3500 slov, konkretni ulice a orientacni body, 11 FAQ a ceny.
3. Zbyle 4 lokality ze seznamu: Slezska Ostrava, Ostrava-Jih, Vitkovice, Marianske Hory.
4. Google Business Profile (Milan Terc, ICO 75546230, service-area business; nazev NESMI obsahovat "PODA" - neni to PODA a.s.) + zapis na Firmy.cz kvuli Seznamu.
5. Po nasazeni poslat `/dostupnost/`, `/poda-internet-ostrava/` a upravene snippety do GSC > Kontrola URL > Pozadat o indexovani.
6. Znovu vyhodnotit po 28 dnech, tj. cca 2026-09-15.

## Implementovano 2026-07-24 - Plne pokryti mestskych casti + hub /lokality/ (vlna 1)

Kontext: majitel rozhodl o plnem pokryti mestskych casti Ostravy vlastnimi URL (vice nez konkurent, ktery ma 23 lokalit). Tim se **revidovalo puvodni rozhodnuti** z 2026-07-13 (r. "Vedome NEimplementovano: 23 lokalit / doorway riziko"). Doorway riziko se misto vynechani lokalit **mitiguje kvalitou**: kazda stranka ma unikatni obsah o typu zastavby dane casti, zadna vymyslena procenta pokryti ani recenze, vzdy veta o overeni podle presne adresy. Publikace ve dvou vlnach (prirozenejsi rust indexu).

Implementovano (vlna 1):

- Novy rozcestnik `/lokality/` (PODA-neutralni, nav i paticka jako homepage) - 6 foto-karet hlavnich pruvodcu + skupiny casti podle oblasti (`.loc-grid`), CollectionPage + ItemList + BreadcrumbList schema.
- 12 novych lokalnich stranek s vlastnim obsahem o zastavbe: `/internet-hrabuvka/`, `/internet-zabreh/`, `/internet-ostrava-dubina/`, `/internet-vyskovice/`, `/internet-belsky-les/` (casti Jihu), `/internet-ostrava-privoz/` (Moravska Ostrava), `/internet-hulvaky/` (Marianske Hory), `/internet-svinov/`, `/internet-pustkovec/`, `/internet-trebovice/`, `/internet-muglinov/` (Slezska), `/internet-michalkovice/`. Kazda: @graph (Service + FAQPage + BreadcrumbList, u casti 3-urovnovy breadcrumb k rodicovskemu obvodu), subhero bez fotky, formular s poznamkou `Lokalita: X`.
- Mini-huby "Casti obvodu" na strankach Ostrava-Jih (5 casti), Slezska Ostrava (Muglinov, Michalkovice), Marianske Hory (Hulvaky), Moravska Ostrava (Privoz).
- Navigace: polozka "Lokality" prepnuta z kotvy `/#lokality` na `/lokality/` ve vsech strankach; homepage sekce #lokality doplnena o CTA "Vsechny lokality Ostravy". Jednotny footer sloupec "Lokality" (Vsechny lokality + rodic/sousede).
- CSS: `.loc-grid`, `.loc-card`, `.loc-group` v redesign.css; cache bump `?v=r22 -> r23` ve vsech HTML.
- `vercel.json`: odstraneny redirecty `/internet-hrabuvka` a `/internet-zabreh` (jiz kanonicke stranky), pridany aliasy `/internet-privoz`, `/internet-dubina`.
- `sitemap.xml` +13 URL (hub 0.8, casti 0.7), `llms.txt` + sekce "Local pages by district" a prepis aliasu.

Vlna 2 (planovano): mensi obvody a RD zastavba - Martinov, Krasne Pole, Plesna, Polanka nad Odrou, Stara/Nova Bela, Proskovice, Hrabova, Radvanice a Bartovice, Kuncicky, Hermanice, Petrkovice, Hostalkovice, Lhotka, Nova Ves. Doplnit karty do `/lokality/` a mini-hubu Slezske. Bez CSS/nav zmen.

## Implementovano 2026-07-13 - Poradna + reakce na konkurenta internet-ostrava.online

Kontext: kolega/konkurent spustil `internet-ostrava.online` - "nezavisly pruvodce" s 97 URL (23 lokalit, poradna, sekce poskytovatelu vcetne PODA stranky s orientacnimi tarify, procenta pokryti). Jeho slabiny: zadny telefon/e-mail, zadna realna osoba, zadne realne ceny, pravdepodobne vymyslena procenta a recenze, relativni canonical, chybi FAQ/Service schema. Pouziva shodny URL vzor lokalit (`/internet-ostrava-poruba`).

Implementovano (vse v Ads zone bez retezce "poda", krome Person schema na PODA hubu):

- Nova sekce `/poradna/` (hub s ItemList schema) + 5 clanku z puvodniho backlogu:
  `/poradna/dostupnost-optickeho-internetu-ostrava/`, `/poradna/optika-vs-bezdratovy-internet/`, `/poradna/internet-pro-home-office-ostrava/`, `/poradna/jaka-rychlost-internetu-pro-domacnost/`, `/poradna/caste-otazky-pred-zmenou-poskytovatele/`.
  Kazdy clanek: answer-first blok pod H1 (`.answer-box`), porovnavaci tabulka (`.compare-table`), Article + FAQPage + BreadcrumbList schema, interni odkazy, aside lead formular.
- Navigace: polozka "Poradna" ve vsech 16 strankach (nav i paticka obou zon).
- Autenticita (diferenciace vuci anonymnimu konkurentovi): `/kontakt/` blok "Kdo se vam ozve a jak to probiha", homepage a `/dostupnost/` kroky doplneny o "mistni zastupce, ne call centrum", `/poda-internet-ostrava/` Person schema (Milan Terc, autorizovany obchodni zastupce).
- 6 lokalnich stranek: doplnen unikatni odstavec o typu zastavby (sorela Poruba, panelove sidliste Jih, cinzaky Marianske Hory, centrum Moravska Ostrava, cihlova kolonie Vitkovice, rozptylena zastavba Slezska). Zadna procenta pokryti.
- CSS: `.answer-box`, `.table-scroll`, `.compare-table` v redesign.css; cache bump `?v=r21 -> r22` ve vsech HTML.
- `sitemap.xml` +6 URL, `llms.txt` + sekce Advice hub.

Vedome NEimplementovano: kopie konkurentovych procent pokryti a recenzi (publishing-rules), 23 lokalit (doorway riziko), sekce cizich poskytovatelu (falesna nezavislost).

## Implementovano 2026-06-03 - SEO/GEO doplneni

- Doplneny kratke odpovedove bloky pro hlavni dotazy `internet Ostrava`, `PODA internet Ostrava`, `PODA Poruba` a lokalni stranky.
- Doplneno BreadcrumbList schema na lokalni stranky bez breadcrumb structured data.
- Pridany kanonicke Vercel redirecty pro kratke aliasy misto tvorby duplicitnich keyword stranek.
- Aktualizovan `sitemap.xml` pro upravene lokalni stranky a `llms.txt` s poznamkou o alias presmerovanich.
