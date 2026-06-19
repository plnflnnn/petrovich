import { Container } from "@/app/components/ui/container";
import type { ReactNode } from "react";

type StatusPageContentProps = {
  code?: string;
  kicker: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function StatusPageContent({
  code,
  kicker,
  title,
  description,
  actions,
}: StatusPageContentProps) {
  return (
    <section className="flex flex-1 items-center py-16 sm:py-24">
      <Container className="flex justify-center">
        <div className="max-w-lg text-center">
          {code ? (
            <p
              className="font-display text-8xl font-medium italic leading-none tracking-tightest text-accent/20 select-none sm:text-9xl"
              aria-hidden
            >
              {code}
            </p>
          ) : null}
          <p className="text-caption font-semibold uppercase tracking-kicker-sm text-accent">
            {kicker}
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-body">
            {description}
          </p>
          {actions ? (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {actions}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
