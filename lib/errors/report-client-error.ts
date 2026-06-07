import type { ErrorReportKind } from "@/lib/errors/error-report-schema";

export type ClientErrorReport = {
  kind: ErrorReportKind;
  message: string;
  page?: string;
  component?: string;
  stack?: string;
  digest?: string;
};

const reportedFingerprints = new Set<string>();

function fingerprint(report: ClientErrorReport): string {
  const stackLine = report.stack?.split("\n")[0]?.trim() ?? "";
  return [report.kind, report.message, report.page ?? "", stackLine].join("|");
}

function shouldReportOnClient(report: ClientErrorReport): boolean {
  if (process.env.NODE_ENV !== "production") {
    return false;
  }

  const key = fingerprint(report);
  if (reportedFingerprints.has(key)) {
    return false;
  }

  reportedFingerprints.add(key);
  return true;
}

export function reportClientError(report: ClientErrorReport): void {
  if (!shouldReportOnClient(report)) {
    return;
  }

  const body = {
    kind: report.kind,
    message: report.message,
    page: report.page ?? (typeof window !== "undefined" ? window.location.href : ""),
    component: report.component ?? "",
    stack: report.stack ?? "",
    digest: report.digest ?? "",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    occurredAt: new Date().toISOString(),
  };

  void fetch("/api/report-error", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {
    // Never throw from error reporting.
  });
}
