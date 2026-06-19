"use client";

import { reportClientError } from "@/lib/errors/report-client-error";
import Link from "next/link";
import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    reportClientError({
      kind: "global-boundary",
      message: error.message || "Global render error",
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  return (
    <html lang="ru">
      <body className="flex min-h-screen items-center justify-center bg-bg px-4 font-sans text-text antialiased">
        <main className="max-w-md text-center">
          <p className="text-caption font-semibold uppercase tracking-kicker-sm text-accent">
            Критическая ошибка
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            Сайт временно недоступен
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-body">
            Произошла непредвиденная ошибка. Мы уже получили уведомление.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-hover hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Повторить
            </button>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-neutral bg-white px-6 text-sm font-semibold text-text transition-all hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              На главную
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
