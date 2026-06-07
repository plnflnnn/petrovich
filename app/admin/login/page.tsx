import { AdminLoginForm } from "@/app/admin/_components/admin-login-form";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";
import { getAdminSession } from "@/lib/auth/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  // Drop stale cookies that fail JWT verification so the next login starts clean.
  const cookieStore = await cookies();
  if (cookieStore.get(ADMIN_SESSION_COOKIE)?.value) {
    cookieStore.delete(ADMIN_SESSION_COOKIE);
  }

  return (
    <main className="flex min-h-full items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-card bg-white p-8 shadow-card ring-1 ring-black/5">
        <h1 className="text-2xl font-semibold tracking-tight text-text">
          Вход в админ-панель
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Введите логин и пароль администратора
        </p>
        <div className="mt-8">
          <Suspense fallback={<p className="text-sm text-text-muted">Загрузка…</p>}>
            <AdminLoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
