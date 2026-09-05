import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { byCategory, categoryBySlug, type CategorySlug } from "@/data/products";

const sorts = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
] as const;

export function CategoryPage({ slug }: { slug: CategorySlug }) {
  const category = categoryBySlug(slug);
  const items = byCategory(slug);
  const [sort, setSort] = useState<(typeof sorts)[number]["key"]>("featured");

  const sorted = useMemo(() => {
    const list = [...items];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [items, sort]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          width={1200}
          height={1504}
          className="h-[38vh] min-h-[260px] w-full object-cover opacity-60 md:h-[46vh]"
        />
        <div className="absolute inset-0 bg-veil" />
        <div className="shell absolute inset-x-0 bottom-0 pb-10">
          <p className="text-eyebrow">ISMAILIFY Collection</p>
          <h1 className="mt-3 text-4xl md:text-6xl">{category.name}</h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">{category.blurb}</p>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 pb-8 sm:flex sm:justify-between">
          <p className="min-w-0 truncate text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {sorted.length} pieces
          </p>
          <label className="flex shrink-0 items-center gap-3">
            <span className="sr-only">Sort products</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-sm border border-border bg-surface px-3 py-2 text-xs uppercase tracking-[0.15em] outline-none focus:border-primary"
            >
              {sorts.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
