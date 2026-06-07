"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { AdminListTable } from "@/app/admin/_components/admin-list-table";
import { AdminListToolbar } from "@/app/admin/_components/admin-list-toolbar";
import { AdminPageHeader } from "@/app/admin/_components/admin-page-header";
import {
  filterByPeriod,
  searchRecords,
  sortRecords,
} from "@/lib/admin/list-utils";
import type {
  AdminListColumn,
  AdminListRecord,
  PeriodFilter,
  SortDirection,
  SortField,
} from "@/lib/admin/types";

type AdminFilterableListProps<T extends AdminListRecord> = {
  title: string;
  description: string;
  badge?: string;
  items: T[];
  columns: AdminListColumn<T>[];
  emptyMessage: string;
  searchPlaceholder?: string;
  showPeriodFilter?: boolean;
  getDateValue?: (item: T) => string;
  getSearchFields?: (item: T) => string[];
  headerActions?: ReactNode;
  getRowHref?: (item: T) => string;
};

export function AdminFilterableList<T extends AdminListRecord>({
  title,
  description,
  badge,
  items,
  columns,
  emptyMessage,
  searchPlaceholder,
  showPeriodFilter = false,
  getDateValue,
  getSearchFields,
  headerActions,
  getRowHref,
}: AdminFilterableListProps<T>) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [period, setPeriod] = useState<PeriodFilter>("all");

  const filteredItems = useMemo(() => {
    let result = showPeriodFilter ? filterByPeriod(items, period) : items;

    result = searchRecords(result, search, getSearchFields);

    return sortRecords(result, sortField, sortDirection, getDateValue);
  }, [
    items,
    period,
    search,
    sortField,
    sortDirection,
    showPeriodFilter,
    getDateValue,
    getSearchFields,
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={title}
        description={description}
        badge={badge}
        actions={headerActions}
      />

      <AdminListToolbar
        search={search}
        onSearchChange={setSearch}
        sortField={sortField}
        onSortFieldChange={setSortField}
        sortDirection={sortDirection}
        onSortDirectionChange={setSortDirection}
        period={showPeriodFilter ? period : undefined}
        onPeriodChange={showPeriodFilter ? setPeriod : undefined}
        searchPlaceholder={searchPlaceholder}
        resultCount={filteredItems.length}
      />

      <AdminListTable
        items={filteredItems}
        columns={columns}
        emptyMessage={emptyMessage}
        getRowHref={getRowHref}
      />
    </div>
  );
}
