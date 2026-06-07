import { z } from "zod";

export const adminLoginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Укажите логин")
    .max(64, "Слишком длинный логин"),
  password: z
    .string()
    .min(1, "Укажите пароль")
    .max(128, "Слишком длинный пароль"),
});

export type AdminLoginValues = z.infer<typeof adminLoginSchema>;
