import { AdminLoginForm } from "@/app/admin/_components/admin-login-form";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
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
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
