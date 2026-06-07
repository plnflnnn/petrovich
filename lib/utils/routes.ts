/** Absolute anchor link to a section on the home page (works from any route). */
export function homeAnchor(hash: string): string {
  const clean = hash.startsWith("#") ? hash.slice(1) : hash;
  return `/#${clean}`;
}

/** Detail page for a product category. */
export function categoryPath(slug: string): string {
  return `/category/${slug}`;
}

/** Detail page for an additional service. */
export function servicePath(slug: string): string {
  return `/service/${slug}`;
}

/** Delivery and cargo transport page. */
export const deliveryPath = servicePath("delivery");

/** Resolve nav link: internal routes as-is, hashes via home anchor. */
export function navHref(href: string): string {
  if (href.startsWith("/")) return href;
  return homeAnchor(href);
}
