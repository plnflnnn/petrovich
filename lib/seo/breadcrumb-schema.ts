import { absoluteSiteUrl } from "@/lib/seo/site-url";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

/** BreadcrumbList JSON-LD shared by category and service pages. */
export function getBreadcrumbSchema(
  items: BreadcrumbItem[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteSiteUrl(item.path),
    })),
  };
}
