/* ============================================================
   PRODUCT PAGE RENDERER — shared by every product-*.html
   Call renderProductPage('physics-11') after DOM is in place.
   ============================================================ */
function renderProductPage(id) {
  const p = findProduct(id);
  const d = PRODUCT_DETAILS[id];
  if (!p || !d) return;

  // Title bar
  document.getElementById("prodTitle").textContent = p.title;
  const heading = document.getElementById("prodTitleHeading");
  if (heading) heading.textContent = p.title;
  document.getElementById("prodRatingStars").textContent = starString(p.rating);
  document.getElementById("prodRatingText").textContent = `${p.rating} · ${p.reviews} students`;
  document.getElementById("prodDesc").textContent = d.description;

  // Price
  const priceBlock = document.getElementById("prodPriceBlock");
  priceBlock.innerHTML = p.was
    ? `<span class="price">₹${p.price}</span><span class="price-was">₹${p.was}</span>`
    : `<span class="price">₹${p.price}</span>`;
  if (p.was) {
    document.getElementById("prodSaveNote").textContent = `Save ₹${p.was - p.price} vs. buying separately`;
  }

  // Buy buttons (main + sticky)
  const buyLabel = `Buy Now ₹${p.price}`;
  document.querySelectorAll(".js-buy-btn").forEach(btn => {
    btn.textContent = buyLabel;
    btn.href = "PAYMENT_LINK_HERE";
  });
  document.getElementById("stickyTitle").textContent = p.title;
  document.getElementById("stickyPrice").textContent = `₹${p.price}`;

  // Gallery
  new ProductGallery("galleryRoot", d.gallery);

  // Features
  document.getElementById("featureGrid").innerHTML = d.features.map(f => `
    <div class="feature-item"><span class="mark">✓</span><p>${f}</p></div>
  `).join("");

  // What's included
  document.getElementById("includedList").innerHTML = d.included.map(i => `<li>📄 ${i}</li>`).join("");

  // Who should buy
  document.getElementById("goodForList").innerHTML = d.goodFor.map(i => `<li>${i}</li>`).join("");
  document.getElementById("notForList").innerHTML = d.notFor.map(i => `<li>${i}</li>`).join("");

  // Sample previews
  document.getElementById("previewGrid").innerHTML = d.previews.map((src, i) =>
    `<img src="${src}" alt="${p.title} sample page ${i + 1}" loading="lazy">`
  ).join("");

  // FAQs
  document.getElementById("prodFaq").innerHTML = d.faqs.map(([q, a]) => `
    <details class="faq-item"><summary>${q}</summary><p>${a}</p></details>
  `).join("");

  // Related products
  document.getElementById("relatedGrid").innerHTML = relatedProducts(id).map(productCardHtml).join("");

  // Structured data
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": p.title,
    "description": d.description,
    "image": d.gallery[0],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": p.price,
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": p.rating,
      "reviewCount": p.reviews
    }
  });
  document.head.appendChild(ld);
}
