import { PillButton } from "@/app/components/ui/pill-button";
import { ctaBandContent } from "@/lib/data/cta-content";
import { homeAnchor } from "@/lib/utils/routes";
import Link from "next/link";

type CtaBandPanelProps = {
  showBullets?: boolean;
  showBody?: boolean;
  className?: string;
};

export function CtaBandPanel({
  showBullets = true,
  showBody = true,
  className = "",
}: CtaBandPanelProps) {
  return (
    <div
      className={`overflow-hidden rounded-card bg-dark px-6 py-12 text-white shadow-hero sm:px-12 sm:py-14 ${className}`}
    >
      <div className="grid gap-10 lg-grid-split-reverse lg:items-start lg:gap-16">
        {showBullets ? (
          <div>
            <h2 className="text-3xl font-semibold leading-tight-hero tracking-tightest sm:text-hero">
              {ctaBandContent.title}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {ctaBandContent.bullets.map((line) => (
                <li
                  key={line}
                  className="flex gap-2.5 text-sm-tight leading-relaxed text-white/80"
                >
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-caption text-white"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h2 className="text-3xl font-semibold leading-tight-hero tracking-tightest sm:text-hero">
            {ctaBandContent.title}
          </h2>
        )}

        <div className={showBullets ? "lg:pt-3" : ""}>
          {showBody ? (
            <p className="max-w-md text-sm leading-relaxed text-white/65">
              {ctaBandContent.body}
            </p>
          ) : null}
          <PillButton
            variant="inverse"
            size="lg"
            className={showBody ? "mt-5" : "mt-0"}
            asChild
          >
            <Link href={homeAnchor("#contact-form")}>
              {ctaBandContent.formButton}
            </Link>
          </PillButton>
        </div>
      </div>
    </div>
  );
}
