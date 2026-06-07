import { toContactRequestRecord, type RequestRow } from "@/lib/db/mappers";
import { query } from "@/lib/db/client";
import type { ContactRequestEditableInput } from "@/lib/admin/types";

export type InsertRequestInput = {
  name: string;
  phone: string;
  district: string;
  comment: string;
  source: string;
};

export async function listRequests() {
  const result = await query(
    `SELECT id, name, phone, district, comment, source, created_at
     FROM requests
     ORDER BY created_at DESC`,
  );

  return result.rows.map((row) => toContactRequestRecord(row as RequestRow));
}

export async function getRequestById(id: string) {
  const result = await query(
    `SELECT id, name, phone, district, comment, source, created_at
     FROM requests
     WHERE id = $1`,
    [id],
  );

  const row = result.rows[0];
  return row ? toContactRequestRecord(row as RequestRow) : null;
}

export async function insertRequest(input: InsertRequestInput) {
  const result = await query(
    `INSERT INTO requests (name, phone, district, comment, source)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, phone, district, comment, source, created_at`,
    [input.name, input.phone, input.district, input.comment, input.source],
  );

  return toContactRequestRecord(result.rows[0] as RequestRow);
}

export async function updateRequest(id: string, input: ContactRequestEditableInput) {
  const result = await query(
    `UPDATE requests
     SET name = $2,
         phone = $3,
         district = $4,
         comment = $5
     WHERE id = $1
     RETURNING id, name, phone, district, comment, source, created_at`,
    [id, input.name, input.phone, input.district, input.comment],
  );

  const row = result.rows[0];
  return row ? toContactRequestRecord(row as RequestRow) : null;
}

export async function deleteRequest(id: string) {
  const result = await query(`DELETE FROM requests WHERE id = $1 RETURNING id`, [id]);

  return result.rowCount === 1;
}
