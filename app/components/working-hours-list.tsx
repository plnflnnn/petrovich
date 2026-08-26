import { siteHeaderContent } from "@/app/home/_components/site-header-content";
import { cn } from "@/lib/utils/cn";

type WorkingHoursListProps = {
  variant?: "default" | "on-dark";
  className?: string;
};

function HoursValue({
  hours,
  className,
}: {
  hours: string;
  className?: string;
}) {
  if (hours === "Выходной") {
    return <span className={className}>{hours}</span>;
  }

  // Expect values like "10:00–15:00"
  const match = hours.match(/^(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})$/);
  if (!match) {
    return <span className={className}>{hours}</span>;
  }

  const [, open, close] = match;
  return (
    <span className={className}>
      <time dateTime={open}>{open}</time>–<time dateTime={close}>{close}</time>
    </span>
  );
}

export function WorkingHoursList({
  variant = "default",
  className,
}: WorkingHoursListProps) {
  const isOnDark = variant === "on-dark";

  return (
    <dl className={cn("space-y-1", className)}>
      {siteHeaderContent.workingHours.map((row) => (
        <div
          key={row.days}
          className="flex items-baseline justify-between gap-4 text-sm-plus leading-snug"
        >
          <dt className={isOnDark ? "text-white/65" : "text-text-muted"}>
            {row.days}
          </dt>
          <dd>
            <HoursValue
              hours={row.hours}
              className={cn(
                "font-semibold tabular-nums",
                isOnDark ? "text-white" : "text-text",
                row.hours === "Выходной" &&
                  (isOnDark ? "text-white/50" : "text-text-subtle"),
              )}
            />
          </dd>
        </div>
      ))}
    </dl>
  );
}
