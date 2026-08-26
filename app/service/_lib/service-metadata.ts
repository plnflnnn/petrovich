import type { Metadata } from "next";
import { keywordsForService } from "@/lib/seo/site-keywords";
import { servicePath } from "@/lib/utils/routes";

export function serviceMetadata(service: {
  slug: string;
  meta: { title: string; description: string };
}): Metadata {
  const path = servicePath(service.slug);

  return {
    title: { absolute: service.meta.title },
    description: service.meta.description,
    keywords: keywordsForService(service.slug),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      url: path,
      type: "website",
      locale: "ru_RU",
    },
    twitter: {
      card: "summary_large_image",
      title: service.meta.title,
      description: service.meta.description,
    },
  };
}
