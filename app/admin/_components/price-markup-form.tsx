"use client";

import { AdminPageHeader } from "@/app/admin/_components/admin-page-header";
import { PillButton } from "@/app/components/ui/pill-button";
import {
  priceMarkupSchema,
  type PriceMarkupValues,
} from "@/lib/validation/price-markup-schema";
import { formInputShadowClass, formLabelClass } from "@/lib/utils/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const defaultFormValues: PriceMarkupValues = {
  percent: 0,
  priceColumn: "",
  file: undefined as unknown as File,
};

export function PriceMarkupForm() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PriceMarkupValues>({
    resolver: zodResolver(priceMarkupSchema),
    defaultValues: defaultFormValues,
  });

  function resetForm() {
    reset(defaultFormValues);
    setStatusMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFormKey((current) => current + 1);
  }

  async function onSubmit(values: PriceMarkupValues) {
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("percent", String(values.percent));
    if (values.priceColumn?.trim()) {
      formData.append("priceColumn", values.priceColumn.trim());
    }

    const response = await fetch("/api/admin/price-markup", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      let message = "Не удалось обработать файл";

      try {
        const data = (await response.json()) as { error?: string };
        message = data.error ?? message;
      } catch {
        // Binary or empty error body — keep default message.
      }

      setStatusMessage(message);
      return;
    }

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const disposition = response.headers.get("Content-Disposition");
    const fileNameMatch = disposition?.match(/filename="([^"]+)"/);
    link.href = downloadUrl;
    link.download =
      fileNameMatch?.[1] ??
      `${values.file.name.replace(/\.[^.]+$/, "")}-markup-${values.percent}${values.file.name.slice(values.file.name.lastIndexOf("."))}`;
    link.click();
    URL.revokeObjectURL(downloadUrl);

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = setTimeout(() => {
      resetForm();
      setStatusMessage(null);
      resetTimeoutRef.current = null;
    }, 3000);
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badge="Прайс"
        title="Наценка на прайс"
        description="Загрузите файл с ценами (.xlsx, .xls или .csv), укажите процент наценки и получите обновлённый файл в том же формате. Колонки с ценами определяются автоматически или вручную."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl rounded-card bg-white p-6 shadow-card ring-1 ring-black/5 sm:p-8"
      >
        <div className="grid gap-5">
          <div>
            <label htmlFor="price-markup-file" className={formLabelClass}>
              Файл Excel
            </label>
            <input
              key={formKey}
              ref={fileInputRef}
              id="price-markup-file"
              type="file"
              accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
              className={formInputShadowClass}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  setValue("file", file, { shouldValidate: true });
                }
              }}
            />
            <p className="mt-1.5 text-xs text-text-muted">
              Поддерживаются форматы .xlsx, .xls и .csv
            </p>
            {errors.file ? (
              <p className="mt-1.5 text-sm text-red-600">{errors.file.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="price-markup-column" className={formLabelClass}>
              Колонка с ценами{" "}
              <span className="font-normal text-text-muted">(необязательно)</span>
            </label>
            <input
              id="price-markup-column"
              type="text"
              placeholder="Например: F, G или Розница, 0,45"
              className={formInputShadowClass}
              {...register("priceColumn")}
            />
            <p className="mt-1.5 text-xs text-text-muted">
              Одна колонка (G, 7, «Розница») или несколько через запятую (F, G).
              Если пусто — колонки определяются автоматически.
            </p>
            {errors.priceColumn ? (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.priceColumn.message}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="price-markup-percent" className={formLabelClass}>
              Процент наценки
            </label>
            <input
              id="price-markup-percent"
              type="number"
              min={0}
              step={0.5}
              inputMode="decimal"
              className={formInputShadowClass}
              {...register("percent", { valueAsNumber: true })}
            />
            <p className="mt-1.5 text-xs text-text-muted">
              Например, 10 увеличит цену на 10%
            </p>
            {errors.percent ? (
              <p className="mt-1.5 text-sm text-red-600">{errors.percent.message}</p>
            ) : null}
          </div>
        </div>

        {statusMessage ? (
          <p className="mt-5 rounded-inner bg-accent-soft px-3 py-2 text-sm text-text ring-1 ring-accent/15">
            {statusMessage}
          </p>
        ) : null}

        <PillButton
          type="submit"
          variant="primary"
          className="mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Обрабатываем…" : "Применить наценку"}
        </PillButton>
      </form>
    </div>
  );
}
