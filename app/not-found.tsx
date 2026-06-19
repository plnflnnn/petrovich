import { PublicStatusPageShell } from "@/app/components/status-page/public-status-page-shell";
import { StatusPageContent } from "@/app/components/status-page/status-page-content";
import { PillButton } from "@/app/components/ui/pill-button";
import { homeAnchor } from "@/lib/utils/routes";
import Link from "next/link";

export default function NotFound() {
  return (
    <PublicStatusPageShell>
      <StatusPageContent
        kicker="Страница не найдена"
        title="Такой страницы нет"
        description="Возможно, ссылка устарела или адрес введён с ошибкой. Перейдите на главную или выберите раздел в меню."
        actions={
          <>
            <Link href="/">
              <PillButton type="button" variant="primary">
                На главную
              </PillButton>
            </Link>
            <Link href={homeAnchor("#categories")}>
              <PillButton type="button" variant="outline">
                К каталогу
              </PillButton>
            </Link>
          </>
        }
      />
    </PublicStatusPageShell>
  );
}
