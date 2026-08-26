import { siteHeaderContent } from "@/app/home/_components/site-header-content";
import { absoluteSiteUrl } from "@/lib/seo/site-url";
import { categoryPath, servicePath } from "@/lib/utils/routes";

/** WebSite + ItemList of categories/services for the home page. */
export function getHomePageSchema(): Record<string, unknown>[] {
  const homeUrl = absoluteSiteUrl("/");

  const categoryItems = siteHeaderContent.categories.items.map(
    (cat, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: cat.title,
      url: absoluteSiteUrl(categoryPath(cat.slug)),
    }),
  );

  const serviceItems = siteHeaderContent.services.items.map(
    (service, index) => ({
      "@type": "ListItem",
      position: categoryItems.length + index + 1,
      name: service.title,
      url: absoluteSiteUrl(servicePath(service.slug)),
    }),
  );

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${homeUrl}#website`,
      url: homeUrl,
      name: siteHeaderContent.publicSiteName,
      alternateName: siteHeaderContent.legalName,
      description:
        "Строительные и отделочные материалы в Каргате и Каргатском районе с доставкой из Новосибирска.",
      inLanguage: "ru-RU",
      publisher: { "@id": `${homeUrl}#business` },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${homeUrl}#webpage`,
      url: homeUrl,
      name: "Строительные материалы в Каргате",
      description:
        "Кровля, заборы, окна, двери и другие стройматериалы в Каргате. Доставка из Новосибирска по Каргатскому району.",
      isPartOf: { "@id": `${homeUrl}#website` },
      about: { "@id": `${homeUrl}#business` },
      primaryImageOfPage: absoluteSiteUrl("/og.png"),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${homeUrl}#catalog`,
      name: "Каталог материалов и услуг",
      numberOfItems: categoryItems.length + serviceItems.length,
      itemListElement: [...categoryItems, ...serviceItems],
    },
  ];
}
