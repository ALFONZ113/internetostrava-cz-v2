# SEO report 2026-10-12

Vygenerovano automaticky (`npm run seo:report`). Cisla z Google Search Console, technicke nalezy z `npm run seo:audit`.

## 1. Vykon ve vyhledavani

Obdobi **2026-09-12 az 2026-10-09**, porovnano s 2026-08-15 az 2026-09-11.

| Metrika | Aktualne | Predchozi | Zmena |
|---|---:|---:|---|
| Kliky | 31 | 15 | (+16, lepsi) |
| Zobrazeni | 1656 | 1375 | (+281, lepsi) |
| CTR | 1,87 % | 1,09 % | (+0,78, lepsi) |
| Prumerna pozice | 10,5 | 13,4 | (-2,8, lepsi) |

| Zarizeni | Kliky | Zobrazeni | CTR | Pozice |
|---|---:|---:|---:|---:|
| MOBILE | 17 | 866 | 1,96 % | 10,0 |
| DESKTOP | 13 | 769 | 1,69 % | 11,3 |
| TABLET | 1 | 21 | 4,76 % | 7,2 |

## 2. Prilezitosti

### 2.1 Dotazy na pozici 4-20 (na dosah prvni stranky)

| Dotaz | Pozice | Zmena | Zobrazeni | Kliky | Cluster |
|---|---:|---|---:|---:|---|
| ověřit dostupnost internetu | 8,8 | (-12,2, lepsi) | 75 | 0 | - |
| dostupnost internetu podle adresy | 17,3 | (-0,2, lepsi) | 74 | 0 | Ověření podle adresy |
| internet podle adresy | 16,5 | (-9,1, lepsi) | 73 | 0 | Ověření podle adresy |
| poda internet | 12,2 | (-7,3, lepsi) | 50 | 1 | Značkové dotazy PODA |
| internet dostupnost | 6,2 | - | 33 | 0 | - |
| poda internet ostrava | 7,5 | (+0,7, horsi) | 31 | 1 | Značkové dotazy PODA |
| internet ostrava poruba | 17,0 | (-7,8, lepsi) | 21 | 1 | Městské části Ostravy |
| internet poruba | 17,0 | (-13,0, lepsi) | 19 | 0 | Městské části Ostravy |
| internet slezke | 16,8 | (+0,3, horsi) | 17 | 0 | - |
| poda karvina | 10,7 | (-1,7, lepsi) | 16 | 0 | Značkové dotazy PODA |
| poda dostupnost | 9,5 | (-0,9, lepsi) | 15 | 0 | Značkové dotazy PODA |
| poda karviná | 11,5 | (-0,6, lepsi) | 14 | 0 | Značkové dotazy PODA |
| poda pokrytí | 6,4 | (-0,8, lepsi) | 11 | 0 | Značkové dotazy PODA |
| internet ostrava zábřeh | 12,8 | (+2,6, horsi) | 9 | 0 | - |
| internet poda | 10,9 | (+4,7, horsi) | 9 | 0 | - |

### 2.2 Viditelne stranky bez prokliku (problem snippetu)

Stranky do pozice 10, ktere uzivatel ve vysledcich vidi a presto neklikne.
Tady pomuze title a description, ne dalsi obsah.

| Stranka | Zobrazeni | Pozice | Na jake dotazy rankuje |
|---|---:|---:|---|
| /poradna/vysoky-ping-pri-hrani/ | 158 | 6,0 | - |
| /poradna/internet-vypadava-co-delat/ | 115 | 8,3 | výpadky wifi (2); nefunguje internet (1); proč vypadává wifi (1) |
| /poradna/dostupnost-optickeho-internetu-ostrava/ | 31 | 5,2 | - |
| /poradna/slaba-wifi-v-panelaku/ | 23 | 8,4 | slabá wifi (9); slabá wifi v bytě (1); slabá wifi v domě (1) |

### 2.2b Stranky, ktere nikdo nevidi (problem pozice)

Zobrazeni maji, ale az za pozici 10. Prepis snippetu je tu k nicemu -
potrebuji hlubsi a konkretnejsi obsah a interni odkazy.

| Stranka | Zobrazeni | Pozice | Na jake dotazy rankuje |
|---|---:|---:|---|
| /poda-karvina/ | 68 | 10,8 | poda karvina (16); poda karviná (14); poda internet (4) |
| /internet-slezska-ostrava/ | 43 | 14,1 | internet slezke (17); internet v ostravě (2); internet ostrava (1) |

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

Zkontrolovano 42 URL na https://internetostrava.cz, medianova odezva 20 ms.

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

1. Prepsat title a description na `/poradna/vysoky-ping-pri-hrani/` (158 zobrazeni, 0 kliku, pozice 6,0).
2. Prepsat title a description na `/poradna/internet-vypadava-co-delat/` (115 zobrazeni, 0 kliku, pozice 8,3) - rankuje na: výpadky wifi (2); nefunguje internet (1); proč vypadává wifi (1).
3. Posilit obsah pro dotaz "ověřit dostupnost internetu" (pozice 8,8, 75 zobrazeni).
4. Posilit obsah pro dotaz "dostupnost internetu podle adresy" (pozice 17,3, 74 zobrazeni) na strance `/dostupnost/`.
5. Posilit obsah pro dotaz "internet podle adresy" (pozice 16,5, 73 zobrazeni) na strance `/dostupnost/`.
6. Vyresit indexaci 1 URL bez verdiktu PASS (viz sekce 2.3) - dokud nejsou v indexu, obsah na nich nema efekt.
7. Prepsat title a description na `/poradna/dostupnost-optickeho-internetu-ostrava/` (31 zobrazeni, 0 kliku, pozice 5,2).
8. Prohloubit `/poda-karvina/` (pozice 10,8, 68 zobrazeni, 372 slov) - rankuje na: poda karvina (16); poda karviná (14); poda internet (4).
9. Prohloubit `/internet-ostrava-vitkovice/` (349 slov) - je to cilova stranka pro dotazy z keywords.json.
10. Prepsat title a description na `/poradna/slaba-wifi-v-panelaku/` (23 zobrazeni, 0 kliku, pozice 8,4) - rankuje na: slabá wifi (9); slabá wifi v bytě (1); slabá wifi v domě (1).

## 6. Mimo repozitar (musi udelat majitel)

Automatizace tyhle veci nedokaze udelat, ale jsou to nejvetsi paky:

1. **Google Business Profile** - Milan Terc, ICO 75546230, service-area business. Nazev nesmi obsahovat "PODA".
2. **Sjednotit NAP** napric weby (internetostrava.cz, overdostupnost.cz, popri.cz): jedno telefonni cislo, spravne ICO, odstranit rozporne spojeni "nezavisly" + "obchodni zastupce PODA".
3. **Zapis na Firmy.cz** kvuli Seznamu - Seznam nema verejne API, automat jeho pozice merit neumi.
4. **Realne recenze od zakazniku** - vymyslene recenze jsou proti publishing-rules a proti pravidlum Google.

