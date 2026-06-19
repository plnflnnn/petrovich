"use client";

import { StatusPageContent } from "@/app/components/status-page/status-page-content";
import { PillButton } from "@/app/components/ui/pill-button";
import { reportClientError } from "@/lib/errors/report-client-error";
import Link from "next/link";
import { useEffect } from "react";

type AdminErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminError({ error, reset }: AdminErrorProps) {
  useEffect(() => {
    reportClientError({
      kind: "react-boundary",
      message: error.message || "Admin React render error",
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  return (
    <main className="flex min-h-full flex-1 items-center px-4 py-20">
      <StatusPageContent
        kicker="Ошибка"
        title="Не удалось загрузить раздел"
        description="Произошла ошибка при отображении страницы. Попробуйте обновить или вернитесь в панель."
        actions={
          <>
            <PillButton type="button" variant="primary" onClick={reset}>
              Повторить
            </PillButton>
            <Link href="/admin">
              <PillButton type="button" variant="outline">
                В панель
              </PillButton>
            </Link>
          </>
        }
      />
    </main>
  );
}
