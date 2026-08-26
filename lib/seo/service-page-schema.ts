import { siteHeaderContent } from "@/app/home/_components/site-header-content";
import { getBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { absoluteSiteUrl } from "@/lib/seo/site-url";
import { servicePath } from "@/lib/utils/routes";

type ServiceSchemaInput = {
  slug: string;
  title: string;
  meta: { description: string };
  offerings: string[];
};

const SERVICE_TYPE_BY_SLUG: Record<string, string> = {
  delivery: "Грузоперевозки",
  forging: "Художественная ковка",
  equipment: "Хозяйственная техника",
};

/** Service + WebPage + BreadcrumbList JSON-LD for any service page. */
export function getServicePageSchema(
  service: ServiceSchemaInput,
): Record<string, unknown>[] {
  const path = servicePath(service.slug);
  const pageUrl = absoluteSiteUrl(path);
  const serviceType =
    SERVICE_TYPE_BY_SLUG[service.slug] ?? service.title;

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: service.title,
      description: service.meta.description,
      isPartOf: { "@id": absoluteSiteUrl("/#website") },
      about: { "@id": absoluteSiteUrl("/#business") },
      mainEntity: { "@id": `${pageUrl}#service` },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: service.title,
      description: service.meta.description,
      url: pageUrl,
      provider: { "@id": absoluteSiteUrl("/#business") },
      areaServed: [
        { "@type": "City", name: "Каргат" },
        { "@type": "AdministrativeArea", name: "Каргатский район" },
        { "@type": "AdministrativeArea", name: "Новосибирская область" },
      ],
      serviceType,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: service.title,
        itemListElement: service.offerings.map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
          },
        })),
      },
      availableChannel: {
        "@type": "ServiceChannel",
        servicePhone: {
          "@type": "ContactPoint",
          telephone: siteHeaderContent.phoneTel,
          contactType: "sales",
          availableLanguage: "Russian",
        },
      },
    },
    getBreadcrumbSchema([
      { name: "Главная", path: "/" },
      { name: "Услуги", path: "/#services" },
      { name: service.title, path },
    ]),
  ];
}
