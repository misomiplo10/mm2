import { categoryHref, kr as formatKr, productHref, type L, type Lang } from "../i18n";

export type Category = "flower" | "preroll" | "hash" | "accessory";
export type Tint = "lavender" | "peach" | "pink" | "butter";

/** How a product is pictured: drawn packaging in brand colours, a photo, or a transparent packshot of the real packaging. */
export type Visual =
  | { kind: "pouch"; color: "purple" | "orange"; logo: "cream" | "navy"; label: string }
  | { kind: "tubes"; color: "pink" | "yellow"; label: string }
  | { kind: "lighter" }
  | { kind: "photo"; src: string; alt: string }
  | { kind: "packshot"; src: string; alt: string };

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
  /** Vejledende udsalgspris inkl. moms, kr */
  retail?: number;
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
  { id: "flower", label: { da: "Flower", en: "Flower" }, tint: "lavender", visual: { kind: "photo", src: "/img/flower-trio.jpg", alt: "" } },
  { id: "preroll", label: { da: "Pre-rolls", en: "Pre-rolls" }, tint: "pink", visual: { kind: "packshot", src: "/img/tube-daydream.webp", alt: "" } },
  { id: "hash", label: { da: "Hash", en: "Hash" }, tint: "peach", visual: { kind: "photo", src: "/img/fresh-frozen.jpg", alt: "" } },
  { id: "accessory", label: { da: "Tilbehør", en: "Accessories" }, tint: "peach", visual: { kind: "packshot", src: "/img/lighter.webp", alt: "" } },
];

export const products: Product[] = [
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
    featured: true,
    tint: "peach",
    visual: { kind: "packshot", src: "/img/pouch-sunday-cruise.webp", alt: "Sunday Cruise pose" },
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
    tint: "peach",
    visual: { kind: "packshot", src: "/img/lighter.webp", alt: "Mister Mellow lighter" },
  },
];

/** A consumer can buy it online once it has a retail price and isn't made to order. */
export const isBuyable = (p: Product) => p.retail !== undefined && !p.onRequest;

export const metaLine = (p: Product, lang: Lang) =>
  [p.category === "accessory" ? null : "THC-A", p.format[lang], p.strain, p.size].filter(Boolean).join(" · ");

export const kr = formatKr;

export const productUrl = (p: Product, lang: Lang) => productHref(lang, p.slug);

export const categoryLabel = (c: Category, lang: Lang) => categories.find((x) => x.id === c)?.label[lang] ?? c;
export const categoryUrl = (c: Category, lang: Lang) => categoryHref(lang, c);

/** What the cart needs to show a line; serialised onto "Læg i kurv" buttons. */
export const cartData = (p: Product) =>
  JSON.stringify({
    slug: p.slug,
    name: p.name,
    price: p.retail,
    size: p.size,
    tint: p.tint,
    thumb: p.visual.kind === "photo" || p.visual.kind === "packshot" ? p.visual.src : "/img/logo-navy.png",
  });
