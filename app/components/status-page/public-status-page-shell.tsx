"use client";

import { FooterSection } from "@/app/home/_components/footer-section";
import { SiteHeader } from "@/app/home/_components/site-header";
import type { ReactNode } from "react";

export function PublicStatusPageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-screen flex-1 flex-col pt-16 lg:pt-18">
        {children}
      </main>
      <FooterSection />
    </>
  );
}
