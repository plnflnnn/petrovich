import { isAllowedSiteRequest } from "@/lib/api/site-origin";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_LOGIN_PATH = "/admin/login";

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function isAdminPublicPath(pathname: string) {
  return pathname === ADMIN_LOGIN_PATH || pathname === "/admin/logout";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    if (!isAllowedSiteRequest(request)) {
      return NextResponse.json(
        { ok: false, error: "Forbidden" },
        { status: 403 },
      );
    }
  }

  if (!isAdminPath(pathname)) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

  if (!hasSession && !isAdminPublicPath(pathname)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = ADMIN_LOGIN_PATH;
    loginUrl.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (hasSession && pathname === ADMIN_LOGIN_PATH) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin";
    adminUrl.search = "";
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
