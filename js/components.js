/* ============================================================
   SHARED COMPONENTS — header, footer, product card
   Each page calls renderHeader('key') / renderFooter() on load.
   ============================================================ */

function renderHeader(active) {
  const links = [
    { key: "home", label: "Home", href: "index.html" },
    { key: "shop", label: "Shop", href: "shop.html" },
    { key: "about", label: "About", href: "about.html" },
    { key: "faq", label: "FAQ", href: "faq.html" },
    { key: "contact", label: "Contact", href: "contact.html" }
  ];

  const linksHtml = links.map(l =>
    `<a href="${l.href}"${l.key === active ? ' class="active"' : ''}>${l.label}</a>`
  ).join("");

  const html = `
    <div class="container nav">
      <a href="index.html" class="brand"><span class="brand-mark">NN</span> NEET Notes Store</a>
      <nav class="nav-links" id="navLinks">${linksHtml}</nav>
      <div class="nav-actions">
        <a href="shop.html" class="btn btn-mark">Shop Notes</a>
        <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>`;

  const header = document.getElementById("site-header");
  if (header) header.innerHTML = html;

  const toggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }
}

function renderFooter() {
  const html = `
    <div class="container footer-top">
      <div class="footer-brand">
        <a href="index.html" class="brand" style="color:var(--paper-0)"><span class="brand-mark">NN</span> NEET Notes Store</a>
        <p>Exam-ready notes for NEET Physics, Chemistry — built by toppers, structured for revision, not just reading.</p>
      </div>
      <div class="footer-col">
        <h4>Shop</h4>
        <ul>
          <li><a href="product-physics-11.html">Physics Class 11</a></li>
          <li><a href="product-physics-12.html">Physics Class 12</a></li>
          <li><a href="product-physical-chemistry.html">Physical Chemistry</a></li>
          <li><a href="product-organic-chemistry.html">Organic Chemistry</a></li>
          <li><a href="product-inorganic-chemistry.html">Inorganic Chemistry</a></li>
          <li><a href="product-bundle.html">Complete Bundle</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="faq.html">FAQ</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Policies</h4>
        <ul>
          <li><a href="privacy-policy.html">Privacy Policy</a></li>
          <li><a href="refund-policy.html">Refund Policy</a></li>
          <li><a href="terms.html">Terms &amp; Conditions</a></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© <span id="footerYear"></span> NEET Notes Store. All rights reserved.</span>
      <span>Instant download · Lifetime access · Made for NEET aspirants</span>
    </div>`;

  const footer = document.getElementById("site-footer");
  if (footer) footer.innerHTML = html;
  const y = document.getElementById("footerYear");
  if (y) y.textContent = new Date().getFullYear();
}

function starString(rating) {
  const full = Math.round(rating);
  return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
}

function productCardHtml(p) {
  const priceRow = p.was
    ? `<span class="price">₹${p.price}</span><span class="price-was">₹${p.was}</span>`
    : `<span class="price">₹${p.price}</span>`;
  return `
    <article class="product-card${p.featured ? " featured" : ""}">
      <div class="card-media">
        <img src="${p.img}" alt="${p.title} cover" loading="lazy" width="400" height="300">
        ${p.tag ? `<span class="stamp">${p.tag}</span>` : ""}
      </div>
      <div class="card-body">
        <h3>${p.title}</h3>
        <p class="card-desc">${p.short}</p>
        <div class="card-price-row">${priceRow}</div>
        <a href="${p.page}" class="btn btn-outline btn-block card-cta">View Details</a>
      </div>
    </article>`;
}

function renderProductGrid(containerId, products) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = products.map(productCardHtml).join("");
}
