/* ============================================================
   PRODUCT GALLERY — shared across every product page
   Usage: new ProductGallery('galleryRoot', [img1, img2, ...]);
   ============================================================ */
class ProductGallery {
  constructor(rootId, images, options = {}) {
    this.root = document.getElementById(rootId);
    this.images = images;
    this.index = 0;
    this.autoDelay = options.autoDelay || 4200;
    this.timer = null;
    this.render();
    this.bind();
    this.startAuto();
  }

  render() {
    this.root.innerHTML = `
      <div class="gallery">
        <div class="gallery-main" id="galleryMain" tabindex="0" role="button" aria-label="Open fullscreen view">
          <img id="galleryMainImg" src="${this.images[0]}" alt="Product preview 1" loading="eager">
          <button class="gallery-expand" id="galleryExpand" aria-label="View fullscreen">⤢</button>
        </div>
        <div class="gallery-thumbs" id="galleryThumbs">
          ${this.images.map((src, i) => `
            <button class="gallery-thumb${i === 0 ? " active" : ""}" data-index="${i}" aria-label="Preview image ${i + 1}">
              <img src="${src}" alt="Thumbnail ${i + 1}" loading="lazy">
            </button>`).join("")}
        </div>
      </div>

      <div class="lightbox" id="lightbox" aria-hidden="true">
        <button class="lightbox-close" id="lightboxClose" aria-label="Close fullscreen view">✕</button>
        <button class="lightbox-nav lightbox-prev" id="lightboxPrev" aria-label="Previous image">‹</button>
        <img id="lightboxImg" src="${this.images[0]}" alt="Fullscreen preview">
        <button class="lightbox-nav lightbox-next" id="lightboxNext" aria-label="Next image">›</button>
      </div>`;

    this.mainEl = document.getElementById("galleryMain");
    this.mainImg = document.getElementById("galleryMainImg");
    this.thumbsEl = document.getElementById("galleryThumbs");
    this.lightbox = document.getElementById("lightbox");
    this.lightboxImg = document.getElementById("lightboxImg");
  }

  goTo(i) {
    this.index = (i + this.images.length) % this.images.length;
    this.mainImg.src = this.images[this.index];
    this.lightboxImg.src = this.images[this.index];
    this.thumbsEl.querySelectorAll(".gallery-thumb").forEach((t, idx) =>
      t.classList.toggle("active", idx === this.index)
    );
  }

  next() { this.goTo(this.index + 1); this.restartAuto(); }
  prev() { this.goTo(this.index - 1); this.restartAuto(); }

  startAuto() {
    this.timer = setInterval(() => this.goTo(this.index + 1), this.autoDelay);
  }
  stopAuto() { clearInterval(this.timer); }
  restartAuto() { this.stopAuto(); this.startAuto(); }

  openLightbox() {
    this.lightbox.classList.add("open");
    this.lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    this.stopAuto();
  }
  closeLightbox() {
    this.lightbox.classList.remove("open");
    this.lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    this.startAuto();
  }

  bind() {
    // Thumbnails
    this.thumbsEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".gallery-thumb");
      if (btn) { this.goTo(Number(btn.dataset.index)); this.restartAuto(); }
    });

    // Open fullscreen
    this.mainEl.addEventListener("click", () => this.openLightbox());
    this.mainEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this.openLightbox(); }
    });
    document.getElementById("galleryExpand").addEventListener("click", (e) => {
      e.stopPropagation(); this.openLightbox();
    });
    document.getElementById("lightboxClose").addEventListener("click", () => this.closeLightbox());
    this.lightbox.addEventListener("click", (e) => { if (e.target === this.lightbox) this.closeLightbox(); });
    document.getElementById("lightboxNext").addEventListener("click", () => this.next());
    document.getElementById("lightboxPrev").addEventListener("click", () => this.prev());

    document.addEventListener("keydown", (e) => {
      if (!this.lightbox.classList.contains("open")) return;
      if (e.key === "Escape") this.closeLightbox();
      if (e.key === "ArrowRight") this.next();
      if (e.key === "ArrowLeft") this.prev();
    });

    // Hover zoom (desktop only)
    this.mainEl.addEventListener("mousemove", (e) => {
      if (window.matchMedia("(hover: none)").matches) return;
      const rect = this.mainEl.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      this.mainImg.style.transformOrigin = `${x}% ${y}%`;
      this.mainImg.style.transform = "scale(1.6)";
    });
    this.mainEl.addEventListener("mouseleave", () => {
      this.mainImg.style.transform = "scale(1)";
    });

    // Pause auto-advance while interacting
    this.mainEl.addEventListener("mouseenter", () => this.stopAuto());
    this.mainEl.addEventListener("mouseleave", () => this.startAuto());

    // Swipe support (main image + lightbox)
    this._addSwipe(this.mainEl);
    this._addSwipe(this.lightbox);
  }

  _addSwipe(el) {
    let startX = 0, startY = 0;
    el.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    el.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        dx < 0 ? this.next() : this.prev();
      }
    }, { passive: true });
  }
}
