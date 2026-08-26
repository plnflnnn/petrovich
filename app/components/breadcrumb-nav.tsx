import Link from "next/link";

export type BreadcrumbCrumb = {
  label: string;
  href?: string;
};

type BreadcrumbNavProps = {
  items: BreadcrumbCrumb[];
  className?: string;
};

/** Accessible breadcrumb trail with aria-current on the last item. */
export function BreadcrumbNav({ items, className }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Хлебные крошки" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? (
                <span aria-hidden className="text-white/45">
                  ›
                </span>
              ) : null}
              {isLast || !item.href ? (
                <span
                  className="text-white"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
