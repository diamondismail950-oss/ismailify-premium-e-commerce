import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/bags")({
  head: () => ({
    meta: [
      { title: "Bags — ISMAILIFY" },
      {
        name: "description",
        content: "ISMAILIFY bags: leather weekenders, daily backpacks and slim document cases.",
      },
      { property: "og:title", content: "Bags — ISMAILIFY" },
      { property: "og:description", content: "Considered leather carry, engineered for travel and work." },
    ],
  }),
  component: () => <CategoryPage slug="bags" />,
});
