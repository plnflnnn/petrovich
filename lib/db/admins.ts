import { query } from "@/lib/db/client";

type AdminRow = {
  id: string | number;
  username: string;
  password_hash: string;
  is_active: boolean;
};

export async function findActiveAdminByUsername(username: string) {
  const result = await query<AdminRow>(
    `SELECT id, username, password_hash, is_active
     FROM admins
     WHERE username = $1 AND is_active = TRUE
     LIMIT 1`,
    [username],
  );

  return result.rows[0] ?? null;
}

export async function touchAdminLastLogin(id: string | number) {
  await query(
    `UPDATE admins
     SET last_login_at = NOW()
     WHERE id = $1`,
    [String(id)],
  );
}
