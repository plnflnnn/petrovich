"use client";

import { AdminFilterableList } from "@/app/admin/_components/admin-filterable-list";
import { useClients } from "@/app/admin/_components/clients-provider";
import { PillButton } from "@/app/components/ui/pill-button";
import { formatAdminDate, formatAdminPhone } from "@/lib/admin/list-utils";
import type { AdminListColumn, ClientRecord } from "@/lib/admin/types";
import Link from "next/link";

const clientColumns: AdminListColumn<ClientRecord>[] = [
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
    key: "address",
    header: "Адрес",
    className: "max-w-xs",
    render: (item) =>
      item.address ? (
        <span className="line-clamp-2 text-text-muted">{item.address}</span>
      ) : (
        <span className="text-text-subtle">—</span>
      ),
  },
  {
    key: "memo",
    header: "Заметка",
    className: "max-w-xs",
    render: (item) =>
      item.memo ? (
        <span className="line-clamp-2 text-text-muted">{item.memo}</span>
      ) : (
        <span className="text-text-subtle">—</span>
      ),
  },
  {
    key: "orderCount",
    header: "Заказы",
    render: (item) => item.orderCount,
  },
  {
    key: "lastOrderAt",
    header: "Последний заказ",
    render: (item) => formatAdminDate(item.lastOrderAt),
  },
];

export function ClientsList() {
  const { clients, isLoading, error } = useClients();

  if (isLoading) {
    return <p className="text-sm text-text-muted">Загружаем список клиентов…</p>;
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
      badge="Клиенты"
      title="Список клиентов"
      description="Клиенты, которые уже оформили заказ. Нажмите на строку, чтобы открыть карточку клиента."
      items={clients}
      columns={clientColumns}
      emptyMessage="Клиентов по выбранным фильтрам не найдено"
      searchPlaceholder="Поиск по имени, телефону, адресу или заметке"
      getDateValue={(item) => item.lastOrderAt}
      getSearchFields={(item) => [item.address, item.memo]}
      getRowHref={(item) => `/admin/clients/${item.id}`}
      headerActions={
        <PillButton asChild variant="primary">
          <Link href="/admin/clients/new">Добавить клиента</Link>
        </PillButton>
      }
    />
  );
}
