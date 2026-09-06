import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/shoes")({
  head: () => ({
    meta: [
      { title: "Shoes — ISMAILIFY" },
      {
        name: "description",
        content:
          "ISMAILIFY footwear: hand-finished oxfords, Chelsea boots, loafers and leather court sneakers.",
      },
      { property: "og:title", content: "Shoes — ISMAILIFY" },
      { property: "og:description", content: "Hand-finished leather footwear from ISMAILIFY." },
    ],
  }),
  component: () => <CategoryPage slug="shoes" />,
});
