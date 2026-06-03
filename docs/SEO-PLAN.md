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

## Implementovano 2026-06-03 - SEO/GEO doplneni

- Doplneny kratke odpovedove bloky pro hlavni dotazy `internet Ostrava`, `PODA internet Ostrava`, `PODA Poruba` a lokalni stranky.
- Doplneno BreadcrumbList schema na lokalni stranky bez breadcrumb structured data.
- Pridany kanonicke Vercel redirecty pro kratke aliasy misto tvorby duplicitnich keyword stranek.
- Aktualizovan `sitemap.xml` pro upravene lokalni stranky a `llms.txt` s poznamkou o alias presmerovanich.

Poznamka: stranka pro Bohumin zatim nevznikla. Je mimo hlavni ostravsky zamer a mela by se resit samostatne az s unikatnim obsahem a jasnym obchodnim cilem.
