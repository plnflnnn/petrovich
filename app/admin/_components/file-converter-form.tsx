"use client";

import { AdminPageHeader } from "@/app/admin/_components/admin-page-header";
import { PillButton } from "@/app/components/ui/pill-button";
import {
  CONVERTER_FORMAT_LABELS,
  CONVERTER_FORMATS,
  getConverterExtension,
  type ConverterFormat,
} from "@/lib/admin/file-converter";
import { formInputShadowClass, formLabelClass } from "@/lib/utils/styles";
import {
  fileConverterSchema,
  type FileConverterValues,
} from "@/lib/validation/file-converter-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

const defaultFormValues: FileConverterValues = {
  sourceFormat: "xlsx",
  targetFormat: "csv",
  file: undefined as unknown as File,
};

const ACCEPT_BY_FORMAT: Record<ConverterFormat, string> = {
  csv: ".csv,text/csv",
  xlsx: ".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xls: ".xls,application/vnd.ms-excel",
  docx: ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pdf: ".pdf,application/pdf",
};

export function FileConverterForm() {
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
    control,
    formState: { errors, isSubmitting },
  } = useForm<FileConverterValues>({
    resolver: zodResolver(fileConverterSchema),
    defaultValues: defaultFormValues,
  });

  const sourceFormat = useWatch({
    control,
    name: "sourceFormat",
    defaultValue: defaultFormValues.sourceFormat,
  });

  const fileAccept = useMemo(
    () => ACCEPT_BY_FORMAT[sourceFormat] ?? "",
    [sourceFormat],
  );

  function resetForm() {
    reset(defaultFormValues);
    setStatusMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFormKey((current) => current + 1);
  }

  async function onSubmit(values: FileConverterValues) {
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("sourceFormat", values.sourceFormat);
    formData.append("targetFormat", values.targetFormat);

    const response = await fetch("/api/admin/file-converter", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      let message = "Не удалось конвертировать файл";

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
      `${values.file.name.replace(/\.[^.]+$/, "")}${getConverterExtension(values.targetFormat)}`;
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
        badge="Файлы"
        title="Конвертер файлов"
        description="Преобразуйте прайс или таблицу между CSV, Excel, Word и PDF. Выберите исходный формат, загрузите файл и укажите, во что нужно конвертировать."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl rounded-card bg-white p-6 shadow-card ring-1 ring-black/5 sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="converter-source-format" className={formLabelClass}>
              Исходный формат
            </label>
            <select
              id="converter-source-format"
              className={formInputShadowClass}
              {...register("sourceFormat")}
            >
              {CONVERTER_FORMATS.map((format) => (
                <option key={format} value={format}>
                  {CONVERTER_FORMAT_LABELS[format]}
                </option>
              ))}
            </select>
            {errors.sourceFormat ? (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.sourceFormat.message}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="converter-target-format" className={formLabelClass}>
              Конвертировать в
            </label>
            <select
              id="converter-target-format"
              className={formInputShadowClass}
              {...register("targetFormat")}
            >
              {CONVERTER_FORMATS.map((format) => (
                <option key={format} value={format}>
                  {CONVERTER_FORMAT_LABELS[format]}
                </option>
              ))}
            </select>
            {errors.targetFormat ? (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.targetFormat.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="converter-file" className={formLabelClass}>
            Файл
          </label>
          <input
            key={formKey}
            ref={fileInputRef}
            id="converter-file"
            type="file"
            accept={fileAccept}
            className={formInputShadowClass}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                setValue("file", file, { shouldValidate: true });
              }
            }}
          />
          <p className="mt-1.5 text-xs text-text-muted">
            Поддерживаются CSV, Excel (.xlsx, .xls), Word (.docx) и PDF. Максимум
            15 МБ.
          </p>
          {errors.file ? (
            <p className="mt-1.5 text-sm text-red-600">{errors.file.message}</p>
          ) : null}
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
          {isSubmitting ? "Конвертируем…" : "Конвертировать"}
        </PillButton>
      </form>
    </div>
  );
}
