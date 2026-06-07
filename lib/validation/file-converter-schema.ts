import {
  CONVERTER_FORMATS,
  fileNameMatchesFormat,
  type ConverterFormat,
} from "@/lib/admin/file-converter";
import { z } from "zod";

export const fileConverterSchema = z
  .object({
    sourceFormat: z.enum(CONVERTER_FORMATS),
    targetFormat: z.enum(CONVERTER_FORMATS),
    file: z
      .custom<File>(
        (value) => value instanceof File && value.size > 0,
        "Выберите файл",
      )
      .refine((file) => file.size <= 15 * 1024 * 1024, "Файл слишком большой (макс. 15 МБ)"),
  })
  .superRefine((data, ctx) => {
    if (data.sourceFormat === data.targetFormat) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["targetFormat"],
        message: "Формат назначения должен отличаться от исходного",
      });
    }

    if (!fileNameMatchesFormat(data.file.name, data.sourceFormat)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["file"],
        message: "Расширение файла не совпадает с выбранным исходным форматом",
      });
    }
  });

export type FileConverterValues = z.infer<typeof fileConverterSchema>;
