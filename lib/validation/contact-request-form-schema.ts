import { isValidRuPhone, normalizePhoneForStorage } from "@/lib/validation/phone";
import { z } from "zod";

export const contactRequestFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Укажите имя")
    .max(120, "Слишком длинное имя"),
  phone: z
    .string()
    .trim()
    .min(1, "Укажите телефон")
    .refine(isValidRuPhone, "Некорректный номер телефона"),
  district: z
    .string()
    .trim()
    .min(1, "Укажите район")
    .max(200, "Слишком длинное название района"),
  comment: z.string().trim().max(4000, "Слишком длинный комментарий"),
});

export type ContactRequestEditableInput = z.infer<typeof contactRequestFormSchema>;

export function normalizeContactRequestFormValues(
  values: ContactRequestEditableInput,
) {
  return {
    ...values,
    phone: normalizePhoneForStorage(values.phone),
  };
}
