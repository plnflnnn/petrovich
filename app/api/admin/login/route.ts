import { createAdminSession } from "@/lib/auth/session";
import { findActiveAdminByUsername, touchAdminLastLogin } from "@/lib/db/admins";
import { adminLoginSchema } from "@/lib/validation/admin-login-schema";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректный запрос" },
      { status: 400 },
    );
  }

  const parsed = adminLoginSchema.safeParse(body);

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Проверьте введённые данные";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  const { username, password } = parsed.data;

  try {
    const admin = await findActiveAdminByUsername(username);

    if (!admin) {
      return NextResponse.json(
        { ok: false, error: "Неверный логин или пароль" },
        { status: 401 },
      );
    }

    const passwordMatches = await compare(password, admin.password_hash);

    if (!passwordMatches) {
      return NextResponse.json(
        { ok: false, error: "Неверный логин или пароль" },
        { status: 401 },
      );
    }

    await touchAdminLastLogin(admin.id);
    await createAdminSession(username);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/login] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Не удалось выполнить вход" },
      { status: 500 },
    );
  }
}
