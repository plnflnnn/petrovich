"use client";

import { BreadcrumbNav } from "@/app/components/breadcrumb-nav";
import { RequestModalButton } from "@/app/components/request-modal/request-modal-button";
import { PillButton } from "@/app/components/ui/pill-button";
import { Container } from "@/app/components/ui/container";
import { useRequestModal } from "@/app/components/request-modal/request-modal-context";
import { HeroImageSlider } from "@/app/components/hero-image-slider";
import type { Category } from "@/lib/data/category";
import { homeAnchor } from "@/lib/utils/routes";

export function CategoryHeroSection({
  category,
}: {
  category: Category;
}) {
  const requestModal = useRequestModal();

  return (
    <section
      id="top"
      className="relative scroll-mt-24 bg-bg pt-20 pb-10 sm:pt-24 sm:pb-14 lg:pt-28"
    >
      <Container>
        <HeroImageSlider
          slides={category.heroSlides}
          className="overflow-hidden rounded-card"
          innerClassName="min-h-category-hero"
        >
          <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
          </div>

          <div className="pointer-events-none relative z-10 flex min-h-category-hero flex-col justify-between gap-y-10 p-7 pb-15 sm:gap-y-12 sm:p-10 sm:pr-40 lg:gap-y-14 lg:px-14 lg:py-12 lg:pr-48 lg:pb-15">
            <div>
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                <p className="inline-flex items-center gap-2 text-caption font-medium tracking-micro text-white/85 sm:text-xs">
                  <span aria-hidden>{category.emoji}</span>
                  {category.heroKicker}
                </p>

                <BreadcrumbNav
                  className="pointer-events-auto hidden text-caption font-medium text-white/75 sm:block"
                  items={[
                    { label: "Главная", href: "/" },
                    { label: "Категории", href: homeAnchor("#categories") },
                    { label: category.title },
                  ]}
                />
              </div>

              {category.goods.length > 0 ? (
                <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-2.5">
                  {category.goods.map((good) => (
                    <li
                      key={good.title}
                      className="rounded-full border border-white/20 bg-white/10 px-3.5 py-2 backdrop-blur-md sm:px-4 sm:py-2.5"
                    >
                      <span className="block text-sm font-semibold leading-tight text-white sm:text-sm-plus">
                        {good.title}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div>
              <h1 className="max-w-hero-title-lg text-4xl font-semibold leading-tighter tracking-tightest text-white sm:text-5xl lg:text-hero-lg">
                {category.title}
              </h1>
              <p className="mt-4 max-w-xl text-body leading-relaxed text-white/85">
                {category.heroLead}
              </p>

              <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
                <PillButton
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={requestModal.open}
                >
                  Связаться с нами
                </PillButton>
                <RequestModalButton variant="light">
                  Перейти к калькулятору
                </RequestModalButton>
              </div>
            </div>
          </div>
        </HeroImageSlider>
      </Container>
    </section>
  );
}
