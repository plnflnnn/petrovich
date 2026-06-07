import { requireAdminApiSession } from "@/lib/auth/require-admin-api";
import { getClientById, updateClient } from "@/lib/db/clients";
import {
  clientFormSchema,
  normalizeClientFormValues,
} from "@/lib/validation/client-form-schema";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const auth = await requireAdminApiSession();
  if (auth.errorResponse) {
    return auth.errorResponse;
  }

  const { id } = await context.params;

  try {
    const client = await getClientById(id);

    if (!client) {
      return NextResponse.json(
        { ok: false, error: "Клиент не найден" },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, client });
  } catch (error) {
    console.error("[admin/clients/:id] GET failed:", error);
    return NextResponse.json(
      { ok: false, error: "Не удалось загрузить клиента" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const auth = await requireAdminApiSession();
  if (auth.errorResponse) {
    return auth.errorResponse;
  }

  const { id } = await context.params;

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
    const client = await updateClient(id, values);

    if (!client) {
      return NextResponse.json(
        { ok: false, error: "Клиент не найден" },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, client });
  } catch (error) {
    console.error("[admin/clients/:id] PATCH failed:", error);
    return NextResponse.json(
      { ok: false, error: "Не удалось сохранить клиента" },
      { status: 500 },
    );
  }
}
