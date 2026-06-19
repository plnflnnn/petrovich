import { StatusPageContent } from "@/app/components/status-page/status-page-content";
import { PillButton } from "@/app/components/ui/pill-button";
import Link from "next/link";

export default function AdminNotFound() {
  return (
    <main className="flex min-h-full flex-1 items-center px-4 py-20">
      <StatusPageContent
        code="404"
        kicker="Админ-панель"
        title="Страница не найдена"
        description="Запрошенный раздел не существует или был удалён."
        actions={
          <>
            <Link href="/admin">
              <PillButton type="button" variant="primary">
                В панель
              </PillButton>
            </Link>
            <Link href="/">
              <PillButton type="button" variant="outline">
                На сайт
              </PillButton>
            </Link>
          </>
        }
      />
    </main>
  );
}
