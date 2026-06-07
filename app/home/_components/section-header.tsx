import type { ReactNode } from "react";

type SectionHeaderProps = {
  kicker?: string;
  title: string;
  /** Rendered between the title and the lead line. */
  afterTitle?: ReactNode;
  lead?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  kicker,
  title,
  afterTitle,
  lead,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <header
      className={`${isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {kicker ? <p className="badge-kicker">{kicker}</p> : null}
      <h2 className={`section-title ${kicker ? "mt-6" : ""} text-balance`}>
        {title}
      </h2>
      {afterTitle ? <div className="mt-5">{afterTitle}</div> : null}
      {lead ? <p className="mt-5 body-lg">{lead}</p> : null}
    </header>
  );
}
