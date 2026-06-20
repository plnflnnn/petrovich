"use client";

import { PillButton } from "@/app/components/ui/pill-button";
import { useIsClient } from "@/lib/utils/use-is-client";
import { useBodyScrollLock } from "@/lib/utils/body-scroll-lock";
import { modalOverlayClass } from "@/lib/utils/styles";
import { createPortal } from "react-dom";

type LegalDoc = {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: {
    heading: string;
    paragraphs: (string | { list: string[] })[];
  }[];
};

type LegalModalProps = {
  open: boolean;
  onClose: () => void;
  doc: LegalDoc | null;
  closeLabel: string;
  lastUpdatedLabel: string;
};

export function LegalModal({
  open,
  onClose,
  doc,
  closeLabel,
  lastUpdatedLabel,
}: LegalModalProps) {
  const isClient = useIsClient();

  useBodyScrollLock(open);

  if (!isClient || !open || !doc) return null;

  const content = (
    <div className={modalOverlayClass}>
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        className="absolute left-1/2 top-1/2 flex w-modal-lg max-h-modal-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-card-lg bg-white shadow-modal"
      >
        <div className="flex items-start justify-between gap-4 border-b border-black/6 px-6 pb-4 pt-6 sm:px-8 sm:pt-8">
          <div className="min-w-0">
            <h2
              id="legal-modal-title"
              className="text-lg font-semibold leading-tight tracking-tight text-text sm:text-xl"
            >
              {doc.title}
            </h2>
            <p className="mt-1.5 text-xs text-text-muted">
              {lastUpdatedLabel}: {doc.lastUpdated}
            </p>
          </div>
          <button
            type="button"
            aria-label={closeLabel}
            onClick={onClose}
            className="-mr-2 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-black/5 hover:text-text"
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
        </div>

        <div className="overflow-y-auto px-6 py-6 text-sm leading-relaxed text-text/85 sm:px-8 sm:py-8">
          {doc.intro ? (
            <p className="mb-6 text-sm leading-relaxed text-text/85">
              {doc.intro}
            </p>
          ) : null}
          <div className="space-y-7">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h3 className="mb-2 text-body font-semibold tracking-tight text-text">
                  {section.heading}
                </h3>
                <div className="space-y-2.5 text-sm-plus leading-relaxed text-text/80">
                  {section.paragraphs.map((p, i) => {
                    if (typeof p === "string") {
                      return <p key={i}>{p}</p>;
                    }
                    return (
                      <ul key={i} className="ml-5 list-disc space-y-1.5">
                        {p.list.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="border-t border-black/6 px-6 py-4 text-right sm:px-8">
          <PillButton type="button" variant="primary" size="md" onClick={onClose}>
            {closeLabel}
          </PillButton>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
