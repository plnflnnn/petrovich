import { requireAdminApiSession } from "@/lib/auth/require-admin-api";
import { createClient, listClients } from "@/lib/db/clients";
import {
  clientFormSchema,
  normalizeClientFormValues,
} from "@/lib/validation/client-form-schema";
import { NextResponse } from "next/server";

export async function GET() {
  const auth = await requireAdminApiSession();
  if (auth.errorResponse) {
    return auth.errorResponse;
  }

  try {
    const clients = await listClients();
    return NextResponse.json({ ok: true, clients });
  } catch (error) {
    console.error("[admin/clients] GET failed:", error);
    return NextResponse.json(
      { ok: false, error: "Не удалось загрузить клиентов" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminApiSession();
  if (auth.errorResponse) {
    return auth.errorResponse;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректный запрос" },
      { status: 400 },
    );
  }

  const parsed = clientFormSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Проверьте введённые данные";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  try {
    const values = normalizeClientFormValues(parsed.data);
    const client = await createClient(values);
    return NextResponse.json({ ok: true, client }, { status: 201 });
  } catch (error) {
    console.error("[admin/clients] POST failed:", error);
    return NextResponse.json(
      { ok: false, error: "Не удалось создать клиента" },
      { status: 500 },
    );
  }
}
