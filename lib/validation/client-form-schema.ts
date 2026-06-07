import { isValidRuPhone, normalizePhoneForStorage } from "@/lib/validation/phone";
import { z } from "zod";

export const clientFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Укажите имя клиента")
    .max(120, "Слишком длинное имя"),
  phone: z
    .string()
    .trim()
    .min(1, "Укажите телефон")
    .refine(isValidRuPhone, "Некорректный номер телефона"),
  address: z.string().trim().max(500, "Слишком длинный адрес"),
  memo: z.string().trim().max(4000, "Слишком длинная заметка"),
});

export type ClientFormInput = z.infer<typeof clientFormSchema>;

export function normalizeClientFormValues(values: ClientFormInput) {
  return {
    ...values,
    phone: normalizePhoneForStorage(values.phone),
  };
}
