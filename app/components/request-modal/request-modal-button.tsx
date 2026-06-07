"use client";

import { useRequestModal } from "@/app/components/request-modal/request-modal-context";
import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type RequestModalButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "onClick"
> & {
  children?: ReactNode;
  variant?: "light" | "primary";
};

const variantClass = {
  light:
    "bg-white/95 text-text shadow-sm hover:bg-white",
  primary:
    "bg-accent text-white shadow-md hover:bg-accent-hover",
};

export function RequestModalButton({
  children = "Оставить заявку",
  variant = "light",
  className,
  ...props
}: RequestModalButtonProps) {
  const requestModal = useRequestModal();

  return (
    <button
      type="button"
      onClick={requestModal.open}
      className={cn(
        "group inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors",
        variantClass[variant],
        className,
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform group-hover:translate-x-0.5"
      >
        →
      </span>
    </button>
  );
}
