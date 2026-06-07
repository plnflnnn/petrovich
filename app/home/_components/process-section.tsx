"use client";

import { Container } from "@/app/components/ui/container";
import { PillButton } from "@/app/components/ui/pill-button";
import { SectionHeader } from "@/app/home/_components/section-header";
import { useRequestModal } from "@/app/components/request-modal/request-modal-context";
import { siteHeaderContent } from "@/app/home/_components/site-header-content";
import { processSketchImage } from "@/lib/data/site-images";
import Image from "next/image";

const steps = [
  {
    title: "Заявка или расчёт",
    body: "Оставьте заявку на сайте или позвоните — обсудим задачу.",
  },
  {
    title: "Подбор и согласование",
    body: "Уточняем детали, подбираем материалы и согласуем сроки.",
  },
  {
    title: "Доставка из Новосибирска",
    body: "Везём в Каргатский район и другие районы НСО по договорённости.",
  },
  {
    title: "Разгрузка и приёмка",
    body: "Доставка на объект или в офис в Каргате — как вам удобнее.",
  },
];

export function ProcessSection() {
  const requestModal = useRequestModal();

  return (
    <section id="process" className="scroll-mt-24 bg-bg-soft py-20 sm:py-24">
      <Container>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <SectionHeader
              align="left"
              kicker="Доставка"
              title="Как проходит заказ"
              lead="Понятные шаги — от заявки до получения материалов на объекте."
            />

            <ol className="mt-8 space-y-3">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-card-sm bg-white p-5 ring-1 ring-black/3"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-sm-plus font-semibold leading-snug text-text">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs-plus leading-relaxed text-text-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8">
              <PillButton variant="primary" size="md" onClick={requestModal.open}>
                {siteHeaderContent.nav.cta}
              </PillButton>
            </div>
          </div>

          <div className="relative aspect-portrait overflow-hidden rounded-card bg-bg-muted shadow-card-lg ring-1 ring-black/5 sm:aspect-portrait-tall lg:min-h-0">
            <Image
              src={processSketchImage.src}
              alt={processSketchImage.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  );
}
