import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";

export type CartLine = {
  key: string;
  productId: string;
  size?: string;
  color: string;
  qty: number;
};

type StoreValue = {
  lines: CartLine[];
  wishlist: string[];
  add: (product: Product, opts: { size?: string; color: string; qty?: number }) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  toggleWish: (id: string) => void;
  count: number;
  subtotal: number;
  detailed: (CartLine & { product: Product })[];
};

const StoreContext = createContext<StoreValue | null>(null);

const CART_KEY = "ismailify.cart";
const WISH_KEY = "ismailify.wishlist";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      if (c) setLines(JSON.parse(c));
      const w = localStorage.getItem(WISH_KEY);
      if (w) setWishlist(JSON.parse(w));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines]);
  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const value = useMemo<StoreValue>(() => {
    const detailed = lines
      .map((l) => {
        const product = products.find((p) => p.id === l.productId);
        return product ? { ...l, product } : null;
      })
      .filter(Boolean) as (CartLine & { product: Product })[];

    return {
      lines,
      wishlist,
      detailed,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: detailed.reduce((n, l) => n + l.product.price * l.qty, 0),
      add: (product, { size, color, qty = 1 }) => {
        const key = [product.id, size ?? "-", color].join("|");
        setLines((prev) => {
          const found = prev.find((l) => l.key === key);
          if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
          return [...prev, { key, productId: product.id, size, color, qty }];
        });
      },
      setQty: (key, qty) =>
        setLines((prev) =>
          qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
        ),
      remove: (key) => setLines((prev) => prev.filter((l) => l.key !== key)),
      clear: () => setLines([]),
      toggleWish: (id) =>
        setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    };
  }, [lines, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
