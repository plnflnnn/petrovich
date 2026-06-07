"use client";

import { Container } from "@/app/components/ui/container";
import { PillButton } from "@/app/components/ui/pill-button";
import { SectionHeader } from "@/app/home/_components/section-header";
import { useRequestModal } from "@/app/components/request-modal/request-modal-context";
import { siteHeaderContent } from "@/app/home/_components/site-header-content";
import { categoryPath } from "@/lib/utils/routes";
import Link from "next/link";

export function CategoriesSection() {
  const requestModal = useRequestModal();

  return (
    <section
      id="categories"
      className="scroll-mt-24 bg-bg-soft py-20 sm:py-24"
    >
      <Container>
        <SectionHeader
          kicker="Каталог"
          title="Категории материалов"
          lead="Подробнее по каждому направлению — с примерами применения и ориентировочными ценами."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteHeaderContent.categories.items.map((item, index) => (
            <li key={item.slug}>
              <Link
                href={categoryPath(item.slug)}
                className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-card-md bg-white p-6 shadow-card-sm ring-1 ring-black/3 transition-lift duration-300 hover:-translate-y-0.5 hover:shadow-card-hover-sm hover:ring-accent/25"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
                />
                <span className="text-caption font-semibold tabular-nums tracking-kicker-xs text-text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="text-body font-semibold leading-snug text-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm-tight leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs-plus font-semibold text-accent transition-transform group-hover:translate-x-0.5">
                  Подробнее →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <PillButton
            type="button"
            variant="primary"
            size="md"
            onClick={requestModal.open}
          >
            Оставить заявку
          </PillButton>
        </div>
      </Container>
    </section>
  );
}
