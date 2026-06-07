export const ADMIN_SESSION_COOKIE = "admin_session";

export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export function getAdminJwtSecret() {
  const secret = process.env.ADMIN_JWT_SECRET?.trim();

  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_JWT_SECRET must be set in production");
  }

  throw new Error("ADMIN_JWT_SECRET must be set");
}
