/** Canonical site origin for sitemap, robots, and Open Graph metadata. */

function isLocalHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname.endsWith(".local")
  );
}

function tryParseUrl(value: string | undefined): URL | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  try {
    return new URL(trimmed);
  } catch {
    return null;
  }
}

function firstPublicUrl(candidates: Array<string | undefined>): URL | null {
  for (const candidate of candidates) {
    const url = tryParseUrl(candidate);
    if (!url) continue;
    if (isLocalHost(url.hostname)) continue;
    return url;
  }
  return null;
}

/**
 * Resolves the public site origin.
 * Never advertises localhost in production sitemap/canonicals — that makes
 * home and category pages undiscoverable while a few externally linked URLs
 * (e.g. /service/delivery) can still appear in search.
 */
export function getSiteUrl(): URL {
  const configured = firstPublicUrl([
    process.env.SITE_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
  ]);
  if (configured) return configured;

  const renderUrl = firstPublicUrl([process.env.RENDER_EXTERNAL_URL]);
  if (renderUrl) return renderUrl;

  const vercelHost = process.env.VERCEL_URL?.trim();
  if (vercelHost && !isLocalHost(vercelHost.split(":")[0] ?? "")) {
    return new URL(`https://${vercelHost}`);
  }

  if (process.env.NODE_ENV === "production") {
    console.error(
      "[seo] SITE_URL is missing or points to localhost. Set SITE_URL=https://your-domain in production so sitemap and canonical URLs are crawlable.",
    );
  }

  return new URL("http://localhost:3000");
}

export function absoluteSiteUrl(path = "/"): string {
  const url = getSiteUrl();
  return new URL(path, url).toString();
}
