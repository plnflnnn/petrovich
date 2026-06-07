import type { ErrorReportPayload } from "@/lib/errors/error-report-schema";

const IP_WINDOW_MS = 15 * 60 * 1_000;
const IP_MAX = 8;
const DEDUPE_WINDOW_MS = 60 * 60 * 1_000;

type CountEntry = {
  count: number;
  resetAt: number;
};

const ipStore = new Map<string, CountEntry>();
const fingerprintStore = new Map<string, number>();

function fingerprint(payload: ErrorReportPayload): string {
  const stackLine = payload.stack.split("\n")[0]?.trim() ?? "";
  return [payload.kind, payload.message, payload.page, stackLine]
    .join("|")
    .slice(0, 500);
}

function isIpLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry || now > entry.resetAt) {
    ipStore.set(ip, { count: 1, resetAt: now + IP_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > IP_MAX;
}

function isDuplicate(payload: ErrorReportPayload): boolean {
  const now = Date.now();
  const key = fingerprint(payload);
  const seenAt = fingerprintStore.get(key);

  if (seenAt && now - seenAt < DEDUPE_WINDOW_MS) {
    return true;
  }

  fingerprintStore.set(key, now);
  return false;
}

export function shouldSkipErrorReport(
  payload: ErrorReportPayload,
  ip: string,
): boolean {
  return isIpLimited(ip) || isDuplicate(payload);
}
