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

### Ads zona (nula vyskytu retezce "poda" v HTML, vcetne e-mailu terc@poda.cz)

- `/` (homepage) - neutralni "Internet Ostrava - opticke pripojeni az 2 Gb/s", bez PODA v title, meta, OG, schema, textu i patici; tarify prejmenovany neutralne (Giga 1000 + TV za 300 Kc, Giga 1000 + TV 10 programu za 440 Kc, Giga 2000 za 570 Kc - ceny beze zmeny),
- `/tarify/` - stejne neutralni nazvy tarifu, hlavni landing page pro kampane,
- `/dostupnost/` - landing page pro overeni dostupnosti,
- `/kontakt/`, `/dekujeme/` (noindex), `/ochrana-udaju/`, `404.html`.

Pravidla pro Ads zonu:

- zadny vyskyt "PODA" ani "poda" (vcetne mailto terc@poda.cz) ve viditelnem obsahu, title, meta, schema, navigaci a patici,
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

Pozn.: leady nadale chodi na terc@poda.cz (api/leads.js, env LEAD_TO_EMAIL; fallback mailto v assets/main.js) - jde o funkcni kontakt mimo viditelny obsah. Pripadnou vymenu za neutralni adresu (napr. info@internetostrava.cz) rozhodne majitel.

## Implementovano 2026-06-03 - SEO/GEO doplneni

- Doplneny kratke odpovedove bloky pro hlavni dotazy `internet Ostrava`, `PODA internet Ostrava`, `PODA Poruba` a lokalni stranky.
- Doplneno BreadcrumbList schema na lokalni stranky bez breadcrumb structured data.
- Pridany kanonicke Vercel redirecty pro kratke aliasy misto tvorby duplicitnich keyword stranek.
- Aktualizovan `sitemap.xml` pro upravene lokalni stranky a `llms.txt` s poznamkou o alias presmerovanich.
