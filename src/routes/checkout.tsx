import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, CreditCard, Package, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/data/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — ISMAILIFY" },
      {
        name: "description",
        content: "Complete your ISMAILIFY purchase. Secure checkout with complimentary shipping over $250.",
      },
      { property: "og:title", content: "Checkout — ISMAILIFY" },
      {
        property: "og:description",
        content: "Complete your ISMAILIFY purchase. Secure checkout with complimentary shipping over $250.",
      },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { detailed, subtotal, count, clear } = useStore();
  const [placing, setPlacing] = useState(false);

  if (detailed.length === 0) {
    return (
      <div className="shell py-10 md:py-14">
        <p className="text-eyebrow">Checkout</p>
        <h1 className="mt-4 text-4xl md:text-5xl">Your bag is empty</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Add a few pieces before completing your order.
        </p>
        <Link to="/shop" className="btn-violet mt-8">
          Shop Now
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);
    setTimeout(() => {
      clear();
      setPlacing(false);
      toast.success("Order placed — thank you for choosing ISMAILIFY.");
    }, 1400);
  };

  return (
    <div className="shell py-10 md:py-14">
      <p className="text-eyebrow">Secure checkout</p>
      <h1 className="mt-4 text-4xl md:text-5xl">Complete Your Order</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit} className="grid gap-8">
          <section className="card-lux p-6">
            <p className="text-eyebrow">Contact</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Email
                <input
                  required
                  type="email"
                  placeholder="you@email.com"
                  className="rounded-sm border border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                />
              </label>
              <label className="grid gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Phone
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="rounded-sm border border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                />
              </label>
            </div>
          </section>

          <section className="card-lux p-6">
            <p className="text-eyebrow">Shipping</p>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Full name
                <input
                  required
                  type="text"
                  placeholder="First and last name"
                  className="rounded-sm border border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                />
              </label>
              <label className="grid gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Street address
                <input
                  required
                  type="text"
                  placeholder="123 Avenue, Apt 4B"
                  className="rounded-sm border border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="grid gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  City
                  <input
                    required
                    type="text"
                    placeholder="City"
                    className="rounded-sm border border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  />
                </label>
                <label className="grid gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  State
                  <input
                    required
                    type="text"
                    placeholder="State"
                    className="rounded-sm border border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  />
                </label>
                <label className="grid gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Zip
                  <input
                    required
                    type="text"
                    placeholder="00000"
                    className="rounded-sm border border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  />
                </label>
              </div>
            </div>
          </section>

          <section className="card-lux p-6">
            <p className="text-eyebrow">Payment</p>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Card number
                <div className="flex items-center gap-3 rounded-sm border border-border px-3 py-3 transition-colors focus-within:border-primary">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Expiry
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="rounded-sm border border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  />
                </label>
                <label className="grid gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  CVC
                  <input
                    type="text"
                    placeholder="123"
                    className="rounded-sm border border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  />
                </label>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" /> This is a demo checkout — no payment is processed.
            </p>
          </section>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="btn-outline-lux">
              <ArrowLeft className="h-4 w-4" /> Back to Cart
            </Link>
            <button
              type="submit"
              disabled={placing}
              className="btn-violet flex-1 sm:flex-none"
            >
              {placing ? (
                "Placing order..."
              ) : (
                <>
                  Place Order <Check className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <aside className="h-max lg:sticky lg:top-28">
          <div className="card-lux p-6">
            <p className="text-eyebrow">Order summary</p>
            <div className="mt-5 grid gap-4">
              {detailed.map(({ key, product, size, color, qty }) => (
                <div key={key} className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={80}
                    height={100}
                    className="aspect-[4/5] w-16 rounded-sm object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-tight">{product.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Qty {qty}
                      {size ? ` · Size ${size}` : ""} · Color {color}
                    </p>
                    <p className="mt-1 text-sm">{formatPrice(product.price * qty)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="hairline my-6" />

            <div className="grid gap-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Subtotal ({count} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{subtotal >= 250 ? "Complimentary" : "Calculated"}</span>
              </div>
            </div>

            <div className="hairline my-6" />

            <div className="flex items-center justify-between font-display text-2xl">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="mt-6 grid gap-3 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                Complimentary delivery on orders over $250
              </p>
              <p className="flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                Premium packaging with every order
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Secure checkout
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
