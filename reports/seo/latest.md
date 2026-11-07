# SEO report 2026-11-02

Vygenerovano automaticky (`npm run seo:report`). Cisla z Google Search Console, technicke nalezy z `npm run seo:audit`.

## 1. Vykon ve vyhledavani

Obdobi **2026-10-03 az 2026-10-30**, porovnano s 2026-09-05 az 2026-10-02.

| Metrika | Aktualne | Predchozi | Zmena |
|---|---:|---:|---|
| Kliky | 23 | 26 | (-3, horsi) |
| Zobrazeni | 1729 | 1698 | (+31, lepsi) |
| CTR | 1,33 % | 1,53 % | (-0,20, horsi) |
| Prumerna pozice | 13,9 | 10,7 | (+3,2, horsi) |

| Zarizeni | Kliky | Zobrazeni | CTR | Pozice |
|---|---:|---:|---:|---:|
| MOBILE | 15 | 987 | 1,52 % | 14,0 |
| DESKTOP | 7 | 726 | 0,96 % | 13,9 |
| TABLET | 1 | 16 | 6,25 % | 7,1 |

## 2. Prilezitosti

### 2.1 Dotazy na pozici 4-20 (na dosah prvni stranky)

| Dotaz | Pozice | Zmena | Zobrazeni | Kliky | Cluster |
|---|---:|---|---:|---:|---|
| poda internet | 7,8 | (-5,1, lepsi) | 96 | 1 | Značkové dotazy PODA |
| internet podle adresy | 18,6 | (+0,4, horsi) | 69 | 0 | Ověření podle adresy |
| ověřit dostupnost internetu | 17,1 | (+6,7, horsi) | 54 | 0 | - |
| internet ostrava poruba | 16,9 | (-1,5, lepsi) | 38 | 0 | Městské části Ostravy |
| internet vitkovice | 16,2 | (+2,2, horsi) | 33 | 0 | Městské části Ostravy |
| internet poruba | 19,5 | (+1,0, horsi) | 32 | 0 | Městské části Ostravy |
| poda internet ostrava | 7,2 | (-0,3, lepsi) | 30 | 1 | Značkové dotazy PODA |
| poda karviná | 11,7 | (+0,6, horsi) | 28 | 0 | Značkové dotazy PODA |
| internet vítkovice | 19,9 | (+1,9, horsi) | 19 | 0 | Městské části Ostravy |
| poda karvina | 10,9 | (-0,4, lepsi) | 19 | 0 | Značkové dotazy PODA |
| internet dostupnost | 6,1 | (-0,1, lepsi) | 17 | 0 | - |
| poda dostupnost | 10,2 | (+0,8, horsi) | 11 | 0 | Značkové dotazy PODA |
| internet poda | 7,4 | (-3,1, lepsi) | 8 | 0 | - |
| poda ostrava | 15,9 | (-2,6, lepsi) | 8 | 0 | Značkové dotazy PODA |
| poda pokrytí | 6,7 | (beze zmeny) | 7 | 0 | Značkové dotazy PODA |

### 2.2 Viditelne stranky bez prokliku (problem snippetu)

Stranky do pozice 10, ktere uzivatel ve vysledcich vidi a presto neklikne.
Tady pomuze title a description, ne dalsi obsah.

| Stranka | Zobrazeni | Pozice | Na jake dotazy rankuje |
|---|---:|---:|---|
| /poradna/internet-vypadava-co-delat/ | 99 | 6,8 | - |
| /poradna/vysoky-ping-pri-hrani/ | 50 | 5,1 | - |
| /lokality/ | 40 | 9,6 | local 534 (1); teamcity ostrava (1) |
| /poradna/pomaly-internet-vecer/ | 19 | 5,2 | - |
| /poradna/optika-vs-bezdratovy-internet/ | 17 | 7,9 | - |

### 2.2b Stranky, ktere nikdo nevidi (problem pozice)

Zobrazeni maji, ale az za pozici 10. Prepis snippetu je tu k nicemu -
potrebuji hlubsi a konkretnejsi obsah a interni odkazy.

| Stranka | Zobrazeni | Pozice | Na jake dotazy rankuje |
|---|---:|---:|---|
| /poda-karvina/ | 96 | 10,5 | poda karviná (28); poda karvina (19); poda internet (8) |
| /tarify/ | 31 | 40,5 | internet ostrava (5); nejlevnější internet ostrava (5); internet v ostravě (4) |

### 2.3 Stav indexace

| URL | Verdikt | Stav |
|---|---|---|
| /internet-muglinov/ | NEUTRAL | Objeveno – momentálně neindexováno |

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

Zkontrolovano 42 URL na https://internetostrava.cz, medianova odezva 146 ms.

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

1. Posilit obsah pro dotaz "poda internet" (pozice 7,8, 96 zobrazeni) na strance `/poda-internet-ostrava/`.
2. Prepsat title a description na `/poradna/internet-vypadava-co-delat/` (99 zobrazeni, 0 kliku, pozice 6,8).
3. Posilit obsah pro dotaz "internet podle adresy" (pozice 18,6, 69 zobrazeni) na strance `/dostupnost/`.
4. Posilit obsah pro dotaz "ověřit dostupnost internetu" (pozice 17,1, 54 zobrazeni).
5. Prepsat title a description na `/poradna/vysoky-ping-pri-hrani/` (50 zobrazeni, 0 kliku, pozice 5,1).
6. Vyresit indexaci 1 URL bez verdiktu PASS (viz sekce 2.3) - dokud nejsou v indexu, obsah na nich nema efekt.
7. Prohloubit `/poda-karvina/` (pozice 10,5, 96 zobrazeni, 372 slov) - rankuje na: poda karviná (28); poda karvina (19); poda internet (8).
8. Prepsat title a description na `/lokality/` (40 zobrazeni, 0 kliku, pozice 9,6) - rankuje na: local 534 (1); teamcity ostrava (1).
9. Prohloubit `/internet-ostrava-vitkovice/` (349 slov) - je to cilova stranka pro dotazy z keywords.json.
10. Prepsat title a description na `/poradna/pomaly-internet-vecer/` (19 zobrazeni, 0 kliku, pozice 5,2).

## 6. Mimo repozitar (musi udelat majitel)

Automatizace tyhle veci nedokaze udelat, ale jsou to nejvetsi paky:

1. **Google Business Profile** - Milan Terc, ICO 75546230, service-area business. Nazev nesmi obsahovat "PODA".
2. **Sjednotit NAP** napric weby (internetostrava.cz, overdostupnost.cz, popri.cz): jedno telefonni cislo, spravne ICO, odstranit rozporne spojeni "nezavisly" + "obchodni zastupce PODA".
3. **Zapis na Firmy.cz** kvuli Seznamu - Seznam nema verejne API, automat jeho pozice merit neumi.
4. **Realne recenze od zakazniku** - vymyslene recenze jsou proti publishing-rules a proti pravidlum Google.

