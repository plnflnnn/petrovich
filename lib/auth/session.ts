import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  getAdminJwtSecret,
} from "@/lib/auth/constants";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export type AdminSession = {
  username: string;
};

function getSecretKey() {
  return new TextEncoder().encode(getAdminJwtSecret());
}

export async function createAdminSession(username: string) {
  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_MAX_AGE_SECONDS}s`)
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    const username = payload.username;

    if (typeof username !== "string" || !username) {
      return null;
    }

    return { username };
  } catch {
    return null;
  }
}

export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}
