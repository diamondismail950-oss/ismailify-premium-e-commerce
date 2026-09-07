import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/data/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — ISMAILIFY" },
      {
        name: "description",
        content: "Review your ISMAILIFY selections and proceed to checkout.",
      },
      { property: "og:title", content: "Your Cart — ISMAILIFY" },
      {
        property: "og:description",
        content: "Review your ISMAILIFY selections and proceed to checkout.",
      },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { detailed, subtotal, count, setQty, remove } = useStore();
  const navigate = useNavigate();

  return (
    <div className="shell py-10 md:py-14">
      <p className="text-eyebrow">Shopping bag</p>
      <h1 className="mt-4 text-4xl md:text-5xl">Your Cart</h1>

      {detailed.length === 0 ? (
        <div className="card-lux mt-10 flex flex-col items-center p-12 text-center">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          <p className="mt-5 font-display text-2xl">Your bag is empty</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Discover the collection and add pieces that define your look.
          </p>
          <Link to="/shop" className="btn-violet mt-8">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <section className="grid gap-4">
            {detailed.map(({ key, product, size, color, qty }) => (
              <article
                key={key}
                className="card-lux flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  className="shrink-0 overflow-hidden rounded-sm"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    width={160}
                    height={200}
                    className="aspect-[4/5] w-32 object-cover transition-transform duration-700 ease-[var(--ease-lux)] hover:scale-105"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    className="font-display text-lg leading-tight transition-colors hover:text-primary"
                  >
                    {product.name}
                  </Link>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    {size && <span>Size {size}</span>}
                    <span>Color {color}</span>
                  </div>
                  <p className="mt-3 text-sm tracking-wide">{formatPrice(product.price)}</p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="inline-flex items-center rounded-sm border border-border">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQty(key, qty - 1)}
                      className="grid h-10 w-10 place-items-center transition-colors hover:text-primary"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center text-sm">{qty}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQty(key, Math.min(10, qty + 1))}
                      className="grid h-10 w-10 place-items-center transition-colors hover:text-primary"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      remove(key);
                      toast.success("Removed from bag");
                    }}
                    className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-max lg:sticky lg:top-28">
            <div className="card-lux p-6">
              <p className="text-eyebrow">Order summary</p>

              <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Items ({count})</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{subtotal >= 250 ? "Complimentary" : "Calculated at checkout"}</span>
                </div>
              </div>

              <div className="hairline my-6" />

              <div className="flex items-center justify-between font-display text-2xl">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <button
                type="button"
                onClick={() => navigate({ to: "/checkout" })}
                className="btn-violet mt-8 w-full"
              >
                Checkout <ArrowRight className="h-4 w-4" />
              </button>

              <Link
                to="/shop"
                className="btn-outline-lux mt-3 w-full"
              >
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
