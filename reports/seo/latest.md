# SEO report 2026-11-16

Vygenerovano automaticky (`npm run seo:report`). Cisla z Google Search Console, technicke nalezy z `npm run seo:audit`.

## 1. Vykon ve vyhledavani

Obdobi **2026-10-17 az 2026-11-13**, porovnano s 2026-09-19 az 2026-10-16.

| Metrika | Aktualne | Predchozi | Zmena |
|---|---:|---:|---|
| Kliky | 19 | 30 | (-11, horsi) |
| Zobrazeni | 2125 | 1576 | (+549, lepsi) |
| CTR | 0,89 % | 1,90 % | (-1,01, horsi) |
| Prumerna pozice | 15,3 | 11,5 | (+3,8, horsi) |

| Zarizeni | Kliky | Zobrazeni | CTR | Pozice |
|---|---:|---:|---:|---:|
| DESKTOP | 11 | 854 | 1,29 % | 14,5 |
| MOBILE | 8 | 1253 | 0,64 % | 15,9 |
| TABLET | 0 | 18 | 0,00 % | 8,2 |

## 2. Prilezitosti

### 2.1 Dotazy na pozici 4-20 (na dosah prvni stranky)

| Dotaz | Pozice | Zmena | Zobrazeni | Kliky | Cluster |
|---|---:|---|---:|---:|---|
| poda internet | 7,8 | (-3,0, lepsi) | 123 | 1 | Značkové dotazy PODA |
| internet poruba | 18,4 | (+3,1, horsi) | 78 | 0 | Městské části Ostravy |
| internet vitkovice | 17,6 | (+2,5, horsi) | 37 | 0 | Městské části Ostravy |
| poda karviná | 11,4 | (-0,1, lepsi) | 37 | 0 | Značkové dotazy PODA |
| poda internet ostrava | 7,6 | (+0,7, horsi) | 36 | 0 | Značkové dotazy PODA |
| poda dostupnost | 8,8 | (-0,6, lepsi) | 21 | 0 | Značkové dotazy PODA |
| poda ostrava poruba | 11,2 | (-0,1, lepsi) | 21 | 0 | - |
| internet pokrytí | 16,9 | - | 19 | 0 | - |
| poda karvina | 11,0 | (+0,6, horsi) | 19 | 0 | Značkové dotazy PODA |
| poda poruba | 10,3 | (-2,7, lepsi) | 15 | 0 | - |
| poda ostrava | 17,9 | (+0,9, horsi) | 13 | 0 | Značkové dotazy PODA |
| internet poda | 7,6 | (-2,9, lepsi) | 8 | 0 | - |
| ostrava poruba internet | 6,0 | (-7,0, lepsi) | 7 | 0 | - |
| poda pokrytí | 5,6 | (-1,5, lepsi) | 7 | 0 | Značkové dotazy PODA |
| internet mapa pokrytí | 19,2 | - | 5 | 0 | - |

### 2.2 Viditelne stranky bez prokliku (problem snippetu)

Stranky do pozice 10, ktere uzivatel ve vysledcich vidi a presto neklikne.
Tady pomuze title a description, ne dalsi obsah.

| Stranka | Zobrazeni | Pozice | Na jake dotazy rankuje |
|---|---:|---:|---|
| /poradna/internet-vypadava-co-delat/ | 146 | 6,5 | - |
| /poda-karvina/ | 126 | 9,8 | poda karviná (37); poda internet (29); poda karvina (19) |
| /lokality/ | 46 | 9,7 | internet v ostravě (3); local 534 (1); teamcity ostrava (1) |
| /internet-ostrava-jih/ | 32 | 9,4 | internet ostrava zábřeh (4); internet ostrava hrabůvka (2); ukaž mi fotky (1) |
| /internet-marianske-hory/ | 22 | 7,7 | - |
| /poradna/pomaly-internet-vecer/ | 19 | 4,4 | - |
| /internet-hrabuvka/ | 15 | 9,4 | internet ostrava hrabůvka (1) |

### 2.2b Stranky, ktere nikdo nevidi (problem pozice)

Zobrazeni maji, ale az za pozici 10. Prepis snippetu je tu k nicemu -
potrebuji hlubsi a konkretnejsi obsah a interni odkazy.

| Stranka | Zobrazeni | Pozice | Na jake dotazy rankuje |
|---|---:|---:|---|
| /internet-ostrava-vitkovice/ | 77 | 15,6 | internet vitkovice (35); internet vítkovice (27) |
| /tarify/ | 39 | 35,2 | nejlevnější internet ostrava (9); internet ostrava (4); internet v ostravě (4) |
| /poradna/ | 15 | 36,1 | internet v ostravě (7); internet ostrava (1) |

### 2.3 Stav indexace

| URL | Verdikt | Stav |
|---|---|---|
| /internet-muglinov/ | NEUTRAL | Google adresu URL nezná |

## 3. Technicky stav webu

Zkontrolovano 41 stranek (19 v Ads zone), 38 JSON-LD bloku.
Nalezeno **0 chyb** a 0 varovani.

### 3.4 Produkcni web

Zkontrolovano 42 URL na https://internetostrava.cz, medianova odezva 66 ms.

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

1. Prepsat title a description na `/poradna/internet-vypadava-co-delat/` (146 zobrazeni, 0 kliku, pozice 6,5).
2. Posilit obsah pro dotaz "poda internet" (pozice 7,8, 123 zobrazeni) na strance `/poda-internet-ostrava/`.
3. Prepsat title a description na `/poda-karvina/` (126 zobrazeni, 0 kliku, pozice 9,8) - rankuje na: poda karviná (37); poda internet (29); poda karvina (19).
4. Posilit obsah pro dotaz "internet poruba" (pozice 18,4, 78 zobrazeni) na strance `/internet-ostrava-poruba/`.
5. Prepsat title a description na `/lokality/` (46 zobrazeni, 0 kliku, pozice 9,7) - rankuje na: internet v ostravě (3); local 534 (1); teamcity ostrava (1).
6. Vyresit indexaci 1 URL bez verdiktu PASS (viz sekce 2.3) - dokud nejsou v indexu, obsah na nich nema efekt.
7. Posilit obsah pro dotaz "internet vitkovice" (pozice 17,6, 37 zobrazeni) na strance `/internet-ostrava-vitkovice/`.
8. Prohloubit `/internet-ostrava-vitkovice/` (pozice 15,6, 77 zobrazeni, 1673 slov) - rankuje na: internet vitkovice (35); internet vítkovice (27).
9. Prepsat title a description na `/internet-ostrava-jih/` (32 zobrazeni, 0 kliku, pozice 9,4) - rankuje na: internet ostrava zábřeh (4); internet ostrava hrabůvka (2); ukaž mi fotky (1).
10. Prepsat title a description na `/internet-marianske-hory/` (22 zobrazeni, 0 kliku, pozice 7,7).

## 6. Mimo repozitar (musi udelat majitel)

Automatizace tyhle veci nedokaze udelat, ale jsou to nejvetsi paky:

1. **Google Business Profile** - Milan Terc, ICO 75546230, service-area business. Nazev nesmi obsahovat "PODA".
2. **Sjednotit NAP** napric weby (internetostrava.cz, overdostupnost.cz, popri.cz): jedno telefonni cislo, spravne ICO, odstranit rozporne spojeni "nezavisly" + "obchodni zastupce PODA".
3. **Zapis na Firmy.cz** kvuli Seznamu - Seznam nema verejne API, automat jeho pozice merit neumi.
4. **Realne recenze od zakazniku** - vymyslene recenze jsou proti publishing-rules a proti pravidlum Google.

