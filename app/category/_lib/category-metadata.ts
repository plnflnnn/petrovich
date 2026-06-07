import type { Metadata } from "next";
import { keywordsForCategory } from "@/lib/seo/site-keywords";

export function categoryMetadata(category: {
  slug: string;
  meta: { title: string; description: string };
}): Metadata {
  return {
    title: { absolute: category.meta.title },
    description: category.meta.description,
    keywords: keywordsForCategory(category.slug),
  };
}
