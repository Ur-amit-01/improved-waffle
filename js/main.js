/* ============================================================
   GLOBAL INTERACTIONS
   ============================================================ */
window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  if (loader) setTimeout(() => loader.classList.add("done"), 260);
});

document.addEventListener("DOMContentLoaded", () => {
  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  // Back to top
  const backBtn = document.getElementById("backToTop");
  if (backBtn) {
    window.addEventListener("scroll", () => {
      backBtn.classList.toggle("visible", window.scrollY > 600);
    });
    backBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Legal page TOC scroll-spy
  const tocLinks = document.querySelectorAll(".legal-toc a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    const sections = [...tocLinks].map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(a => a.classList.remove("active"));
          const match = document.querySelector(`.legal-toc a[href="#${entry.target.id}"]`);
          if (match) match.classList.add("active");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    sections.forEach(s => spy.observe(s));
  }
});
