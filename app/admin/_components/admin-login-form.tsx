"use client";

import { PillButton } from "@/app/components/ui/pill-button";
import {
  adminLoginSchema,
  type AdminLoginValues,
} from "@/lib/validation/admin-login-schema";
import { formInputShadowClass, formLabelClass } from "@/lib/utils/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function AdminLoginForm() {
  const searchParams = useSearchParams();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: AdminLoginValues) {
    setFormError(null);

    const returnTo = searchParams.get("returnTo");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      credentials: "same-origin",
      redirect: "manual",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        returnTo,
      }),
    });

    if (response.status === 303 || response.status === 302 || response.status === 307) {
      window.location.assign(response.headers.get("Location") ?? "/admin");
      return;
    }

    const data = (await response.json()) as { ok?: boolean; error?: string };

    if (!response.ok || !data.ok) {
      setFormError(data.error ?? "Не удалось войти");
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div>
        <label htmlFor="admin-username" className={formLabelClass}>
          Логин
        </label>
        <input
          id="admin-username"
          type="text"
          autoComplete="username"
          className={formInputShadowClass}
          {...register("username")}
        />
        {errors.username ? (
          <p className="mt-1.5 text-sm text-red-600">{errors.username.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="admin-password" className={formLabelClass}>
          Пароль
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          className={formInputShadowClass}
          {...register("password")}
        />
        {errors.password ? (
          <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>
        ) : null}
      </div>

      {formError ? (
        <p className="rounded-inner bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-100">
          {formError}
        </p>
      ) : null}

      <PillButton
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Входим…" : "Войти"}
      </PillButton>
    </form>
  );
}
