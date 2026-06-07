"use client";

import { adminNavItems } from "@/lib/admin/navigation";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type AdminSidebarProps = {
  username: string;
};

export function AdminSidebar({ username }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } finally {
      window.location.assign("/admin/login");
    }
  }

  return (
    <aside className="flex h-full w-full flex-col border-r border-black/6 bg-white">
      <div className="border-b border-black/6 px-5 py-6">
        <p className="text-xs font-medium uppercase tracking-kicker-sm text-accent">
          Админ-панель
        </p>
        <p className="mt-2 text-sm font-medium text-text">{username}</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {adminNavItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className={cn(
                "block rounded-card-xs px-3 py-3 transition-colors",
                isActive
                  ? "bg-accent-soft text-text ring-1 ring-accent/20"
                  : "text-text-muted hover:bg-bg-soft hover:text-text",
              )}
            >
              <span className="block text-sm font-medium">{item.label}</span>
              <span className="mt-0.5 block text-xs text-text-subtle">
                {item.description}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-black/6 px-3 py-4">
        <button
          type="button"
          onClick={() => void handleLogout()}
          disabled={isLoggingOut}
          className="inline-flex h-10 w-full items-center justify-center rounded-full bg-bg-soft px-4 text-sm font-medium text-text ring-1 ring-black/6 transition-colors hover:bg-bg-muted disabled:opacity-60"
        >
          {isLoggingOut ? "Выходим…" : "Выйти"}
        </button>
      </div>
    </aside>
  );
}
