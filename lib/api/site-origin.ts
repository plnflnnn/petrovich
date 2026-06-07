function getConfiguredOrigins(): Set<string> {
  const origins = new Set<string>();

  for (const value of [
    process.env.SITE_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
  ]) {
    const trimmed = value?.trim();
    if (!trimmed) continue;

    try {
      origins.add(new URL(trimmed).origin);
    } catch {
      // Ignore invalid URL values.
    }
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    origins.add(`https://${vercelUrl}`);
  }

  return origins;
}

function getRequestOrigin(request: Request): string | null {
  const origin = request.headers.get("origin")?.trim();
  if (origin) return origin;

  const referer = request.headers.get("referer")?.trim();
  if (!referer) return null;

  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

function isLocalDevHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.")
  );
}

function matchesRequestHost(request: Request, requestOrigin: string): boolean {
  const host = request.headers.get("host");
  if (!host) return false;

  try {
    return new URL(requestOrigin).host === host;
  } catch {
    return false;
  }
}

function matchesServerOrigin(request: Request, requestOrigin: string): boolean {
  const host = request.headers.get("host");
  if (!host) return false;

  const proto =
    request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "https";

  return requestOrigin === `${proto}://${host}`;
}

/** Allow API access only from this website (same origin in the browser). */
export function isAllowedSiteRequest(request: Request): boolean {
  const requestOrigin = getRequestOrigin(request);
  const isProd = process.env.NODE_ENV === "production";

  if (!requestOrigin) {
    if (!isProd) {
      const host = request.headers.get("host") ?? "";
      const hostname = host.split(":")[0] ?? "";
      return isLocalDevHost(hostname);
    }

    return false;
  }

  const secFetchSite = request.headers.get("sec-fetch-site");
  if (isProd && secFetchSite && secFetchSite !== "same-origin") {
    return false;
  }

  if (!isProd) {
    if (matchesRequestHost(request, requestOrigin)) {
      return true;
    }

    try {
      const { hostname } = new URL(requestOrigin);
      if (isLocalDevHost(hostname)) {
        return true;
      }
    } catch {
      return false;
    }
  }

  const configured = getConfiguredOrigins();
  if (configured.has(requestOrigin)) {
    return true;
  }

  return matchesServerOrigin(request, requestOrigin);
}
