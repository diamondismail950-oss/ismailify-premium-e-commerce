import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, type Product } from "@/data/products";
import { useStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { add, toggleWish, wishlist } = useStore();
  const wished = wishlist.includes(product.id);

  return (
    <article className="group card-lux overflow-hidden hover:border-primary/60 hover:shadow-[var(--shadow-lift)]">
      <div className="relative overflow-hidden">
        <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1200}
            height={1504}
            className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-lux)] group-hover:scale-[1.06]"
          />
        </Link>

        {product.tags.length > 0 && (
          <span className="absolute left-3 top-3 rounded-sm bg-primary px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-primary-foreground">
            {product.tags[0] === "new" ? "New" : "Best seller"}
          </span>
        )}

        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => {
            toggleWish(product.id);
            toast(wished ? "Removed from wishlist" : "Saved to wishlist");
          }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-border bg-background/70 backdrop-blur transition-colors hover:border-primary"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition-all duration-500 ease-[var(--ease-lux)] group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => {
              add(product, {
                size: product.sizes?.[2] ?? product.sizes?.[0],
                color: product.colors[0]?.name ?? "Deep Navy",
              });
              toast.success(`${product.name} added to bag`);
            }}
            className="btn-violet w-full py-3"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="grid gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="min-w-0 font-display text-base leading-tight transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
          <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            {product.rating.toFixed(1)}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm tracking-wide">{formatPrice(product.price)}</span>
          {product.compareAt && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(product.compareAt)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
