import { requireAdminApiSession } from "@/lib/auth/require-admin-api";
import { listRequests } from "@/lib/db/requests";
import { NextResponse } from "next/server";

export async function GET() {
  const auth = await requireAdminApiSession();
  if (auth.errorResponse) {
    return auth.errorResponse;
  }

  try {
    const requests = await listRequests();
    return NextResponse.json({ ok: true, requests });
  } catch (error) {
    console.error("[admin/requests] GET failed:", error);
    return NextResponse.json(
      { ok: false, error: "Не удалось загрузить заявки" },
      { status: 500 },
    );
  }
}
