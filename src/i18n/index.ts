export type Lang = "da" | "en";
export const langs: Lang[] = ["da", "en"];

/** Text that exists in both languages. */
export type L = Record<Lang, string>;

/** Top-level pages: Danish lives at the root, English under /en with English slugs. */
const routes = {
  home: { da: "/", en: "/en/" },
  shop: { da: "/shop", en: "/en/shop" },
  faq: { da: "/faq", en: "/en/faq" },
  withdraw: { da: "/fortryd", en: "/en/withdraw" },
  cart: { da: "/kurv", en: "/en/cart" },
  privacy: { da: "/privatlivspolitik", en: "/en/privacy" },
  terms: { da: "/handelsbetingelser", en: "/en/terms" },
} satisfies Record<string, L>;

export type Route = keyof typeof routes;

export const langFromUrl = (url: URL): Lang => (url.pathname === "/en" || url.pathname.startsWith("/en/") ? "en" : "da");

export const href = (lang: Lang, route: Route) => routes[route][lang];
export const productHref = (lang: Lang, slug: string) => `${routes.shop[lang]}/${slug}`;
/** Query parameter the shop filter reads its category from. */
export const categoryParam = (lang: Lang) => (lang === "en" ? "category" : "kategori");
export const categoryHref = (lang: Lang, id: string) => `${routes.shop[lang]}?${categoryParam(lang)}=${id}`;

/** The same page in the other language, used by the DA/EN switch and hreflang links. */
export function translatePath(pathname: string, to: Lang): string {
  const clean = pathname.replace(/\/$/, "") || "/";
  for (const r of Object.values(routes)) {
    const from = langs.find((l) => (r[l].replace(/\/$/, "") || "/") === clean);
    if (from) return r[to];
  }
  // product pages: /shop/<slug> <-> /en/shop/<slug>
  const m = clean.match(/^(?:\/en)?\/shop\/([^/]+)$/);
  if (m) return productHref(to, m[1]);
  return routes.home[to];
}

export const kr = (n: number, lang: Lang) => (lang === "en" ? `DKK ${n.toLocaleString("en-GB")}` : `${n.toLocaleString("da-DK")} kr`);

/** Danish decimals ("25,12 %") written the English way ("25.12%"). */
export const pct = (s: string, lang: Lang) => (lang === "en" ? s.replace(",", ".").replace(" %", "%") : s);

/** Strings shared by the layout, header, footer, cart and product cards. */
export const ui = {
  da: {
    skipHome: "Mister Mellow forside",
    mainMenu: "Hovedmenu",
    seeAll: "Se alle",
    labReports: "Lab-rapporter",
    about: "Om os",
    faq: "FAQ",
    findUs: "Find os",
    forRetailers: "For forhandlere",
    retailer: "Forhandler",
    openCart: "Åbn kurv",
    menu: "Menu",
    language: "Sprog",
    footerTagline: "",
    allProducts: "Alle produkter",
    typeFlower: "Blomst",
    typePreroll: "Forrullet",
    typeHash: "Hash",
    buyDelivery: "Køb og levering",
    withdraw: "Fortryd aftale",
    legalLine: "Salg kun til personer over 18 år. Alderen kontrolleres med MitID ved køb.",
    disclaimerTitle: "Disclaimer",
    disclaimerText: "Vores produkter er ikke beregnet til at diagnosticere, behandle, helbrede eller forhindre sygdomme.",
    navigation: "Navigation",
    retailers: "Forhandlere",
    becomeRetailer: "Bliv forhandler",
    termsDelivery: "Vilkår & levering",
    catalog: "Katalog 2026 (PDF)",
    contact: "Kontakt",
    privacy: "Privatlivspolitik",
    terms: "Handelsbetingelser",
    adultsOnly: "Kun 18+ · Opbevares utilgængeligt for børn",
    ageTitle: "Er du fyldt",
    ageYears: "18 år?",
    ageText: "Siden er kun for personer over 18 år. Ved køb kontrolleres alderen med MitID.",
    ageYes: "Ja, jeg er 18+",
    ageNo: "Nej",
    ageDenied: "Beklager – du skal være fyldt 18 år for at besøge siden.",
    cart: "Kurv",
    yourCart: "Din kurv",
    closeCart: "Luk kurv",
    cartEmpty: "Din kurv er tom.",
    toShop: "Se produkterne",
    subtotal: "Subtotal",
    cartNote: "Priser inkl. moms.",
    checkout: "Gå til kassen",
    keepShopping: "Tilbage til produkterne",
    onRequest: "På bestilling",
    comingSoon: "Kommer snart",
    priceOnRequest: "Pris på forespørgsel",
    priceSoon: "Pris kommer snart",
    addToCart: "Læg i kurv",
    viewProduct: "Se produkt",
    chooseSize: "Vælg størrelse",
    from: "Fra",
  },
  en: {
    skipHome: "Mister Mellow home",
    mainMenu: "Main menu",
    seeAll: "See all",
    labReports: "Lab reports",
    about: "About us",
    faq: "FAQ",
    findUs: "Find us",
    forRetailers: "For retailers",
    retailer: "Retailers",
    openCart: "Open cart",
    menu: "Menu",
    language: "Language",
    footerTagline: "",
    allProducts: "All products",
    typeFlower: "Flower",
    typePreroll: "Pre-rolled",
    typeHash: "Hash",
    buyDelivery: "Buying and delivery",
    withdraw: "Cancel your purchase",
    legalLine: "Sold only to people aged 18 or over. Age is checked with MitID at purchase.",
    disclaimerTitle: "Disclaimer",
    disclaimerText: "Our products are not intended to diagnose, treat, cure or prevent any disease.",
    navigation: "Navigation",
    retailers: "Retailers",
    becomeRetailer: "Become a retailer",
    termsDelivery: "Terms & delivery",
    catalog: "Catalogue 2026 (PDF)",
    contact: "Contact",
    privacy: "Privacy policy",
    terms: "Terms and conditions",
    adultsOnly: "18+ only · Keep out of reach of children",
    ageTitle: "Are you",
    ageYears: "18 or older?",
    ageText: "This site is only for people aged 18 or over. Age is checked with MitID at purchase.",
    ageYes: "Yes, I'm 18+",
    ageNo: "No",
    ageDenied: "Sorry – you must be 18 or older to visit this site.",
    cart: "Cart",
    yourCart: "Your cart",
    closeCart: "Close cart",
    cartEmpty: "Your cart is empty.",
    toShop: "See the products",
    subtotal: "Subtotal",
    cartNote: "Prices include VAT.",
    checkout: "Go to checkout",
    keepShopping: "Back to the products",
    onRequest: "Made to order",
    comingSoon: "Coming soon",
    priceOnRequest: "Price on request",
    priceSoon: "Price coming soon",
    addToCart: "Add to cart",
    viewProduct: "View product",
    chooseSize: "Choose size",
    from: "From",
  },
} satisfies Record<Lang, Record<string, string>>;

const UK_NATIONS: Record<string, L> = {
  "GB-ENG": { da: "Storbritannien – England", en: "UK – England" },
  "GB-NIR": { da: "Storbritannien – Nordirland", en: "UK – Northern Ireland" },
  "GB-SCT": { da: "Storbritannien – Skotland", en: "UK – Scotland" },
  "GB-WLS": { da: "Storbritannien – Wales", en: "UK – Wales" },
};

/** Country names in the page language, Denmark first and the rest alphabetically. */
export function countryList(codes: readonly string[], lang: Lang) {
  const names = new Intl.DisplayNames([lang], { type: "region" });
  return codes
    .map((code) => ({ code, name: UK_NATIONS[code]?.[lang] ?? names.of(code)! }))
    .sort((a, b) => (a.code === "DK" ? -1 : b.code === "DK" ? 1 : a.name.localeCompare(b.name, lang)));
}
