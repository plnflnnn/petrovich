"use client";

import { useRequestModal } from "@/app/components/request-modal/request-modal-context";
import { PillButton } from "@/app/components/ui/pill-button";
import {
  CTA_POPUP_DELAY_MS,
  CTA_POPUP_STORAGE_KEY,
} from "@/lib/data/cta-content";
import { useIsClient } from "@/lib/utils/use-is-client";
import { modalShellClass } from "@/lib/utils/styles";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const timedCtaOverlayClass = "fixed inset-0 z-[100]";

const isProd = process.env.NODE_ENV === "production";

function isPopupDismissed(): boolean {
  if (!isProd) return false;
  return sessionStorage.getItem(CTA_POPUP_STORAGE_KEY) === "1";
}

function persistPopupDismissed(): void {
  if (!isProd) return;
  sessionStorage.setItem(CTA_POPUP_STORAGE_KEY, "1");
}

/** Dev only: visit with ?cta-popup to clear a previous dismiss and retest. */
function clearDismissForDevTest(): void {
  if (isProd || typeof window === "undefined") return;
  if (new URLSearchParams(window.location.search).has("cta-popup")) {
    sessionStorage.removeItem(CTA_POPUP_STORAGE_KEY);
  }
}

export function TimedCtaPopup() {
  const isClient = useIsClient();
  const requestModal = useRequestModal();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    clearDismissForDevTest();
    if (isPopupDismissed()) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, CTA_POPUP_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    persistPopupDismissed();
    setOpen(false);
  }

  function openContactModal() {
    dismiss();
    window.requestAnimationFrame(() => requestModal.open());
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!isClient || !open) return null;

  return createPortal(
    <div className={timedCtaOverlayClass}>
      <button
        type="button"
        aria-label="Закрыть"
        onClick={dismiss}
        className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="timed-cta-title"
        className={`absolute left-1/2 top-1/2 z-[100] w-[min(100%-2rem,32rem)] -translate-x-1/2 -translate-y-1/2 ${modalShellClass} ring-1 ring-black/5`}
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={dismiss}
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-black/5 hover:text-text"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="px-6 py-10 sm:px-10 sm:py-12">
          <h2
            id="timed-cta-title"
            className="pr-10 text-2xl font-semibold leading-tight-hero tracking-tightest text-text sm:text-hero"
          >
            Готовы сделать заказ?
          </h2>
          <PillButton
            type="button"
            variant="primary"
            size="lg"
            className="mt-8 w-full sm:w-auto"
            onClick={openContactModal}
          >
            Заполнить форму
          </PillButton>
        </div>
      </div>
    </div>,
    document.body,
  );
}
