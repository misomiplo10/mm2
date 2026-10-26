// PROTOTYPE ONLY: the "account" lives in this browser's localStorage so the flow can be clicked
// through without a backend. Nothing here is secure – the real version keeps accounts, orders and
// retailer approval on a server, and only sends retailer prices to approved retailers.
export type AccountType = "kunde" | "forhandler";

export interface Account {
  type: AccountType;
  name: string;
  email: string;
  company?: string;
  cvr?: string;
  phone?: string;
  /** Retailers start unapproved; Mister Mellow approves them after checking the CVR. */
  approved?: boolean;
  /** Number of qualifying orders placed (customers). */
  orders: number;
  /** Free 2 g rewards earned and not yet used. */
  rewards: number;
  marketing?: boolean;
  createdAt: string;
}

/** Loyalty rule: every STAMPS_PER_REWARD qualifying orders earn one free 2 g. */
export const STAMPS_PER_REWARD = 10;
/** An order only gets a stamp from this amount, so ten tiny orders can't farm the reward. */
export const MIN_ORDER_FOR_STAMP = 150;

const KEY = "mm-account-demo";

export function getAccount(): Account | null {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "null");
  } catch {
    return null;
  }
}

export function saveAccount(a: Account) {
  try {
    localStorage.setItem(KEY, JSON.stringify(a));
  } catch {}
}

export function signOut() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}

export const stampsOnCard = (a: Account) => a.orders % STAMPS_PER_REWARD;

/** Demo: pretend an order of at least MIN_ORDER_FOR_STAMP was placed. */
export function addDemoOrder(a: Account): Account {
  const orders = a.orders + 1;
  const rewards = a.rewards + (orders % STAMPS_PER_REWARD === 0 ? 1 : 0);
  const next = { ...a, orders, rewards };
  saveAccount(next);
  return next;
}

export const canSeeRetailerPrices = (a: Account | null) => !!a && a.type === "forhandler" && !!a.approved;
