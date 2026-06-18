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

## 3. Resend — e-mailové doručovanie leadov
Aby objednávky/overenia chodili automaticky e-mailom (nie cez mailto), nastav Resend:

1. **Účet:** registrácia na [resend.com](https://resend.com) (free: 100 e-mailov/deň, 3 000/mesiac — stačí).
2. **Overenie domény:** Resend → *Domains → Add Domain* → `internetostrava.cz`. Resend vypíše DNS záznamy (SPF `TXT`, DKIM). Pridať ich u registrátora domény (rovnaké miesto ako DNS pre Vercel). Počkať na stav **Verified**. (Overuje sa len odosielateľská doména; príjemca nie.)
3. **API kľúč:** Resend → *API Keys → Create* → skopírovať `re_…` (zobrazí sa raz).
4. **Env premenné vo Verceli** (Settings → Environment Variables, Production):
   - `RESEND_API_KEY` = `re_…`
   - `LEAD_TO_EMAIL` = `terc@poda.cz` (kam chodia leady; neskôr napr. `info@internetostrava.cz`)
   - `LEAD_FROM_EMAIL` = `Internet Ostrava <leady@internetostrava.cz>` (musí byť na overenej doméne)
5. **Redeploy** (env sa prejaví až po novom nasadení).
6. **Test:** odoslať formulár → skontrolovať, že e-mail dorazil aj s tarifom.

Bez `RESEND_API_KEY` web stále funguje — formulár sa prepne na **mailto fallback** (otvorí poštový program s vyplnenými údajmi a používateľ odoslanie potvrdí). Leady teda neuniknú ani počas nastavovania Resendu.

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
