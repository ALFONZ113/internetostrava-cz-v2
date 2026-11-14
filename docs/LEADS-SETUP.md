# Lead flow setup

Aktualni stav: `/api/leads` dorucuje leady dvema nezavislymi kanaly - e-mailem pres
Resend a webhookem do n8n (odtud dal napr. do Telegramu). Supabase se nepouziva.

**Resend neni nastaveny.** Leady proto chodi jen pres n8n. Chcete-li i e-mail,
doplnte promenne nize a overte odesilaci domenu v Resend.

## Jak to funguje

1. Navstevnik vyplni adresu, telefon, pripadne e-mail a poznamku.
2. Frontend posle data na `/api/leads`.
3. Endpoint zkusi **oba kanaly zaroven**: e-mail pres Resend (jen kdyz je
   `RESEND_API_KEY` nastaveny) a webhook do n8n (jen kdyz jsou nastavene
   `N8N_LEAD_WEBHOOK` a `N8N_LEAD_TOKEN`).
4. Kdyz lead dorucil **aspon jeden** kanal, endpoint vrati `configured: true`
   a frontend posle navstevnika na `/dekujeme/`. V odpovedi je pole `delivery`,
   ze ktereho je videt, ktery kanal uspel.
5. Teprve kdyz lead nedorucil zadny kanal, endpoint vrati `configured: false`
   a web otevre predvyplneny e-mail na `terc@obchod.poda.cz` jako posledni zalohu.

Kdyz e-mail neodejde, ale n8n ano, Vercel log obsahuje radek
`[leads] e-mail neodeslan, lead doruceny jen pres n8n`. Navstevnika to neomezi.

## Vercel environment variables

Nastavit v projektu ve Vercelu pro Production:

- `RESEND_API_KEY` - API klic z Resend.
- `LEAD_TO_EMAIL` - cilova adresa pro leady, aktualne `terc@obchod.poda.cz`.
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
