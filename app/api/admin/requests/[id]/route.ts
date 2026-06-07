import { requireAdminApiSession } from "@/lib/auth/require-admin-api";
import { getRequestById, updateRequest } from "@/lib/db/requests";
import {
  contactRequestFormSchema,
  normalizeContactRequestFormValues,
} from "@/lib/validation/contact-request-form-schema";
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
    const requestRecord = await getRequestById(id);

    if (!requestRecord) {
      return NextResponse.json(
        { ok: false, error: "Заявка не найдена" },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, request: requestRecord });
  } catch (error) {
    console.error("[admin/requests/:id] GET failed:", error);
    return NextResponse.json(
      { ok: false, error: "Не удалось загрузить заявку" },
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

  const parsed = contactRequestFormSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Проверьте введённые данные";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  try {
    const values = normalizeContactRequestFormValues(parsed.data);
    const requestRecord = await updateRequest(id, values);

    if (!requestRecord) {
      return NextResponse.json(
        { ok: false, error: "Заявка не найдена" },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, request: requestRecord });
  } catch (error) {
    console.error("[admin/requests/:id] PATCH failed:", error);
    return NextResponse.json(
      { ok: false, error: "Не удалось сохранить заявку" },
      { status: 500 },
    );
  }
}
