"use client";

import { Container } from "@/app/components/ui/container";
import { PillButton } from "@/app/components/ui/pill-button";
import { useRequestModal } from "@/app/components/request-modal/request-modal-context";
import type { Category } from "@/lib/data/category";

function formatPrice(n: number): string {
  return new Intl.NumberFormat("ru-RU").format(n);
}

export function CategoryPriceSection({
  category,
}: {
  category: Category;
}) {
  const requestModal = useRequestModal();

  return (
    <section
      id="prices"
      className="scroll-mt-24 bg-bg py-20 sm:py-24"
    >
      <Container>
        <div className="overflow-hidden rounded-card bg-white shadow-card ring-1 ring-black/3">
          <div className="px-6 py-12 sm:px-12 sm:py-16">
            <div className="text-center">
              <p className="inline-flex items-center justify-center rounded-full bg-accent/10 px-3.5 py-1.5 text-caption font-semibold uppercase tracking-kicker-sm text-accent">
                Онлайн на сайте
              </p>
              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold leading-snug-plus tracking-tightest text-text sm:text-hero">
                Ориентировочная стоимость
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-body leading-relaxed text-text-muted">
                Цены носят справочный характер. Итоговую стоимость уточняйте по телефону — она зависит от бренда, объёма и условий доставки.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
              {category.priceItems.map((item, i) => (
                <div
                  key={item.id}
                  className="rounded-card-sm bg-bg-soft px-5 py-6 text-left ring-1 ring-black/3"
                >
                  <p className="text-2xs font-semibold tabular-nums tracking-kicker-xs text-text-muted">
                    {String(i + 1).padStart(2, "0")}·{category.slug.toUpperCase()}
                  </p>
                  <p className="mt-2 text-body font-semibold text-text">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    {item.hint}
                  </p>
                  <p className="mt-4 text-sm-tight font-semibold tabular-nums text-accent">
                    {item.unit === "по запросу"
                      ? "Цена по запросу"
                      : `от ${formatPrice(item.fromValue)} ${item.unit}`}
                  </p>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-text-muted">
              Цены ориентировочные. Итог зависит от бренда, объёма и условий доставки — уточняйте по телефону.
            </p>

            <div className="mt-8 flex justify-center">
              <PillButton
                type="button"
                variant="primary"
                size="md"
                className="min-w-55"
                onClick={requestModal.open}
              >
                Связаться с нами
              </PillButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
