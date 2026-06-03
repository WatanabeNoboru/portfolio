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
  const setToggle = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  };
  toggle.addEventListener("click", () => {
    setToggle(links.classList.toggle("open"));
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      setToggle(false);
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
  const lbClose = lb.querySelector(".close");
  let lastFocused = null;

  const open = (src, alt) => {
    lastFocused = document.activeElement; // remember opener to restore focus later
    lbImg.src = src;
    lbImg.alt = alt || "";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  };
  const close = () => {
    if (!lb.classList.contains("open")) return;
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lbImg.removeAttribute("src"); // free memory; avoid stale image flash
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  };

  document.querySelectorAll(".thumb").forEach((t) => {
    const img = t.querySelector("img");
    const trigger = () => open(img.dataset.full || img.src, img.alt);
    t.addEventListener("click", trigger);
    // keyboard: Enter / Space activate the thumbnail (role="button")
    t.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        trigger();
      }
    });
  });
  lb.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    // trap focus inside the dialog (only the close button is focusable)
    if (e.key === "Tab") {
      e.preventDefault();
      lbClose.focus();
    }
  });

  // --- Footer year ---
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
