# SEO report 2026-09-03

Vygenerovano automaticky (`npm run seo:report`). Cisla z Google Search Console, technicke nalezy z `npm run seo:audit`.

## 1. Vykon ve vyhledavani

Obdobi **2026-08-04 az 2026-08-31**, porovnano s 2026-07-07 az 2026-08-03.

| Metrika | Aktualne | Predchozi | Zmena |
|---|---:|---:|---|
| Kliky | 3 | 16 | (-13, horsi) |
| Zobrazeni | 465 | 331 | (+134, lepsi) |
| CTR | 0,65 % | 4,83 % | (-4,19, horsi) |
| Prumerna pozice | 24,5 | 28,2 | (-3,7, lepsi) |

| Zarizeni | Kliky | Zobrazeni | CTR | Pozice |
|---|---:|---:|---:|---:|
| MOBILE | 9 | 514 | 1,75 % | 17,6 |
| DESKTOP | 4 | 469 | 0,85 % | 14,4 |
| TABLET | 0 | 4 | 0,00 % | 8,5 |

## 2. Prilezitosti

### 2.1 Dotazy na pozici 4-20 (na dosah prvni stranky)

| Dotaz | Pozice | Zmena | Zobrazeni | Kliky | Cluster |
|---|---:|---|---:|---:|---|
| poda internet ostrava | 6,7 | (-1,3, lepsi) | 26 | 0 | Značkové dotazy PODA |
| internet slezke | 17,3 | (+5,3, horsi) | 21 | 0 | - |
| poda karvina | 11,9 | (-3,5, lepsi) | 21 | 0 | Značkové dotazy PODA |
| poda ostrava | 15,7 | (-6,1, lepsi) | 18 | 0 | Značkové dotazy PODA |
| poda dostupnost | 10,3 | (+0,3, horsi) | 15 | 0 | Značkové dotazy PODA |
| poda pokrytí | 9,8 | (-8,2, lepsi) | 14 | 0 | - |
| internet ostrava zábřeh | 16,7 | (+2,2, horsi) | 13 | 0 | - |
| poda karviná | 12,6 | (-9,7, lepsi) | 10 | 0 | - |
| poskytovatelé internetu ostrava | 19,3 | - | 7 | 0 | - |
| internet poda | 6,7 | (-5,6, lepsi) | 6 | 0 | - |
| poda poruba | 15,0 | (-13,8, lepsi) | 5 | 0 | - |

### 2.2 Stranky se zobrazenimi a nulovymi prokliky

Tady nejde o pozici, ale o title a description ve vysledku vyhledavani.

| Stranka | Zobrazeni | Pozice |
|---|---:|---:|
| /kontakt/ | 83 | 22,6 |
| /internet-ostrava-poruba/ | 62 | 22,5 |
| /internet-slezska-ostrava/ | 42 | 24,8 |
| /tarify/ | 37 | 46,4 |
| /poradna/optika-vs-bezdratovy-internet/ | 25 | 13,0 |
| /poradna/internet-vypadava-co-delat/ | 24 | 9,2 |
| /poradna/vysoky-ping-pri-hrani/ | 24 | 5,1 |
| /internet-marianske-hory/ | 15 | 8,6 |

### 2.3 Stav indexace

| URL | Verdikt | Stav |
|---|---|---|
| /lokality/ | NEUTRAL | Objeveno – momentálně neindexováno |
| /internet-hrabuvka/ | NEUTRAL | Google adresu URL nezná |
| /internet-zabreh/ | NEUTRAL | Objeveno – momentálně neindexováno |
| /internet-vyskovice/ | NEUTRAL | Objeveno – momentálně neindexováno |
| /internet-hulvaky/ | NEUTRAL | Objeveno – momentálně neindexováno |
| /internet-svinov/ | NEUTRAL | Objeveno – momentálně neindexováno |
| /internet-trebovice/ | NEUTRAL | Objeveno – momentálně neindexováno |
| /internet-muglinov/ | NEUTRAL | Objeveno – momentálně neindexováno |
| /internet-michalkovice/ | NEUTRAL | Objeveno – momentálně neindexováno |
| /ochrana-udaju/ | NEUTRAL | Google adresu URL nezná |

## 3. Technicky stav webu

Zkontrolovano 41 stranek (19 v Ads zone), 45 JSON-LD bloku.
Nalezeno **1 chyba** a 60 varovani.

### 3.1 Chyby (blokuji automaticky push na main)

- **[cache-token]** `index.html, poda-internet-ostrava/index.html` - nekonzistentni cache-busting token: r23 (82x), r17 (6x) - CDN muze servirovat stary asset

### 3.2 Varovani podle typu

| Typ | Pocet | Priklad |
|---|---:|---|
| faq | 46 | index.html: FAQPage schema ma 3 otazek, viditelnych <details> je 4 (projekt drzi 1:1) |
| tenky-obsah | 11 | internet-belsky-les/index.html: jen 398 slov (prah 400) - riziko doorway hodnoceni, prohloubit nebo slouceni |
| title | 2 | kontakt/index.html: title ma jen 26 znaku (doporuceno od 30) |
| llms | 1 | ochrana-udaju/index.html: route /ochrana-udaju/ chybi v llms.txt |

### 3.3 Nejtenci stranky

| Stranka | Slov |
|---|---:|
| /kontakt/ | 301 |
| /poradna/ | 343 |
| /internet-ostrava-vitkovice/ | 349 |
| /poda-dostupnost/ | 353 |
| /poda-karvina/ | 372 |
| /internet-trebovice/ | 387 |
| /internet-muglinov/ | 392 |
| /internet-pustkovec/ | 394 |
| /internet-michalkovice/ | 396 |
| /tarify/ | 396 |
| /internet-belsky-les/ | 398 |

### 3.4 Produkcni web

Zkontrolovano 42 URL na https://internetostrava.cz, medianova odezva 58 ms.

Vsechny URL vraci 200 a canonical odpovida.

## 4. Cilove clustery

| Cluster | Priorita | Dotazu | Poznamka |
|---|---:|---:|---|
| Značkové dotazy PODA | 1 | 11 | Zde reálně rankujeme. Nejlepší poměr práce a výsledku – z pozice 5-20 se dá dost |
| Ověření podle adresy | 2 | 6 | Claim, na kterém stojí celý web. Cluster byl do 2026-08-18 nevyužitý (pozice 30- |
| Městské části Ostravy | 3 | 19 | Dlouhý chvost. Vlna 1 (12 stránek z 2026-07-24) byla po 3,5 týdne prakticky nevi |
| Poradna – otázkové dotazy | 4 | 7 | Dlouhé otázkové dotazy nám podle GSC fungují nejlépe. Problém těchto stránek je  |
| Obecné dotazy (jen sledovat) | 5 | 4 | jen sledovat, necilit |

## 5. Ukoly pro tento cyklus

Serazeno podle ocekavaneho dopadu. Agent vrstvy B bere shora a dela **nejvyse tri** polozky za beh.

1. Opravit chybu auditu [cache-token] na `index.html, poda-internet-ostrava/index.html`: nekonzistentni cache-busting token: r23 (82x), r17 (6x) - CDN muze servirovat stary asset
2. Prepsat title a description na `/kontakt/` (83 zobrazeni, 0 kliku, pozice 22,6).
3. Sladit FAQPage schema s viditelnym obsahem na 18 strankach - Google vyzaduje, aby otazky ve schematu byly na strance videt.
4. Prepsat title a description na `/internet-ostrava-poruba/` (62 zobrazeni, 0 kliku, pozice 22,5).
5. Vyresit indexaci 10 URL bez verdiktu PASS (viz sekce 2.3) - dokud nejsou v indexu, obsah na nich nema efekt.
6. Prepsat title a description na `/internet-slezska-ostrava/` (42 zobrazeni, 0 kliku, pozice 24,8).
7. Prepsat title a description na `/tarify/` (37 zobrazeni, 0 kliku, pozice 46,4).
8. Posilit obsah pro dotaz "poda internet ostrava" (pozice 6,7, 26 zobrazeni) na strance `/poda-internet-ostrava/`.
9. Posilit obsah pro dotaz "internet slezke" (pozice 17,3, 21 zobrazeni).
10. Posilit obsah pro dotaz "poda karvina" (pozice 11,9, 21 zobrazeni) na strance `/poda-karvina/`.

## 6. Mimo repozitar (musi udelat majitel)

Automatizace tyhle veci nedokaze udelat, ale jsou to nejvetsi paky:

1. **Google Business Profile** - Milan Terc, ICO 75546230, service-area business. Nazev nesmi obsahovat "PODA".
2. **Sjednotit NAP** napric weby (internetostrava.cz, overdostupnost.cz, popri.cz): jedno telefonni cislo, spravne ICO, odstranit rozporne spojeni "nezavisly" + "obchodni zastupce PODA".
3. **Zapis na Firmy.cz** kvuli Seznamu - Seznam nema verejne API, automat jeho pozice merit neumi.
4. **Realne recenze od zakazniku** - vymyslene recenze jsou proti publishing-rules a proti pravidlum Google.

