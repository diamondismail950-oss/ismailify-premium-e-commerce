import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { categories } from "@/data/products";
import { useStore } from "@/lib/store";
import logoAsset from "@/assets/Ismailify_Logo.png.asset.json";

import type { CategoryPath } from "@/data/products";

type NavItem = { label: string; to: CategoryPath | "/shop" | "/about" | "/contact" };

const nav: NavItem[] = [
  { label: "Shop", to: "/shop" },
  ...categories.map((c) => ({ label: c.name, to: c.path })),
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const { count } = useStore();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: q ? { q } : {} });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="shell grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-4">
        <Link to="/" className="shrink-0" aria-label="ISMAILIFY home">
          <img
            src={logoAsset.url}
            alt="ISMAILIFY"
            className="h-7 w-auto object-contain sm:h-8"
            width="160"
            height="40"
          />
        </Link>

        <nav className="hidden min-w-0 items-center justify-center gap-6 lg:flex">
          {nav.slice(0, 7).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="whitespace-nowrap text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <form onSubmit={submitSearch} className="hidden items-center gap-2 md:flex">
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <div className="flex items-center gap-2 rounded-sm border border-border px-3 py-2 transition-colors focus-within:border-primary">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                id="site-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
                className="w-28 bg-transparent text-xs uppercase tracking-[0.15em] outline-none placeholder:text-muted-foreground xl:w-36"
              />
            </div>
          </form>

          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center rounded-sm border border-border transition-colors hover:border-primary"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">
                {count}
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-sm border border-border lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border lg:hidden">
          <div className="shell grid gap-1 py-5">
            <form onSubmit={submitSearch} className="mb-3 flex items-center gap-2 border border-border px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search ISMAILIFY"
                aria-label="Search products"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </form>
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
