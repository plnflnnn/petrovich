import { NextResponse } from "next/server";

// Legacy GET /admin/logout — old clients prefetched this link and cleared the session.
// Never clear cookies here; real logout is POST /api/admin/logout.
export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/admin", request.url));
}
