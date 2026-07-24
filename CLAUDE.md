# internetostrava.cz

Statický český web obchodního zástupce pro prodej internetového připojení v Ostravě a okolí. Bez build kroku — čisté HTML/CSS/JS, nasazuje se přes GitHub → Vercel (vercel.json řeší redirecty, hlavičky a /api/leads serverless funkci).

## Nejdůležitější pravidlo: dvě obsahové zóny

Majitel webu je obchodní zástupce PODA a.s. PODA mu **zakázala používat značku PODA v Google Ads**. Web je proto rozdělen:

**Ads zóna — slovo „PODA" se NIKDY nesmí objevit** v textu, title, meta, OG, JSON-LD schema, navigaci ani patičce (včetně e-mailu terc@obchod.poda.cz, doména obsahuje „poda"):
- `/` (index.html), `/tarify/`, `/dostupnost/`, `/kontakt/`, `/dekujeme/`, `/ochrana-udaju/`, `/lokality/`, `404.html`
- `/lokality/` je rozcestník městských částí (odkazuje se z navigace obou zón), proto musí být PODA-neutrální — nav i patička jako homepage; odkazy na `/internet-*` stránky jsou v pořádku.
- Patička: „Nezávislý poradenský web pro připojení v Ostravě a okolí."
- Tarify zde mají neutrální názvy: Giga 1000 + TV, Giga 1000 + TV 10 programů, Giga 2000
- Google Ads kampaně smí směřovat pouze sem.

**PODA SEO zóna — značka PODA se používá cíleně** (organické dotazy „poda internet", „poda ostrava", „poda dostupnost", „poda karvina"):
- `/poda-internet-ostrava/` (hlavní hub, původní PODA názvy tarifů, viditelný disclosure o zástupci), `/poda-dostupnost/`, `/poda-karvina/`
- lokální stránky obvodů `/internet-ostrava-poruba/`, `/internet-ostrava-jih/`, `/internet-marianske-hory/`, `/internet-moravska-ostrava/`, `/internet-ostrava-vitkovice/`, `/internet-slezska-ostrava/`
- lokální stránky částí (vlna 1) `/internet-hrabuvka/`, `/internet-zabreh/`, `/internet-ostrava-dubina/`, `/internet-vyskovice/`, `/internet-belsky-les/`, `/internet-ostrava-privoz/`, `/internet-hulvaky/`, `/internet-svinov/`, `/internet-pustkovec/`, `/internet-trebovice/`, `/internet-muglinov/`, `/internet-michalkovice/` — každá s unikátním obsahem o zástavbě, breadcrumbem k rodičovskému obvodu a formulářem s poznámkou `Lokalita: X`
- Navigace zde obsahuje položku „PODA internet" → /poda-internet-ostrava/; patička plný disclosure „obchodní zástupce PODA a.s."
- Z Ads zóny se na PODA stránky viditelně neodkazuje; opačným směrem ano.

Při jakékoli úpravě stránky nejdřív urči, do které zóny patří. Po úpravě Ads zóny spusť grep na `poda` (case-insensitive) přes její soubory — musí být 0 výskytů.

## Obchodní fakta (neměnit bez potvrzení majitele)

- Kontakt: telefon 777 425 230 jednotně na celém webu (obě zóny); e-mail podle zóny — Ads/neutrální zóna: info@internetostrava.cz, PODA zóna: terc@obchod.poda.cz. Mobilní lišta v main.js přebírá telefon z tel: odkazu stránky.
- Leady chodí na terc@obchod.poda.cz (api/leads.js, env LEAD_TO_EMAIL; fallback mailto v assets/main.js)
- Ceny: 300 Kč (Giga 1000 + TV), 440 Kč (Giga 1000 + TV 10 programů), 570 Kč (Giga 2000)
- Žádné nepodložené superlativy, procenta pokrytí, falešné recenze ani review schema (viz .agents/skills/build-internetostrava-site/references/publishing-rules.md)
- Vždy komunikovat, že dostupnost a finální nabídka se ověřují podle přesné adresy

## Vývoj

- Lokální náhled: server „internetostrava-static" v .claude/launch.json (port 8080); /api/leads a redirecty z vercel.json lokálně nefungují
- Nové lokální stránky se generují ze šablony (Poruba) — jednorázový generátor je možné vést v datovém souboru; kostra (nav, patička, formulář, cache token) musí zůstat jednotná, unikátní je obsah o zástavbě
- Kontrola webu: `npm run check` (scripts/check-site.mjs)
- SEO strategie a historie změn: docs/SEO-PLAN.md; nové stránky přidávat do sitemap.xml a llms.txt
