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

document.querySelectorAll("[data-email-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const fields = new FormData(form);
    const body = [
      "Dobrý den,",
      "",
      "prosím o ověření dostupnosti internetu na adrese:",
      fields.get("adresa") || "",
      "",
      `Telefon: ${fields.get("telefon") || ""}`,
      `E-mail: ${fields.get("email") || "neuveden"}`,
      fields.get("poznamka") ? `Poznámka: ${fields.get("poznamka")}` : "",
      "",
      "Odesláno z webu InternetOstrava.cz"
    ].filter(Boolean).join("\n");

    window.location.href = `mailto:terc@poda.cz?subject=${encodeURIComponent("Ověření dostupnosti internetu v Ostravě")}&body=${encodeURIComponent(body)}`;
  });
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
