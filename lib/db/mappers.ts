import type { ClientRecord, ContactRequestRecord } from "@/lib/admin/types";

export type RequestRow = {
  id: string | number;
  name: string;
  phone: string;
  district: string;
  comment: string;
  source: string;
  created_at: Date;
};

export type ClientRow = {
  id: string | number;
  name: string;
  phone: string;
  address: string;
  memo: string;
  order_count: number;
  last_order_at: Date | null;
  created_at: Date;
};

function toIsoString(value: Date) {
  return value.toISOString();
}

function toId(value: string | number) {
  return String(value);
}

export function toContactRequestRecord(row: RequestRow): ContactRequestRecord {
  return {
    id: toId(row.id),
    name: row.name,
    phone: row.phone,
    district: row.district,
    comment: row.comment,
    source: row.source,
    createdAt: toIsoString(row.created_at),
  };
}

export function toClientRecord(row: ClientRow): ClientRecord {
  return {
    id: toId(row.id),
    name: row.name,
    phone: row.phone,
    address: row.address,
    memo: row.memo,
    orderCount: row.order_count,
    lastOrderAt: row.last_order_at
      ? toIsoString(row.last_order_at)
      : toIsoString(row.created_at),
    createdAt: toIsoString(row.created_at),
  };
}
