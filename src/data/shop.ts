import { company } from "./company";
import { products, shopVariants, type Category } from "./products";

/**
 * The neutral product list the compliant shop shows: name, type, weight and price only
 * (BEK 570/2021 § 4, stk. 3). Herbal smoking products may not be shown with pictures,
 * colours, logos or promotional text, so nothing else from products.ts is used here.
 */

/** Left out until a lawyer has cleared the name: it refers to a taste or a real person, or it carries the logo. */
const HELD_BACK = ["milkshake-zeethos", "rainbow-sherbet", "turbobacon", "obama-runtz", "mister-mellow-lighter"];

export interface ShopCategory {
  id: Exclude<Category, "accessory">;
  slug: string;
  label: string;
  /** Singular, as it stands on the packaging: "Urtebaseret rygeprodukt – blomst" */
  type: string;
}

export const shopCategories: ShopCategory[] = [
  { id: "flower", slug: "blomster", label: "Blomster", type: "blomst" },
  { id: "hash", slug: "hash", label: "Hash", type: "hash" },
  { id: "preroll", slug: "forrullede", label: "Forrullede", type: "forrullet" },
];

export interface ShopVariant {
  key: string;
  size: string;
  grams: number;
  price: number;
}

export interface ShopProduct {
  slug: string;
  name: string;
  category: ShopCategory;
  variants: ShopVariant[];
}

export const shopProducts: ShopProduct[] = products
  .filter((p) => !HELD_BACK.includes(p.slug) && p.category !== "accessory")
  .map((p) => ({
    slug: p.slug,
    name: p.name,
    category: shopCategories.find((c) => c.id === p.category)!,
    variants: shopVariants(p).map((v) => ({ key: `${p.slug}:${v.size}`, size: v.size, grams: parseFloat(v.size), price: v.retail })),
  }));

export const productHref = (p: ShopProduct) => `/produkt/${p.slug}`;
export const categoryHref = (c: ShopCategory) => `/shop/${c.slug}`;
export const productType = (p: ShopProduct) => `Urtebaseret rygeprodukt – ${p.category.type}`;

export const kr = (n: number) => `${n.toLocaleString("da-DK", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })} kr.`;

/** "2–100 g" when sold in several sizes, otherwise the one size. */
export const sizeRange = (p: ShopProduct) =>
  p.variants.length > 1 ? `${p.variants[0].grams}–${p.variants.at(-1)!.grams} g` : p.variants[0].size;

/** Price per gram, as a range when it varies by size. */
export const gramRange = (p: ShopProduct) => {
  const per = p.variants.map((v) => v.price / v.grams);
  const [lo, hi] = [Math.min(...per), Math.max(...per)];
  return lo === hi ? `${kr(lo)}/g` : `${kr(lo)}–${kr(hi)}/g`;
};

/** Unit price per kg, required for prepacked goods of 50 g or more (BEK 1696/2017 §§ 3 og 8). */
export const perKg = (v: ShopVariant) => (v.grams >= 50 ? `${kr(Math.round((v.price / v.grams) * 1000))}/kg` : "");

/** Manufacturer details shown with each product (GPSR art. 19, to be confirmed by the lawyer). */
export const manufacturer = `${company.legalName}, ${company.address.slice(0, 2).join(", ")}, ${company.serviceEmail}`;

export const healthWarning = "Rygning af dette produkt er sundhedsskadeligt";
