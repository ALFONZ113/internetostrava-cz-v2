# SEO a GEO plán pro InternetOstrava.cz

## Cíl

Získávat relevantní návštěvy z lokálních dotazů na internet v Ostravě a převádět je na nezávazná ověření adresy.

První pozici v Google nelze garantovat. Cílem je vytvořit lepší uživatelský výsledek než jednostránkový konkurent a rozhodovat další kroky podle Search Console dat.

## Aktuální stav (2026-07-31)

Tato sekce je zdroj pravdy. Sekce níže jsou chronologický log a popisují stav v době zápisu, ne dnešek.

- **35 HTML stránek**: homepage, 3 konverzní (tarify, dostupnost, kontakt), hub `/lokality/`, **18 lokalitních stránek**, 3 PODA stránky, `/poradna/` + 5 článků, `/ochrana-udaju/`, `/dekujeme/` (noindex), `404.html`.
- Dva huby: `/lokality/` (neutrální rozcestník) a `/poda-internet-ostrava/` (PODA zóna). Cesta `/internet-ostrava` je pouze 301 na `/`, není to stránka.
- Split-brand drží: grep na `poda` přes všech 8 souborů Ads zóny vrací 0. Stejně tak `/poradna/`.
- Úplný audit stavu k 2026-07: `docs/seo-geo-audit-2026-07.md`.

### Vztah k sesterským webům — POZOR

`overdostupnost.cz` **není cizí konkurent**, jak uvádí původní zápis níže. Majitel potvrdil (2026-07-31), že web patří jemu / jeho týmu. Sdílí stejný lead e-mail `terc@obchod.poda.cz` a překrývá se URL vzory:

| | internetostrava.cz | overdostupnost.cz |
|---|---|---|
| Hrabůvka | `/internet-hrabuvka/` | `/internet-ostrava-hrabuvka` |
| Poruba | `/internet-ostrava-poruba/` | `/internet-ostrava-poruba` |
| Ostrava hub | 301 na `/` | `/internet-ostrava` (živá stránka) |

V SERP dnes vyhrává `overdostupnost.cz`. Cílový stav: **Ostrava patří internetostrava.cz** (exact-match doména, 18 lokalit, nutná Ads landing zóna), zbytek regionu (Havířov, Karviná, Orlová, Poličká) sesterskému webu. Konsolidaci provádět **až podle dat ze Search Console**, po jednom přesměrování — ne plošně.

Pozn.: `popri.cz` je rovněž PODA affiliate web se samostatnou sitemapou.

## Výchozí porovnání

Kontrolováno 2026-06-02 (**historický zápis — viz korekce výše**):

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

**Pozn.:** „tři unikátní lokální landing pages" platilo k 2026-06-02. Dnes je lokalit 18 — viz Aktuální stav výše.

## Obsahový backlog

Publikovat postupně podle Search Console dotazů:

1. Jak zjistit dostupnost optického internetu na konkrétní adrese v Ostravě
2. Optika vs. bezdrátové připojení v ostravském bytě
3. Jak vybrat internet pro home office v Ostravě
4. Jakou rychlost internetu potřebuje domácnost s více zařízeními
5. Internet Ostrava: nejčastější otázky před změnou připojení

## Pravidla

- Nevytvářet téměř stejné městské stránky. **Revidováno 2026-07-24:** lokalit je dnes 18 a doorway riziko se místo vynechávání mitiguje kvalitou — každá stránka musí mít vlastní obsah o typu zástavby. Kontrolní metrika: medián párového slovního překryvu mezi lokalitami byl k 2026-07-31 **0.35**, nejhorší dvojice `pustkovec`/`trebovice` **0.61**. Před vlnou 3 nejdřív zahustit stávající stránky, ne přidávat další.
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

## Implementovano 2026-07-31 - Faze 1 podle auditu (E-E-A-T, prelinkovani, vykon)

Kontext: `docs/seo-geo-audit-2026-07.md`. Cilem bylo udelat z webu stranku, ktera si Ostravu zaslouzi vyhrat, jeste **pred** resenim prekryvu s `overdostupnost.cz`.

Identita a schema (E-E-A-T):

- `/kontakt/` - nova viditelna sekce "Kdo web provozuje": Milan Terc, ICO 75546230, sidlo Porubska 944/5. Dosud byly tyto udaje jen na `/ochrana-udaju/` (priorita 0.2).
- `Organization` node na homepage povysen na `LocalBusiness` pri zachovani `@id` `#organization`, takze reference z `WebSite.publisher` a `Service.broker` plati dal. Doplneno `identifier` (ICO), `streetAddress`, `email`, `priceRange`.
- `LocalBusiness` + `BreadcrumbList` doplneny na `/dostupnost/`, `/tarify/`, `/lokality/` - mely osirely entity graph (jen samostatny `FAQPage`).
- 5 clanku poradny: `author` prepsan z `Organization` na `Person` (Milan Terc) + viditelny podpis pod leadem.
- FAQ rozsireno na `/kontakt/` (2->4), `/dostupnost/` (2->4), `/tarify/` (2->3). Vse ze jiz publikovanych faktu, zadny novy obchodni udaj.

Prelinkovani:

- `/poda-internet-ostrava/` - nova sekce "PODA podle lokality" se **vsemi 18 lokalitami** ve 4 skupinach. Predtim odkazoval jen na 2.
- `/poda-dostupnost/` - blok 6 nejcastejsich lokalit (predtim zadna).
- `/poda-karvina/` - cross-link na ostravske rozcestniky (zamerne jen 3, ne 18 - Karvina neni Ostrava).
- Vsech 5 clanku poradny odkazuje na lokality (predtim 1 z 5), kazdy na tematicky jine.

Vykon a technika:

- Vygenerovany 800px varianty 6 subhero obrazku + `srcset`/`sizes`/`width`/`height`. Uspora na mobilu ~70 % (napr. `loc-moravska-ostrava` 400 KB -> 105 KB). Jde o LCP obrazky (`loading="eager"`).
- `icon-512x512.png` prekomprimovan 235 KB -> 63 KB.
- `robots.txt` - explicitni `Allow` pro GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended, CCBot.
- Zkraceny 4 titles nad 60 znaku a 2 descriptions nad 158 znaku.

Provozni fakta (potvrzena majitelem 2026-07-31):

- **Objednavku vyridime do 24 hodin** od potvrzeni, **zapojeni obvykle do 4-5 dni**, sit je vedena technologii **GPON**. Doplneno na 23 stranek - predtim mely tyto pojmy 0 vyskytu a byly hlavni GEO mezerou.
- FAQ na lokalitnich strankach rozsireno z 2-3 na 4-5 otazek (termin zapojeni + technologie). Lokalni veta u obou otazek je **unikatni pro kazdy obvod** (navazuje na zastavbu popsanou na strance), aby fakta nezvysila slovni prekryv. Merene dopady: nejhorsi par `pustkovec`/`trebovice` 0.61 -> 0.59, median 0.35 -> 0.39, prumer 410 -> 489 slov.
- Pri teto praci opraven **nesoulad viditelneho FAQ a schema**: pred zmenou mely lokalitni stranky 3 viditelne otazky vs 2 v schema a `/poradna/caste-otazky/` 6 vs 4. Schema se nove generuje z viditelneho FAQ, takze oboje sedi na vsech 30 strankach s FAQ.
- `llms.txt` dostal sekce "Operator" (ICO, sidlo, kontakt) a "Key facts" (30 min / 24 h / 4-5 dni / GPON / rychlosti / ceny).

Vedome NEimplementovano:

- `openingHours` v `LocalBusiness` schema - majitel potvrdil, ze pevna otviraci doba neexistuje. Web misto toho uvadi "do 30 minut v pracovni dny".
- **Pracovni vs kalendarni dny u zapojeni** - majitel uvedl "4-5 dni" bez upresneni, na webu je tedy "4-5 dni". Sestersky web uvadi 4-5 *pracovnich* dni. Pokud plati pracovni, je potreba text upravit (dnes slibuje kratsi termin).
- Konsolidace s `overdostupnost.cz` - ceka na data ze Search Console.

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
