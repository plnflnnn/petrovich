"use client";

import { Container } from "@/app/components/ui/container";
import { PillButton } from "@/app/components/ui/pill-button";
import { useRequestModal } from "@/app/components/request-modal/request-modal-context";
import { aboutContent } from "@/lib/data/about";

export function CategoryTrustSection() {
  const requestModal = useRequestModal();
  const { trust } = aboutContent;

  return (
    <section
      id="trust"
      className="scroll-mt-24 bg-bg py-20 sm:py-24"
    >
      <Container>
        <div className="overflow-hidden rounded-card bg-dark px-6 py-12 text-white shadow-hero sm:px-12 sm:py-14">
          <div className="grid gap-10 lg-grid-split-reverse lg:items-start lg:gap-16">
            <div>
              <p className="text-caption font-semibold uppercase tracking-kicker text-accent">
                {trust.kicker}
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight-hero tracking-tightest sm:text-hero">
                {trust.headline}
              </h2>
              <p className="mt-6 max-w-md text-body leading-relaxed text-white/75">
                {trust.lead}
              </p>
            </div>

            <div className="lg:pt-3">
              <ul className="grid gap-3">
                {trust.bullets.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 rounded-2xl bg-white/6 px-4 py-3 ring-1 ring-white/6"
                  >
                    <span
                      className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-caption font-semibold text-white"
                      aria-hidden
                    >
                      ✓
                    </span>
                    <span className="text-sm-plus leading-relaxed text-white/90">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <PillButton
                  type="button"
                  variant="inverse"
                  size="md"
                  onClick={requestModal.open}
                >
                  Связаться с нами
                </PillButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
