export type Lang = "da" | "en";
export const langs: Lang[] = ["da", "en"];

/** Text that exists in both languages. */
export type L = Record<Lang, string>;

/** Top-level pages: Danish lives at the root, English under /en with English slugs. */
const routes = {
  home: { da: "/", en: "/en/" },
  shop: { da: "/shop", en: "/en/shop" },
  lab: { da: "/lab-rapporter", en: "/en/lab-reports" },
  about: { da: "/om-os", en: "/en/about" },
  faq: { da: "/faq", en: "/en/faq" },
  find: { da: "/find-os", en: "/en/find-us" },
  retail: { da: "/forhandler", en: "/en/retailers" },
  cart: { da: "/kurv", en: "/en/cart" },
  privacy: { da: "/privatlivspolitik", en: "/en/privacy" },
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
    footerTagline: "Medical grade Cali-flower og hash med THC-A. Lab-testet, høj styrke, gode vibes.",
    navigation: "Navigation",
    retailers: "Forhandlere",
    becomeRetailer: "Bliv forhandler",
    termsDelivery: "Vilkår & levering",
    catalog: "Katalog 2026 (PDF)",
    contact: "Kontakt",
    ourPolicy: "Vores politik",
    ourPolicyText: "Hos Mister Mellow får du lab-testede produkter i høj kvalitet, ærlige tal på hver pakke og personlig service – fra os til dig.",
    disclaimer: "Disclaimer",
    disclaimerText:
      "Mister Mellows produkter er naturlige cannabisprodukter og skal håndteres med omtanke. De indeholder ikke tobak og er ikke beregnet til at forebygge, behandle eller helbrede sygdom. Kun til personer over 18 år. Opbevares utilgængeligt for børn.",
    privacy: "Cookies og privatlivspolitik",
    adultsOnly: "Kun 18+ · Opbevares utilgængeligt for børn",
    ageTitle: "Er du fyldt",
    ageYears: "18 år?",
    ageText: "Mister Mellow sælges kun til personer over 18 år. Bekræft din alder for at fortsætte.",
    ageYes: "Ja, jeg er 18+",
    ageNo: "Nej",
    ageDenied: "Beklager – du skal være fyldt 18 år for at besøge siden.",
    cart: "Kurv",
    yourCart: "Din kurv",
    closeCart: "Luk kurv",
    cartEmpty: "Din kurv er tom – men det behøver den ikke at være.",
    toShop: "Gå til shoppen",
    subtotal: "Subtotal",
    cartNote: "Priser inkl. moms.",
    checkout: "Gå til kassen",
    keepShopping: "Fortsæt med at shoppe",
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
    footerTagline: "Medical grade Cali flower and hash with THC-A. Lab-tested, high potency, good vibes.",
    navigation: "Navigation",
    retailers: "Retailers",
    becomeRetailer: "Become a retailer",
    termsDelivery: "Terms & delivery",
    catalog: "Catalogue 2026 (PDF)",
    contact: "Contact",
    ourPolicy: "Our policy",
    ourPolicyText: "At Mister Mellow you get high-quality, lab-tested products, honest numbers on every pack and personal service – from us to you.",
    disclaimer: "Disclaimer",
    disclaimerText:
      "Mister Mellow products are natural cannabis products and should be handled with care. They contain no tobacco and are not intended to prevent, treat or cure any disease. For adults 18+ only. Keep out of reach of children.",
    privacy: "Cookies and privacy policy",
    adultsOnly: "18+ only · Keep out of reach of children",
    ageTitle: "Are you",
    ageYears: "18 or older?",
    ageText: "Mister Mellow is only sold to adults aged 18 and over. Please confirm your age to continue.",
    ageYes: "Yes, I'm 18+",
    ageNo: "No",
    ageDenied: "Sorry – you must be 18 or older to visit this site.",
    cart: "Cart",
    yourCart: "Your cart",
    closeCart: "Close cart",
    cartEmpty: "Your cart is empty – but it doesn't have to be.",
    toShop: "Go to the shop",
    subtotal: "Subtotal",
    cartNote: "Prices include VAT.",
    checkout: "Go to checkout",
    keepShopping: "Continue shopping",
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
