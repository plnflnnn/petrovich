import { getPublicSitePaths } from "@/lib/seo/public-routes";
import { absoluteSiteUrl } from "@/lib/seo/site-url";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return getPublicSitePaths().map((path) => ({
    url: absoluteSiteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/category/") ? 0.8 : 0.7,
  }));
}
