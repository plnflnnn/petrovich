import { getOrganizationSchema } from "@/lib/seo/organization-schema";

/** Injects LocalBusiness JSON-LD so search engines can parse business details. */
export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getOrganizationSchema()),
      }}
    />
  );
}
