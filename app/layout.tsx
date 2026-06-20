import { ClientShell } from "@/app/providers/client-shell";
import { siteHeaderContent } from "@/app/home/_components/site-header-content";
import { getSiteUrl } from "@/lib/seo/site-url";
import { getSiteVerificationMetadata } from "@/lib/seo/site-verification";
import { siteKeywords } from "@/lib/seo/site-keywords";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  style: ["italic"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: siteHeaderContent.publicSiteName,
    template: `%s | ${siteHeaderContent.legalName}`,
  },
  keywords: siteKeywords,
  verification: getSiteVerificationMetadata(),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: siteHeaderContent.publicSiteName,
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Строительные и отделочные материалы",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://yandex.ru" />
        <link rel="dns-prefetch" href="https://yandex.ru" />
      </head>
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
