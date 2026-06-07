import { z } from "zod";

const EXCEL_EXTENSIONS = [".xlsx", ".xls", ".csv"];

function hasExcelExtension(fileName: string) {
  const lowerName = fileName.toLowerCase();
  return EXCEL_EXTENSIONS.some((extension) => lowerName.endsWith(extension));
}

export const priceMarkupSchema = z.object({
  percent: z
    .number({ error: "Укажите процент наценки" })
    .min(0, "Процент не может быть отрицательным")
    .max(1000, "Слишком большой процент"),
  priceColumn: z
    .string()
    .trim()
    .max(200, "Слишком длинный список колонок")
    .optional(),
  file: z
    .custom<File>((value) => value instanceof File, {
      message: "Выберите файл Excel",
    })
    .refine((file) => file.size > 0, "Файл пустой")
    .refine((file) => hasExcelExtension(file.name), {
      message: "Поддерживаются только файлы Excel (.xlsx, .xls, .csv)",
    }),
});

export type PriceMarkupValues = z.infer<typeof priceMarkupSchema>;
