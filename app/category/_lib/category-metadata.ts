import type { Metadata } from "next";

export function categoryMetadata(category: {
  meta: { title: string; description: string };
}): Metadata {
  return {
    title: { absolute: category.meta.title },
    description: category.meta.description,
  };
}
