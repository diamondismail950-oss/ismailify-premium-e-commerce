import { createFileRoute, Link } from "@tanstack/react-router";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ISMAILIFY — Style. Confidence. Identity." },
      {
        name: "description",
        content:
          "ISMAILIFY is a premium menswear label built on one disciplined palette: deep navy, electric violet and white.",
      },
      { property: "og:title", content: "About ISMAILIFY" },
      {
        property: "og:description",
        content: "How ISMAILIFY designs menswear around fit, material and restraint.",
      },
    ],
  }),
  component: About,
});

const principles = [
  {
    title: "Fit first",
    body: "Each pattern is developed on a real body and graded so the line holds across every size.",
  },
  {
    title: "Material discipline",
    body: "Fewer fabrics, chosen properly — long-staple cotton, high-twist wool, full-grain leather.",
  },
  {
    title: "One palette",
    body: "Deep navy, electric violet and white. Everything in the wardrobe works with everything else.",
  },
];

function About() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-glow" />
        <div className="shell relative py-20 md:py-28">
          <p className="text-eyebrow">About the brand</p>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
            Clothing that carries the way you want to be seen.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
            ISMAILIFY was founded on a simple idea: getting dressed should build confidence, not consume time.
            We design a tight, deliberate wardrobe — shirts, trousers, footwear and accessories that hold their
            shape and their tone.
          </p>
        </div>
      </section>

      <section className="shell grid items-center gap-12 pb-16 lg:grid-cols-2">
        <img
          src={aboutImg}
          alt="Fabric being cut in the ISMAILIFY studio"
          loading="lazy"
          width={1408}
          height={1008}
          className="w-full rounded-sm border border-border object-cover"
        />
        <div className="min-w-0">
          <h2 className="text-3xl md:text-4xl">Made with intent</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            We work in small, considered ranges rather than constant releases. A piece joins the collection only
            when the fabric, the fit and the finishing all hold up — and it stays until something genuinely
            better replaces it.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The result is a wardrobe you can build on over years, in a palette that never argues with itself.
          </p>
          <Link to="/shop" className="btn-violet mt-9">
            Explore the collection
          </Link>
        </div>
      </section>

      <section className="shell pb-24">
        <div className="hairline mb-14" />
        <div className="grid gap-6 md:grid-cols-3">
          {principles.map((p, i) => (
            <div key={p.title} className="card-lux p-8 hover:border-primary/50">
              <p className="font-display text-3xl text-primary">0{i + 1}</p>
              <h3 className="mt-5 text-xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
