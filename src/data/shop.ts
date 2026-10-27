import { products, shopVariants, type Category } from "./products";

/**
 * The neutral product list the compliant shop shows: name, type, weight and price only
 * (BEK 570/2021 § 4, stk. 3). Herbal smoking products may not be shown with pictures,
 * colours, logos or promotional text, so nothing else from products.ts is used here.
 */

/** Left out until a lawyer has cleared the name: it refers to a taste or a real person, or it carries the logo. */
const HELD_BACK = ["milkshake-zeethos", "rainbow-sherbet", "turbobacon", "obama-runtz", "mister-mellow-lighter"];

const TYPE: Record<Exclude<Category, "accessory">, string> = {
  flower: "Blomst",
  preroll: "Forrullet",
  hash: "Hash",
};

export interface ShopLine {
  key: string;
  name: string;
  type: string;
  size: string;
  grams: number;
  price: number;
}

export const shopLines: ShopLine[] = products
  .filter((p) => !HELD_BACK.includes(p.slug) && p.category !== "accessory")
  .flatMap((p) =>
    shopVariants(p).map((v) => ({
      key: `${p.slug}:${v.size}`,
      name: p.name,
      type: TYPE[p.category as keyof typeof TYPE],
      size: v.size,
      grams: parseFloat(v.size),
      price: v.retail,
    })),
  );

export const kr = (n: number) => `${n.toLocaleString("da-DK")} kr.`;

/** Unit price per kg, required for prepacked goods of 50 g or more (BEK 1696/2017 §§ 3 og 8). */
export const perKg = (l: ShopLine) => (l.grams >= 50 ? `${kr(Math.round((l.price / l.grams) * 1000))}/kg` : "");
