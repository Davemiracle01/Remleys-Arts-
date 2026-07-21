/**
 * Remleys Arts — app.js
 * Handles rendering, filtering, sorting of product listings
 */

const WA_NUMBER = "254702538038";
const IG_HANDLE = "remlys._arts.ke";

// ---- Image path resolver ----
function getImagePath(filename) {
  if (!filename) return null;
  return `images/products/${filename}`;
}

// ---- Format price ----
function formatPrice(product) {
  if (product.price) return "KSH " + product.price.toLocaleString("en-KE");
  if (product.category === "commission") return "Custom quote";
  return "Negotiable";
}

// ---- Badge label ----
function badgeLabel(cat) {
  const labels = { custom: "Custom-Made", printed: "Printed Anime", commission: "Commission" };
  return labels[cat] || cat;
}

// ---- Build WhatsApp message ----
function waLink(product) {
  const msg = product.category === "commission"
    ? encodeURIComponent(`Hello, I'd like to commission a custom design from Remleys Arts. Here's my idea:`)
    : encodeURIComponent(`Hello, I'm interested in the *${product.name}*${product.design ? ` (${product.design})` : ""}. Is it still available?`);
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

// ---- SVG icons ----
const icons = {
  brush: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/></svg>`,
  design: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5"/></svg>`,
  tag: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5"/></svg>`,
  wa: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.524 5.847L.057 23.882l6.198-1.443A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.68.857.893-3.564-.234-.373A9.818 9.818 0 0112 2.182c5.426 0 9.818 4.392 9.818 9.818 0 5.427-4.392 9.818-9.818 9.818z"/></svg>`
};

// ---- Render single card ----
function renderCard(product, index) {
  const imgPath = getImagePath(product.image);
  const price = formatPrice(product);
  const isNegotiable = !product.price;

  const imgHtml = imgPath
    ? `<img src="${imgPath}" alt="${product.name}" loading="lazy" onerror="this.parentElement.innerHTML=placeholderHtml()">`
    : placeholderHtml();

  const metaChips = [];
  if (product.technique) metaChips.push(`<span class="meta-chip">${icons.brush}${product.technique}</span>`);
  if (product.notes) metaChips.push(`<span class="meta-chip">${icons.tag}${product.notes}</span>`);

  const priceHtml = isNegotiable
    ? `<span class="card-price negotiable">${price}</span>`
    : `<span class="card-price">${price}</span>`;

  const cta = product.ctaLabel || "Order Now";

  return `
    <article class="card" style="animation-delay:${index * 70}ms">
      <div class="card-img">
        ${imgHtml}
        <span class="card-badge badge-${product.category}">${badgeLabel(product.category)}</span>
        <span class="card-tag" aria-hidden="true"></span>
      </div>
      <div class="card-body">
        <h2 class="card-name">${product.name}</h2>
        ${product.design ? `<p class="card-breed">${product.design}</p>` : ""}
        ${metaChips.length ? `<div class="card-meta">${metaChips.join("")}</div>` : ""}
        <div class="card-footer">
          ${priceHtml}
          <a href="${waLink(product)}" target="_blank" class="card-cta">
            ${icons.wa} ${cta}
          </a>
        </div>
      </div>
    </article>`;
}

// ---- Placeholder on image error ----
function placeholderHtml() {
  return `<div class="card-img-placeholder">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:48px;height:48px;opacity:0.3">
      <path d="M3 9l4-4 4 4 4-4 4 4v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
    </svg>
    <span>Photo coming soon</span>
  </div>`;
}
window.placeholderHtml = placeholderHtml;

// ---- Populate design filter ----
function populateDesigns() {
  const sel = document.getElementById("designSelect");
  if (!sel || typeof PRODUCTS === "undefined") return;
  const designs = [...new Set(PRODUCTS.map(p => p.design).filter(Boolean))].sort();
  designs.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    sel.appendChild(opt);
  });
}

// ---- Main render ----
let currentCat = "all";
let currentSort = "default";
let currentDesign = "all";

function render() {
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");
  const total = document.getElementById("totalCount");
  if (!grid || typeof PRODUCTS === "undefined") return;

  let list = [...PRODUCTS];

  if (currentCat !== "all") list = list.filter(p => p.category === currentCat);
  if (currentDesign !== "all") list = list.filter(p => p.design === currentDesign);

  if (currentSort === "price-asc") list.sort((a, b) => (a.price || 999999) - (b.price || 999999));
  else if (currentSort === "price-desc") list.sort((a, b) => (b.price || 0) - (a.price || 0));
  else if (currentSort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

  if (total) total.textContent = PRODUCTS.length;

  if (list.length === 0) {
    grid.innerHTML = "";
    if (empty) empty.style.display = "block";
    return;
  }
  if (empty) empty.style.display = "none";
  grid.innerHTML = list.map((p, i) => renderCard(p, i)).join("");
}

// ---- Event listeners ----
document.addEventListener("DOMContentLoaded", () => {
  populateDesigns();
  render();

  document.getElementById("categoryTabs")?.addEventListener("click", e => {
    const tab = e.target.closest(".tab");
    if (!tab) return;
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentCat = tab.dataset.cat;
    render();
  });

  document.getElementById("sortSelect")?.addEventListener("change", e => {
    currentSort = e.target.value;
    render();
  });

  document.getElementById("designSelect")?.addEventListener("change", e => {
    currentDesign = e.target.value;
    render();
  });

  const nav = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 40);
  });

  // Scroll-reveal for the process filmstrip (respects reduced motion)
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const steps = document.querySelectorAll(".process-step");
  if (steps.length && !prefersReduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    steps.forEach(s => io.observe(s));
  } else {
    steps.forEach(s => s.classList.add("in-view"));
  }
});
      
