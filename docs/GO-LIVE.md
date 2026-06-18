# Go-live checklist — napojenie reálnej domény internetostrava.cz

Postup na spustenie webu naživo na vlastnej doméne cez Vercel. Kroky 1–5 robí majiteľ vo Verceli / u registrátora domény (netreba meniť kód). Sekcia „Pred spustením" obsahuje veci, ktoré treba doriešiť ešte pred zberom údajov.

---

## 0. Predpoklad: schválený web na produkcii
Nový dizajn je zatiaľ na vetve `redesign` (Vercel preview). Produkcia (`main`) je ešte starý web.
- Keď je web schválený: zlúčiť `redesign → main`. Vercel produkcia deployuje z `main`, takže až potom bude doména ukazovať nový web.
- (Alternatíva: vo Verceli dočasne nastaviť production branch na `redesign`, ale čistejšie je merge do `main`.)

## 1. Pridať doménu vo Verceli
Vercel → projekt `internetostrava-cz-v2` → **Settings → Domains → Add**:
- pridať `internetostrava.cz` (apex)
- pridať `www.internetostrava.cz` a nechať ho presmerovať (301) na apex `internetostrava.cz`

Vercel hneď vypíše **presné DNS záznamy**, ktoré treba nastaviť (sú smerodajné — ak sa líšia od nižšie uvedených, riaď sa Vercelom).

## 2. Nastaviť DNS u registrátora domény
Tam, kde je doména `internetostrava.cz` zaregistrovaná (napr. Wedos, Forpsi, Gransy…), v správe DNS:
- **apex `internetostrava.cz`** → `A` záznam na Vercel IP **`76.76.21.21`**
- **`www`** → `CNAME` na **`cname.vercel-dns.com`**

Potom počkať na propagáciu (rádovo minúty až hodiny). Vercel automaticky vystaví **HTTPS certifikát** (Let's Encrypt) — netreba nič ručne.

> Po nábehu over: `https://internetostrava.cz` aj `https://www.internetostrava.cz` (www → apex), zámok HTTPS, a že sa načíta nový web.

## 3. Env premenné pre leady (Vercel → Settings → Environment Variables)
Aby objednávky/overenia chodili e-mailom automaticky:
- `LEAD_TO_EMAIL` = `terc@poda.cz` (kam chodia leady)
- `RESEND_API_KEY` = API kľúč z [resend.com](https://resend.com) — **a v Resend overiť odosielaciu doménu** (aby fungoval odosielateľ `leady@internetostrava.cz`).

Bez `RESEND_API_KEY` web stále funguje — formulár sa prepne na **mailto fallback** (otvorí poštový program s vyplnenými údajmi a používateľ odoslanie potvrdí). Pre plynulý zber leadov je ale lepšie Resend nastaviť.

> Po nastavení otestuj reálne odoslanie formulára (Objednať aj Ověřit adresu) a skontroluj, že e-mail dorazil na terc@poda.cz aj s tarifom.

## 4. Vyhľadávače a indexácia
- **Google Search Console** → pridať doménu `internetostrava.cz`, overiť (DNS TXT alebo HTML súbor), poslať **`https://internetostrava.cz/sitemap.xml`**.
- (Voliteľne **Bing Webmaster Tools** to isté.)
- Skontrolovať, že dopyty fungujú podľa zón: „poda internet/ostrava/karviná" vedú na `/poda-*`, „internet ostrava / poruba / vítkovice…" na hlavnú + lokálne stránky.

## 5. Po spustení — kontrola
- Reálne odoslanie leadu z mobilu aj desktopu (Objednať s tarifom, Ověřit adresu, Zavolejte mi).
- `robots.txt` (`/robots.txt`) povoľuje indexáciu a odkazuje na sitemap. ✓ pripravené.
- Presmerovania z `vercel.json` (napr. `/poda` → `/poda-internet-ostrava/`) fungujú na ostrej doméne.
- Hero video sa prehráva (desktop aj mobil), pätička má textové logo, modal „Objednať" ukazuje vybraný tarif.

---

## ⚠️ Pred spustením zberu údajov — GDPR (právny blocker)
Stránka `/ochrana-udaju/` má zatiaľ **placeholder**. Formuláre zbierajú osobné údaje (adresa, telefón, e-mail), takže pred ostrým spustením treba doplniť **identitu správcu údajov**:
- meno / názov firmy obchodného zástupcu
- IČO a sídlo
- kontakt na správcu (e-mail/telefón)
- účel a doba spracovania, práva dotknutej osoby

Bez týchto údajov je zber osobných údajov v rozpore s GDPR. Tieto informácie dodá majiteľ; potom ich doplníme do `/ochrana-udaju/`.

---

## Poznámky k údržbe
- Po každej zmene `assets/*.css|js` zbumpovať `?v=` token vo všetkých HTML (Vercel cachuje `/assets` rok ako immutable). Aktuálne `?v=r12`.
- Ads zóna (`/`, `tarify`, `dostupnost`, `kontakt`, `dekujeme`, `ochrana-udaju`, `404`) nesmie obsahovať „poda" — po úprave skontrolovať `grep -ric poda` = 0.
- Nové stránky pridať do `sitemap.xml` a `llms.txt`.
