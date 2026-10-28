import { categoryHref, kr as formatKr, productHref, type L, type Lang } from "../i18n";

export type Category = "flower" | "preroll" | "hash" | "accessory";
export type Tint = "lavender" | "peach" | "pink" | "butter";

/** How a product is pictured: drawn packaging in brand colours, a photo, or a transparent packshot of the real packaging. */
export type Visual =
  | { kind: "pouch"; color: "purple" | "orange"; logo: "cream" | "navy"; label: string }
  | { kind: "tubes"; color: "pink" | "yellow"; label: string }
  | { kind: "lighter" }
  | { kind: "photo"; src: string; alt: string }
  | { kind: "packshot"; src: string; alt: string }
  /** A photo that fills the whole tile (used when there's no white-background product shot) */
  | { kind: "cover"; src: string; alt: string };

/** A size the consumer shop sells; price incl. moms, kr. */
export interface Variant {
  size: string;
  retail: number;
}

/** Shop price for loose flower pouches. */
export const PRICE_PER_GRAM = 109;
const byGram = (...grams: number[]): Variant[] => grams.map((g) => ({ size: `${g} g`, retail: g * PRICE_PER_GRAM }));

/** Hash is price-matched to senseshop.dk (THCa Hash 60 % – Stronk Stuff), incl. their volume discount. */
const HASH_PRICES: Variant[] = [
  { size: "2 g", retail: 199 },
  { size: "6 g", retail: 549 },
  { size: "10 g", retail: 949 },
  { size: "20 g", retail: 1849 },
  { size: "50 g", retail: 2799 },
  { size: "100 g", retail: 4499 },
];

export interface Product {
  slug: string;
  name: string;
  category: Category;
  format: L;
  strain?: "Indica" | "Sativa" | "Hybrid";
  size?: string;
  description: L;
  /** Indkøbspris ekskl. moms, kr */
  wholesale?: number;
  /** Vejledende udsalgspris inkl. moms, kr (forhandlersiden) */
  retail?: number;
  /** Sizes the consumer shop sells; when set, these replace size/retail in the shop */
  variants?: Variant[];
  /** Short clips of the strain, shown on the product page (first one is the main video) */
  videos?: string[];
  /** Webshop price incl. moms, kr, for products without a vejl. udsalgspris (keeps the retailer page unchanged) */
  shopPrice?: number;
  onRequest?: boolean;
  featured?: boolean;
  tint: Tint;
  visual: Visual;
}

export interface CategoryInfo {
  id: Category;
  label: L;
  tint: Tint;
  visual: Visual;
}

export const categories: CategoryInfo[] = [
  { id: "flower", label: { da: "Blomster", en: "Flower" }, tint: "lavender", visual: { kind: "photo", src: "/img/flower-trio.jpg", alt: "" } },
  { id: "preroll", label: { da: "Forrullede", en: "Pre-rolled" }, tint: "pink", visual: { kind: "packshot", src: "/img/tube-daydream.webp", alt: "" } },
  { id: "hash", label: { da: "Hash", en: "Hash" }, tint: "peach", visual: { kind: "photo", src: "/img/fresh-frozen.jpg", alt: "" } },
];

const allProducts: Product[] = [
  {
    slug: "midnight-rider",
    name: "Midnight Rider",
    category: "flower",
    format: { da: "Pose", en: "Pouch" },
    strain: "Indica",
    size: "6 g",
    description: {
      da: "Vores signaturblanding til aftenen – blød og mellow til natteravnen i dig.",
      en: "Our signature evening blend – smooth and mellow for the night owl in you.",
    },
    wholesale: 345,
    retail: 769,
    variants: byGram(2, 6, 10, 20, 50, 100),
    featured: true,
    tint: "lavender",
    visual: { kind: "packshot", src: "/img/pouch-midnight-rider.webp", alt: "Midnight Rider pose" },
  },
  {
    slug: "sunday-cruise",
    name: "Sunday Cruise",
    category: "flower",
    format: { da: "Pose", en: "Pouch" },
    strain: "Sativa",
    size: "2 g",
    description: {
      da: "En frisk og opløftende blanding til dovne eftermiddage og lange weekender.",
      en: "A fresh, uplifting blend for lazy afternoons and long weekends.",
    },
    wholesale: 115,
    retail: 259,
    variants: byGram(2, 6, 10, 20, 50, 100),
    featured: true,
    tint: "peach",
    visual: { kind: "packshot", src: "/img/pouch-sunday-cruise.webp", alt: "Sunday Cruise pose" },
  },
  {
    slug: "king-louie",
    name: "King Louie",
    category: "flower",
    format: { da: "Flower", en: "Flower" },
    description: {
      da: "King Louie – Cali-flower med THC-A. Se sorten tæt på i videoen.",
      en: "King Louie – Cali flower with THC-A. See the strain up close in the video.",
    },
    variants: byGram(2, 6, 10, 20, 50, 100),
    videos: ["/video/king-louie-1.mp4"],
    tint: "lavender",
    visual: { kind: "photo", src: "/img/flower/king-louie.webp", alt: "King Louie" },
  },
  {
    slug: "pornstar",
    name: "Pornstar",
    category: "flower",
    format: { da: "Flower", en: "Flower" },
    description: {
      da: "Pornstar – Cali-flower med THC-A. Se sorten tæt på i videoen.",
      en: "Pornstar – Cali flower with THC-A. See the strain up close in the video.",
    },
    variants: byGram(2, 6, 10, 20, 50, 100),
    videos: ["/video/pornstar-1.mp4", "/video/pornstar-2.mp4"],
    tint: "peach",
    visual: { kind: "photo", src: "/img/flower/pornstar.webp", alt: "Pornstar" },
  },
  {
    slug: "pink-castle",
    name: "Pink Castle",
    category: "flower",
    format: { da: "Flower", en: "Flower" },
    description: {
      da: "Pink Castle – Cali-flower med THC-A. Se sorten tæt på i videoen.",
      en: "Pink Castle – Cali flower with THC-A. See the strain up close in the video.",
    },
    variants: byGram(2, 6, 10, 20, 50, 100),
    videos: ["/video/pink-castle-1.mp4"],
    tint: "pink",
    visual: { kind: "photo", src: "/img/flower/pink-castle.webp", alt: "Pink Castle" },
  },
  {
    slug: "milkshake-zeethos",
    name: "Milkshake Zeethos",
    category: "flower",
    format: { da: "Flower", en: "Flower" },
    description: {
      da: "Milkshake Zeethos – Cali-flower med THC-A. Se sorten tæt på i videoen.",
      en: "Milkshake Zeethos – Cali flower with THC-A. See the strain up close in the video.",
    },
    variants: byGram(2, 6, 10, 20, 50, 100),
    videos: ["/video/milkshake-zeethos-1.mp4"],
    tint: "butter",
    visual: { kind: "photo", src: "/img/flower/milkshake-zeethos.webp", alt: "Milkshake Zeethos" },
  },
  {
    slug: "flying-dutchman",
    name: "Flying Dutchman",
    category: "flower",
    format: { da: "Flower", en: "Flower" },
    description: {
      da: "Flying Dutchman – Cali-flower med THC-A. Se sorten tæt på i videoen.",
      en: "Flying Dutchman – Cali flower with THC-A. See the strain up close in the video.",
    },
    variants: byGram(2, 6, 10, 20, 50, 100),
    videos: ["/video/flying-dutchman-1.mp4", "/video/flying-dutchman-2.mp4", "/video/flying-dutchman-3.mp4"],
    tint: "lavender",
    visual: { kind: "cover", src: "/img/flower/flying-dutchman.webp", alt: "Flying Dutchman" },
  },
  {
    slug: "obama-runtz",
    name: "Obama Runtz",
    category: "flower",
    format: { da: "Flower", en: "Flower" },
    description: {
      da: "Obama Runtz – Cali-flower med THC-A.",
      en: "Obama Runtz – Cali flower with THC-A.",
    },
    variants: byGram(2, 6, 10, 20, 50, 100),
    tint: "peach",
    visual: { kind: "photo", src: "/img/flower/obama-runtz.webp", alt: "Obama Runtz" },
  },
  {
    slug: "rainbow-sherbet",
    name: "Rainbow Sherbet",
    category: "flower",
    format: { da: "Flower", en: "Flower" },
    description: {
      da: "Rainbow Sherbet – Cali-flower med THC-A.",
      en: "Rainbow Sherbet – Cali flower with THC-A.",
    },
    variants: byGram(2, 6, 10, 20, 50, 100),
    tint: "pink",
    visual: { kind: "photo", src: "/img/flower/rainbow-sherbet.webp", alt: "Rainbow Sherbet" },
  },
  {
    slug: "turbobacon",
    name: "TurboBacon",
    category: "flower",
    format: { da: "Flower", en: "Flower" },
    description: {
      da: "TurboBacon – Cali-flower med THC-A.",
      en: "TurboBacon – Cali flower with THC-A.",
    },
    variants: byGram(2, 6, 10, 20, 50, 100),
    tint: "butter",
    visual: { kind: "photo", src: "/img/flower/turbobacon.webp", alt: "TurboBacon" },
  },
  {
    slug: "daydream",
    name: "Daydream",
    category: "preroll",
    format: { da: "Pre-roll", en: "Pre-roll" },
    strain: "Hybrid",
    size: "1 g",
    description: {
      da: "Håndrullet med vores Daydream-blanding – blød og afslappende til et stille øjeblik.",
      en: "Hand-rolled with our Daydream blend – smooth and relaxing for a quiet moment.",
    },
    wholesale: 49,
    retail: 125,
    featured: true,
    tint: "pink",
    visual: { kind: "packshot", src: "/img/tube-daydream.webp", alt: "Daydream pre-roll" },
  },
  {
    slug: "sunrise",
    name: "Sunrise",
    category: "preroll",
    format: { da: "Pre-roll", en: "Pre-roll" },
    strain: "Sativa",
    size: "1 g",
    description: {
      da: "Start dagen på den mellow måde. Frisk og opløftende – i dit eget tempo.",
      en: "Start the day the mellow way. Fresh and uplifting – at your own pace.",
    },
    wholesale: 49,
    retail: 125,
    featured: true,
    tint: "butter",
    visual: { kind: "packshot", src: "/img/tube-sunrise.webp", alt: "Sunrise pre-roll" },
  },
  {
    slug: "fresh-frozen",
    name: "Fresh Frozen",
    category: "hash",
    format: { da: "Hash", en: "Hash" },
    size: "2 g",
    description: {
      da: "Fresh Frozen hash infused med THC-A – blød, aromatisk og fuld af karakter.",
      en: "Fresh Frozen hash infused with THC-A – soft, aromatic and full of character.",
    },
    wholesale: 119,
    variants: HASH_PRICES,
    featured: true,
    tint: "peach",
    visual: { kind: "photo", src: "/img/fresh-frozen.jpg", alt: "Fresh Frozen hash" },
  },
  {
    slug: "dry-sift",
    name: "Dry Sift",
    category: "hash",
    format: { da: "Hash", en: "Hash" },
    size: "2 g",
    description: {
      da: "Klassisk Dry Sift hash med THC-A – ren, tør og aromatisk.",
      en: "Classic Dry Sift hash with THC-A – clean, dry and aromatic.",
    },
    wholesale: 112,
    variants: HASH_PRICES,
    featured: true,
    tint: "lavender",
    visual: { kind: "photo", src: "/img/dry-sift.jpg", alt: "Dry Sift hash" },
  },
  {
    slug: "mister-mellow-lighter",
    name: "Mister Mellow Lighter",
    category: "accessory",
    format: { da: "Tilbehør", en: "Accessory" },
    description: {
      da: "Knaldorange BIC-lighter med Mister Mellow-logoet på begge sider.",
      en: "Bright orange BIC lighter with the Mister Mellow logo on both sides.",
    },
    wholesale: 9,
    shopPrice: 15,
    tint: "peach",
    visual: { kind: "packshot", src: "/img/lighter.webp", alt: "Mister Mellow lighter" },
  },
];

/**
 * Held back until a lawyer has cleared them: names that refer to a taste or a real person, and the
 * lighter, whose logo makes it brand-sharing (tobaksreklameloven § 2, stk. 2).
 */
const HELD_BACK = ["milkshake-zeethos", "rainbow-sherbet", "turbobacon", "obama-runtz", "mister-mellow-lighter"];

export const products = allProducts.filter((p) => !HELD_BACK.includes(p.slug));

/** What the shop sells: the variants, or the single size/retail price. */
export const shopVariants = (p: Product): Variant[] =>
  p.variants ?? ((p.shopPrice ?? p.retail) !== undefined ? [{ size: p.size ?? "", retail: (p.shopPrice ?? p.retail)! }] : []);

/** A consumer can buy it online once it has a shop price and isn't made to order. */
export const isBuyable = (p: Product) => shopVariants(p).length > 0 && !p.onRequest;

export const hasSizeChoice = (p: Product) => (p.variants?.length ?? 0) > 1;

/** Lowest shop price, for "fra 218 kr" on cards. */
export const fromPrice = (p: Product) => Math.min(...shopVariants(p).map((v) => v.retail));

/** "2–100 g" for products sold in several sizes, otherwise the single size. */
export const sizeRange = (p: Product) => {
  const v = p.variants;
  if (!v || v.length < 2) return p.size;
  const n = (x: Variant) => parseFloat(x.size);
  return `${n(v[0])}–${n(v[v.length - 1])} g`;
};

export const metaLine = (p: Product, lang: Lang) =>
  [p.category === "accessory" ? null : "THC-A", p.format[lang], p.strain, sizeRange(p)]
    .filter(Boolean)
    .join(" · ");

export const kr = formatKr;

export const productUrl = (p: Product, lang: Lang) => productHref(lang, p.slug);

export const categoryLabel = (c: Category, lang: Lang) => categories.find((x) => x.id === c)?.label[lang] ?? c;
export const categoryUrl = (c: Category, lang: Lang) => categoryHref(lang, c);

/** What the cart needs to show a line; serialised onto "Læg i kurv" buttons. One cart line per product and size. */
export const cartData = (p: Product, v: Variant = shopVariants(p)[0]) =>
  JSON.stringify({
    key: p.variants ? `${p.slug}:${v.size}` : p.slug,
    slug: p.slug,
    name: p.name,
    price: v.retail,
    size: v.size || undefined,
    tint: p.tint,
    thumb: "",
  });
