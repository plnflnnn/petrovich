import type { ReactNode } from "react";

export type PeriodFilter =
  | "today"
  | "yesterday"
  | "week"
  | "month"
  | "year"
  | "all";

export type SortField = "date" | "name";

export type SortDirection = "asc" | "desc";

export type AdminListRecord = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
};

export type ContactRequestRecord = AdminListRecord & {
  comment: string;
  district: string;
  source: string;
};

export type ContactRequestEditableInput = {
  name: string;
  phone: string;
  district: string;
  comment: string;
};

export type ClientRecord = AdminListRecord & {
  orderCount: number;
  lastOrderAt: string;
  address: string;
  memo: string;
};

export type ClientFormValues = {
  name: string;
  phone: string;
  address: string;
  memo: string;
};

export type AdminListColumn<T extends AdminListRecord> = {
  key: string;
  header: string;
  className?: string;
  render: (item: T) => ReactNode;
};
