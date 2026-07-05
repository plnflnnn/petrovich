import { siteHeaderContent } from "@/app/home/_components/site-header-content";
import { officeCoords, buildYandexMapFullUrl } from "@/lib/data/office-map";
import { absoluteSiteUrl } from "@/lib/seo/site-url";

/**
 * LocalBusiness (HardwareStore) JSON-LD describing the business for Google and
 * Yandex. Uses the same contact data shown to visitors so it stays in sync.
 */
export function getOrganizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    "@id": absoluteSiteUrl("/#business"),
    name: siteHeaderContent.legalName,
    alternateName: siteHeaderContent.publicSiteName,
    description:
      "Доставка строительных и отделочных материалов из Новосибирска в Каргат, Каргатский район и другие районы Новосибирской области. Кровля, заборы, окна, двери, фасад, утеплитель, гипсокартон, пиломатериалы. Также ковка, хозтехника под заказ и грузоперевозки.",
    url: absoluteSiteUrl("/"),
    telephone: siteHeaderContent.phoneTel,
    email: siteHeaderContent.email,
    image: absoluteSiteUrl("/og.png"),
    logo: absoluteSiteUrl("/og.png"),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteHeaderContent.phoneTel,
      email: siteHeaderContent.email,
      contactType: "sales",
      areaServed: "RU",
      availableLanguage: "Russian",
    },
    priceRange: "₽₽",
    taxID: siteHeaderContent.inn,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "OGRNIP",
      value: siteHeaderContent.ogrnip,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Ленина, 147",
      addressLocality: "Каргат",
      addressRegion: "Новосибирская область",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: officeCoords.lat,
      longitude: officeCoords.lon,
    },
    areaServed: [
      { "@type": "City", name: "Каргат" },
      { "@type": "AdministrativeArea", name: "Каргатский район" },
      { "@type": "AdministrativeArea", name: "Новосибирская область" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "10:00",
        closes: "15:00",
      },
    ],
    sameAs: [buildYandexMapFullUrl()],
  };
}
