# SEO report 2026-10-26

Vygenerovano automaticky (`npm run seo:report`). Cisla z Google Search Console, technicke nalezy z `npm run seo:audit`.

## 1. Vykon ve vyhledavani

Obdobi **2026-09-26 az 2026-10-23**, porovnano s 2026-08-29 az 2026-09-25.

| Metrika | Aktualne | Predchozi | Zmena |
|---|---:|---:|---|
| Kliky | 26 | 24 | (+2, lepsi) |
| Zobrazeni | 1589 | 1775 | (-186, horsi) |
| CTR | 1,64 % | 1,35 % | (+0,28, lepsi) |
| Prumerna pozice | 13,0 | 11,3 | (+1,7, horsi) |

| Zarizeni | Kliky | Zobrazeni | CTR | Pozice |
|---|---:|---:|---:|---:|
| MOBILE | 17 | 912 | 1,86 % | 13,6 |
| DESKTOP | 8 | 663 | 1,21 % | 12,2 |
| TABLET | 1 | 14 | 7,14 % | 9,1 |

## 2. Prilezitosti

### 2.1 Dotazy na pozici 4-20 (na dosah prvni stranky)

| Dotaz | Pozice | Zmena | Zobrazeni | Kliky | Cluster |
|---|---:|---|---:|---:|---|
| internet podle adresy | 17,1 | (-4,9, lepsi) | 80 | 0 | Ověření podle adresy |
| ověřit dostupnost internetu | 11,4 | (-8,8, lepsi) | 78 | 0 | - |
| dostupnost internetu podle adresy | 19,4 | (+0,6, horsi) | 65 | 0 | Ověření podle adresy |
| poda internet | 10,1 | (-5,7, lepsi) | 62 | 1 | Značkové dotazy PODA |
| internet dostupnost | 6,2 | - | 33 | 0 | - |
| internet ostrava poruba | 16,3 | (-5,4, lepsi) | 26 | 1 | Městské části Ostravy |
| poda internet ostrava | 7,1 | (-0,4, lepsi) | 25 | 1 | Značkové dotazy PODA |
| poda karviná | 11,6 | (+0,1, horsi) | 25 | 0 | Značkové dotazy PODA |
| internet vitkovice | 14,3 | (-4,7, lepsi) | 22 | 0 | Městské části Ostravy |
| internet poruba | 17,3 | (-5,6, lepsi) | 21 | 0 | Městské části Ostravy |
| poda karvina | 10,4 | (-1,6, lepsi) | 21 | 0 | Značkové dotazy PODA |
| internet vítkovice | 18,5 | (+0,2, horsi) | 15 | 0 | Městské části Ostravy |
| poda dostupnost | 10,6 | (+0,7, horsi) | 9 | 0 | Značkové dotazy PODA |
| internet poda | 10,6 | (+2,6, horsi) | 8 | 0 | - |
| internet ostrava hrabůvka | 14,9 | (-1,1, lepsi) | 7 | 0 | - |

### 2.2 Viditelne stranky bez prokliku (problem snippetu)

Stranky do pozice 10, ktere uzivatel ve vysledcich vidi a presto neklikne.
Tady pomuze title a description, ne dalsi obsah.

| Stranka | Zobrazeni | Pozice | Na jake dotazy rankuje |
|---|---:|---:|---|
| /poradna/internet-vypadava-co-delat/ | 74 | 6,8 | - |
| /poradna/vysoky-ping-pri-hrani/ | 43 | 5,2 | - |
| /lokality/ | 39 | 9,5 | local 534 (1); teamcity ostrava (1) |
| /poradna/optika-vs-bezdratovy-internet/ | 23 | 7,4 | - |

### 2.2b Stranky, ktere nikdo nevidi (problem pozice)

Zobrazeni maji, ale az za pozici 10. Prepis snippetu je tu k nicemu -
potrebuji hlubsi a konkretnejsi obsah a interni odkazy.

| Stranka | Zobrazeni | Pozice | Na jake dotazy rankuje |
|---|---:|---:|---|
| /poda-karvina/ | 88 | 10,8 | poda karviná (25); poda karvina (21); poda internet (4) |
| /tarify/ | 28 | 47,7 | internet ostrava (8); nejlevnější internet ostrava (5); poskytovatelé internetu ostrava (4) |

### 2.3 Stav indexace

| URL | Verdikt | Stav |
|---|---|---|
| /internet-muglinov/ | NEUTRAL | Google adresu URL nezná |
| /ochrana-udaju/ | NEUTRAL | Google adresu URL nezná |

## 3. Technicky stav webu

Zkontrolovano 41 stranek (19 v Ads zone), 45 JSON-LD bloku.
Nalezeno **0 chyb** a 6 varovani.

### 3.2 Varovani podle typu

| Typ | Pocet | Priklad |
|---|---:|---|
| tenky-obsah | 5 | internet-ostrava-vitkovice/index.html: jen 349 slov (prah 400) - riziko doorway hodnoceni, prohloubit nebo slouceni |
| title | 1 | poradna/pomaly-internet-vecer/index.html: title ma jen 29 znaku (doporuceno od 30) |

### 3.3 Nejtenci stranky

| Stranka | Slov |
|---|---:|
| /kontakt/ | 299 |
| /poradna/ | 343 |
| /internet-ostrava-vitkovice/ | 349 |
| /poda-karvina/ | 372 |
| /tarify/ | 396 |

### 3.4 Produkcni web

Zkontrolovano 42 URL na https://internetostrava.cz, medianova odezva 95 ms.

Vsechny URL vraci 200 a canonical odpovida.

## 4. Cilove clustery

| Cluster | Priorita | Dotazu | Poznamka |
|---|---:|---:|---|
| Značkové dotazy PODA | 1 | 11 | Zde reálně rankujeme. Nejlepší poměr práce a výsledku – z pozice 5-20 se dá dost |
| Ověření podle adresy | 2 | 6 | Claim, na kterém stojí celý web. Cluster byl do 2026-08-18 nevyužitý (pozice 30- |
| Městské části Ostravy | 3 | 19 | Dlouhý chvost. Vlna 1 (12 stránek z 2026-07-24) byla po 3,5 týdne prakticky nevi |
| Poradna – otázkové dotazy | 4 | 7 | Dlouhé otázkové dotazy nám podle GSC fungují nejlépe. Problém těchto stránek je  |
| Obecné dotazy Ostrava | 3 | 4 | Majitel chce rozvíjet i dotazy internet Ostrava a internet v Ostravě. Cílíme na  |

## 5. Ukoly pro tento cyklus

Serazeno podle ocekavaneho dopadu. Agent vrstvy B bere shora a dela **nejvyse tri** polozky za beh.

1. Posilit obsah pro dotaz "internet podle adresy" (pozice 17,1, 80 zobrazeni) na strance `/dostupnost/`.
2. Posilit obsah pro dotaz "ověřit dostupnost internetu" (pozice 11,4, 78 zobrazeni).
3. Prepsat title a description na `/poradna/internet-vypadava-co-delat/` (74 zobrazeni, 0 kliku, pozice 6,8).
4. Posilit obsah pro dotaz "dostupnost internetu podle adresy" (pozice 19,4, 65 zobrazeni) na strance `/dostupnost/`.
5. Vyresit indexaci 2 URL bez verdiktu PASS (viz sekce 2.3) - dokud nejsou v indexu, obsah na nich nema efekt.
6. Prepsat title a description na `/poradna/vysoky-ping-pri-hrani/` (43 zobrazeni, 0 kliku, pozice 5,2).
7. Prepsat title a description na `/lokality/` (39 zobrazeni, 0 kliku, pozice 9,5) - rankuje na: local 534 (1); teamcity ostrava (1).
8. Prohloubit `/poda-karvina/` (pozice 10,8, 88 zobrazeni, 372 slov) - rankuje na: poda karviná (25); poda karvina (21); poda internet (4).
9. Prohloubit `/internet-ostrava-vitkovice/` (349 slov) - je to cilova stranka pro dotazy z keywords.json.
10. Prepsat title a description na `/poradna/optika-vs-bezdratovy-internet/` (23 zobrazeni, 0 kliku, pozice 7,4).

## 6. Mimo repozitar (musi udelat majitel)

Automatizace tyhle veci nedokaze udelat, ale jsou to nejvetsi paky:

1. **Google Business Profile** - Milan Terc, ICO 75546230, service-area business. Nazev nesmi obsahovat "PODA".
2. **Sjednotit NAP** napric weby (internetostrava.cz, overdostupnost.cz, popri.cz): jedno telefonni cislo, spravne ICO, odstranit rozporne spojeni "nezavisly" + "obchodni zastupce PODA".
3. **Zapis na Firmy.cz** kvuli Seznamu - Seznam nema verejne API, automat jeho pozice merit neumi.
4. **Realne recenze od zakazniku** - vymyslene recenze jsou proti publishing-rules a proti pravidlum Google.

