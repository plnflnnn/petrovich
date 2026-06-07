"use client";

import { reportClientError } from "@/lib/errors/report-client-error";
import { useEffect } from "react";

function normalizeReason(reason: unknown): { message: string; stack?: string } {
  if (reason instanceof Error) {
    return {
      message: reason.message || reason.name || "Unhandled rejection",
      stack: reason.stack,
    };
  }

  if (typeof reason === "string") {
    return { message: reason };
  }

  try {
    return { message: JSON.stringify(reason) };
  } catch {
    return { message: "Unhandled rejection" };
  }
}

export function ErrorReporter() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    function onWindowError(
      event: Event | string,
      source?: string,
      lineno?: number,
      colno?: number,
      error?: Error,
    ) {
      const message =
        error?.message ||
        (typeof event === "string" ? event : "Script error");

      reportClientError({
        kind: "window-error",
        message,
        component: source ? `${source}:${lineno ?? 0}:${colno ?? 0}` : "",
        stack: error?.stack,
      });
    }

    function onUnhandledRejection(event: PromiseRejectionEvent) {
      const { message, stack } = normalizeReason(event.reason);

      reportClientError({
        kind: "unhandled-rejection",
        message,
        stack,
      });
    }

    window.addEventListener("error", onWindowError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("error", onWindowError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}
