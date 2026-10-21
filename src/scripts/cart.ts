import { company } from "../data/company";

// Cart kept in localStorage (per browser). Storage can be unavailable (private mode), so every
// read/write is guarded and the cart then simply lives for the page view.
export interface CartItem {
  /** Line identity: product slug, plus size for products sold in several sizes */
  key?: string;
  slug: string;
  name: string;
  price: number;
  size?: string;
  tint: string;
  thumb: string;
  qty: number;
}

const KEY = "mm-cart";
const MAX_QTY = 20;
let items: CartItem[] = load();
const listeners = new Set<() => void>();

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
  listeners.forEach((fn) => fn());
}

export const getItems = () => items;
export const count = () => items.reduce((n, i) => n + i.qty, 0);
export const subtotal = () => items.reduce((n, i) => n + i.qty * i.price, 0);
const en = document.documentElement.lang === "en";
const shopPath = en ? "/en/shop" : "/shop";
const t = en
  ? { qty: "Quantity", fewer: "Fewer", more: "More", remove: "Remove", shipLeft: (x: string) => `You're <strong>${x}</strong> away from free shipping`, shipFree: "You've got <strong>free shipping</strong>!" }
  : { qty: "Antal", fewer: "Færre", more: "Flere", remove: "Fjern", shipLeft: (x: string) => `Du mangler <strong>${x}</strong> for fri fragt`, shipFree: "Du har <strong>fri fragt</strong>!" };
export const kr = (n: number) => (en ? `DKK ${n.toLocaleString("en-GB")}` : `${n.toLocaleString("da-DK")} kr`);
export const onChange = (fn: () => void) => listeners.add(fn);

const keyOf = (i: { key?: string; slug: string }) => i.key ?? i.slug;

export function add(item: Omit<CartItem, "qty">, qty = 1) {
  const existing = items.find((i) => keyOf(i) === keyOf(item));
  if (existing) existing.qty = Math.min(MAX_QTY, existing.qty + qty);
  else items = [...items, { ...item, qty: Math.min(MAX_QTY, qty) }];
  commit();
}

export function setQty(key: string, qty: number) {
  items = qty <= 0 ? items.filter((i) => keyOf(i) !== key) : items.map((i) => (keyOf(i) === key ? { ...i, qty: Math.min(MAX_QTY, qty) } : i));
  commit();
}

// Another tab changed the cart
window.addEventListener("storage", (e) => {
  if (e.key === KEY) {
    items = load();
    listeners.forEach((fn) => fn());
  }
});

/** Markup for one editable cart line; shared by the drawer and the checkout page. */
export function lineHtml(i: CartItem) {
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
  return `
    <div class="cart-line" data-key="${esc(keyOf(i))}">
      <a class="cart-thumb bg-${esc(i.tint)}" href="${shopPath}/${esc(i.slug)}"><img src="${esc(i.thumb)}" alt="" /></a>
      <div class="cart-info">
        <a class="cart-name" href="${shopPath}/${esc(i.slug)}">${esc(i.name)}</a>
        <span class="cart-meta">${i.size ? esc(i.size) + " · " : ""}${kr(i.price)}</span>
        <div class="stepper" role="group" aria-label="${t.qty} ${esc(i.name)}">
          <button type="button" data-qty="-1" aria-label="${t.fewer}">−</button>
          <span>${i.qty}</span>
          <button type="button" data-qty="1" aria-label="${t.more}">+</button>
        </div>
      </div>
      <div class="cart-right">
        <strong>${kr(i.qty * i.price)}</strong>
        <button type="button" class="cart-remove" data-remove>${t.remove}</button>
      </div>
    </div>`;
}

/** Wire +/−/remove clicks inside a container that renders lineHtml(). */
export function bindLines(container: HTMLElement) {
  container.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    const line = t.closest<HTMLElement>(".cart-line");
    if (!line) return;
    const key = line.dataset.key!;
    const item = items.find((i) => keyOf(i) === key);
    if (!item) return;
    if (t.closest("[data-remove]")) setQty(key, 0);
    const step = t.closest<HTMLElement>("[data-qty]");
    if (step) setQty(key, item.qty + Number(step.dataset.qty));
  });
}

// ---- header badge + drawer ----
const drawer = document.getElementById("cart-drawer");
const backdrop = document.getElementById("cart-backdrop");
const drawerLines = document.querySelector<HTMLElement>("[data-cart-lines]");

export function openDrawer() {
  if (!drawer || !backdrop) return;
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  backdrop.hidden = false;
  document.body.classList.add("locked");
}
function closeDrawer() {
  if (!drawer || !backdrop) return;
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  backdrop.hidden = true;
  document.body.classList.remove("locked");
}

function render() {
  const n = count();
  document.querySelectorAll<HTMLElement>("[data-cart-count]").forEach((el) => {
    el.textContent = String(n);
    el.hidden = n === 0;
  });
  document.querySelectorAll<HTMLElement>("[data-cart-subtotal]").forEach((el) => (el.textContent = kr(subtotal())));
  // Free shipping from company.freeShippingOver kr (incl. moms) and up
  const sub = subtotal();
  const left = Math.max(0, company.freeShippingOver - sub);
  document.querySelectorAll<HTMLElement>("[data-ship-meter]").forEach((m) => {
    m.classList.toggle("done", left === 0);
    m.querySelector("[data-ship-text]")!.innerHTML = left === 0 ? t.shipFree : t.shipLeft(kr(left));
    m.querySelector<HTMLElement>("[data-ship-fill]")!.style.width = `${Math.min(100, (sub / company.freeShippingOver) * 100)}%`;
  });
  document.querySelectorAll<HTMLElement>("[data-ship-cost]").forEach((el) => (el.textContent = left === 0 ? el.dataset.free! : el.dataset.later!));
  document.querySelectorAll<HTMLElement>("[data-cart-empty]").forEach((el) => (el.hidden = n > 0));
  document.querySelectorAll<HTMLElement>("[data-cart-filled]").forEach((el) => (el.hidden = n === 0));
  if (drawerLines) drawerLines.innerHTML = items.map(lineHtml).join("");
}

if (drawerLines) bindLines(drawerLines);
document.querySelectorAll("[data-cart-open]").forEach((b) => b.addEventListener("click", openDrawer));
document.querySelectorAll("[data-cart-close]").forEach((b) => b.addEventListener("click", closeDrawer));
backdrop?.addEventListener("click", closeDrawer);
document.addEventListener("keydown", (e) => e.key === "Escape" && closeDrawer());

// "Læg i kurv" buttons carry the product as JSON; a sibling [data-qty-input] sets the amount
document.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-add]");
  if (!btn) return;
  const qtyInput = btn.closest("form, .buy-box")?.querySelector<HTMLInputElement>("[data-qty-input]");
  const qty = Math.max(1, Number(qtyInput?.value ?? 1) || 1);
  add(JSON.parse(btn.dataset.add!), qty);
  openDrawer();
});

onChange(render);
render();
