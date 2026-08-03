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

## Analyza 2026-08-03 - prvni vyhodnoceni Search Console dat

Export GSC (filtr "Poslednich 90 dni", ale realna data zacinaji 2026-07-07 - property je od tohoto data):
**26 dni, 24 kliknuti, 466 zobrazeni, CTR 5,15 %, prumerna pozice 22,5.**

Zavery z dat:

- **Web neni neviditelny, je na 2.-4. strane.** Indexace, robots, sitemap, canonical i schema jsou v poradku (`npm run check` prochazi). Chybi autorita a stari domeny, ne technika.
- **Rankujeme tam, kde neni konkurence** (znacka + mikro-lokality): `poda internet ostrava` poz. 8,2; `poda mapa pokryti` poz. 5,5; `/internet-ostrava-jih/` poz. 11,7; `/poradna/dostupnost-optickeho-internetu-ostrava/` poz. 7,4. **Nerankujeme tam, kde je objem**: `internet ostrava` poz. 43,4 (39 zobrazeni); `internet v ostrave` poz. 29,4.
- **Kanibalizace na klastru "podle adresy".** Nebrandovane dotazy (`internet podle adresy`, `dostupnost internetu podle adresy`, `overeni dostupnosti internetu`, `poskytovatele internetu podle adresy` - cca 56 zobrazeni, 0 kliknuti, prum. poz. ~38) chytala znackova `/poda-dostupnost/` (92 zobrazeni, CTR 2,17 %), zatimco neutralni `/dostupnost/` mela jen 9 zobrazeni pri lepsi pozici 13,3. Znackovy title na nebrandovanem dotazu = spatna relevance i CTR.
- **16 z 33 URL ma nula zobrazeni.** Cely hub `/lokality/` + 12 stranek casti (publikovano 2026-07-24, tj. 8 dni pred exportem) a 2 clanky poradny z 2026-07-13. Klastr vlny 1 visi temer vyhradne na hubu `/lokality/`, ktery sam jeste neni zaindexovany - proto se neprolinkovava zhora dolu z jiz zaindexovanych stranek.
- Mobil 262 zobrazeni / CTR 7,63 %, desktop 202 / CTR 1,98 %. 20 z 24 kliknuti je z mobilu.

### Vlastni weby majitele - kanibalizace je vedome akceptovana

Overeno 2026-08-03 primym fetchem: **`popri.cz` a `overdostupnost.cz` provozuje tentyz majitel** (Milan Terc, e-mail `terc@obchod.poda.cz`, telefon 730 431 313, popri.cz uvadi ICO 75456230). Oba weby nabizeji **identicke tarify za identicke ceny 300 / 440 / 570 Kc** jako internetostrava.cz a cili na stejne dotazy vcetne `poda dostupnost` a `poda ostrava`.

**Rozhodnuti majitele 2026-08-03: obe domeny jsou jeho a kanibalizace mu nevadi.** Neresit jako problem, neplanovat delbu dotazu mezi domenami. Prakticky dusledek, se kterym je treba pocitat pri vyhodnocovani: Google si mezi weby se shodnym NAP a shodnou nabidkou vybere na dany dotaz jeden - necekat, ze budou rankovat vsechny tri soucasne, a merit uspech podle celkoveho poctu leadu, ne podle pozic jedne domeny.

### Konkurence (overeno 2026-08-03)

`internet-ostrava.online` vyrostl z 97 na 106 URL a **jiz neni anonymni** - ma stranku `/trust` s identitou provozovatele, ICO a explicitnim disclosure o partnerskych provizich. Nase vyhoda "my jsme realni lide" se tim zuzila. Zbyvajici realne vyhody: **konkretni ceny** (on ma jen "od 199 Kc" bez tarifu), **strukturovana data** (on ma prakticky jen BreadcrumbList) a **realny telefon s odezvou do 30 minut**. Jeho lokalitni stranky maji ~3 500 slov proti nasim ~550, ale pusobi sablonovite.

Jeho procenta pokryti (FTTH index 42-85 % na mestskou cast) **nekopirovat** - viz publishing-rules.

### Implementovano 2026-08-03

- **`/dostupnost/` prepsana z 291 na ~1 230 slov** a precilena z "overeni dostupnosti internetu Ostrava" na nebrandovany klastr **"dostupnost internetu podle adresy"**: novy title/description/H1, answer-first blok, sekce "Proc mapa pokryti nestaci", porovnavaci tabulka tri zpusobu zjisteni, checklist "Co poslat", sekce "Dostupnost podle mestske casti" s odkazy na `/lokality/` a tri clanky poradny, FAQ rozsirene z 2 na 6 otazek. Schema: `@graph` se `Service` + **`HowTo`** + `FAQPage` + `BreadcrumbList` (drive jen `FAQPage`). Zustava v Ads zone - grep na `poda` vraci 0.
- **Homepage `Organization` -> `["Organization","ProfessionalService"]`**: doplneno `legalName` (Milan Terc), `taxID` (ICO 75546230), `email`, `logo`, `image`, `geo`, `contactPoint`, `knowsLanguage`, `areaServed` rozsireno o Moravskoslezsky kraj. `@id` zustal stejny, takze vsechny `provider`/`broker` reference dal funguji. `openingHours` vedome NEdoplneny - presna oteviraci doba neni potvrzena majitelem.
- **`/tarify/` doplnen `OfferCatalog`** se tremi `Offer` (300 / 440 / 570 Kc, `priceCurrency` CZK, `UnitPriceSpecification` na mesic) + `BreadcrumbList`. Neutralni nazvy tarifu - Ads zona. Realne ceny jsou nase nejsilnejsi diferenciace vuci konkurentovi a doted je Google nevidel strojove.
- **`/internet-ostrava-poruba/` precilena na nebrandovany dotaz**: title `Internet Ostrava-Poruba | PODA pripojeni podle adresy` (drive PODA na prvnim miste), H1 `Internet pro Ostravu-Porubu.`, znacka presunuta do prvniho H2 `Je u vas v Porube internet PODA dostupny?`. Duvod: `internet poruba` + `internet ostrava poruba` = 41 zobrazeni proti 8 zobrazenim znackovych variant.
- **`/poda-internet-ostrava/` (nejsilnejsi stranka - 104 zobrazeni, 11 kliknuti) doplnena o sekci "PODA internet v jednotlivych obvodech Ostravy"** se 6 `loc-card` odkazy na vsechny obvody + odkaz na `/lokality/`. Drive odkazovala jen na Porubu a Jih. Cil: poslat link equity ze zaindexovane stranky dolu do klastru, ktery zatim neni videt.
- **Priznani provizi na cely web** (rozhodnuti majitele 2026-08-03). Konkurent `internet-ostrava.online` provize priznava na `/trust`, takze uz to neni diferenciator - ale je to silny signal duveryhodnosti a resi rozpor mezi "nezavisly" a proviznim modelem:
  - `/kontakt/` nova sekce **"Jak je tento web financovany"** + 2 nove FAQ otazky ("Kolik me stoji overeni a zprostredkovani?", "Porovnavate vsechny poskytovatele na trhu?"). Pozicovani zamerne obracene proti konkurentovi: *nejsme srovnavac, jsme obchodni zastupce - proto vidite konkretni cenu a konkretni telefon.*
  - Homepage: odstavec v sekci "Za webem je zivy clovek" + FAQ otazka (viditelne i ve `FAQPage` schematu).
  - `/dostupnost/`, `/tarify/`, `/poda-internet-ostrava/`: po jedne FAQ otazce, vzdy viditelne i ve schematu. Na `/tarify/` formulovano jako "Zaplatim u vas vic nez pri sjednani naprimo? Ne." - primo resi nakupni namitku.
  - `/poda-internet-ostrava/` disclosure v patice sekce rozsiren o provizi (v PODA zone lze pojmenovat primo: "za sjednane pripojeni dostavame od PODA provizi").
  - Slovo "nezavisly" odstraneno tam, kde primo sousedilo s proviznim disclosure (`/kontakt/`), aby text nebyl rozporny.
- `/kontakt/` schema rozsireno z holeho `FAQPage` na `@graph`: `ContactPage` + **`Person` (Milan Terc)** + `FAQPage` + `BreadcrumbList`. Viditelne "p. Terc" zmeneno na plne jmeno **Milan Terc** (jiz drive verejne v `/ochrana-udaju/` a v `Person` schematu PODA hubu).
- `sitemap.xml`: `lastmod` 2026-08-03 u upravenych URL.

Bez zmeny CSS/JS, cache token zustava `?v=r23`.

**Otevrena otazka pro majitele:** paticka Ads zony stale nese `Nezavisly poradensky web pro pripojeni v Ostrave a okoli.` (zneni je zafixovane v CLAUDE.md). Vedle prizanych provizi je slovo "nezavisly" sporne - i z pohledu zakona o ochrane spotrebitele. Navrh nahrady: `Poradensky web obchodniho zastupce pro pripojeni v Ostrave a okoli.` Nemenit bez potvrzeni majitele.

### Dalsi kroky podle priority

1. **Zalozit Google Business Profile** pro Ostravu - lokalni dotazy typu `internet ostrava` maji mapovy pack, do ktereho se bez GBP nelze dostat. Nejvyssi ocekavany dopad ze vsech kroku, ale je mimo web.
2. V GSC rucne zazadat o indexaci `/lokality/` a 12 stranek vlny 1; **vlnu 2 odlozit**, dokud vlna 1 neni zaindexovana.
3. Rozsirit 6 hlavnich lokalit z ~550 na 1 500-2 000 slov (Poruba, Jih, Zabreh, Hrabuvka, Moravska Ostrava, Slezska).
4. Viditelny podpis autora + datum aktualizace na obsahove stranky (`Person` schema pres `author`, `@id` uz existuje na `/kontakt/`). Konkurent nema autora na zadne ze 106 stranek.
5. Zvazit sekci `/poskytovatele/` a troubleshooting clanky v poradne - nejvetsi strukturalni diry proti konkurentovi.

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
