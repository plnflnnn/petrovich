import { ClientsProvider } from "@/app/admin/_components/clients-provider";
import type { ReactNode } from "react";

export default function AdminClientsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <ClientsProvider>{children}</ClientsProvider>;
}
