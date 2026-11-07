/* ===========================================================================
   internetostrava.cz — mikroanimace v3 („Ocel & Signál")
   ---------------------------------------------------------------------------
   Prvky ožijí, až když dojedou do obrazovky (třída .is-in). Animuje se jen
   transform a opacity, takže se nic neposouvá a nezpomalí se načtení.
   Při „omezit pohyb" v systému, nebo bez JavaScriptu, skript nic nedělá
   a vše je rovnou v konečném stavu - čísla, pruhy i text jsou v HTML.
   =========================================================================== */
(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  document.documentElement.classList.add("js-motion");

  var TARGETS = ".v3-secno, .v3-spec, .v3-stats, .v3-steps, .v3-tc, .v3-bento, .v3-loc, .v3-mini";

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      if (entry.target.classList.contains("v3-stats")) countUp(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

  document.querySelectorAll(TARGETS).forEach(function (el) {
    observer.observe(el);
  });

  /* Čísla v pásu se napočítají od nuly. Šířka se před animací zafixuje
     na konečnou hodnotu, aby jednotka vedle čísla neposkakovala. */
  function countUp(root) {
    var format = new Intl.NumberFormat("cs-CZ");
    root.querySelectorAll(".v3-num[data-count]").forEach(function (el, index) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      if (!target) return;
      var finalText = el.textContent;
      el.style.width = Math.ceil(el.getBoundingClientRect().width) + "px";
      var duration = 1200 + index * 150;
      var start = null;

      function frame(now) {
        if (start === null) start = now;
        var progress = Math.min(1, (now - start) / duration);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = progress < 1 ? format.format(Math.round(target * eased)) : finalText;
        if (progress < 1) window.requestAnimationFrame(frame);
      }

      el.textContent = "0";
      window.requestAnimationFrame(frame);
    });
  }
})();
