import Image from "next/image";

type SiteLogoProps = {
  className?: string;
  size?: number;
};

export function SiteLogo({ className, size = 28 }: SiteLogoProps) {
  return (
    <Image
      src="/logo-mark.png"
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden
    />
  );
}
