/** Canonical site origin for sitemap, robots, and Open Graph metadata. */
export function getSiteUrl(): URL {
  for (const value of [
    process.env.SITE_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
  ]) {
    const trimmed = value?.trim();
    if (!trimmed) continue;

    try {
      return new URL(trimmed);
    } catch {
      // Ignore invalid URL values.
    }
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return new URL(`https://${vercelUrl}`);
  }

  return new URL("http://localhost:3000");
}

export function absoluteSiteUrl(path = "/"): string {
  const url = getSiteUrl();
  return new URL(path, url).toString();
}
