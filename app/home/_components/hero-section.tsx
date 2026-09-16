"use client";

import { HeroImageSlider } from "@/app/components/hero-image-slider";
import { RequestModalButton } from "@/app/components/request-modal/request-modal-button";
import { Container } from "@/app/components/ui/container";
import { homeHeroSlides } from "@/lib/data/site-images";
import { cn } from "@/lib/utils/cn";

const stats = [
  { value: "13+ лет опыта", label: "лет опыта" },
  { value: "Сотни заказов", label: "довольных клиентов" },
  { value: "Новосибирск → Каргат", label: "направление" },
  { value: "Под заказ", label: "по договорённости" },
];

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative scroll-mt-24 bg-bg pt-20 pb-20 sm:pt-24 sm:pb-24 lg:pt-28"
    >
      <Container>
        <HeroImageSlider
          slides={homeHeroSlides}
          className="overflow-hidden rounded-card"
        >
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t  from-black/50 via-black/20 to-black/15"
            aria-hidden
          />

          <div className="pointer-events-none relative z-10 p-6 sm:p-10 lg:p-14">
            <ul
              data-hero-animate
              className="mb-6 flex flex-wrap gap-2 sm:mb-7 sm:gap-2.5"
            >
              {stats.map((s) => (
                <li
                  key={s.label}
                  className={cn(
                    "rounded-full border border-white/20 bg-white/10 px-3.5 py-2 backdrop-blur-md sm:px-4 sm:py-2.5",
                    s.value.includes("→") && "max-w-full sm:max-w-none",
                  )}
                >
                  <span className="block text-sm font-semibold leading-tight text-white sm:text-sm-plus">
                    {s.value}
                  </span>
                  {/* <span className="mt-0.5 block text-2xs font-medium uppercase tracking-kicker-sm text-white/65">
                    {s.label}
                  </span> */}
                </li>
              ))}
            </ul>

            <h1
              data-hero-animate
              className="max-w-hero-title text-4xl font-semibold leading-tighter tracking-tightest text-white sm:text-5xl lg:text-hero-xl"
            >
              Строительные и отделочные материалы под заказ
            </h1>
            <p
              data-hero-animate
              className="mt-5 max-w-xl text-body leading-relaxed text-white/85"
            >
              Кровля, заборы, окна, двери и другие материалы с доставкой из Новосибирска. Поможем подобрать и рассчитать стоимость.
            </p>
            <div
              data-hero-animate
              className="pointer-events-auto mt-7 flex flex-wrap items-center gap-3"
            >
              <RequestModalButton variant="primary">
                Рассчитать стоимость
              </RequestModalButton>
            </div>
          </div>
        </HeroImageSlider>
      </Container>
    </section>
  );
}
