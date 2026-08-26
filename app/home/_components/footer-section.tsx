"use client";

import { SiteLogo } from "@/app/components/site-logo";
import { WorkingHoursList } from "@/app/components/working-hours-list";
import { Container } from "@/app/components/ui/container";
import { LegalModal } from "@/app/components/legal-modal/legal-modal";
import { siteHeaderContent } from "@/app/home/_components/site-header-content";
import { categoryPath, navHref, servicePath } from "@/lib/utils/routes";
import * as Separator from "@radix-ui/react-separator";
import Link from "next/link";
import { useState } from "react";
import { privacyDoc } from "@/app/home/_components/footer-privacy";
import { termsDoc } from "@/app/home/_components/footer-terms";

type OpenLegalDoc = "terms" | "privacy" | null;

export function FooterSection() {
  const year = new Date().getFullYear();
  const [openDoc, setOpenDoc] = useState<OpenLegalDoc>(null);
  const activeDoc =
    openDoc === "terms" ? termsDoc : openDoc === "privacy" ? privacyDoc : null;

  return (
    <footer className="bg-dark">
      <Container>
        <div className="rounded-card px-6 py-10 text-on-dark sm:px-12 sm:py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
            <div className="max-w-md">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 text-lg-tight font-bold tracking-tight text-white transition-opacity hover:opacity-90"
              >
                <SiteLogo className="shrink-0" />
                {siteHeaderContent.siteName}
              </Link>
              <p className="mt-2 text-sm-tight leading-relaxed text-white/55">
                {siteHeaderContent.publicSiteName}
              </p>
            </div>

            <nav
              aria-label="Основные разделы"
              className="lg:max-w-md lg:pt-0.5"
            >
              <ul className="flex flex-wrap gap-x-8 gap-y-2 sm:justify-end">
                {siteHeaderContent.nav.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={navHref(item.href)}
                      className="text-sm-tight font-medium text-white/65 transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <nav aria-label="Категории материалов">
              <p className="text-caption font-semibold uppercase tracking-kicker-sm text-accent">
                Категории
              </p>
              <ul className="mt-3 grid gap-2">
                {siteHeaderContent.categories.items.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={categoryPath(cat.slug)}
                      className="text-sm-tight text-white/65 transition-colors hover:text-accent"
                    >
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Услуги">
              <p className="text-caption font-semibold uppercase tracking-kicker-sm text-accent">
                Услуги
              </p>
              <ul className="mt-3 grid gap-2">
                {siteHeaderContent.services.items.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={servicePath(service.slug)}
                      className="text-sm-tight text-white/65 transition-colors hover:text-accent"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <FooterContacts />

          <Separator.Root
            orientation="horizontal"
            decorative
            className="my-8 h-px bg-white/10"
          />

          <div className="flex flex-col gap-3 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} {siteHeaderContent.legalName}</p>
            <div className="flex gap-6">
              <button
                type="button"
                onClick={() => setOpenDoc("terms")}
                className="transition-colors hover:text-white"
              >
                Условия использования
              </button>
              <button
                type="button"
                onClick={() => setOpenDoc("privacy")}
                className="transition-colors hover:text-white"
              >
                Политика конфиденциальности
              </button>
            </div>
          </div>
        </div>
      </Container>

      <LegalModal
        open={openDoc !== null}
        onClose={() => setOpenDoc(null)}
        doc={activeDoc}
        closeLabel="Закрыть"
        lastUpdatedLabel="Редакция от"
      />
    </footer>
  );
}

function FooterContacts() {
  const { phoneTel, phoneDisplay, officeAddress, email } = siteHeaderContent;

  return (
    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      <a
        href={`tel:${phoneTel}`}
        className="group flex h-full gap-3.5 rounded-card-sm bg-white/6 p-4 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:ring-white/15"
      >
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/25 transition-colors group-hover:bg-accent/25"
          aria-hidden
        >
          <PhoneIcon />
        </span>
        <span className="min-w-0 pt-0.5">
          <span className="block text-caption font-semibold uppercase tracking-kicker-sm text-accent">
            Телефон
          </span>
          <span className="mt-1 block text-base font-semibold tabular-nums tracking-tight text-white transition-colors group-hover:text-accent">
            {phoneDisplay}
          </span>
          <span className="mt-1.5 block text-xs-plus leading-relaxed text-white/50">
            Позвоните в рабочие часы <br /> {siteHeaderContent.workingHoursSummary}
          </span>
        </span>
      </a>

      <a
        href={`mailto:${email}`}
        className="group flex h-full gap-3.5 rounded-card-sm bg-white/6 p-4 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:ring-white/15"
      >
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/25 transition-colors group-hover:bg-accent/25"
          aria-hidden
        >
          <MailIcon />
        </span>
        <span className="min-w-0 pt-0.5">
          <span className="block text-caption font-semibold uppercase tracking-kicker-sm text-accent">
            Email
          </span>
          <span className="mt-1 block break-all text-sm-plus font-semibold leading-snug text-white transition-colors group-hover:text-accent">
            {email}
          </span>
          <span className="mt-1.5 block text-xs-plus leading-relaxed text-white/50">
            Напишите нам — ответим в рабочие часы
          </span>
        </span>
      </a>

      <div className="flex h-full gap-3.5 rounded-card-sm bg-white/6 p-4 ring-1 ring-white/10">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/80 ring-1 ring-white/12"
          aria-hidden
        >
          <MapPinIcon />
        </span>
        <span className="min-w-0 pt-0.5">
          <span className="block text-caption font-semibold uppercase tracking-kicker-sm text-accent">
            Офис в Каргате
          </span>
          <address className="mt-1 not-italic text-sm-plus font-semibold leading-snug text-white">
            {officeAddress}
          </address>
          <span className="mt-1.5 block text-xs-plus leading-relaxed text-white/50">
            Приезжайте посмотреть образцы и сделать расчёт
          </span>
        </span>
      </div>

      <div className="flex h-full gap-3.5 rounded-card-sm bg-white/6 p-4 ring-1 ring-white/10">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/80 ring-1 ring-white/12"
          aria-hidden
        >
          <ClockIcon />
        </span>
        <span className="min-w-0 pt-0.5">
          <span className="block text-caption font-semibold uppercase tracking-kicker-sm text-accent">
            Режим работы
          </span>
          <WorkingHoursList variant="on-dark" className="mt-2" />
        </span>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L12 13l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.75"
        y="5.75"
        width="16.5"
        height="12.5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M4.5 7.5 12 12.5 19.5 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.25" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 8v4l2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
