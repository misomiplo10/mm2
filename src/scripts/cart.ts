// Cart kept in localStorage (per browser). Storage can be unavailable (private mode), so every
// read/write is guarded and the cart then simply lives for the page view.
export interface CartItem {
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
  ? { qty: "Quantity", fewer: "Fewer", more: "More", remove: "Remove" }
  : { qty: "Antal", fewer: "Færre", more: "Flere", remove: "Fjern" };
export const kr = (n: number) => (en ? `DKK ${n.toLocaleString("en-GB")}` : `${n.toLocaleString("da-DK")} kr`);
export const onChange = (fn: () => void) => listeners.add(fn);

export function add(item: Omit<CartItem, "qty">, qty = 1) {
  const existing = items.find((i) => i.slug === item.slug);
  if (existing) existing.qty = Math.min(MAX_QTY, existing.qty + qty);
  else items = [...items, { ...item, qty: Math.min(MAX_QTY, qty) }];
  commit();
}

export function setQty(slug: string, qty: number) {
  items = qty <= 0 ? items.filter((i) => i.slug !== slug) : items.map((i) => (i.slug === slug ? { ...i, qty: Math.min(MAX_QTY, qty) } : i));
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
    <div class="cart-line" data-slug="${esc(i.slug)}">
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
    const slug = line.dataset.slug!;
    const item = items.find((i) => i.slug === slug);
    if (!item) return;
    if (t.closest("[data-remove]")) setQty(slug, 0);
    const step = t.closest<HTMLElement>("[data-qty]");
    if (step) setQty(slug, item.qty + Number(step.dataset.qty));
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
