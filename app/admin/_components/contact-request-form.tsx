"use client";

import { AdminPageHeader } from "@/app/admin/_components/admin-page-header";
import { PillButton } from "@/app/components/ui/pill-button";
import { formatAdminDate } from "@/lib/admin/list-utils";
import {
  contactRequestFormSchema,
  type ContactRequestEditableInput,
} from "@/lib/validation/contact-request-form-schema";
import { formInputShadowClass, formLabelClass } from "@/lib/utils/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ContactRequestFormProps = {
  defaultValues: ContactRequestEditableInput;
  createdAt: string;
  source: string;
  onSubmit: (values: ContactRequestEditableInput) => Promise<void> | void;
  backHref?: string;
};

export function ContactRequestForm({
  defaultValues,
  createdAt,
  source,
  onSubmit,
  backHref = "/admin/requests",
}: ContactRequestFormProps) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactRequestEditableInput>({
    resolver: zodResolver(contactRequestFormSchema),
    defaultValues,
  });

  async function handleFormSubmit(values: ContactRequestEditableInput) {
    setStatusMessage(null);

    try {
      await onSubmit(values);
      setStatusMessage("Изменения сохранены");
    } catch {
      setStatusMessage("Не удалось сохранить данные");
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badge="Заявки"
        title="Карточка заявки"
        description="Измените данные обращения с сайта."
        actions={
          <Link
            href={backHref}
            className="inline-flex h-11 items-center justify-center rounded-full bg-bg-soft px-6 text-sm font-medium text-text ring-1 ring-black/6 transition-colors hover:bg-bg-muted"
          >
            К списку заявок
          </Link>
        }
      />

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="max-w-2xl rounded-card bg-white p-6 shadow-card ring-1 ring-black/5 sm:p-8"
      >
        <div className="mb-5 grid gap-2 rounded-inner bg-bg-soft px-4 py-3 text-sm text-text-muted ring-1 ring-black/4 sm:grid-cols-2">
          <p>
            Дата заявки:{" "}
            <span className="font-medium text-text">{formatAdminDate(createdAt)}</span>
          </p>
          <p>
            Источник:{" "}
            <span className="font-medium text-text">
              {source || "—"}
            </span>
          </p>
        </div>

        <div className="grid gap-5">
          <div>
            <label htmlFor="request-name" className={formLabelClass}>
              Имя
            </label>
            <input
              id="request-name"
              type="text"
              autoComplete="name"
              className={formInputShadowClass}
              {...register("name")}
            />
            {errors.name ? (
              <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="request-phone" className={formLabelClass}>
              Телефон
            </label>
            <input
              id="request-phone"
              type="tel"
              autoComplete="tel"
              className={formInputShadowClass}
              {...register("phone")}
            />
            {errors.phone ? (
              <p className="mt-1.5 text-sm text-red-600">{errors.phone.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="request-district" className={formLabelClass}>
              Район
            </label>
            <input
              id="request-district"
              type="text"
              className={formInputShadowClass}
              {...register("district")}
            />
            {errors.district ? (
              <p className="mt-1.5 text-sm text-red-600">{errors.district.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="request-comment" className={formLabelClass}>
              Комментарий
            </label>
            <textarea
              id="request-comment"
              rows={5}
              className={formInputShadowClass}
              {...register("comment")}
            />
            {errors.comment ? (
              <p className="mt-1.5 text-sm text-red-600">{errors.comment.message}</p>
            ) : null}
          </div>
        </div>

        {statusMessage ? (
          <p className="mt-5 rounded-inner bg-accent-soft px-3 py-2 text-sm text-text ring-1 ring-accent/15">
            {statusMessage}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <PillButton type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Сохраняем…" : "Сохранить изменения"}
          </PillButton>

          <Link
            href={backHref}
            className="inline-flex h-11 items-center justify-center rounded-full bg-bg-soft px-6 text-sm font-medium text-text ring-1 ring-black/6 transition-colors hover:bg-bg-muted"
          >
            К списку заявок
          </Link>
        </div>
      </form>
    </div>
  );
}
