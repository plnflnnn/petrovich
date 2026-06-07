const MIN_SUBMIT_MS = 2_500;
const MAX_SUBMIT_AGE_MS = 24 * 60 * 60 * 1_000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1_000;
const MAX_URLS_IN_COMMENT = 2;

export const CONTACT_SPAM_FIELDS = {
  honeypot: "_hp",
  timestamp: "_ts",
} as const;

export type ContactSpamInput = {
  honeypot?: string;
  timestamp?: number;
  name: string;
  comment: string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const SPAM_KEYWORDS = [
  "viagra",
  "cialis",
  "casino",
  "forex",
  "crypto giveaway",
  "bitcoin investment",
  "click here",
  "seo service",
];

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "unknown";
}

function countUrls(text: string): number {
  const matches = text.match(/https?:\/\/|www\./gi);
  return matches?.length ?? 0;
}

function hasSpamKeywords(...parts: string[]): boolean {
  const haystack = parts.join(" ").toLowerCase();
  return SPAM_KEYWORDS.some((keyword) => haystack.includes(keyword));
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    return false;
  }

  return entry.count >= RATE_LIMIT_MAX;
}

export function recordContactSubmission(ip: string): void {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return;
  }

  entry.count += 1;
}

export type ContactSpamVerdict =
  | { allowed: true }
  | { allowed: false; silent: true; reason: "honeypot" | "timing" | "content" }
  | { allowed: false; silent: false; reason: "rate_limit" };

export function assessContactSpam(
  input: ContactSpamInput,
  ip: string,
): ContactSpamVerdict {
  if (input.honeypot?.trim()) {
    return { allowed: false, silent: true, reason: "honeypot" };
  }

  const submittedAt = input.timestamp;
  if (
    submittedAt === undefined ||
    !Number.isFinite(submittedAt) ||
    submittedAt <= 0
  ) {
    return { allowed: false, silent: true, reason: "timing" };
  }

  const elapsed = Date.now() - submittedAt;
  if (elapsed < MIN_SUBMIT_MS || elapsed > MAX_SUBMIT_AGE_MS) {
    return { allowed: false, silent: true, reason: "timing" };
  }

  if (isRateLimited(ip)) {
    return { allowed: false, silent: false, reason: "rate_limit" };
  }

  if (
    countUrls(input.comment) > MAX_URLS_IN_COMMENT ||
    hasSpamKeywords(input.name, input.comment)
  ) {
    return { allowed: false, silent: true, reason: "content" };
  }

  return { allowed: true };
}
