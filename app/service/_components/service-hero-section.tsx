"use client";

import { BreadcrumbNav } from "@/app/components/breadcrumb-nav";
import { HeroImageSlider } from "@/app/components/hero-image-slider";
import { PillButton } from "@/app/components/ui/pill-button";
import { Container } from "@/app/components/ui/container";
import { useRequestModal } from "@/app/components/request-modal/request-modal-context";
import type { Service } from "@/lib/data/service";
import { homeAnchor } from "@/lib/utils/routes";

export function ServiceHeroSection({ service }: { service: Service }) {
  const requestModal = useRequestModal();

  return (
    <section
      id="top"
      className="relative scroll-mt-24 bg-bg pt-20 pb-10 sm:pt-24 sm:pb-14 lg:pt-28"
    >
      <Container>
        <HeroImageSlider
          slides={service.heroSlides}
          className="overflow-hidden rounded-card"
          innerClassName="min-h-hero-short"
        >
          <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
          </div>

          <p className="pointer-events-none absolute left-6 top-6 z-[1] inline-flex items-center gap-2 text-caption font-medium tracking-micro text-white/85 sm:left-10 sm:top-10 sm:text-xs">
            <span aria-hidden>{service.emoji}</span>
            {service.heroKicker}
          </p>

          <BreadcrumbNav
            className="absolute right-6 top-6 z-20 hidden text-caption font-medium text-white/75 sm:right-10 sm:top-10 sm:block"
            items={[
              { label: "Главная", href: "/" },
              { label: "Услуги", href: homeAnchor("#services") },
              { label: service.title },
            ]}
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6 sm:p-10 sm:pr-40 lg:p-14 lg:pr-48">
            <h1 className="max-w-hero-title-lg text-4xl font-semibold leading-tighter tracking-tightest text-white sm:text-5xl lg:text-hero-lg">
              {service.title}
            </h1>
            <p className="mt-5 max-w-xl text-body leading-relaxed text-white/85">
              {service.heroLead}
            </p>
            <div className="pointer-events-auto mt-7">
              <PillButton
                type="button"
                variant="primary"
                size="md"
                onClick={requestModal.open}
              >
                Оставить заявку
              </PillButton>
            </div>
          </div>
        </HeroImageSlider>
      </Container>
    </section>
  );
}
