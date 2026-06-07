import { getAdminSession } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function requireAdminApiSession() {
  const session = await getAdminSession();

  if (!session) {
    return {
      session: null,
      errorResponse: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { session, errorResponse: null };
}
