"use client";

import { CONTACT_SPAM_FIELDS } from "@/lib/spam/contact-protection";
import { useEffect, useRef, type RefObject } from "react";

type UseContactSpamGuardOptions = {
  /** Reset the timing guard when this becomes true (e.g. modal open). */
  active?: boolean;
};

export function useContactSpamGuard({ active = true }: UseContactSpamGuardOptions = {}) {
  const loadedAtRef = useRef(0);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (active) {
      loadedAtRef.current = Date.now();
    }
  }, [active]);

  function getSpamFields() {
    return {
      [CONTACT_SPAM_FIELDS.honeypot]: honeypotRef.current?.value ?? "",
      [CONTACT_SPAM_FIELDS.timestamp]: loadedAtRef.current,
    };
  }

  return { honeypotRef, getSpamFields };
}

type ContactHoneypotFieldProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  id?: string;
};

export function ContactHoneypotField({
  inputRef,
  id = "contact-hp",
}: ContactHoneypotFieldProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-[10000px] h-px w-px overflow-hidden opacity-0"
    >
      <label htmlFor={id}>Website</label>
      <input
        ref={inputRef}
        id={id}
        name={CONTACT_SPAM_FIELDS.honeypot}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
