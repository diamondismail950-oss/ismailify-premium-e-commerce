import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, Star, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, categoryBySlug, productBySlug, products } from "@/data/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product unavailable — ISMAILIFY" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — ISMAILIFY` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} — ISMAILIFY` },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductDetails,
});

function ProductDetails() {
  const { product } = Route.useLoaderData();
  const { add, toggleWish, wishlist } = useStore();
  const category = categoryBySlug(product.category);
  const [size, setSize] = useState<string | undefined>(product.sizes?.[2] ?? product.sizes?.[0]);
  const [color, setColor] = useState(product.colors[0]?.name ?? "Deep Navy");
  const [qty, setQty] = useState(1);
  const wished = wishlist.includes(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="shell py-10">
      <nav className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <Link to="/shop" className="transition-colors hover:text-primary">
          Shop
        </Link>
        <span>/</span>
        <Link to={category.path} className="transition-colors hover:text-primary">
          {category.name}
        </Link>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-sm border border-border">
          <img
            src={product.image}
            alt={product.name}
            width={1200}
            height={1504}
            className="aspect-[4/5] w-full object-cover"
          />
          {product.tags[0] && (
            <span className="absolute left-4 top-4 rounded-sm bg-primary px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary-foreground">
              {product.tags[0] === "new" ? "New" : "Best seller"}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-eyebrow">{category.name}</p>
          <h1 className="mt-4 text-3xl md:text-5xl">{product.name}</h1>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="font-display text-2xl">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.compareAt)}</span>
            )}
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-primary text-primary" />
              {product.rating.toFixed(1)} rating
            </span>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-9 grid gap-7">
            <div>
              <p className="text-eyebrow">Color — {color}</p>
              <div className="mt-4 flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    aria-label={c.name}
                    onClick={() => setColor(c.name)}
                    style={{ backgroundColor: c.value }}
                    className={`h-9 w-9 rounded-full border transition-all ${
                      color === c.name ? "border-primary ring-2 ring-primary/50" : "border-border"
                    }`}
                  />
                ))}
              </div>
            </div>

            {product.sizes && (
              <div>
                <p className="text-eyebrow">Size</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`min-w-14 rounded-sm border px-4 py-2.5 text-xs uppercase tracking-[0.12em] transition-colors ${
                        size === s ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:border-primary"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-eyebrow">Quantity</p>
              <div className="mt-4 inline-flex items-center rounded-sm border border-border">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((n) => Math.max(1, n - 1))}
                  className="grid h-11 w-11 place-items-center transition-colors hover:text-primary"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((n) => Math.min(10, n + 1))}
                  className="grid h-11 w-11 place-items-center transition-colors hover:text-primary"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                add(product, { size, color, qty });
                toast.success(`${product.name} added to bag`);
              }}
              className="btn-violet flex-1 sm:flex-none"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => {
                toggleWish(product.id);
                toast(wished ? "Removed from wishlist" : "Saved to wishlist");
              }}
              className="btn-outline-lux"
            >
              <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : ""}`} />
              {wished ? "Saved" : "Wishlist"}
            </button>
          </div>

          <div className="mt-8 flex items-center gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
            <Truck className="h-4 w-4 text-primary" />
            Complimentary delivery on orders over $250.
          </div>

          <ul className="mt-6 grid gap-2 text-sm text-muted-foreground">
            {product.details.map((d) => (
              <li key={d} className="flex gap-3">
                <span className="text-primary">—</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="text-2xl md:text-3xl">More from {category.name}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
