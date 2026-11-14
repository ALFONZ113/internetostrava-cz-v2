# SEO report 2026-11-09

Vygenerovano automaticky (`npm run seo:report`). Cisla z Google Search Console, technicke nalezy z `npm run seo:audit`.

## 1. Vykon ve vyhledavani

Obdobi **2026-10-10 az 2026-11-06**, porovnano s 2026-09-12 az 2026-10-09.

| Metrika | Aktualne | Predchozi | Zmena |
|---|---:|---:|---|
| Kliky | 17 | 31 | (-14, horsi) |
| Zobrazeni | 1975 | 1656 | (+319, lepsi) |
| CTR | 0,86 % | 1,87 % | (-1,01, horsi) |
| Prumerna pozice | 15,3 | 10,5 | (+4,7, horsi) |

| Zarizeni | Kliky | Zobrazeni | CTR | Pozice |
|---|---:|---:|---:|---:|
| MOBILE | 10 | 1172 | 0,85 % | 15,8 |
| DESKTOP | 7 | 790 | 0,89 % | 14,6 |
| TABLET | 0 | 13 | 0,00 % | 7,8 |

## 2. Prilezitosti

### 2.1 Dotazy na pozici 4-20 (na dosah prvni stranky)

| Dotaz | Pozice | Zmena | Zobrazeni | Kliky | Cluster |
|---|---:|---|---:|---:|---|
| poda internet | 7,9 | (-4,3, lepsi) | 113 | 1 | Značkové dotazy PODA |
| internet poruba | 19,7 | (+2,7, horsi) | 54 | 0 | Městské části Ostravy |
| poda internet ostrava | 7,6 | (+0,1, horsi) | 37 | 1 | Značkové dotazy PODA |
| poda karviná | 11,2 | (-0,3, lepsi) | 35 | 0 | Značkové dotazy PODA |
| internet vitkovice | 16,4 | (+1,4, horsi) | 33 | 0 | Městské části Ostravy |
| poda karvina | 11,0 | (+0,3, horsi) | 19 | 0 | Značkové dotazy PODA |
| poda dostupnost | 8,8 | (-0,7, lepsi) | 17 | 0 | Značkové dotazy PODA |
| poda ostrava | 14,4 | - | 12 | 0 | Značkové dotazy PODA |
| poda ostrava poruba | 11,2 | (+0,2, horsi) | 12 | 0 | - |
| internet pokrytí | 19,1 | - | 9 | 0 | - |
| internet poda | 7,6 | (-3,3, lepsi) | 8 | 0 | - |
| poda pokrytí | 6,3 | (-0,1, lepsi) | 8 | 0 | Značkové dotazy PODA |
| poda poruba | 9,9 | (-3,8, lepsi) | 7 | 0 | - |
| poskytovatelé internetu ostrava | 18,7 | (beze zmeny) | 7 | 0 | - |
| internet mapa pokrytí | 19,2 | - | 5 | 0 | - |

### 2.2 Viditelne stranky bez prokliku (problem snippetu)

Stranky do pozice 10, ktere uzivatel ve vysledcich vidi a presto neklikne.
Tady pomuze title a description, ne dalsi obsah.

| Stranka | Zobrazeni | Pozice | Na jake dotazy rankuje |
|---|---:|---:|---|
| /poradna/internet-vypadava-co-delat/ | 137 | 6,7 | - |
| /poradna/vysoky-ping-pri-hrani/ | 55 | 4,7 | - |
| /internet-ostrava-jih/ | 33 | 10,0 | internet ostrava hrabůvka (2); internet ostrava zábřeh (2); ukaž mi fotky (1) |
| /poradna/pomaly-internet-vecer/ | 25 | 4,8 | - |
| /internet-marianske-hory/ | 23 | 7,7 | - |
| /poradna/slaba-wifi-v-panelaku/ | 20 | 5,3 | - |
| /internet-hrabuvka/ | 17 | 8,9 | - |

### 2.2b Stranky, ktere nikdo nevidi (problem pozice)

Zobrazeni maji, ale az za pozici 10. Prepis snippetu je tu k nicemu -
potrebuji hlubsi a konkretnejsi obsah a interni odkazy.

| Stranka | Zobrazeni | Pozice | Na jake dotazy rankuje |
|---|---:|---:|---|
| /poda-dostupnost/ | 284 | 24,5 | dostupnost internetu na adrese (26); dostupnost internetu podle adresy (25); internet podle adresy (23) |
| /poda-karvina/ | 114 | 10,2 | poda karviná (35); poda karvina (19); poda internet (16) |
| /internet-ostrava-vitkovice/ | 68 | 14,7 | internet vitkovice (32); internet vítkovice (21) |
| /tarify/ | 44 | 40,1 | nejlevnější internet ostrava (9); internet ostrava (5); internet v ostravě (4) |
| /lokality/ | 37 | 10,2 | internet v ostravě (2); local 534 (1); teamcity ostrava (1) |

### 2.3 Stav indexace

| URL | Verdikt | Stav |
|---|---|---|
| /internet-muglinov/ | NEUTRAL | Google adresu URL nezná |

## 3. Technicky stav webu

Zkontrolovano 41 stranek (19 v Ads zone), 38 JSON-LD bloku.
Nalezeno **0 chyb** a 0 varovani.

### 3.4 Produkcni web

Zkontrolovano 42 URL na https://internetostrava.cz, medianova odezva 126 ms.

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

1. Prepsat title a description na `/poradna/internet-vypadava-co-delat/` (137 zobrazeni, 0 kliku, pozice 6,7).
2. Prohloubit `/poda-dostupnost/` (pozice 24,5, 284 zobrazeni, 1440 slov) - rankuje na: dostupnost internetu na adrese (26); dostupnost internetu podle adresy (25); internet podle adresy (23).
3. Posilit obsah pro dotaz "poda internet" (pozice 7,9, 113 zobrazeni) na strance `/poda-internet-ostrava/`.
4. Posilit obsah pro dotaz "internet poruba" (pozice 19,7, 54 zobrazeni) na strance `/internet-ostrava-poruba/`.
5. Prepsat title a description na `/poradna/vysoky-ping-pri-hrani/` (55 zobrazeni, 0 kliku, pozice 4,7).
6. Prohloubit `/poda-karvina/` (pozice 10,2, 114 zobrazeni, 1498 slov) - rankuje na: poda karviná (35); poda karvina (19); poda internet (16).
7. Vyresit indexaci 1 URL bez verdiktu PASS (viz sekce 2.3) - dokud nejsou v indexu, obsah na nich nema efekt.
8. Posilit obsah pro dotaz "poda internet ostrava" (pozice 7,6, 37 zobrazeni) na strance `/poda-internet-ostrava/`.
9. Prepsat title a description na `/internet-ostrava-jih/` (33 zobrazeni, 0 kliku, pozice 10,0) - rankuje na: internet ostrava hrabůvka (2); internet ostrava zábřeh (2); ukaž mi fotky (1).
10. Prohloubit `/internet-ostrava-vitkovice/` (pozice 14,7, 68 zobrazeni, 1673 slov) - rankuje na: internet vitkovice (32); internet vítkovice (21).

## 6. Mimo repozitar (musi udelat majitel)

Automatizace tyhle veci nedokaze udelat, ale jsou to nejvetsi paky:

1. **Google Business Profile** - Milan Terc, ICO 75546230, service-area business. Nazev nesmi obsahovat "PODA".
2. **Sjednotit NAP** napric weby (internetostrava.cz, overdostupnost.cz, popri.cz): jedno telefonni cislo, spravne ICO, odstranit rozporne spojeni "nezavisly" + "obchodni zastupce PODA".
3. **Zapis na Firmy.cz** kvuli Seznamu - Seznam nema verejne API, automat jeho pozice merit neumi.
4. **Realne recenze od zakazniku** - vymyslene recenze jsou proti publishing-rules a proti pravidlum Google.

