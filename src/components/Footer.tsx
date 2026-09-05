import { Link } from "@tanstack/react-router";
import { categories } from "@/data/products";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="min-w-0">
          <p className="font-display text-xl tracking-[0.28em]">ISMAILIFY</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Style. Confidence. Identity. Considered menswear and accessories, made to be worn every day.
          </p>
        </div>

        <div>
          <p className="text-eyebrow">Shop</p>
          <ul className="mt-5 grid gap-3">
            <li>
              <Link to="/shop" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                All Products
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={c.path} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-eyebrow">Brand</p>
          <ul className="mt-5 grid gap-3">
            <li>
              <Link to="/about" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                About ISMAILIFY
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-eyebrow">Client Care</p>
          <ul className="mt-5 grid gap-3 text-sm text-muted-foreground">
            <li>Shipping &amp; returns</li>
            <li>Size guide</li>
            <li>Care instructions</li>
            <li>Order support</li>
          </ul>
        </div>
      </div>

      <div className="hairline" />
      <div className="shell flex flex-col gap-3 py-6 text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} ISMAILIFY</span>
        <span>Style. Confidence. Identity.</span>
      </div>
    </footer>
  );
}
