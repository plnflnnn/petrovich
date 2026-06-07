"use client";

import { ErrorReporter } from "@/app/components/error-reporter";
import { RequestModalProvider } from "@/app/components/request-modal/request-modal";
import { TimedCtaPopup } from "@/app/components/timed-cta-popup";
import { usePathname } from "next/navigation";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <>
        <ErrorReporter />
        {children}
      </>
    );
  }

  return (
    <RequestModalProvider>
      <ErrorReporter />
      {children}
      <TimedCtaPopup />
    </RequestModalProvider>
  );
}
