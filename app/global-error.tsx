"use client";

import { reportClientError } from "@/lib/errors/report-client-error";
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
          <p className="text-xs font-semibold uppercase tracking-wide text-[#00ba74]">
            Критическая ошибка
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">
            Сайт временно недоступен
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
            Произошла непредвиденная ошибка. Мы уже получили уведомление.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-full bg-[#00ba74] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Повторить
          </button>
        </main>
      </body>
    </html>
  );
}
