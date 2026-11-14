/* ===========================================================================
   internetostrava.cz — merici vrstva
   ---------------------------------------------------------------------------
   Nacita Google Tag Manager POUZE tehdy, kdyz je v <head> vyplneny
   <meta name="gtm-id" content="GTM-XXXXXXX">. Dokud ID chybi, skript jen
   pripravi dataLayer, aby se udalosti z main.js mely kam ukladat, a nic
   dalsiho nestahuje. Nasazeni na produkci je proto bezpecne i pred zalozenim
   GTM kontejneru.

   Souhlas: Google Consent Mode v2, vychozi stav DENIED. Merici cookies se
   aktivuji az po kliknuti na "Souhlasim" v liste. Volba se uklada do
   localStorage na 6 mesicu.
   =========================================================================== */

(function () {
  "use strict";

  var CONSENT_KEY = "io-consent-v1";
  var CONSENT_TTL_DAYS = 180;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  /* ---- 1. Consent Mode v2: vychozi odmitnuti ---------------------------- */

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500
  });

  function readStoredConsent() {
    try {
      var raw = window.localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed.granted !== "boolean" || !parsed.at) return null;
      var ageDays = (Date.now() - parsed.at) / 86400000;
      if (ageDays > CONSENT_TTL_DAYS) return null;
      return parsed.granted;
    } catch (error) {
      return null;
    }
  }

  function storeConsent(granted) {
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ granted: granted, at: Date.now() }));
    } catch (error) {
      /* Privatni rezim nebo zablokovane uloziste - volba proste neprezije relaci. */
    }
  }

  function applyConsent(granted) {
    var value = granted ? "granted" : "denied";
    gtag("consent", "update", {
      ad_storage: value,
      ad_user_data: value,
      ad_personalization: value,
      analytics_storage: value
    });
    window.dataLayer.push({ event: granted ? "consent_granted" : "consent_denied" });
  }

  /* ---- 2. GTM loader ---------------------------------------------------- */

  function gtmId() {
    var meta = document.querySelector('meta[name="gtm-id"]');
    var value = meta && meta.getAttribute("content");
    value = (value || "").trim();
    return /^GTM-[A-Z0-9]+$/.test(value) ? value : "";
  }

  function loadGtm(id) {
    if (!id || document.getElementById("gtm-loader")) return;
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    var script = document.createElement("script");
    script.id = "gtm-loader";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(id);
    document.head.appendChild(script);
  }

  /* ---- 3. Souhlasova lista ---------------------------------------------- */

  var BAR_HTML =
    '<div class="cookie-bar" role="dialog" aria-live="polite" aria-label="Souhlas s měřením návštěvnosti">' +
      '<div class="cookie-bar__inner">' +
        '<p class="cookie-bar__text">Měříme návštěvnost webu, abychom věděli, které stránky lidem pomáhají. ' +
        'Bez souhlasu web funguje normálně, jen o návštěvě nic neuložíme. ' +
        '<a href="/ochrana-udaju/">Zásady ochrany údajů</a></p>' +
        '<div class="cookie-bar__actions">' +
          '<button type="button" class="btn btn-ghost" data-consent="deny">Odmítnout</button>' +
          '<button type="button" class="btn btn-primary" data-consent="allow">Souhlasím</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  function showConsentBar() {
    if (document.querySelector(".cookie-bar")) return;
    document.body.insertAdjacentHTML("beforeend", BAR_HTML);
    var bar = document.querySelector(".cookie-bar");
    document.body.classList.add("has-cookie-bar");

    bar.addEventListener("click", function (event) {
      var button = event.target.closest("[data-consent]");
      if (!button) return;
      var granted = button.getAttribute("data-consent") === "allow";
      storeConsent(granted);
      applyConsent(granted);
      if (granted) loadGtm(gtmId());
      bar.remove();
      document.body.classList.remove("has-cookie-bar");
    });
  }

  /* ---- 4. Start --------------------------------------------------------- */

  var id = gtmId();
  var stored = readStoredConsent();

  if (stored === true) {
    applyConsent(true);
    loadGtm(id);
  } else if (stored === false) {
    applyConsent(false);
  } else if (id) {
    /* Listu ukazujeme jen tehdy, kdyz je co merit. */
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", showConsentBar, { once: true });
    } else {
      showConsentBar();
    }
  }

  /* ---- 5. Sdilene API pro main.js --------------------------------------- */

  window.ioTrack = function (event, payload) {
    if (!event) return;
    var data = { event: event };
    if (payload) {
      Object.keys(payload).forEach(function (key) {
        if (payload[key] !== undefined && payload[key] !== "") data[key] = payload[key];
      });
    }
    window.dataLayer.push(data);
  };
})();
