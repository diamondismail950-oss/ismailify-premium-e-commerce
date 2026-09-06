import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/caps")({
  head: () => ({
    meta: [
      { title: "Caps — ISMAILIFY" },
      {
        name: "description",
        content: "ISMAILIFY caps with structured crowns, clean embroidery and water-repellent finishes.",
      },
      { property: "og:title", content: "Caps — ISMAILIFY" },
      { property: "og:description", content: "Structured ISMAILIFY caps for everyday edge." },
    ],
  }),
  component: () => <CategoryPage slug="caps" />,
});
