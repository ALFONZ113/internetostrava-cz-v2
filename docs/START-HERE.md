# InternetOstrava.cz: co udělat dál

Web je připravený jako rychlý statický projekt pro GitHub a Vercel. Nepotřebujete programovat.

## 1. Potvrďte údaje před zveřejněním

Pošlete Codexu odpovědi:

1. Je správný telefon `+420 730 431 313`?
2. Je správný e-mail `terc@poda.cz`?
3. Kdo je právně správce osobních údajů: jméno nebo firma, adresa a IČO?
4. Jsou ceny `300 Kč`, `440 Kč` a `570 Kč` stále aktuální a smíte je na webu publikovat?
5. Je formulace „obchodní zástupce PODA a.s.“ přesná?

## 2. Kupte doménu

Zaregistrujte `internetostrava.cz` u registrátora, například WEDOS, FORPSI nebo Český hosting. Doména zatím při kontrole 2026-06-02 neměla aktivní DNS záznam.

## 3. Nahrajte web na GitHub

1. Vytvořte nový soukromý GitHub repozitář, například `internetostrava-cz`.
2. Pošlete Codexu URL repozitáře. Codex nahraje hotové soubory.

## 4. Zveřejněte web přes Vercel

1. Vytvořte účet na `https://vercel.com/` a přihlaste se přes GitHub.
2. Klikněte na `Add New...` → `Project`.
3. Importujte GitHub repozitář `internetostrava-cz`.
4. Framework preset nastavte na `Other`.
5. Build command ani output directory nemusíte vyplňovat.
6. Po nasazení otevřete projekt → `Settings` → `Domains` a přidejte `internetostrava.cz`.
7. Nastavte DNS podle pokynů Vercelu.

Oficiální návody: [import Git repozitáře](https://vercel.com/docs/getting-started-with-vercel/import) a [nastavení vlastní domény](https://vercel.com/docs/domains/set-up-custom-domain).

## 5. Otestujte web

1. Otevřete web na mobilu i počítači.
2. Odešlete testovací formulář z `/dostupnost/`.
3. Ověřte, že se otevře vaše poštovní aplikace s připraveným dotazem.
4. Zkontrolujte telefonní odkazy a e-mail.
5. Před zveřejněním doplňte finální právní text ochrany údajů.
6. Pro automatický formulář bez otevírání e-mailu později doplníme vlastní Vercel endpoint nebo schválenou formulářovou službu.

## 6. Připojte měření

1. Vytvořte Google Search Console property pro `internetostrava.cz`.
2. Ověřte doménu přes DNS.
3. Odešlete sitemapu `https://internetostrava.cz/sitemap.xml`.
4. Vytvořte GA4 property a pošlete Codexu measurement ID.
5. Propojte Search Console s GA4.

## 7. Budujte náskok

První měsíc:

1. Vyžádejte indexaci hlavní stránky, tarifů a tří lokalit v Search Console.
2. Přidejte přirozený odkaz na nový web z relevantních částí `overdostupnost.cz` a `popri.cz`.
3. Sledujte dotazy `internet ostrava`, `optický internet ostrava`, `poda ostrava`, `internet ostrava poruba`.
4. Přidejte další lokalitu pouze tehdy, když pro ni dokážete napsat skutečně užitečný unikátní obsah.
5. Po 28 dnech vyhodnoťte impresie, prokliky, pozice a odeslané formuláře.

## Ověřené zdroje

- [Vercel: Import an existing project](https://vercel.com/docs/getting-started-with-vercel/import)
- [Vercel: Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain)
- [Vercel: Deploying to Vercel](https://vercel.com/docs/deployments/deployment-methods)
- [Google Search Central: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Search Central: Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
