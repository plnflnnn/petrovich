"use client";

import { PillButton } from "@/app/components/ui/pill-button";
import { useState } from "react";

type AdminDeleteSectionProps = {
  title: string;
  description: string;
  buttonLabel: string;
  deletingLabel: string;
  onConfirm: () => boolean;
  onDelete: () => Promise<void> | void;
  disabled?: boolean;
  onError?: (message: string) => void;
};

export function AdminDeleteSection({
  title,
  description,
  buttonLabel,
  deletingLabel,
  onConfirm,
  onDelete,
  disabled = false,
  onError,
}: AdminDeleteSectionProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!onConfirm()) {
      return;
    }

    setIsDeleting(true);

    try {
      await onDelete();
    } catch {
      onError?.("Не удалось выполнить удаление");
      setIsDeleting(false);
    }
  }

  return (
    <div className="max-w-2xl rounded-card bg-white p-6 shadow-card ring-1 ring-red-100 sm:p-8">
      <h2 className="text-base font-semibold text-text">{title}</h2>
      <p className="mt-2 text-sm text-text-muted">{description}</p>
      <PillButton
        type="button"
        variant="outline"
        className="mt-5 border-red-200 text-red-700 hover:border-red-300 hover:text-red-800"
        disabled={disabled || isDeleting}
        onClick={() => void handleDelete()}
      >
        {isDeleting ? deletingLabel : buttonLabel}
      </PillButton>
    </div>
  );
}
