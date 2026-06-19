import type { Metadata } from "next";

function readVerificationCode(
  ...values: Array<string | undefined>
): string | undefined {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }

  return undefined;
}

/** Search engine ownership verification tags from environment variables. */
export function getSiteVerificationMetadata(): Metadata["verification"] {
  const google = readVerificationCode(
    process.env.GOOGLE_SITE_VERIFICATION,
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  );
  const yandex = readVerificationCode(
    process.env.YANDEX_SITE_VERIFICATION,
    process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION,
  );

  if (!google && !yandex) {
    return undefined;
  }

  return {
    ...(google ? { google } : {}),
    ...(yandex ? { yandex } : {}),
  };
}
