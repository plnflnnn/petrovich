import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  title: string;
  description: string;
  badge?: string;
  actions?: ReactNode;
};

export function AdminPageHeader({
  title,
  description,
  badge,
  actions,
}: AdminPageHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {badge ? (
          <p className="text-xs font-medium uppercase tracking-kicker-sm text-accent">
            {badge}
          </p>
        ) : null}
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
          {description}
        </p>
      </div>

      {actions ? <div className="shrink-0">{actions}</div> : null}
    </header>
  );
}
