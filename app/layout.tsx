import { ClientShell } from "@/app/providers/client-shell";
import type { Metadata } from "next";
import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "У Петровича",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "У Петровича",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "Строительные и отделочные материалы",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
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
      className={`${inter.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
