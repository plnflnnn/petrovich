import { siteHeaderContent } from "@/app/home/_components/site-header-content";
import { getBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { absoluteSiteUrl } from "@/lib/seo/site-url";
import { categoryPath } from "@/lib/utils/routes";

type CategorySchemaInput = {
  slug: string;
  title: string;
  meta: { title: string; description: string };
  goods: Array<{
    title: string;
    body: string;
    image?: string;
  }>;
  priceItems: Array<{
    id: string;
    title: string;
    fromValue: number;
    unit: string;
  }>;
};

/** CollectionPage + offers + breadcrumbs for a materials category. */
export function getCategoryPageSchema(
  category: CategorySchemaInput,
): Record<string, unknown>[] {
  const path = categoryPath(category.slug);
  const pageUrl = absoluteSiteUrl(path);

  const itemListElement = category.goods.map((good, index) => {
    const price = category.priceItems.find((p) => p.title === good.title);
    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: good.title,
        description: good.body,
        ...(good.image
          ? { image: absoluteSiteUrl(good.image) }
          : {}),
        brand: {
          "@type": "Brand",
          name: siteHeaderContent.legalName,
        },
        ...(price
          ? {
              offers: {
                "@type": "Offer",
                priceCurrency: "RUB",
                price: String(price.fromValue),
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  price: String(price.fromValue),
                  priceCurrency: "RUB",
                  unitText: price.unit,
                },
                availability: "https://schema.org/InStock",
                seller: { "@id": absoluteSiteUrl("/#business") },
              },
            }
          : {}),
      },
    };
  });

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: category.meta.title,
      description: category.meta.description,
      isPartOf: { "@id": absoluteSiteUrl("/#website") },
      about: { "@id": absoluteSiteUrl("/#business") },
      mainEntity: {
        "@type": "ItemList",
        name: category.title,
        numberOfItems: category.goods.length,
        itemListElement,
      },
    },
    getBreadcrumbSchema([
      { name: "Главная", path: "/" },
      { name: "Категории", path: "/#categories" },
      { name: category.title, path },
    ]),
  ];
}
