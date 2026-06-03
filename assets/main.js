const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.documentElement.classList.add("js-enabled");

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
let lastModalTrigger = null;

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
  leadModal.hidden = false;
  document.body.classList.add("modal-open");
  links?.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");
  window.setTimeout(() => leadModalAddress?.focus(), 40);
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
  const subject = callback
    ? "Zpětné zavolání z InternetOstrava.cz"
    : "Ověření dostupnosti internetu v Ostravě";
  const intro = callback
    ? "prosím o zpětné zavolání."
    : "prosím o ověření dostupnosti internetu na adrese:";

  const body = [
    "Dobrý den,",
    "",
    intro,
    callback ? "" : (payload.adresa || ""),
    "",
    `Telefon: ${payload.telefon || ""}`,
    `E-mail: ${payload.email || "neuveden"}`,
    payload.poznamka ? `Poznámka: ${payload.poznamka}` : "",
    "",
    `Stránka: ${payload.source_page || window.location.pathname}`,
    "Odesláno z webu InternetOstrava.cz"
  ].filter(Boolean).join("\n");

  return `mailto:terc@poda.cz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
    }

    try {
      const result = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await result.json().catch(() => ({}));

      if (result.ok && data.configured) {
        window.dataLayer?.push?.({ event: "lead_submit", source_page: payload.source_page });
        window.location.href = "/dekujeme/";
        return;
      }

      status.textContent = "Otevřeme e-mail s vyplněnými údaji. Odeslání ještě potvrďte ve své poštovní aplikaci.";
      window.location.href = buildMailto(payload);
    } catch (error) {
      status.textContent = "Nepodařilo se odeslat formulář automaticky. Otevřeme e-mail s vyplněnými údaji.";
      window.location.href = buildMailto(payload);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    }
  });
});

document.querySelectorAll("a[href^='tel:']").forEach((link) => {
  link.addEventListener("click", () => {
    window.dataLayer?.push?.({ event: "phone_click", phone: link.getAttribute("href") });
  });
});

document.querySelectorAll("a[href^='mailto:']").forEach((link) => {
  link.addEventListener("click", () => {
    window.dataLayer?.push?.({ event: "email_click", email: link.getAttribute("href") });
  });
});

document.body.insertAdjacentHTML("beforeend", `
  <div class="mobile-lead-bar" aria-label="Rychlý kontakt">
    <a class="mobile-lead-bar__call" href="tel:+420730431313">Zavolat</a>
    <a class="mobile-lead-bar__verify" href="/dostupnost/" data-open-lead-modal>Ověřit adresu</a>
  </div>
`);

document.querySelector(".mobile-lead-bar__verify")?.addEventListener("click", (event) => {
  if (!leadModal) return;
  event.preventDefault();
  openLeadModal(event.currentTarget);
});

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
  if (parallaxImage) {
    window.addEventListener("scroll", () => {
      const offset = Math.min(window.scrollY * 0.12, 90);
      parallaxImage.style.setProperty("--parallax-y", `${offset}px`);
    }, { passive: true });
  }
}
