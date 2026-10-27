// Cart kept in localStorage (per browser). Storage can be unavailable (private mode), so every
// read/write is guarded and the cart then simply lives for the page view.
export interface CartItem {
  key: string;
  name: string;
  size: string;
  price: number;
  qty: number;
}

const KEY = "mm-cart-plain";
const MAX_QTY = 20;
let items: CartItem[] = load();

function load(): CartItem[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function commit() {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {}
  window.dispatchEvent(new Event("cart-change"));
}

export const getItems = () => items;
export const count = () => items.reduce((n, i) => n + i.qty, 0);
export const subtotal = () => items.reduce((n, i) => n + i.qty * i.price, 0);
export const kr = (n: number) => `${n.toLocaleString("da-DK")} kr.`;

export function add(item: Omit<CartItem, "qty">) {
  const existing = items.find((i) => i.key === item.key);
  if (existing) existing.qty = Math.min(MAX_QTY, existing.qty + 1);
  else items = [...items, { ...item, qty: 1 }];
  commit();
}

export function setQty(key: string, qty: number) {
  items = qty <= 0 ? items.filter((i) => i.key !== key) : items.map((i) => (i.key === key ? { ...i, qty: Math.min(MAX_QTY, qty) } : i));
  commit();
}

// Another tab changed the cart
window.addEventListener("storage", (e) => {
  if (e.key === KEY) {
    items = load();
    window.dispatchEvent(new Event("cart-change"));
  }
});
