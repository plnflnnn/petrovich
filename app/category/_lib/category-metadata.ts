import type { Metadata } from "next";
import { keywordsForCategory } from "@/lib/seo/site-keywords";
import { categoryPath } from "@/lib/utils/routes";

export function categoryMetadata(category: {
  slug: string;
  meta: { title: string; description: string };
}): Metadata {
  const path = categoryPath(category.slug);

  return {
    title: { absolute: category.meta.title },
    description: category.meta.description,
    keywords: keywordsForCategory(category.slug),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: category.meta.title,
      description: category.meta.description,
      url: path,
      type: "website",
      locale: "ru_RU",
    },
    twitter: {
      card: "summary_large_image",
      title: category.meta.title,
      description: category.meta.description,
    },
  };
}
