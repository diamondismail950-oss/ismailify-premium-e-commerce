import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  linkTo,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  linkTo?: string;
  linkLabel?: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 pb-8 sm:flex sm:justify-between">
      <div className="min-w-0">
        <p className="text-eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl">{title}</h2>
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className="group inline-flex shrink-0 items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
