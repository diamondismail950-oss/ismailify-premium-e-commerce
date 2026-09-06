import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/mens-shirts")({
  head: () => ({
    meta: [
      { title: "Men's Shirts — ISMAILIFY" },
      {
        name: "description",
        content:
          "ISMAILIFY men's shirts in poplin, oxford, linen and satin-finish cotton. Precision collars and an immaculate drape.",
      },
      { property: "og:title", content: "Men's Shirts — ISMAILIFY" },
      {
        property: "og:description",
        content: "Premium ISMAILIFY shirting cut for a clean, modern line.",
      },
    ],
  }),
  component: () => <CategoryPage slug="mens-shirts" />,
});
