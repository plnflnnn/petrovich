import { siteHeaderContent } from "@/app/home/_components/site-header-content";
import Image from "next/image";

type SiteLogoProps = {
  className?: string;
  size?: number;
};

export function SiteLogo({ className, size = 28 }: SiteLogoProps) {
  return (
    <Image
      src="/logo-mark.png"
      alt={`Логотип ${siteHeaderContent.siteName}`}
      width={size}
      height={size}
      className={className}
    />
  );
}
