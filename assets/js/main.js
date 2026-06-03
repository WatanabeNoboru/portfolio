/* AI Dev Portfolio — interactions */
(function () {
  "use strict";

  // --- Navbar: solid background on scroll ---
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // --- Mobile menu toggle ---
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // --- Scroll reveal ---
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  // --- Lightbox for screenshots ---
  const lb = document.querySelector(".lightbox");
  const lbImg = lb.querySelector("img");
  const open = (src, alt) => {
    lbImg.src = src;
    lbImg.alt = alt || "";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  document.querySelectorAll(".thumb").forEach((t) => {
    const img = t.querySelector("img");
    t.addEventListener("click", () => open(img.dataset.full || img.src, img.alt));
  });
  lb.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb.classList.contains("open")) close();
  });

  // --- Footer year ---
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
