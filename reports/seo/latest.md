# SEO report 2026-10-19

Vygenerovano automaticky (`npm run seo:report`). Cisla z Google Search Console, technicke nalezy z `npm run seo:audit`.

## 1. Vykon ve vyhledavani

Obdobi **2026-09-19 az 2026-10-16**, porovnano s 2026-08-22 az 2026-09-18.

| Metrika | Aktualne | Predchozi | Zmena |
|---|---:|---:|---|
| Kliky | 30 | 19 | (+11, lepsi) |
| Zobrazeni | 1576 | 1616 | (-40, horsi) |
| CTR | 1,90 % | 1,18 % | (+0,73, lepsi) |
| Prumerna pozice | 11,5 | 12,4 | (-0,9, lepsi) |

| Zarizeni | Kliky | Zobrazeni | CTR | Pozice |
|---|---:|---:|---:|---:|
| MOBILE | 17 | 863 | 1,97 % | 11,3 |
| DESKTOP | 12 | 697 | 1,72 % | 11,8 |
| TABLET | 1 | 16 | 6,25 % | 8,7 |

## 2. Prilezitosti

### 2.1 Dotazy na pozici 4-20 (na dosah prvni stranky)

| Dotaz | Pozice | Zmena | Zobrazeni | Kliky | Cluster |
|---|---:|---|---:|---:|---|
| ověřit dostupnost internetu | 9,4 | (-11,8, lepsi) | 73 | 0 | - |
| internet podle adresy | 16,5 | (-6,7, lepsi) | 69 | 0 | Ověření podle adresy |
| dostupnost internetu podle adresy | 17,5 | (-0,7, lepsi) | 66 | 0 | Ověření podle adresy |
| poda internet | 10,8 | (-7,2, lepsi) | 53 | 1 | Značkové dotazy PODA |
| internet dostupnost | 6,2 | - | 33 | 0 | - |
| poda internet ostrava | 6,9 | (-0,4, lepsi) | 28 | 2 | Značkové dotazy PODA |
| internet ostrava poruba | 14,9 | (-8,8, lepsi) | 25 | 1 | Městské části Ostravy |
| poda karviná | 11,5 | (-0,3, lepsi) | 17 | 0 | Značkové dotazy PODA |
| internet poruba | 15,3 | (-13,9, lepsi) | 16 | 0 | Městské části Ostravy |
| internet vitkovice | 15,2 | (-7,3, lepsi) | 16 | 0 | Městské části Ostravy |
| poda karvina | 10,4 | (-1,9, lepsi) | 16 | 0 | Značkové dotazy PODA |
| internet slezke | 16,9 | (+0,4, horsi) | 14 | 0 | - |
| poda dostupnost | 9,3 | (-1,1, lepsi) | 12 | 0 | Značkové dotazy PODA |
| poda pokrytí | 7,1 | (+0,7, horsi) | 9 | 0 | Značkové dotazy PODA |
| internet poda | 10,6 | (+3,1, horsi) | 7 | 0 | - |

### 2.2 Viditelne stranky bez prokliku (problem snippetu)

Stranky do pozice 10, ktere uzivatel ve vysledcich vidi a presto neklikne.
Tady pomuze title a description, ne dalsi obsah.

| Stranka | Zobrazeni | Pozice | Na jake dotazy rankuje |
|---|---:|---:|---|
| /poradna/vysoky-ping-pri-hrani/ | 100 | 5,4 | - |
| /poradna/internet-vypadava-co-delat/ | 80 | 8,1 | nefunguje internet (1); proč vypadává wifi (1) |
| /poradna/dostupnost-optickeho-internetu-ostrava/ | 28 | 5,3 | - |

### 2.2b Stranky, ktere nikdo nevidi (problem pozice)

Zobrazeni maji, ale az za pozici 10. Prepis snippetu je tu k nicemu -
potrebuji hlubsi a konkretnejsi obsah a interni odkazy.

| Stranka | Zobrazeni | Pozice | Na jake dotazy rankuje |
|---|---:|---:|---|
| /poda-karvina/ | 80 | 10,8 | poda karviná (17); poda karvina (16); poda internet (4) |
| /internet-slezska-ostrava/ | 37 | 14,3 | internet slezke (14); internet v ostravě (2); internet ostrava (1) |
| /tarify/ | 21 | 48,3 | internet ostrava (9); poskytovatelé internetu ostrava (4); nejlevnější internet ostrava (2) |

### 2.3 Stav indexace

| URL | Verdikt | Stav |
|---|---|---|
| /internet-muglinov/ | NEUTRAL | Objeveno – momentálně neindexováno |
| /ochrana-udaju/ | NEUTRAL | Objeveno – momentálně neindexováno |

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

Zkontrolovano 42 URL na https://internetostrava.cz, medianova odezva 49 ms.

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

1. Prepsat title a description na `/poradna/vysoky-ping-pri-hrani/` (100 zobrazeni, 0 kliku, pozice 5,4).
2. Prepsat title a description na `/poradna/internet-vypadava-co-delat/` (80 zobrazeni, 0 kliku, pozice 8,1) - rankuje na: nefunguje internet (1); proč vypadává wifi (1).
3. Posilit obsah pro dotaz "ověřit dostupnost internetu" (pozice 9,4, 73 zobrazeni).
4. Posilit obsah pro dotaz "internet podle adresy" (pozice 16,5, 69 zobrazeni) na strance `/dostupnost/`.
5. Posilit obsah pro dotaz "dostupnost internetu podle adresy" (pozice 17,5, 66 zobrazeni) na strance `/dostupnost/`.
6. Vyresit indexaci 2 URL bez verdiktu PASS (viz sekce 2.3) - dokud nejsou v indexu, obsah na nich nema efekt.
7. Prohloubit `/poda-karvina/` (pozice 10,8, 80 zobrazeni, 372 slov) - rankuje na: poda karviná (17); poda karvina (16); poda internet (4).
8. Prepsat title a description na `/poradna/dostupnost-optickeho-internetu-ostrava/` (28 zobrazeni, 0 kliku, pozice 5,3).
9. Prohloubit `/internet-ostrava-vitkovice/` (349 slov) - je to cilova stranka pro dotazy z keywords.json.
10. Prohloubit `/internet-slezska-ostrava/` (pozice 14,3, 37 zobrazeni, 454 slov) - rankuje na: internet slezke (14); internet v ostravě (2); internet ostrava (1).

## 6. Mimo repozitar (musi udelat majitel)

Automatizace tyhle veci nedokaze udelat, ale jsou to nejvetsi paky:

1. **Google Business Profile** - Milan Terc, ICO 75546230, service-area business. Nazev nesmi obsahovat "PODA".
2. **Sjednotit NAP** napric weby (internetostrava.cz, overdostupnost.cz, popri.cz): jedno telefonni cislo, spravne ICO, odstranit rozporne spojeni "nezavisly" + "obchodni zastupce PODA".
3. **Zapis na Firmy.cz** kvuli Seznamu - Seznam nema verejne API, automat jeho pozice merit neumi.
4. **Realne recenze od zakazniku** - vymyslene recenze jsou proti publishing-rules a proti pravidlum Google.

