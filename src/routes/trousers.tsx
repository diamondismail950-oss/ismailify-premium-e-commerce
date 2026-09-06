import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/trousers")({
  head: () => ({
    meta: [
      { title: "Trousers — ISMAILIFY" },
      {
        name: "description",
        content:
          "ISMAILIFY trousers in high-twist wool, cotton twill and technical stretch — tailored lines with fluid movement.",
      },
      { property: "og:title", content: "Trousers — ISMAILIFY" },
      { property: "og:description", content: "Tailored ISMAILIFY trousers built for the modern day." },
    ],
  }),
  component: () => <CategoryPage slug="trousers" />,
});
