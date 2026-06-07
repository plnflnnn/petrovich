import type {
  AdminListRecord,
  PeriodFilter,
  SortDirection,
  SortField,
} from "@/lib/admin/types";

function startOfDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function endOfDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(23, 59, 59, 999);
  return copy;
}

function startOfWeek(date: Date) {
  const copy = startOfDay(date);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  return copy;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfYear(date: Date) {
  return new Date(date.getFullYear(), 0, 1);
}

export function getPeriodRange(period: PeriodFilter, now = new Date()) {
  const todayStart = startOfDay(now);

  switch (period) {
    case "today":
      return { from: todayStart, to: endOfDay(now) };
    case "yesterday": {
      const yesterday = new Date(todayStart);
      yesterday.setDate(yesterday.getDate() - 1);
      return { from: yesterday, to: endOfDay(yesterday) };
    }
    case "week":
      return { from: startOfWeek(now), to: endOfDay(now) };
    case "month":
      return { from: startOfMonth(now), to: endOfDay(now) };
    case "year":
      return { from: startOfYear(now), to: endOfDay(now) };
    case "all":
      return null;
  }
}

export function filterByPeriod<T extends { createdAt: string }>(
  items: T[],
  period: PeriodFilter,
  now = new Date(),
) {
  const range = getPeriodRange(period, now);

  if (!range) {
    return items;
  }

  return items.filter((item) => {
    const createdAt = new Date(item.createdAt);
    return createdAt >= range.from && createdAt <= range.to;
  });
}

export function searchRecords<T extends AdminListRecord>(
  items: T[],
  query: string,
  getExtraValues?: (item: T) => string[],
) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return items;
  }

  return items.filter((item) => {
    const haystack = [
      item.name,
      item.phone,
      ...(getExtraValues?.(item) ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function sortRecords<T extends AdminListRecord>(
  items: T[],
  sortField: SortField,
  sortDirection: SortDirection,
  getDateValue: (item: T) => string = (item) => item.createdAt,
) {
  const sorted = [...items].sort((left, right) => {
    if (sortField === "name") {
      return left.name.localeCompare(right.name, "ru");
    }

    return (
      new Date(getDateValue(left)).getTime() -
      new Date(getDateValue(right)).getTime()
    );
  });

  return sortDirection === "asc" ? sorted : sorted.reverse();
}

export function formatAdminDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatAdminPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 11) {
    return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  }

  return phone;
}
