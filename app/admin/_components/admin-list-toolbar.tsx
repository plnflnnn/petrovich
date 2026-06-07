"use client";

import type { PeriodFilter, SortDirection, SortField } from "@/lib/admin/types";
import { cn } from "@/lib/utils/cn";
import { formInputShadowClass } from "@/lib/utils/styles";

const periodOptions: Array<{ value: PeriodFilter; label: string }> = [
  { value: "today", label: "Сегодня" },
  { value: "yesterday", label: "Вчера" },
  { value: "week", label: "Эта неделя" },
  { value: "month", label: "Этот месяц" },
  { value: "year", label: "Этот год" },
  { value: "all", label: "Все" },
];

const sortOptions: Array<{ value: SortField; label: string }> = [
  { value: "date", label: "По дате" },
  { value: "name", label: "По имени" },
];

type AdminListToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  sortField: SortField;
  onSortFieldChange: (value: SortField) => void;
  sortDirection: SortDirection;
  onSortDirectionChange: (value: SortDirection) => void;
  period?: PeriodFilter;
  onPeriodChange?: (value: PeriodFilter) => void;
  searchPlaceholder?: string;
  resultCount: number;
};

export function AdminListToolbar({
  search,
  onSearchChange,
  sortField,
  onSortFieldChange,
  sortDirection,
  onSortDirectionChange,
  period,
  onPeriodChange,
  searchPlaceholder = "Поиск по имени или телефону",
  resultCount,
}: AdminListToolbarProps) {
  return (
    <div className="rounded-card bg-white p-4 shadow-card ring-1 ring-black/5 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full lg:max-w-md">
          <label htmlFor="admin-list-search" className="mb-1.5 block text-sm font-medium text-text">
            Поиск
          </label>
          <input
            id="admin-list-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            className={formInputShadowClass}
          />
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto lg:min-w-80">
          <div>
            <label htmlFor="admin-list-sort" className="mb-1.5 block text-sm font-medium text-text">
              Сортировка
            </label>
            <select
              id="admin-list-sort"
              value={sortField}
              onChange={(event) => onSortFieldChange(event.target.value as SortField)}
              className={formInputShadowClass}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="admin-list-sort-direction"
              className="mb-1.5 block text-sm font-medium text-text"
            >
              Порядок
            </label>
            <select
              id="admin-list-sort-direction"
              value={sortDirection}
              onChange={(event) =>
                onSortDirectionChange(event.target.value as SortDirection)
              }
              className={formInputShadowClass}
            >
              <option value="desc">По убыванию</option>
              <option value="asc">По возрастанию</option>
            </select>
          </div>
        </div>
      </div>

      {period && onPeriodChange ? (
        <div className="mt-4 border-t border-black/5 pt-4">
          <p className="mb-2 text-sm font-medium text-text">Период</p>
          <div className="flex flex-wrap gap-2">
            {periodOptions.map((option) => {
              const isActive = period === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onPeriodChange(option.value)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-white"
                      : "bg-bg-soft text-text-muted ring-1 ring-black/6 hover:bg-bg-muted hover:text-text",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <p className="mt-4 text-sm text-text-muted">
        Найдено: <span className="font-medium text-text">{resultCount}</span>
      </p>
    </div>
  );
}
