import type { Metadata } from "next";
import { keywordsForService } from "@/lib/seo/site-keywords";

export function serviceMetadata(service: {
  slug: string;
  meta: { title: string; description: string };
}): Metadata {
  return {
    title: { absolute: service.meta.title },
    description: service.meta.description,
    keywords: keywordsForService(service.slug),
  };
}
