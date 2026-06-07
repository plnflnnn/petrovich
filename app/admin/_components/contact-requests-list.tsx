"use client";

import { AdminFilterableList } from "@/app/admin/_components/admin-filterable-list";
import { useContactRequests } from "@/app/admin/_components/contact-requests-provider";
import { formatAdminDate, formatAdminPhone } from "@/lib/admin/list-utils";
import type { AdminListColumn, ContactRequestRecord } from "@/lib/admin/types";

const contactRequestColumns: AdminListColumn<ContactRequestRecord>[] = [
  {
    key: "name",
    header: "Имя",
    render: (item) => <span className="font-medium">{item.name}</span>,
  },
  {
    key: "phone",
    header: "Телефон",
    render: (item) => formatAdminPhone(item.phone),
  },
  {
    key: "district",
    header: "Район",
    render: (item) => item.district,
  },
  {
    key: "comment",
    header: "Комментарий",
    className: "max-w-xs",
    render: (item) =>
      item.comment ? (
        <span className="line-clamp-2 text-text-muted">{item.comment}</span>
      ) : (
        <span className="text-text-subtle">—</span>
      ),
  },
  {
    key: "createdAt",
    header: "Дата",
    render: (item) => formatAdminDate(item.createdAt),
  },
];

export function ContactRequestsList() {
  const { requests, isLoading, error } = useContactRequests();

  if (isLoading) {
    return <p className="text-sm text-text-muted">Загружаем список заявок…</p>;
  }

  if (error) {
    return (
      <p className="rounded-inner bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-100">
        {error}
      </p>
    );
  }

  return (
    <AdminFilterableList
      badge="Заявки"
      title="Список заявок"
      description="Обращения с формы на сайте. Нажмите на строку, чтобы открыть карточку заявки."
      items={requests}
      columns={contactRequestColumns}
      emptyMessage="Заявок по выбранным фильтрам не найдено"
      searchPlaceholder="Поиск по имени, телефону, району или комментарию"
      showPeriodFilter
      getSearchFields={(item) => [item.comment, item.district, item.source]}
      getRowHref={(item) => `/admin/requests/${item.id}`}
    />
  );
}
