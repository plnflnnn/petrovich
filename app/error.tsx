"use client";

import { reportClientError } from "@/lib/errors/report-client-error";
import { PillButton } from "@/app/components/ui/pill-button";
import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    reportClientError({
      kind: "react-boundary",
      message: error.message || "React render error",
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <p className="text-caption font-semibold uppercase tracking-kicker-sm text-accent">
          Ошибка
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-text">
          Что-то пошло не так
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          Страница не загрузилась. Попробуйте обновить или вернитесь на главную.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <PillButton type="button" variant="primary" onClick={reset}>
            Повторить
          </PillButton>
          <Link href="/">
            <PillButton type="button" variant="secondary">
              На главную
            </PillButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
