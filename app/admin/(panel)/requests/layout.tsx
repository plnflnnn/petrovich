import { ContactRequestsProvider } from "@/app/admin/_components/contact-requests-provider";
import type { ReactNode } from "react";

export default function AdminRequestsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <ContactRequestsProvider>{children}</ContactRequestsProvider>;
}
