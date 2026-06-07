import { toClientRecord, type ClientRow } from "@/lib/db/mappers";
import { query } from "@/lib/db/client";
import type { ClientFormInput } from "@/lib/validation/client-form-schema";

export async function listClients() {
  const result = await query(
    `SELECT id, name, phone, address, memo, order_count, last_order_at, created_at
     FROM clients
     ORDER BY COALESCE(last_order_at, created_at) DESC`,
  );

  return result.rows.map((row) => toClientRecord(row as ClientRow));
}

export async function getClientById(id: string) {
  const result = await query(
    `SELECT id, name, phone, address, memo, order_count, last_order_at, created_at
     FROM clients
     WHERE id = $1`,
    [id],
  );

  const row = result.rows[0];
  return row ? toClientRecord(row as ClientRow) : null;
}

export async function createClient(input: ClientFormInput) {
  const result = await query(
    `INSERT INTO clients (name, phone, address, memo, order_count, last_order_at)
     VALUES ($1, $2, $3, $4, 0, NOW())
     RETURNING id, name, phone, address, memo, order_count, last_order_at, created_at`,
    [input.name, input.phone, input.address, input.memo],
  );

  return toClientRecord(result.rows[0] as ClientRow);
}

export async function updateClient(id: string, input: ClientFormInput) {
  const result = await query(
    `UPDATE clients
     SET name = $2,
         phone = $3,
         address = $4,
         memo = $5
     WHERE id = $1
     RETURNING id, name, phone, address, memo, order_count, last_order_at, created_at`,
    [id, input.name, input.phone, input.address, input.memo],
  );

  const row = result.rows[0];
  return row ? toClientRecord(row as ClientRow) : null;
}

export async function deleteClient(id: string) {
  const result = await query(`DELETE FROM clients WHERE id = $1 RETURNING id`, [id]);

  return result.rowCount === 1;
}
