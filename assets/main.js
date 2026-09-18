const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const heroVideo = document.querySelector("[data-hero-video]");

// Udalosti posilame pres analytics.js. Kdyz se nenacetl, spadne to do dataLayeru,
// odkud je GTM po pozdejsim nacteni jeste precte.
function track(event, payload) {
  if (typeof window.ioTrack === "function") return window.ioTrack(event, payload);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(Object.assign({ event }, payload || {}));
}

document.documentElement.classList.add("js-enabled");

if (reduceMotion && heroVideo) {
  heroVideo.removeAttribute("autoplay");
  heroVideo.pause();
}

if (heroVideo && !reduceMotion) {
  const videoSrc = heroVideo.getAttribute("data-video-src");
  if (videoSrc && !heroVideo.querySelector("source")) {
    const source = document.createElement("source");
    source.src = videoSrc;
    source.type = videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4";
    heroVideo.appendChild(source);
    heroVideo.load();
    heroVideo.play()?.catch?.(() => {});
    heroVideo.addEventListener("canplay", () => heroVideo.classList.add("is-ready"), { once: true });
  }
}

const CITY_MARQUEE_HTML = `
  <div class="city-marquee" aria-hidden="true">
    <div class="city-marquee-track">
      <div class="city-marquee-group">
        <span><i>&bull;</i> Ověření adresy zdarma</span>
        <span><i>&bull;</i> Odpověď do 30 minut</span>
        <span><i>&bull;</i> Nezávazná poptávka</span>
        <span><i>&bull;</i> Optika i bez optiky &ndash; podle domu</span>
        <span><i>&bull;</i> Bez skrytých poplatků za ověření</span>
        <span><i>&bull;</i> Telefon 777 425 230</span>
      </div>
      <div class="city-marquee-group"></div>
    </div>
  </div>`;
if (!document.querySelector(".city-marquee")) {
  document.querySelector("main")?.insertAdjacentHTML("afterbegin", CITY_MARQUEE_HTML);
}

const marquee = document.querySelector(".city-marquee");
const marqueeTrack = marquee?.querySelector(".city-marquee-track");
const marqueeGroups = marqueeTrack ? [...marqueeTrack.querySelectorAll(".city-marquee-group")] : [];

if (marquee && marqueeTrack && marqueeGroups.length === 2) {
  const [primaryGroup, duplicateGroup] = marqueeGroups;
  const baseMarkup = primaryGroup.innerHTML;
  let resizeTimer;

  const fillMarquee = () => {
    primaryGroup.innerHTML = baseMarkup;

    while (primaryGroup.offsetWidth < marquee.clientWidth + 160) {
      primaryGroup.insertAdjacentHTML("beforeend", baseMarkup);
    }

    duplicateGroup.innerHTML = primaryGroup.innerHTML;
    const speed = window.innerWidth < 720 ? 29 : 37;
    marqueeTrack.style.setProperty("--city-scroll-duration", `${(primaryGroup.offsetWidth / speed).toFixed(2)}s`);
  };

  fillMarquee();
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(fillMarquee, 160);
  });
}

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const leadModal = document.querySelector("#lead-modal");
const leadModalAddress = leadModal?.querySelector("#modal-address");
const leadModalEyebrow = leadModal?.querySelector("[data-modal-eyebrow]");
const leadModalTitle = leadModal?.querySelector("[data-modal-title]");
const leadModalIntro = leadModal?.querySelector("[data-modal-intro]");
const leadModalSubmit = leadModal?.querySelector("button[type='submit']");
const leadModalTypeInput = leadModal?.querySelector("[data-modal-type-input]");
const leadModalTariff = leadModal?.querySelector("[data-modal-tariff]");
const leadModalTariffName = leadModal?.querySelector("[data-modal-tariff-name]");
const leadModalTariffPrice = leadModal?.querySelector("[data-modal-tariff-price]");
const leadModalTariffInput = leadModal?.querySelector("[data-modal-tariff-input]");
let lastModalTrigger = null;

const MODAL_PRESETS = {
  availability: {
    eyebrow: "Rychlé ověření",
    title: "Ověřit adresu",
    intro: "Pošlete adresu a telefon. Ozveme se do 30 minut s možnostmi pro váš dům.",
    submit: "Odeslat nezávazný dotaz →",
    leadType: "availability"
  },
  order: {
    eyebrow: "Nezávazná objednávka",
    title: "Objednat připojení",
    intro: "Vyplňte adresu a telefon. Ozveme se do 30 minut, ověříme dostupnost na adrese a domluvíme zapojení. Odeslání vás k ničemu nezavazuje.",
    submit: "Odeslat nezávaznou objednávku →",
    leadType: "order"
  }
};

function configureLeadModal(trigger) {
  const intent = trigger?.dataset?.leadIntent === "order" ? "order" : "availability";
  const preset = MODAL_PRESETS[intent];
  if (leadModalEyebrow) leadModalEyebrow.textContent = preset.eyebrow;
  if (leadModalTitle) leadModalTitle.textContent = preset.title;
  if (leadModalIntro) leadModalIntro.textContent = preset.intro;
  if (leadModalSubmit) leadModalSubmit.textContent = preset.submit;
  if (leadModalTypeInput) leadModalTypeInput.value = preset.leadType;

  const tariff = trigger?.dataset?.tariff;
  const price = trigger?.dataset?.tariffPrice;
  if (intent === "order" && tariff) {
    if (leadModalTariffName) leadModalTariffName.textContent = tariff;
    if (leadModalTariffPrice) leadModalTariffPrice.textContent = price || "";
    if (leadModalTariffInput) leadModalTariffInput.value = price ? `${tariff} (${price})` : tariff;
    if (leadModalTariff) leadModalTariff.hidden = false;
  } else {
    if (leadModalTariffInput) leadModalTariffInput.value = "";
    if (leadModalTariff) leadModalTariff.hidden = true;
  }
}

function closeLeadModal() {
  if (!leadModal) return;
  leadModal.hidden = true;
  document.body.classList.remove("modal-open");
  lastModalTrigger?.focus?.();
  lastModalTrigger = null;
}

function openLeadModal(trigger) {
  if (!leadModal) return;
  lastModalTrigger = trigger;
  configureLeadModal(trigger);
  leadModal.hidden = false;
  document.body.classList.add("modal-open");
  links?.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");
  window.setTimeout(() => leadModalAddress?.focus(), 40);
  track("modal_open", {
    lead_type: leadModalTypeInput?.value || "availability",
    tarif: leadModalTariffInput?.value || "",
    source_page: window.location.pathname
  });
}

document.querySelectorAll("[data-open-lead-modal]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    if (!leadModal) return;
    event.preventDefault();
    openLeadModal(trigger);
  });
});

leadModal?.querySelectorAll("[data-close-lead-modal]").forEach((trigger) => {
  trigger.addEventListener("click", closeLeadModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && leadModal && !leadModal.hidden) {
    closeLeadModal();
  }
});

const utmParams = new URLSearchParams(window.location.search);
const trackedUtmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

function buildLeadPayload(form) {
  const fields = new FormData(form);
  const payload = Object.fromEntries(fields.entries());
  payload.source_page = window.location.pathname;

  trackedUtmKeys.forEach((key) => {
    const currentValue = utmParams.get(key);
    if (currentValue) sessionStorage.setItem(key, currentValue);
    payload[key] = currentValue || sessionStorage.getItem(key) || "";
  });

  return payload;
}

function isCallbackLead(payload) {
  return payload.lead_type === "callback" || payload.type === "callback";
}

function buildMailto(payload) {
  const callback = isCallbackLead(payload);
  const order = payload.lead_type === "order";
  let subject;
  if (callback) subject = "Zpětné zavolání z InternetOstrava.cz";
  else if (order) subject = "Nezávazná objednávka z InternetOstrava.cz";
  else subject = "Ověření dostupnosti internetu v Ostravě";
  let intro;
  if (callback) intro = "prosím o zpětné zavolání.";
  else if (order) intro = "mám zájem o nezávaznou objednávku připojení na adrese:";
  else intro = "prosím o ověření dostupnosti internetu na adrese:";

  const body = [
    "Dobrý den,",
    "",
    intro,
    callback ? "" : (payload.adresa || ""),
    "",
    payload.tarif ? `Tarif: ${payload.tarif}` : "",
    `Telefon: ${payload.telefon || ""}`,
    `E-mail: ${payload.email || "neuveden"}`,
    payload.poznamka ? `Poznámka: ${payload.poznamka}` : "",
    "",
    `Stránka: ${payload.source_page || window.location.pathname}`,
    "Odesláno z webu InternetOstrava.cz"
  ].filter(Boolean).join("\n");

  return `mailto:terc@obchod.poda.cz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function getFormStatus(form) {
  let status = form.querySelector("[data-form-status]");
  if (!status) {
    status = document.createElement("p");
    status.className = "form-status";
    status.setAttribute("data-form-status", "");
    status.setAttribute("aria-live", "polite");
    form.appendChild(status);
  }
  return status;
}

document.querySelectorAll("[data-lead-form], [data-email-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const payload = buildLeadPayload(form);
    const status = getFormStatus(form);
    const submitButton = form.querySelector("button[type='submit']");
    const originalLabel = submitButton?.textContent;

    status.textContent = "Odesíláme nezávazný dotaz...";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Odesíláme...";
      submitButton.classList.add("is-loading");
    }

    try {
      const result = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await result.json().catch(() => ({}));

      if (result.ok && data.configured) {
        track("lead_submit", {
          lead_type: payload.lead_type || "availability",
          tarif: payload.tarif || "",
          source_page: payload.source_page,
          utm_source: payload.utm_source,
          utm_campaign: payload.utm_campaign
        });
        clearDraft();
        window.location.href = "/dekujeme/";
        return;
      }

      track("mailto_fallback", { reason: "not_configured", source_page: payload.source_page });
      status.textContent = "Otevřeme e-mail s vyplněnými údaji. Odeslání ještě potvrďte ve své poštovní aplikaci.";
      window.location.href = buildMailto(payload);
    } catch (error) {
      track("mailto_fallback", { reason: "request_failed", source_page: payload.source_page });
      status.textContent = "Nepodařilo se odeslat formulář automaticky. Otevřeme e-mail s vyplněnými údaji.";
      window.location.href = buildMailto(payload);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
        submitButton.classList.remove("is-loading");
      }
    }
  });
});

const FORM_FAQ_HTML = `
  <div class="form-faq" aria-label="Časté dotazy k formuláři">
    <p class="form-faq__item"><b>Je ověření zdarma?</b> Ano, nic neplatíte.</p>
    <p class="form-faq__item"><b>Zavazuji se k něčemu?</b> Ne, je to nezávazné.</p>
    <p class="form-faq__item"><b>Jak rychle se ozvete?</b> Do 30 minut.</p>
  </div>`;
document.querySelectorAll(".form-reassure").forEach((el) => {
  if (!el.nextElementSibling?.classList?.contains("form-faq")) {
    el.insertAdjacentHTML("afterend", FORM_FAQ_HTML);
  }
});

document.querySelectorAll("a[href^='tel:']").forEach((link) => {
  link.addEventListener("click", () => {
    track("phone_click", {
      phone: link.getAttribute("href"),
      placement: link.closest(".mobile-lead-bar") ? "mobile_bar"
        : link.closest(".site-header") ? "header"
        : link.closest(".site-footer") ? "footer"
        : "content",
      source_page: window.location.pathname
    });
  });
});

document.querySelectorAll("a[href^='mailto:']").forEach((link) => {
  link.addEventListener("click", () => {
    track("email_click", { email: link.getAttribute("href"), source_page: window.location.pathname });
  });
});

const pagePhoneHref = document.querySelector(".site-header a[href^='tel:'], .site-footer a[href^='tel:']")?.getAttribute("href") || "tel:+420777425230";
document.body.insertAdjacentHTML("beforeend", `
  <div class="mobile-lead-bar" aria-label="Rychlý kontakt">
    <a class="mobile-lead-bar__call" href="${pagePhoneHref}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.5a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z"/></svg>Zavolat</a>
    <a class="mobile-lead-bar__verify" href="/dostupnost/" data-open-lead-modal><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6-5.686-6-10a6 6 0 0 1 12 0c0 4.314-6 10-6 10Z"/><circle cx="12" cy="11" r="2.5"/></svg>Ověřit adresu</a>
  </div>
`);

document.querySelector(".mobile-lead-bar__verify")?.addEventListener("click", (event) => {
  if (!leadModal) return;
  event.preventDefault();
  openLeadModal(event.currentTarget);
});

const pageLeadForms = [...document.querySelectorAll("[data-lead-form]")].filter((form) => !form.closest(".lead-modal"));
if ("IntersectionObserver" in window && pageLeadForms.length) {
  const visibleLeadForms = new Set();
  const leadBarObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visibleLeadForms.add(entry.target);
      else visibleLeadForms.delete(entry.target);
    });
    document.body.classList.toggle("lead-form-visible", visibleLeadForms.size > 0);
  }, { threshold: 0.2 });
  pageLeadForms.forEach((form) => leadBarObserver.observe(form));
}

if (!reduceMotion) {
  const revealItems = document.querySelectorAll(".section, .section-compact, .city-marquee");
  revealItems.forEach((item) => item.classList.add("reveal-ready"));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("reveal-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.01, rootMargin: "0px 0px -24px" });

  revealItems.forEach((item) => revealObserver.observe(item));

  const revealPassedItems = () => {
    revealItems.forEach((item) => {
      if (item.getBoundingClientRect().top < window.innerHeight * .94) {
        item.classList.add("reveal-visible");
      }
    });
  };

  revealPassedItems();
  window.addEventListener("scroll", revealPassedItems, { passive: true });

  const parallaxImage = document.querySelector("[data-parallax]");
  if (parallaxImage && !reduceMotion) {
    window.addEventListener("scroll", () => {
      const offset = Math.min(window.scrollY * 0.12, 90);
      parallaxImage.style.setProperty("--parallax-y", `${offset}px`);
    }, { passive: true });
  }
}

const siteHeader = document.querySelector(".site-header");
if (siteHeader) {
  const toggleHeaderScrolled = () => siteHeader.classList.toggle("is-scrolled", window.scrollY > 40);
  toggleHeaderScrolled();
  window.addEventListener("scroll", toggleHeaderScrolled, { passive: true });
}

/* ===========================================================================
   Konverzni vrstva formularu
   ---------------------------------------------------------------------------
   1. Rozepsany formular prezije odchod ze stranky (7 dni, localStorage).
      Souhlas se zpracovanim se zamerne NEUKLADA - musi byt vzdy aktivni ukon.
   2. E-mail je nepovinny, proto je schovany pod prepinacem. Uzivatel vidi
      dve povinna pole misto tri, coz je hlavni packa na dokonceni formulare.
   3. Telefon se pred odeslanim normalizuje a pri opusteni pole se kontroluje
      pocet cislic - chyba se ukaze hned, ne az po odeslani.
   4. Zacatek a opusteni rozepsaneho formulare se meri (form_start,
      form_abandon), aby slo spocitat, kde lide odpadavaji.
   =========================================================================== */

const DRAFT_KEY = "io-lead-draft-v1";
const DRAFT_TTL_MS = 7 * 86400000;
const DRAFT_FIELDS = ["adresa", "telefon", "email"];

function readDraft() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(DRAFT_KEY) || "null");
    if (!parsed || !parsed.at || Date.now() - parsed.at > DRAFT_TTL_MS) return null;
    return parsed.values || null;
  } catch (error) {
    return null;
  }
}

function saveDraft(form) {
  const values = {};
  DRAFT_FIELDS.forEach((name) => {
    const input = form.querySelector(`[name="${name}"]`);
    if (input && input.value.trim()) values[name] = input.value.trim();
  });
  try {
    if (Object.keys(values).length) {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ at: Date.now(), values }));
    }
  } catch (error) {
    /* Bez uloziste se jen neobnovi rozepsany text. */
  }
}

function clearDraft() {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch (error) {
    /* Nic k uklizeni. */
  }
}

function normalizePhone(value) {
  return String(value || "").replace(/[\s().-]/g, "");
}

function phoneDigitCount(value) {
  return (String(value || "").match(/\d/g) || []).length;
}

function fieldWrapper(input) {
  return input.closest(".field") || input.closest(".input-wrap") || input.parentElement;
}

const EMAIL_TOGGLE_LABEL = "Přidat e-mail (nepovinné)";

document.querySelectorAll("[data-lead-form]").forEach((form) => {
  const draft = readDraft();
  let started = false;
  let submitted = false;

  /* --- 1. Obnoveni rozepsanych hodnot --- */
  if (draft) {
    DRAFT_FIELDS.forEach((name) => {
      const input = form.querySelector(`[name="${name}"]`);
      if (input && !input.value && draft[name]) input.value = draft[name];
    });
  }

  /* --- 2. E-mail pod prepinacem --- */
  const emailInput = form.querySelector('input[name="email"]');
  if (emailInput && !emailInput.required) {
    const wrapper = fieldWrapper(emailInput);
    const hasValue = Boolean(emailInput.value.trim());
    if (wrapper && !wrapper.querySelector(".field-toggle")) {
      const toggleButton = document.createElement("button");
      toggleButton.type = "button";
      toggleButton.className = "field-toggle";
      toggleButton.textContent = EMAIL_TOGGLE_LABEL;
      toggleButton.setAttribute("aria-expanded", String(hasValue));
      wrapper.insertAdjacentElement("beforebegin", toggleButton);

      wrapper.hidden = !hasValue;
      toggleButton.hidden = hasValue;

      toggleButton.addEventListener("click", () => {
        wrapper.hidden = false;
        toggleButton.hidden = true;
        toggleButton.setAttribute("aria-expanded", "true");
        emailInput.focus();
        track("form_email_opened", { source_page: window.location.pathname });
      });
    }
  }

  /* --- 3. Telefon: kontrola pri opusteni pole --- */
  const phoneInput = form.querySelector('input[name="telefon"]');
  if (phoneInput) {
    phoneInput.addEventListener("blur", () => {
      const digits = phoneDigitCount(phoneInput.value);
      if (!phoneInput.value.trim()) {
        phoneInput.setCustomValidity("");
        phoneInput.classList.remove("is-invalid");
        return;
      }
      if (digits < 9) {
        phoneInput.setCustomValidity("Zadejte prosím telefonní číslo včetně předvolby, například 777 425 230.");
        phoneInput.classList.add("is-invalid");
        phoneInput.reportValidity();
      } else {
        phoneInput.setCustomValidity("");
        phoneInput.classList.remove("is-invalid");
      }
    });
    phoneInput.addEventListener("input", () => {
      phoneInput.setCustomValidity("");
      phoneInput.classList.remove("is-invalid");
    });
  }

  /* --- 4. Mereni zacatku, prubezne ukladani --- */
  form.addEventListener("input", (event) => {
    if (event.target.name === "website") return; /* honeypot */
    if (!started) {
      started = true;
      track("form_start", {
        form_placement: form.closest(".lead-modal") ? "modal" : "page",
        source_page: window.location.pathname
      });
    }
    saveDraft(form);
  });

  form.addEventListener("submit", () => {
    submitted = true;
    if (phoneInput) phoneInput.value = normalizePhone(phoneInput.value);
  }, { capture: true });

  /* --- 5. Opusteni rozepsaneho formulare --- */
  const reportAbandon = () => {
    if (!started || submitted) return;
    submitted = true; /* at se neposle dvakrat */
    const filled = DRAFT_FIELDS.filter((name) => form.querySelector(`[name="${name}"]`)?.value.trim()).length;
    track("form_abandon", {
      form_placement: form.closest(".lead-modal") ? "modal" : "page",
      fields_filled: filled,
      source_page: window.location.pathname
    });
  };

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") reportAbandon();
  });
});
