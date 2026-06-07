import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Админ-панель",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full bg-bg text-text">
      {children}
    </div>
  );
}
