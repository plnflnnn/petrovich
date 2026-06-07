"use client";

import { AdminDeleteSection } from "@/app/admin/_components/admin-delete-section";
import { AdminPageHeader } from "@/app/admin/_components/admin-page-header";
import { PillButton } from "@/app/components/ui/pill-button";
import { confirmDelete } from "@/lib/admin/confirm-delete";
import { formatAdminDate } from "@/lib/admin/list-utils";
import type { ClientRecord } from "@/lib/admin/types";
import {
  clientFormSchema,
  type ClientFormInput,
} from "@/lib/validation/client-form-schema";
import { formInputShadowClass, formLabelClass } from "@/lib/utils/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ClientFormProps = {
  mode: "create" | "edit";
  defaultValues: ClientFormInput;
  client?: ClientRecord;
  onSubmit: (values: ClientFormInput) => Promise<void> | void;
  onDelete?: () => Promise<void> | void;
  submitLabel: string;
  backHref?: string;
};

export function ClientForm({
  mode,
  defaultValues,
  client,
  onSubmit,
  onDelete,
  submitLabel,
  backHref = "/admin/clients",
}: ClientFormProps) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormInput>({
    resolver: zodResolver(clientFormSchema),
    defaultValues,
  });

  async function handleFormSubmit(values: ClientFormInput) {
    setStatusMessage(null);

    try {
      await onSubmit(values);
      setStatusMessage(
        mode === "create" ? "Клиент добавлен" : "Изменения сохранены",
      );
    } catch {
      setStatusMessage("Не удалось сохранить данные");
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badge="Клиенты"
        title={mode === "create" ? "Новый клиент" : client?.name ?? "Клиент"}
        description={
          mode === "create"
            ? "Добавьте клиента в список. После подключения базы данные будут сохраняться на сервере."
            : "Измените все данные клиента."
        }
        actions={
          <Link
            href={backHref}
            className="inline-flex h-11 items-center justify-center rounded-full bg-bg-soft px-6 text-sm font-medium text-text ring-1 ring-black/6 transition-colors hover:bg-bg-muted"
          >
            К списку клиентов
          </Link>
        }
      />

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="max-w-2xl rounded-card bg-white p-6 shadow-card ring-1 ring-black/5 sm:p-8"
      >
        {mode === "edit" && client ? (
          <div className="mb-5 grid gap-2 rounded-inner bg-bg-soft px-4 py-3 text-sm text-text-muted ring-1 ring-black/4 sm:grid-cols-3">
            <p>
              Заказов:{" "}
              <span className="font-medium text-text">{client.orderCount}</span>
            </p>
            <p>
              Последний заказ:{" "}
              <span className="font-medium text-text">
                {formatAdminDate(client.lastOrderAt)}
              </span>
            </p>
            <p>
              Клиент с:{" "}
              <span className="font-medium text-text">
                {formatAdminDate(client.createdAt)}
              </span>
            </p>
          </div>
        ) : null}

        <div className="grid gap-5">
          <div>
            <label htmlFor="client-name" className={formLabelClass}>
              Имя
            </label>
            <input
              id="client-name"
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
            <label htmlFor="client-phone" className={formLabelClass}>
              Телефон
            </label>
            <input
              id="client-phone"
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
            <label htmlFor="client-address" className={formLabelClass}>
              Адрес
            </label>
            <input
              id="client-address"
              type="text"
              autoComplete="street-address"
              className={formInputShadowClass}
              {...register("address")}
            />
            {errors.address ? (
              <p className="mt-1.5 text-sm text-red-600">{errors.address.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="client-memo" className={formLabelClass}>
              Заметка
            </label>
            <textarea
              id="client-memo"
              rows={5}
              className={formInputShadowClass}
              {...register("memo")}
            />
            {errors.memo ? (
              <p className="mt-1.5 text-sm text-red-600">{errors.memo.message}</p>
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
            {isSubmitting ? "Сохраняем…" : submitLabel}
          </PillButton>

          <Link
            href={backHref}
            className="inline-flex h-11 items-center justify-center rounded-full bg-bg-soft px-6 text-sm font-medium text-text ring-1 ring-black/6 transition-colors hover:bg-bg-muted"
          >
            К списку клиентов
          </Link>
        </div>
      </form>

      {mode === "edit" && onDelete && client ? (
        <AdminDeleteSection
          title="Удаление клиента"
          description="Клиент будет удалён из базы без возможности восстановления."
          buttonLabel="Удалить клиента"
          deletingLabel="Удаляем…"
          disabled={isSubmitting}
          onError={(message) => setStatusMessage(message)}
          onConfirm={() => confirmDelete("client", client.name)}
          onDelete={async () => {
            setStatusMessage(null);
            await onDelete();
          }}
        />
      ) : null}
    </div>
  );
}
