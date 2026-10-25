const I18N = {
  ko: {
    navProducts: "상품",
    navAbout: "소개",
    navContact: "문의",
    productsTitle: "상품",
    aboutTitle: "소개",
    contactTitle: "문의",
    all: "전체",
    ebook: "전자책",
    goodnotes: "굿노트",
    notion: "노션",
    buyOn: (store) => `${store}에서 보기`,
    empty: "등록된 상품이 없습니다.",
  },
  en: {
    navProducts: "Products",
    navAbout: "About",
    navContact: "Contact",
    productsTitle: "Products",
    aboutTitle: "About",
    contactTitle: "Contact",
    all: "All",
    ebook: "Ebooks",
    goodnotes: "GoodNotes",
    notion: "Notion",
    buyOn: (store) => `View on ${store}`,
    empty: "No products yet.",
  },
};

const STORE_LABEL = { kmong: "크몽", etsy: "Etsy", gumroad: "Gumroad" };
const CATEGORIES = ["all", "ebook", "goodnotes", "notion"];

let lang = "ko";
let category = "all";

try {
  const saved = localStorage.getItem("lang");
  if (saved === "ko" || saved === "en") lang = saved;
  else if (!navigator.language.startsWith("ko")) lang = "en";
} catch (e) {}

function el(tag, attrs = {}, text) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (text !== undefined) node.textContent = text;
  return node;
}

function storeLabel(key) {
  return lang === "en" && key === "kmong" ? "Kmong" : STORE_LABEL[key];
}

function renderStatic() {
  const t = I18N[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((n) => (n.textContent = t[n.dataset.i18n]));
  document.querySelectorAll("[data-site]").forEach((n) => {
    const v = SITE[n.dataset.site];
    n.textContent = typeof v === "object" ? v[lang] : v;
  });
  document.getElementById("langToggle").textContent = lang === "ko" ? "EN" : "KO";

  const stores = document.getElementById("storeLinks");
  stores.replaceChildren();
  for (const [key, url] of Object.entries(SITE.stores)) {
    if (!url) continue;
    stores.append(el("a", { href: url, target: "_blank", rel: "noopener", class: `store-btn ${key}` }, storeLabel(key)));
  }

  const email = document.getElementById("emailLink");
  email.href = `mailto:${SITE.email}`;
  email.textContent = SITE.email;

  const social = document.getElementById("socialLinks");
  social.replaceChildren();
  for (const [key, url] of Object.entries(SITE.social)) {
    if (!url) continue;
    social.append(el("a", { href: url, target: "_blank", rel: "noopener" }, key[0].toUpperCase() + key.slice(1)));
  }
}

function renderFilters() {
  const box = document.getElementById("filters");
  box.replaceChildren();
  for (const c of CATEGORIES) {
    const btn = el("button", { type: "button", role: "tab", "aria-selected": String(c === category) }, I18N[lang][c]);
    btn.addEventListener("click", () => {
      category = c;
      renderFilters();
      renderProducts();
    });
    box.append(btn);
  }
}

function renderProducts() {
  const t = I18N[lang];
  const grid = document.getElementById("productGrid");
  grid.replaceChildren();
  const list = PRODUCTS.filter((p) => category === "all" || p.category === category);
  if (!list.length) {
    grid.append(el("p", { class: "empty" }, t.empty));
    return;
  }
  for (const p of list) {
    const card = el("article", { class: "card" });
    const thumb = el("div", { class: `thumb ${p.category}` });
    if (p.image) thumb.append(el("img", { src: p.image, alt: p.title[lang], loading: "lazy" }));
    else thumb.append(el("span", {}, t[p.category]));

    const body = el("div", { class: "card-body" });
    body.append(el("span", { class: "badge" }, t[p.category]));
    body.append(el("h3", {}, p.title[lang]));
    body.append(el("p", { class: "desc" }, p.desc[lang]));
    if (p.price) body.append(el("p", { class: "price" }, p.price));

    const links = el("div", { class: "card-links" });
    for (const [key, url] of Object.entries(p.links || {})) {
      links.append(el("a", { href: url, target: "_blank", rel: "noopener", class: `store-btn ${key}` }, t.buyOn(storeLabel(key))));
    }
    body.append(links);
    card.append(thumb, body);
    grid.append(card);
  }
}

function render() {
  renderStatic();
  renderFilters();
  renderProducts();
}

document.getElementById("langToggle").addEventListener("click", () => {
  lang = lang === "ko" ? "en" : "ko";
  try { localStorage.setItem("lang", lang); } catch (e) {}
  render();
});
document.getElementById("year").textContent = new Date().getFullYear();
render();
