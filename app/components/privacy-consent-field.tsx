"use client";

import { LegalModal } from "@/app/components/legal-modal/legal-modal";
import { privacyDoc } from "@/app/home/_components/footer-privacy";
import { useState, type InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

type PrivacyConsentFieldProps = {
  id: string;
  error?: FieldError;
  className?: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
};

export function PrivacyConsentField({
  id,
  error,
  className,
  inputProps,
}: PrivacyConsentFieldProps) {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <div className={className}>
        <label
          htmlFor={id}
          className="flex cursor-pointer items-start gap-2.5 text-xs-plus leading-relaxed text-text-muted"
        >
          <input
            id={id}
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-neutral accent-accent"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            {...inputProps}
          />
          <span>
            Я согласен(а) на{" "}
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              className="font-medium text-accent underline-offset-2 hover:underline"
            >
              обработку персональных данных
            </button>{" "}
            в соответствии с политикой конфиденциальности.
          </span>
        </label>
        {error ? (
          <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700" role="alert">
            {error.message}
          </p>
        ) : null}
      </div>

      <LegalModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        doc={privacyDoc}
        closeLabel="Закрыть"
        lastUpdatedLabel="Редакция от"
      />
    </>
  );
}
