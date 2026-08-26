"use client";

import { SiteLogo } from "@/app/components/site-logo";
import { PillButton } from "@/app/components/ui/pill-button";
import { Container } from "@/app/components/ui/container";
import { useRequestModal } from "@/app/components/request-modal/request-modal-context";
import { siteHeaderContent } from "@/app/home/_components/site-header-content";
import { categoryPath, navHref, servicePath } from "@/lib/utils/routes";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

export { siteHeaderContent };

const HOVER_CLOSE_DELAY_MS = 140;
const DESKTOP_NAV_MIN_WIDTH = 990;

type OpenMenu = "categories" | "services" | null;

export function SiteHeader() {
  const content = siteHeaderContent;
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const requestModal = useRequestModal();

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function cancelClose() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function scheduleClose() {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, HOVER_CLOSE_DELAY_MS);
  }

  useEffect(() => {
    return () => cancelClose();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_NAV_MIN_WIDTH}px)`);

    function handleChange(event: MediaQueryListEvent | MediaQueryList) {
      if (event.matches) {
        setMenuOpen(false);
        setMobileCategoriesOpen(false);
        setMobileServicesOpen(false);
        setOpenMenu(null);
      }
    }

    handleChange(mq);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-overlay bg-bg/85">
      {/* Always in HTML so crawlers can discover category/service URLs even when dropdowns are closed. */}
      <nav className="sr-only" aria-label="Каталог сайта">
        <ul>
          {content.categories.items.map((cat) => (
            <li key={`seo-cat-${cat.slug}`}>
              <Link href={categoryPath(cat.slug)}>{cat.title}</Link>
            </li>
          ))}
          {content.services.items.map((service) => (
            <li key={`seo-svc-${service.slug}`}>
              <Link href={servicePath(service.slug)}>{service.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <Container className="flex h-16 items-center justify-between gap-4 lg:h-18">
        <Link
          href="/"
          className="flex max-w-logo items-center gap-2 text-base font-bold leading-tight tracking-tight text-text sm:max-w-none sm:text-nav"
        >
          <SiteLogo className="shrink-0" />
          <span>{content.siteName}</span>
        </Link>

        <nav
          aria-label="Основная навигация"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 nav:flex"
        >
          {content.nav.items.map((item) => {
            if (item.kind === "categories") {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu("categories");
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={openMenu === "categories"}
                    onClick={() =>
                      setOpenMenu((v) =>
                        v === "categories" ? null : "categories",
                      )
                    }
                    className="inline-flex items-center gap-1 text-sm-tight font-medium text-text/70 transition-colors hover:text-accent"
                  >
                    {item.label}
                    <ChevronIcon open={openMenu === "categories"} />
                  </button>
                  {openMenu === "categories" ? (
                    <NavDropdown label={content.nav.categoriesMenuLabel}>
                      {content.categories.items.map((cat) => (
                        <li key={cat.slug} role="none">
                          <Link
                            role="menuitem"
                            href={categoryPath(cat.slug)}
                            onClick={() => setOpenMenu(null)}
                            className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-bg-soft"
                          >
                            <span className="text-sm-tight font-medium leading-snug text-text">
                              {cat.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </NavDropdown>
                  ) : null}
                </div>
              );
            }

            if (item.kind === "services") {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu("services");
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={openMenu === "services"}
                    onClick={() =>
                      setOpenMenu((v) => (v === "services" ? null : "services"))
                    }
                    className="inline-flex items-center gap-1 text-sm-tight font-medium text-text/70 transition-colors hover:text-accent"
                  >
                    {item.label}
                    <ChevronIcon open={openMenu === "services"} />
                  </button>
                  {openMenu === "services" ? (
                    <NavDropdown
                      label={content.nav.servicesMenuLabel}
                      className="max-w-sm"
                    >
                      {content.services.items.map((svc) => (
                        <li key={svc.slug} role="none">
                          <Link
                            role="menuitem"
                            href={servicePath(svc.slug)}
                            onClick={() => setOpenMenu(null)}
                            className="group flex flex-col gap-0.5 rounded-2xl px-3 py-2.5 transition-colors hover:bg-bg-soft"
                          >
                            <span className="text-sm-tight font-medium leading-snug text-text">
                              {svc.title}
                            </span>
                            <span className="text-2xs leading-snug text-text-muted">
                              {svc.description}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </NavDropdown>
                  ) : null}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={navHref(item.href)}
                className="text-sm-tight font-medium text-text/70 transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 nav:flex">
          <a
            href={`tel:${content.phoneTel}`}
            className="text-sm-tight font-medium text-text/70 transition-colors hover:text-accent"
          >
            {content.nav.phoneLabel}
          </a>
          <PillButton variant="primary" size="sm" onClick={requestModal.open}>
            {content.nav.cta}
          </PillButton>
        </div>

        <div className="flex items-center gap-2 nav:hidden">
          <a
            href={`tel:${content.phoneTel}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-sm ring-1 ring-accent/30 transition-colors hover:bg-accent-hover"
            aria-label={`${content.nav.phoneLabel}: ${content.phoneDisplay}`}
          >
            <PhoneIcon />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-sm ring-1 ring-accent/30 transition-colors hover:bg-accent-hover"
            aria-label="Меню"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <MenuIcon />
          </button>
        </div>
      </Container>

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-overlay cursor-default bg-black/40 nav:hidden"
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="false"
            className="fixed inset-x-4 top-20 z-nav max-h-mobile-menu overflow-y-auto rounded-card-lg bg-white p-6 shadow-xl nav:hidden"
          >
            <nav aria-label="Мобильное меню" className="flex flex-col gap-1">
              {content.nav.items.map((item) => {
                if (item.kind === "categories") {
                  return (
                    <div key={item.href} className="flex flex-col">
                      <button
                        type="button"
                        aria-expanded={mobileCategoriesOpen}
                        onClick={() => setMobileCategoriesOpen((v) => !v)}
                        className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-text hover:bg-black/4"
                      >
                        <span>{item.label}</span>
                        <ChevronIcon open={mobileCategoriesOpen} />
                      </button>
                      {mobileCategoriesOpen ? (
                        <ul className="ml-2 mt-1 flex flex-col gap-0.5 border-l border-black/6 pl-3">
                          {content.categories.items.map((cat) => (
                            <li key={cat.slug}>
                              <Link
                                href={categoryPath(cat.slug)}
                                onClick={() => {
                                  setMenuOpen(false);
                                  setMobileCategoriesOpen(false);
                                }}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm-minus font-medium text-text/85 hover:bg-black/4"
                              >
                                <span>{cat.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  );
                }

                if (item.kind === "services") {
                  return (
                    <div key={item.href} className="flex flex-col">
                      <button
                        type="button"
                        aria-expanded={mobileServicesOpen}
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-text hover:bg-black/4"
                      >
                        <span>{item.label}</span>
                        <ChevronIcon open={mobileServicesOpen} />
                      </button>
                      {mobileServicesOpen ? (
                        <ul className="ml-2 mt-1 flex flex-col gap-0.5 border-l border-black/6 pl-3">
                          {content.services.items.map((svc) => (
                            <li key={svc.slug}>
                              <Link
                                href={servicePath(svc.slug)}
                                onClick={() => {
                                  setMenuOpen(false);
                                  setMobileServicesOpen(false);
                                }}
                                className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 text-sm-minus hover:bg-black/4"
                              >
                                <span className="font-medium text-text/85">
                                  {svc.title}
                                </span>
                                <span className="text-2xs text-text-muted">
                                  {svc.description}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={navHref(item.href)}
                    className="rounded-xl px-3 py-3 text-base font-medium text-text hover:bg-black/4"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href={`tel:${content.phoneTel}`}
                className="rounded-xl px-3 py-3 text-base font-medium hover:bg-black/4"
                onClick={() => setMenuOpen(false)}
              >
                {content.nav.phoneLabel}
              </a>
              <PillButton
                className="mt-2 w-full"
                variant="primary"
                onClick={() => {
                  setMenuOpen(false);
                  requestModal.open();
                }}
              >
                {content.nav.cta}
              </PillButton>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}

function NavDropdown({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="menu"
      aria-label={label}
      className={cn(
        "absolute left-1/2 top-full z-40 mt-3 w-nav-dropdown -translate-x-1/2 rounded-card-sm bg-white p-3 shadow-dropdown ring-1 ring-black/5",
        className,
      )}
    >
      <div className="flex items-center justify-between px-3 pt-2 pb-3">
        <span className="text-caption font-semibold uppercase tracking-nav text-text-muted">
          {label}
        </span>
      </div>
      <ul className="grid gap-1">{children}</ul>
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

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 8"
      fill="none"
      aria-hidden
      className={cn(
        "transition-transform duration-200",
        open ? "rotate-180" : "rotate-0",
      )}
    >
      <path
        d="M1 1.5L6 6.5L11 1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
