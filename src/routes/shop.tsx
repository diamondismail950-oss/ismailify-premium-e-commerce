import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, type CategorySlug } from "@/data/products";

type ShopSearch = { q?: string | undefined; category?: CategorySlug | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const rawQ = search["q"];
    const rawCategory = search["category"];
    return {
      ...(typeof rawQ === "string" && rawQ ? { q: rawQ } : {}),
      ...(typeof rawCategory === "string" && categories.some((c) => c.slug === rawCategory)
        ? { category: rawCategory as CategorySlug }
        : {}),
    };
  },
  head: () => ({
    meta: [
      { title: "Shop All — ISMAILIFY" },
      {
        name: "description",
        content:
          "Browse the full ISMAILIFY collection: shirts, trousers, shoes, belts, caps and bags. Filter by category, price and rating.",
      },
      { property: "og:title", content: "Shop All — ISMAILIFY" },
      {
        property: "og:description",
        content: "The complete ISMAILIFY collection of premium menswear and accessories.",
      },
    ],
  }),
  component: Shop,
});

const sortOptions = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
] as const;

function Shop() {
  const { q, category } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [query, setQuery] = useState(q ?? "");
  const [maxPrice, setMaxPrice] = useState(400);
  const [sort, setSort] = useState<(typeof sortOptions)[number]["key"]>("featured");

  const results = useMemo(() => {
    const needle = (q ?? "").toLowerCase();
    let list = products.filter((p) => p.price <= maxPrice);
    if (category) list = list.filter((p) => p.category === category);
    if (needle)
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(needle) ||
          p.description.toLowerCase().includes(needle) ||
          p.category.includes(needle),
      );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, category, maxPrice, sort]);

  const setCategory = (slug?: CategorySlug) =>
    navigate({ search: { ...(q ? { q } : {}), ...(slug ? { category: slug } : {}) } });

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-glow" />
        <div className="shell relative py-16 md:py-20">
          <p className="text-eyebrow">The collection</p>
          <h1 className="mt-4 text-4xl md:text-6xl">Shop ISMAILIFY</h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            One disciplined palette, six categories, and pieces designed to work together.
          </p>
        </div>
      </section>

      <div className="shell grid gap-10 py-12 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-max lg:sticky lg:top-28">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ search: { ...(query ? { q: query } : {}), ...(category ? { category } : {}) } });
            }}
            className="flex items-center gap-2 rounded-sm border border-border px-3 py-3 transition-colors focus-within:border-primary"
          >
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the collection"
              aria-label="Search the collection"
              className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </form>

          <div className="mt-8">
            <p className="text-eyebrow flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Category
            </p>
            <div className="mt-4 grid gap-2">
              <button
                type="button"
                onClick={() => setCategory(undefined)}
                className={`text-left text-sm transition-colors ${!category ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                All products
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setCategory(c.slug)}
                  className={`text-left text-sm transition-colors ${category === c.slug ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-eyebrow">Max price</p>
            <input
              type="range"
              min={50}
              max={400}
              step={10}
              value={maxPrice}
              aria-label="Maximum price"
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-4 w-full accent-[var(--violet)]"
            />
            <p className="mt-2 text-sm text-muted-foreground">Up to ${maxPrice}</p>
          </div>

          <div className="mt-8">
            <p className="text-eyebrow">Sort</p>
            <select
              value={sort}
              aria-label="Sort products"
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="mt-4 w-full rounded-sm border border-border bg-surface px-3 py-2 text-xs uppercase tracking-[0.15em] outline-none focus:border-primary"
            >
              {sortOptions.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <section>
          <p className="pb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {results.length} {results.length === 1 ? "piece" : "pieces"}
            {q ? ` for “${q}”` : ""}
          </p>
          {results.length === 0 ? (
            <div className="card-lux p-12 text-center">
              <p className="font-display text-2xl">Nothing matches yet</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Try a different search term or widen the price range.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
