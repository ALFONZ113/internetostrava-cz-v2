# SEO automatizace

Nahrazuje ruční cyklus „jednou za čas stáhnout CSV ze Search Console a podívat se, co s tím".
Běží ve dvou vrstvách, které se nepřekrývají.

| Vrstva | Kde běží | Co dělá | Kdy |
|---|---|---|---|
| **A — měření** | GitHub Actions (`.github/workflows/seo-monitor.yml`) | stáhne data ze Search Console, zkontroluje živý web, spustí audit, sestaví report | pondělí 05:12 UTC |
| **B — práce** | Claude Routine (naplánovaná session) | přečte report a provede nejvýše tři úpravy webu | 1. a 15. v měsíci |

Rozdělení má technický důvod: prostředí, ve kterém běží Claude, nemá odchozí přístup na internet,
takže nemůže samo volat Google API ani načíst produkční web. GitHub Actions runner ho má.
Vrstva A proto data **commitne do repozitáře** a vrstva B pracuje nad nimi.

## Co dělá vrstva A

```
npm run check        existující kontrola (title, description, canonical, rozbité odkazy)
npm run seo:audit    kvalitativní audit + obchodní pravidla   -> reports/seo/audit-latest.json
npm run seo:gsc      Search Console API                       -> data/gsc/YYYY-MM-DD.json
npm run seo:live     kontrola produkce přes HTTP              -> reports/seo/live-latest.json
npm run seo:report   složí z toho report                      -> reports/seo/YYYY-MM-DD.md
```

`npm run seo` spustí celý řetěz lokálně (bez GSC a bez kontroly produkce, na ty je potřeba síť).

Data a reporty se **nenasazují na web** — `.vercelignore` je z deploye vylučuje, aby dotazy
ze Search Console nebyly veřejně dostupné na internetostrava.cz.

## Nastavenie Search Console API (jednorazovo, ~10 minút)

Bez tohto kroku automat funguje, ale report nemá čísla — obsahuje len technickú časť.

1. Otvor [console.cloud.google.com](https://console.cloud.google.com/) a vytvor nový projekt
   (napr. `internetostrava-seo`).
2. V **APIs & Services → Library** vyhľadaj **Google Search Console API** a daj **Enable**.
3. V **APIs & Services → Credentials → Create credentials → Service account** vytvor service
   account (napr. `gsc-reader`). Rolu v projekte mu nemusíš dávať žiadnu.
4. Otvor vytvorený service account → záložka **Keys** → **Add key → Create new key → JSON**.
   Stiahne sa ti súbor. **Nikdy ho nedávaj do repozitára.**
5. Skopíruj e-mail service accountu (vyzerá ako `gsc-reader@…iam.gserviceaccount.com`).
6. V [Search Console](https://search.google.com/search-console) otvor property
   `internetostrava.cz` → **Nastavenia → Používatelia a povolenia → Pridať používateľa**,
   vlož ten e-mail a daj mu oprávnenie **Úplné** (nie „Obmedzené" — URL Inspection API
   vyžaduje owner alebo full user, inak kontrola indexácie nebude fungovať).
7. Na GitHube v repozitári: **Settings → Secrets and variables → Actions → New repository secret**
   - `GSC_SERVICE_ACCOUNT_JSON` — celý obsah stiahnutého JSON súboru
   - `GSC_SITE_URL` — `sc-domain:internetostrava.cz` (ak máš property overenú cez DNS)
     alebo `https://internetostrava.cz/` (ak cez URL prefix)

Overenie: v záložke **Actions** spusti workflow **SEO monitor** ručne (`Run workflow`).
V súhrne behu uvidíš celý report. Ak secret chýba, krok Search Console sa preskočí
a workflow nespadne — to je zámer.

### Ako to vypnúť

- **Vrstvu A**: v Actions → SEO monitor → `…` → Disable workflow.
- **Vrstvu B**: povedz Claude „zruš SEO routine", alebo ju vypni v zozname Routines.

## Pravidla pro vrstvu B (agent)

Tohle je závazný postup pro naplánovanou Claude session. Přednost mají `CLAUDE.md`,
`AGENTS.md` a `.agents/skills/build-internetostrava-site/references/publishing-rules.md`.

### Postup

1. `git pull` a přečíst `reports/seo/latest.md`, `data/seo/keywords.json` a `docs/SEO-PLAN.md`.
2. Vzít **nejvýše tři** úkoly ze sekce „Úkoly pro tento cyklus" shora. Chyby auditu mají přednost
   před vším ostatním.
3. Provést úpravy. Držet zónové rozdělení z `CLAUDE.md` — nejdřív určit, do které zóny stránka patří.
4. Spustit `npm run check` a `npm run seo:audit`.
5. Připsat datovaný záznam do `docs/SEO-PLAN.md` (co, proč, podle jakého čísla z reportu).
6. Aktualizovat `sitemap.xml` a `llms.txt`, pokud přibyla nebo se změnila indexovatelná URL.
7. Push podle brány níže.

### Brána před pushem na main

Push na `main` (a tím nasazení na produkci přes Vercel) je povolený **jen když**:

- `npm run check` skončí bez chyby, **a**
- `npm run seo:audit` skončí bez chyby (tj. 0 nálezů severity `error` — zónová pojistka,
  cache token, canonical, chráněné hodnoty), **a**
- změna se nedotkla žádné chráněné hodnoty z `data/seo/facts.json`.

Když kterákoli podmínka neplatí: **nepushovat**. Otevřít pull request a v něm popsat,
co je špatně a co se navrhuje. Rozhodnutí je na majiteli.

### Co agent smí

- prohlubovat existující stránky o věcný, konkrétní obsah,
- přepisovat title a description stránek s dobrou pozicí a nulovým CTR,
- doplňovat FAQ a srovnávat je 1:1 s `FAQPage` schématem,
- přidávat kontextové interní odkazy,
- opravovat technické nálezy auditu,
- aktualizovat `sitemap.xml`, `llms.txt` a cache-busting token.

### Co agent nesmí nikdy

- **měnit ceny, telefon, e-maily, IČO nebo právní texty** — to potvrzuje majitel,
- psát slovo „PODA" kamkoli do Ads zóny (včetně e-mailu `terc@obchod.poda.cz`),
- vymýšlet procenta pokrytí, recenze, hodnocení, reakční doby ani termíny instalace,
- přidávat recenzní schéma nebo `LocalBusiness` s adresou,
- zakládat další tenké lokální stránky — vlna 2 je vědomě odložená, dokud vlna 1 negeneruje
  zobrazení,
- kopírovat obsah konkurentů (`internet-ostrava.online`, `overit-dostupnost.online`),
- slibovat pozice ve vyhledávání,
- vypínat nebo obcházet kontroly, aby prošel push.

## Co automatizace neumí

- **Změřit Seznam.cz.** Nemá veřejné API pro pozice. Páka je zápis na Firmy.cz — ruční krok.
- **Dostat web na první místo na dotaz `internet Ostrava`.** Výzkum z 2026-08-18 to uzavřel:
  pole obsazené celostátními srovnávači a národními ISP. Automat cílí na značkový cluster
  a dlouhý chvost, kde je pohyb reálný.
- **Google Business Profile, sjednocení NAP napříč weby majitele, získání reálných recenzí.**
  Report je připomíná v sekci 6, udělat je musí majitel.
- **Garantovat výsledek.** Měří se trend, ne sliby.
