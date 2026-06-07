"use client";

import { useIsClient } from "@/lib/utils/use-is-client";
import type { ReactNode } from "react";

type ClientOnlyProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

/** Renders children only after hydration — avoids iOS/browser DOM injection mismatches. */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const isClient = useIsClient();
  if (!isClient) return fallback;
  return children;
}
