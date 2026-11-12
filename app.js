// Bella Scelta catalog — product data verified against bella-scelta.com (2026-10/11).
const PRODUCTS = [
  // Porcelain Tile
  {n:"MYSTIC GREY", f:"porcelain", d:"Cool grey porcelain for calm, continuous floors.", c:"linear-gradient(135deg,#8f9092,#5d5e60)"},
  {n:"MYSTIC WHITE", f:"porcelain", d:"Clean white porcelain — light, space and fewer lines.", c:"linear-gradient(135deg,#f2efe9,#d8d2c4)"},
  {n:"MYSTIC ANTHRACITE", f:"porcelain", d:"Deep anthracite porcelain with architectural presence.", c:"linear-gradient(135deg,#3c3c3e,#1d1d1f)"},
  {n:"PALLADIO IVORY", f:"porcelain", d:"Warm ivory porcelain in the classical Palladio spirit.", c:"linear-gradient(135deg,#efe6d4,#d9c9a8)"},
  {n:"LINCOLN CREAM", f:"porcelain", d:"Soft cream porcelain for bright, open living spaces.", c:"linear-gradient(135deg,#f4ead8,#e0d0ae)"},
  {n:"BELVEDERE WHITE", f:"porcelain", d:"White porcelain with a refined, gallery-like finish.", c:"linear-gradient(135deg,#f7f5f0,#ddd8cc)"},
  {n:"CALACATTA GOLD", f:"porcelain", d:"Calacatta-look porcelain with warm gold veining.", c:"linear-gradient(135deg,#f5f1e6,#c9a45c)"},
  {n:"SLABS PERLA", f:"porcelain", d:"Pearl-tone large slabs for seamless surfaces.", c:"linear-gradient(135deg,#ece7db,#cfc6b2)"},
  {n:"LINEAE NEBULA", f:"porcelain", d:"Linear, nebula-inspired porcelain design.", c:"linear-gradient(135deg,#6d6a63,#35322c)"},
  // Natural Stone
  {n:"Travertine", f:"stone", d:"Natural travertine slab, 114.17\" x 62\". Cut from real stone.", c:"linear-gradient(135deg,#d9c6a5,#b39b72)"},
  {n:"Travertine Ocean Blue", f:"stone", d:"Blue-toned travertine slab, 121\" x 65\". A statement stone.", c:"linear-gradient(135deg,#7d94a6,#42586b)"},
  {n:"White Marble Fine Grain", f:"stone", d:"Fine-grain white marble — quiet luxury, real stone.", c:"linear-gradient(135deg,#f4f3ef,#cfd0cb)"},
  {n:"Negro Marquina", f:"stone", d:"Black marble with white veining. Drama, in stone.", c:"linear-gradient(135deg,#17171a,#3f3f45)"},
  {n:"Calacatta Extra", f:"stone", d:"Extra-grade Calacatta marble for signature spaces.", c:"linear-gradient(135deg,#f6f2e8,#b9ac8e)"},
  {n:"Statuario Polished", f:"stone", d:"Polished Statuario marble — the classic Italian look.", c:"linear-gradient(135deg,#f8f7f3,#d5d2c8)"},
  // Engineered Wood
  {n:"Invisible Select", f:"wood", d:"Engineered wood in 7\" and 9.5\" widths — our select grade.", c:"linear-gradient(135deg,#c8a87e,#9a7c52)"},
  {n:"Linum", f:"wood", d:"Light, linen-toned engineered wood flooring.", c:"linear-gradient(135deg,#dcc7a2,#b39468)"},
  {n:"Liz", f:"wood", d:"Warm mid-tone engineered wood, easy in any room.", c:"linear-gradient(135deg,#b98d5f,#8a653c)"},
  {n:"Lonchness", f:"wood", d:"Deep, moody engineered wood with character.", c:"linear-gradient(135deg,#7d5c39,#4e3820)"},
  {n:"Segovia", f:"wood", d:"Spanish-inspired warm engineered wood.", c:"linear-gradient(135deg,#c09a67,#96703f)"},
  {n:"South Beach", f:"wood", d:"Bright coastal engineered wood — Miami light, real wood.", c:"linear-gradient(135deg,#e2cda6,#bd9c6d)"},
  {n:"Toast", f:"wood", d:"Toasted warm-brown engineered wood flooring.", c:"linear-gradient(135deg,#a97c4c,#75522c)"},
  // SPC Flooring
  {n:"Elm Amber", f:"spc", d:"100% waterproof SPC in a warm amber elm look.", c:"linear-gradient(135deg,#c99e62,#9c743d)"},
  {n:"Elm Artic", f:"spc", d:"100% waterproof SPC in a cool arctic elm look.", c:"linear-gradient(135deg,#d8d5cc,#a9a499)"},
  {n:"Elm Linen", f:"spc", d:"100% waterproof SPC in a soft linen elm look.", c:"linear-gradient(135deg,#e0d3b4,#baa87f)"},
  {n:"Elm Natural", f:"spc", d:"100% waterproof SPC in a natural elm look.", c:"linear-gradient(135deg,#cbb086,#a37f4f)"},
  {n:"Elm Shadow", f:"spc", d:"100% waterproof SPC in a deep shadow elm look.", c:"linear-gradient(135deg,#6f5b40,#463723)"},
  {n:"Elm Smoke", f:"spc", d:"100% waterproof SPC in a smoked elm look.", c:"linear-gradient(135deg,#8d8378,#5c554b)"},
];
const FAM = {porcelain:"Porcelain Tile", stone:"Natural Stone", wood:"Engineered Wood", spc:"SPC Flooring"};
const grid = document.getElementById("grid");
const quote = new Set();

function render(filter){
  grid.innerHTML = "";
  PRODUCTS.filter(p => filter==="all" || p.f===filter).forEach(p => {
    const el = document.createElement("article");
    el.className = "card";
    const inQ = quote.has(p.n);
    el.innerHTML = `<div class="swatch" style="background:${p.c}"></div>
      <span class="fam">${FAM[p.f]}</span><h3>${p.n}</h3><p>${p.d}</p>
      <button class="${inQ ? "added" : ""}">${inQ ? "✓ In quote list" : "Add to quote list"}</button>`;
    el.querySelector("button").addEventListener("click", () => {
      if (quote.has(p.n)) quote.delete(p.n); else quote.add(p.n);
      syncQuote(); render(document.querySelector(".filter.active").dataset.filter);
    });
    grid.appendChild(el);
  });
}
function syncQuote(){
  document.getElementById("quoteCount").textContent = quote.size;
  const s = document.getElementById("quoteSummary");
  s.textContent = quote.size
    ? "Your quote list: " + [...quote].join(" · ") + " — send it to us on Instagram with your delivery ZIP."
    : "Your quote list is empty — add designs from the catalog above.";
}
document.getElementById("filters").addEventListener("click", e => {
  const b = e.target.closest(".filter"); if (!b) return;
  document.querySelectorAll(".filter").forEach(x => x.classList.remove("active"));
  b.classList.add("active"); render(b.dataset.filter);
});
document.querySelectorAll("[data-goto]").forEach(a => a.addEventListener("click", () => {
  const f = a.dataset.goto;
  document.querySelectorAll(".filter").forEach(x => x.classList.toggle("active", x.dataset.filter===f));
  render(f);
}));
render("all"); syncQuote();
