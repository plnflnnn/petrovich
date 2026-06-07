"use client";

import type { AdminListColumn, AdminListRecord } from "@/lib/admin/types";
import { cn } from "@/lib/utils/cn";
import { useRouter } from "next/navigation";

type AdminListTableProps<T extends AdminListRecord> = {
  items: T[];
  columns: AdminListColumn<T>[];
  emptyMessage: string;
  getRowHref?: (item: T) => string;
};

export function AdminListTable<T extends AdminListRecord>({
  items,
  columns,
  emptyMessage,
  getRowHref,
}: AdminListTableProps<T>) {
  const router = useRouter();

  function handleRowNavigate(href: string) {
    router.push(href);
  }

  function handleRowKeyDown(event: React.KeyboardEvent, href: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleRowNavigate(href);
    }
  }
  if (items.length === 0) {
    return (
      <div className="rounded-card bg-white px-6 py-12 text-center shadow-card ring-1 ring-black/5">
        <p className="text-sm text-text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-card bg-white shadow-card ring-1 ring-black/5 md:block">
        <table className="min-w-full divide-y divide-black/5">
          <thead className="bg-bg-soft">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-kicker-xs text-text-muted",
                    column.className,
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {items.map((item) => {
              const rowHref = getRowHref?.(item);

              return (
                <tr
                  key={item.id}
                  className={cn(
                    rowHref && "cursor-pointer hover:bg-bg-soft/70",
                    !rowHref && "hover:bg-bg-soft/70",
                  )}
                  onClick={
                    rowHref
                      ? () => {
                          handleRowNavigate(rowHref);
                        }
                      : undefined
                  }
                  onKeyDown={
                    rowHref
                      ? (event) => {
                          handleRowKeyDown(event, rowHref);
                        }
                      : undefined
                  }
                  tabIndex={rowHref ? 0 : undefined}
                  role={rowHref ? "link" : undefined}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn("px-4 py-4 text-sm text-text", column.className)}
                    >
                      {column.render(item)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {items.map((item) => {
          const rowHref = getRowHref?.(item);

          return (
            <article
              key={item.id}
              className={cn(
                "rounded-card bg-white p-4 shadow-card ring-1 ring-black/5",
                rowHref && "cursor-pointer transition-colors hover:bg-bg-soft/40",
              )}
              onClick={
                rowHref
                  ? () => {
                      handleRowNavigate(rowHref);
                    }
                  : undefined
              }
              onKeyDown={
                rowHref
                  ? (event) => {
                      handleRowKeyDown(event, rowHref);
                    }
                  : undefined
              }
              tabIndex={rowHref ? 0 : undefined}
              role={rowHref ? "link" : undefined}
            >
            <div className="space-y-3">
              {columns.map((column) => (
                <div key={column.key}>
                  <p className="text-xs font-medium uppercase tracking-kicker-xs text-text-subtle">
                    {column.header}
                  </p>
                  <div className="mt-1 text-sm text-text">{column.render(item)}</div>
                </div>
              ))}
            </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
