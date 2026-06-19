import { siteHeaderContent } from "@/app/home/_components/site-header-content";
import { cn } from "@/lib/utils/cn";

type WorkingHoursListProps = {
  variant?: "default" | "on-dark";
  className?: string;
};

export function WorkingHoursList({
  variant = "default",
  className,
}: WorkingHoursListProps) {
  const isOnDark = variant === "on-dark";

  return (
    <ul className={cn("space-y-1", className)}>
      {siteHeaderContent.workingHours.map((row) => (
        <li
          key={row.days}
          className="flex items-baseline justify-between gap-4 text-sm-plus leading-snug"
        >
          <span className={isOnDark ? "text-white/65" : "text-text-muted"}>
            {row.days}
          </span>
          <span
            className={cn(
              "font-semibold tabular-nums",
              isOnDark ? "text-white" : "text-text",
              row.hours === "Выходной" &&
                (isOnDark ? "text-white/50" : "text-text-subtle"),
            )}
          >
            {row.hours}
          </span>
        </li>
      ))}
    </ul>
  );
}
