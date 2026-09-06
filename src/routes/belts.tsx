import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/belts")({
  head: () => ({
    meta: [
      { title: "Belts — ISMAILIFY" },
      {
        name: "description",
        content: "ISMAILIFY belts in full-grain and box-calf leather with quiet, sculpted hardware.",
      },
      { property: "og:title", content: "Belts — ISMAILIFY" },
      { property: "og:description", content: "Full-grain leather belts finished with sculpted hardware." },
    ],
  }),
  component: () => <CategoryPage slug="belts" />,
});
