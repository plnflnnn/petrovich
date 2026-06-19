"use client";

import { PublicStatusPageShell } from "@/app/components/status-page/public-status-page-shell";
import { StatusPageContent } from "@/app/components/status-page/status-page-content";
import { PillButton } from "@/app/components/ui/pill-button";
import { reportClientError } from "@/lib/errors/report-client-error";
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
    <PublicStatusPageShell>
      <StatusPageContent
        kicker="Ошибка"
        title="Что-то пошло не так"
        description="Страница не загрузилась. Попробуйте обновить или вернитесь на главную — мы уже получили уведомление об ошибке."
        actions={
          <>
            <PillButton type="button" variant="primary" onClick={reset}>
              Повторить
            </PillButton>
            <Link href="/">
              <PillButton type="button" variant="secondary">
                На главную
              </PillButton>
            </Link>
          </>
        }
      />
    </PublicStatusPageShell>
  );
}
