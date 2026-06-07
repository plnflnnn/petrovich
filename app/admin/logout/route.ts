import { clearAdminSession } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await clearAdminSession();
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
