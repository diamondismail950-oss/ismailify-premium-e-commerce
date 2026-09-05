import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Package, Scissors, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import heroImg from "@/assets/hero.jpg";
import promoImg from "@/assets/promo.jpg";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { bestSellers, categories, newArrivals } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ISMAILIFY — Elevate Your Everyday Style" },
      {
        name: "description",
        content:
          "Premium menswear from ISMAILIFY: shirts, trousers, shoes, belts, caps and bags. Style. Confidence. Identity.",
      },
      { property: "og:title", content: "ISMAILIFY — Elevate Your Everyday Style" },
      {
        property: "og:description",
        content: "Premium menswear and accessories designed to elevate your everyday style.",
      },
    ],
  }),
  component: Home,
});

const pillars = [
  { icon: Scissors, title: "Considered construction", body: "Every piece is developed on a real body, then refined until the line is right." },
  { icon: Sparkles, title: "Premium materials", body: "Long-staple cottons, high-twist wools and full-grain leathers, sourced with intent." },
  { icon: ShieldCheck, title: "Built to last", body: "Reinforced seams and honest hardware, made to hold shape season after season." },
  { icon: Package, title: "Care after checkout", body: "Clear sizing, easy exchanges and packaging worth keeping." },
];

function Home() {
  return (
    <div>
      <Hero />
      <Marquee />
      <Collections />
      <BestSellers />
      <Promo />
      <NewArrivals />
      <Why />
      <Newsletter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <div className="shell grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:py-28">
        <div className="reveal min-w-0">
          <p className="text-eyebrow">Style. Confidence. Identity.</p>
          <h1 className="mt-6 text-[2.75rem] leading-[0.98] sm:text-6xl lg:text-7xl">
            Elevate Your
            <br />
            Everyday{" "}
            <span className="bg-[image:var(--gradient-violet)] bg-clip-text text-transparent">Style.</span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
            ISMAILIFY builds a wardrobe with intent — precise tailoring, premium materials and accessories
            that finish the look.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/shop" className="btn-violet">
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/mens-shirts" className="btn-outline-lux">
              New Season
            </Link>
          </div>
          <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { k: "6", v: "Categories" },
              { k: "3", v: "Signature colors" },
              { k: "1", v: "Uncompromising standard" },
            ].map((s) => (
              <div key={s.v} className="min-w-0">
                <p className="font-display text-2xl">{s.k}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-sm bg-[image:var(--gradient-violet)] opacity-20 blur-3xl" />
          <img
            src={heroImg}
            alt="ISMAILIFY model wearing a navy shirt and tailored trousers"
            width={1600}
            height={1920}
            className="relative w-full rounded-sm border border-border object-cover shadow-[var(--shadow-soft)]"
          />
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Elevated tailoring", "Premium leather", "Everyday confidence", "Made with intent"];
  return (
    <div className="overflow-hidden border-y border-border py-4">
      <div className="marquee-track gap-12">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className="text-eyebrow whitespace-nowrap">
            {w} <span className="text-primary">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Collections() {
  return (
    <section className="shell py-20">
      <SectionHeading eyebrow="Featured collections" title="Shop by category" linkTo="/shop" linkLabel="View all" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to={c.path}
            className="group relative overflow-hidden rounded-sm border border-border"
          >
            <img
              src={c.image}
              alt={c.name}
              loading="lazy"
              width={1200}
              height={1504}
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1000ms] ease-[var(--ease-lux)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-veil" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="text-2xl">{c.name}</h3>
              <p className="mt-2 max-w-[22ch] text-xs leading-relaxed text-muted-foreground">{c.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-primary">
                Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BestSellers() {
  return (
    <section className="shell py-10">
      <SectionHeading eyebrow="Best sellers" title="The pieces they return for" linkTo="/shop" linkLabel="Shop all" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {bestSellers.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

function Promo() {
  return (
    <section className="shell py-20">
      <div className="relative overflow-hidden rounded-sm border border-border">
        <img
          src={promoImg}
          alt="ISMAILIFY seasonal campaign"
          loading="lazy"
          width={1920}
          height={912}
          className="h-[420px] w-full object-cover md:h-[480px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.17_0.045_275/92%)_0%,oklch(0.17_0.045_275/45%)_60%,transparent_100%)]" />
        <div className="absolute inset-0 flex items-center">
          <div className="shell max-w-xl">
            <p className="text-eyebrow">The Nocturne edit</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Night pieces, cut for daylight confidence.</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Satin-finish shirting, high-twist wool trousers and polished leather — an edit built around one
              disciplined palette.
            </p>
            <Link to="/shop" className="btn-violet mt-8">
              Shop the edit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewArrivals() {
  return (
    <section className="shell py-10">
      <SectionHeading eyebrow="New arrivals" title="Just landed" linkTo="/shop" linkLabel="See everything" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {newArrivals.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="shell py-20">
      <SectionHeading eyebrow="Why ISMAILIFY" title="A wardrobe that earns its place" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p) => (
          <div key={p.title} className="card-lux p-7 hover:border-primary/50 hover:shadow-[var(--shadow-lift)]">
            <div className="grid h-11 w-11 place-items-center rounded-sm bg-[image:var(--gradient-violet)]">
              <p.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-lg">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="shell pb-10">
      <div className="relative overflow-hidden rounded-sm border border-border px-6 py-16 text-center md:px-16">
        <div className="pointer-events-none absolute inset-0 bg-glow" />
        <p className="text-eyebrow relative">The list</p>
        <h2 className="relative mt-4 text-3xl md:text-5xl">Early access to every drop.</h2>
        <p className="relative mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Collection previews, restocks and styling notes. No noise.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("You're on the list.");
            setEmail("");
          }}
          className="relative mx-auto mt-9 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full rounded-sm border border-border bg-surface px-4 py-4 text-sm outline-none transition-colors focus:border-primary"
          />
          <button type="submit" className="btn-violet">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
