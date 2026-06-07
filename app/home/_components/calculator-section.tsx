"use client";

import { Container } from "@/app/components/ui/container";
import { PillButton } from "@/app/components/ui/pill-button";
import { useRequestModal } from "@/app/components/request-modal/request-modal-context";
import { APPROXIMATE_UNIT_PRICE_RUB } from "@/lib/data/approximate-prices";
import type { CalculatorPriceId } from "@/lib/data/approximate-prices";

const miniBlocks = [
  { id: "roof", title: "Крыша", hint: "по площади" },
  { id: "insulation", title: "Изоляция", hint: "по толщине и м²" },
  { id: "facade", title: "Фасад", hint: "по площади стен" },
];

function formatPrice(n: number): string {
  return new Intl.NumberFormat("ru-RU").format(n);
}

export function CalculatorSection() {
  const requestModal = useRequestModal();

  return (
    <section
      id="calculator"
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
                Рассчитайте примерную стоимость онлайн
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-body leading-relaxed text-text-muted">
                Выберите тип материала, укажите размеры или объём — мы покажем ориентировочную стоимость и поможем оформить заявку.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
              {miniBlocks.map((b) => {
                const rub = APPROXIMATE_UNIT_PRICE_RUB[b.id as CalculatorPriceId].fromRubPerM2;
                const priceLine = `от ${formatPrice(rub)} ₽/м²`;
                return (
                  <div
                    key={b.id}
                    className="rounded-card-sm bg-bg-soft px-5 py-6 text-left ring-1 ring-black/3"
                  >
                    <p className="text-2xs font-semibold tabular-nums tracking-kicker-xs text-text-muted">
                      01·{b.id.toUpperCase()}
                    </p>
                    <p className="mt-2 text-body font-semibold text-text">{b.title}</p>
                    <p className="mt-1 text-xs text-text-muted">{b.hint}</p>
                    <p className="mt-4 text-sm-tight font-semibold tabular-nums text-accent">
                      {priceLine}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-text-muted">
              Цены ориентировочные, итог зависит от бренда, объёма и условий доставки — уточняйте по телефону.
            </p>

            <div className="mt-8 flex justify-center">
              <PillButton
                type="button"
                variant="primary"
                size="md"
                className="min-w-55"
                onClick={requestModal.open}
              >
                Перейти к калькулятору
              </PillButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
