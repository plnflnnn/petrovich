import { Container } from "@/app/components/ui/container";
import { SectionHeader } from "@/app/home/_components/section-header";
import Image from "next/image";
import type { ReactNode } from "react";

export type VisualCard = {
  title: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  placeholderEmoji?: string;
};

const cardImageClass =
  "relative aspect-4/3 w-full overflow-hidden bg-bg-muted sm:aspect-3/2";

type VisualCardsSectionProps = {
  id?: string;
  kicker: string;
  title: string;
  lead?: string;
  headerAfterTitle?: ReactNode;
  items: VisualCard[];
  className?: string;
  children?: ReactNode;
};

export function VisualCardsSection({
  id,
  kicker,
  title,
  lead,
  headerAfterTitle,
  items,
  className,
  children,
}: VisualCardsSectionProps) {
  return (
    <section
      id={id}
      className={className ?? "scroll-mt-24 bg-bg-soft py-20 sm:py-24"}
    >
      <Container>
        <SectionHeader
          align="left"
          kicker={kicker}
          title={title}
          afterTitle={headerAfterTitle}
          lead={lead}
        />

        {children ? <div className="mt-10">{children}</div> : null}

        <div className={children ? "mt-10 grid gap-5 sm:grid-cols-2" : "mt-12 grid gap-5 sm:grid-cols-2"}>
          {items.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col overflow-hidden rounded-card-md bg-white shadow-card-sm ring-1 ring-black/3 transition-lift duration-300 hover:-translate-y-0.5 hover:shadow-card-hover-sm hover:ring-accent/20"
            >
              <div className="flex flex-col gap-2 px-5 py-5 sm:px-6 sm:pt-6 sm:pb-5">
                <h3 className="text-base font-semibold leading-snug text-text">
                  {item.title}
                </h3>
                {item.body ? (
                  <p className="text-sm-plus leading-relaxed text-text-muted">
                    {item.body}
                  </p>
                ) : null}
              </div>
              <div className={cardImageClass}>
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
                  />
                ) : (
                  <div
                    className="flex h-full min-h-48 flex-col items-center justify-center gap-1 px-4 text-center sm:min-h-56"
                    aria-hidden
                  >
                    {item.placeholderEmoji ? (
                      <span className="text-2xl opacity-40">
                        {item.placeholderEmoji}
                      </span>
                    ) : null}
                    <span className="text-2xs font-medium uppercase tracking-kicker-sm text-text-muted">
                      Фото скоро
                    </span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
