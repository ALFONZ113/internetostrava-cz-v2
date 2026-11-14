# Mereni konverzi a spusteni Google Ads

Web od commitu "Mereni konverzi a konverzni vrstva formularu" umi posilat udalosti
do Google Tag Manageru. **Dokud nevlozis GTM ID, web nemeri nic** - skript jen
pripravi dataLayer a zadny externi kod nestahuje. Nasazeni na produkci je proto
bezpecne i pred zalozenim kontejneru.

## 1. Zalozit GTM kontejner (10 minut)

1. Otevrit <https://tagmanager.google.com>, ucet uz mas pres Google.
2. Vytvorit kontejner: nazev `internetostrava.cz`, platforma **Web**.
3. Zkopirovat ID ve tvaru `GTM-XXXXXXX`.
4. Vlozit ho do vsech 41 stranek najednou:

```bash
cd internetostrava-cz-v2
grep -rl 'name="gtm-id" content=""' --include="*.html" . \
  | xargs sed -i 's/name="gtm-id" content=""/name="gtm-id" content="GTM-XXXXXXX"/'
npm run check && npm run seo:audit
```

Az potom se lidem zacne zobrazovat souhlasova lista. Do te doby ji nikdo nevidi.

## 2. Zalozit GA4 property

1. <https://analytics.google.com> - nova property `internetostrava.cz`, casove pasmo Praha, mena CZK.
2. Datovy tok typu Web pro `https://internetostrava.cz`.
3. Zkopirovat **Measurement ID** ve tvaru `G-XXXXXXXXXX`.

## 3. Nastavit GTM (nejdelsi krok, cca 30 minut)

### Promenna

Nova promenna typu **Constant**, nazev `GA4 Measurement ID`, hodnota `G-XXXXXXXXXX`.

### Zakladni tag

Tag typu **Google Tag**, Tag ID = `{{GA4 Measurement ID}}`, spousteni **Initialization - All Pages**.

### Triggery na udalosti, ktere web posila

Pro kazdou udalost zalozit trigger typu **Custom Event** se shodnym nazvem:

| Nazev udalosti | Kdy se posila | Konverze? |
|---|---|---|
| `lead_submit` | Formular uspesne odeslan na server | **ANO - hlavni konverze** |
| `lead_thank_you` | Navstevnik dorazil na `/dekujeme/` | ANO (zaloha pro `lead_submit`) |
| `phone_click` | Kliknuti na telefonni cislo | **ANO - na mobilu hlavni konverze** |
| `email_click` | Kliknuti na e-mailovou adresu | volitelne |
| `modal_open` | Otevreno okno formulare | ne, jen krok trychtyre |
| `form_start` | Prvni psani do formulare | ne, jen krok trychtyre |
| `form_email_opened` | Rozbaleno nepovinne pole e-mail | ne |
| `form_abandon` | Odchod z rozepsaneho formulare | ne, ale **sleduj cislo** |
| `mailto_fallback` | Server lead neprijal, otevrel se e-mail | ne, ale **sleduj cislo** |

Ke kazde udalosti pak tag typu **Google Analytics: GA4 Event** s Tag ID
`{{GA4 Measurement ID}}` a stejnym nazvem udalosti.

### Parametry, ktere stoji za predani

Udalosti nesou i tohle, vyplati se to poslat do GA4 jako event parameters:
`lead_type` (availability / order / callback), `tarif`, `source_page`,
`placement` (u `phone_click`: mobile_bar / header / footer / content),
`fields_filled` (u `form_abandon`), `utm_source`, `utm_campaign`.

### Oznacit konverze

V GA4: **Spravce - Udalosti** oznacit `lead_submit` a `phone_click` jako
**klicove udalosti** (drive "konverze").

## 4. Dve cisla, ktera hned reknou, jestli neco nehraje

**`mailto_fallback`** - kdyz se objevuje, znamena to, ze `/api/leads` lead
neprijal a web musel otevrit e-mailoveho klienta. Na mobilu takovy lead casto
uz nikdo neodesle, takze **kazdy takovy pripad je pravdepodobne ztraceny lead**.
Nejcastejsi pricina: ve Vercelu neni nastaveny `RESEND_API_KEY` (viz
`docs/LEADS-SETUP.md`). Pokud toto cislo neni nulove, res to driv nez cokoli jineho.

**`form_abandon` vs `lead_submit`** - pomer rekne, kolik lidi formular zacne a
nedokonci. Parametr `fields_filled` ukaze, u ktereho pole odchazeji.

## 5. Google Ads

Ads smi smerovat **pouze na Ads zonu** (viz `CLAUDE.md`), tedy na `/`, `/tarify/`,
`/dostupnost/`, `/kontakt/`, `/lokality/`, `/poradna/`. Nikdy na stranky se
znackou PODA - to je podminka od PODA a.s.

1. V Google Ads: **Nastroje - Konverze - Nova akce konverze - Import z GA4**.
2. Importovat `lead_submit` a `phone_click`.
3. Propojit Ads s GA4 (**Nastroje - Propojene ucty**), aby se predavala data o kampanich.
4. Nespoustej kampan driv, nez v GA4 uvidis realne udalosti. Bez konverzniho
   signalu Google optimalizuje na prokliky a rozpocet se protoci bez efektu.

### Doporucena struktura kampane

```
Kampan: Ostrava - dostupnost (Search, exact + phrase)
  Skupina "obecne":  internet ostrava, internet v ostrave,
                     poskytovatele internetu ostrava, optika ostrava
                     -> cilova stranka /dostupnost/
  Skupina "cena":    nejlevnejsi internet ostrava, internet ostrava cena
                     -> cilova stranka /tarify/
  Skupina "ctvrti":  internet poruba, internet zabreh, internet vitkovice
                     -> prislusna /internet-<cast>/
```

**Vylucujici klicova slova (povinne):** `poda` (podminka od PODA a.s.),
dale `zdarma`, `wifi`, `router`, `vypadek`, `ping`, `rychlost`, `test rychlosti`.
Posledni skupina brani tomu, aby se platilo za lidi, kteri si opravuji router -
ti chodi na poradnu a nikdy nekonvertuji.

Vsechny odkazy z Ads oznacit UTM parametry. Web si je uklada do `sessionStorage`
a posila je s leadem i do GA4, takze pujde dohledat, ze konkretni poptavka
prisla z konkretni kampane.

## 6. Overeni, ze to funguje

1. V GTM kliknout **Preview**, zadat `https://internetostrava.cz`.
2. Na webu kliknout v souhlasove liste na **Souhlasim** - v GTM debuggeru se ma
   objevit `consent_granted` a nacist se GA4.
3. Zacit psat do formulare -> `form_start`.
4. Odeslat testovaci poptavku -> `lead_submit` a pak `lead_thank_you`.
   Zaroven zkontrolovat, ze lead prisel na `terc@obchod.poda.cz`.
   Pokud misto toho vyskoci `mailto_fallback`, viz bod 4.
5. Kliknout na telefonni cislo na mobilu -> `phone_click` s `placement: mobile_bar`.
6. Overit **Odmitnout**: po kliknuti se GA4 nesmi nacist vubec.

## Poznamky k souhlasu

- Pouzivame Google Consent Mode v2 s vychozim stavem `denied`. Dokud clovek
  neklikne na Souhlasim, nenacte se zadny Google skript.
- Volba se uklada do `localStorage` pod klicem `io-consent-v1` na 6 mesicu.
- Rozepsany formular (`io-lead-draft-v1`, 7 dni) a UTM v `sessionStorage` jsou
  nezbytne pro fungovani webu a souhlas nevyzaduji. Zaskrtnuti souhlasu se
  zpracovanim osobnich udaju se zamerne neuklada - musi byt vzdy novy ukon.
- Vse je popsane v `/ochrana-udaju/` sekci 8. Pri zmene mereni tu sekci aktualizuj.
