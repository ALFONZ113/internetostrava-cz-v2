# Lead flow setup

Aktualni stav: web uz ma serverovy endpoint `/api/leads`, ale bez Resend klice bezi bezpecny fallback do e-mailu. Supabase se nepouziva.

## Jak to funguje

1. Navstevnik vyplni adresu, telefon, pripadne e-mail a poznamku.
2. Frontend posle data na `/api/leads`.
3. Pokud je ve Vercelu nastaveny `RESEND_API_KEY`, Vercel Function odesle e-mail s leadem.
4. Pokud Resend jeste neni nastaveny, web otevre predvyplneny e-mail na `terc@poda.cz`.

## Vercel environment variables

Nastavit v projektu ve Vercelu pro Production:

- `RESEND_API_KEY` - API klic z Resend.
- `LEAD_TO_EMAIL` - cilova adresa pro leady, aktualne `terc@poda.cz`.
- `LEAD_FROM_EMAIL` - overena odesilaci adresa v Resend, napr. `InternetOstrava.cz <leady@internetostrava.cz>`.

`LEAD_FROM_EMAIL` musi byt domena/adresa, kterou Resend povoli odesilat. Dokud domena neni overena, pouzij schvalenou testovaci adresu podle Resend nastaveni.

## Test po nastaveni Resend

1. Otevrit `/dostupnost/`.
2. Vyplnit testovaci adresu a telefon.
3. Odeslat formular.
4. Ocekavany vysledek: presmerovani na `/dekujeme/` a doruceny e-mail s udaji.
5. Kdyz Resend neni aktivni, ocekavany vysledek je predvyplneny e-mail ve vlastni postovni aplikaci.

## Data v leadu

Endpoint odesila:

- adresa,
- telefon,
- e-mail,
- poznamka,
- zdrojova stranka,
- UTM source, medium a campaign,
- cas vytvoreni.

Formular ma honeypot pole `website`, ktere pomaha tise ignorovat cast automatizovaneho spamu.
