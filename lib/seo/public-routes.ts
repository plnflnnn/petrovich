import { categoryPath, servicePath } from "@/lib/utils/routes";

export const publicCategorySlugs = [
  "roofing",
  "fences",
  "windows",
  "doors",
  "facade",
  "insulation",
  "drywall",
  "wall-panels",
  "lumber",
] as const;

export const publicServiceSlugs = ["forging", "equipment", "delivery"] as const;

export function getPublicSitePaths(): string[] {
  return [
    "/",
    ...publicCategorySlugs.map((slug) => categoryPath(slug)),
    ...publicServiceSlugs.map((slug) => servicePath(slug)),
  ];
}
