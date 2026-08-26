import { getOrganizationSchema } from "@/lib/seo/organization-schema";

type StructuredDataProps = {
  /**
   * When set, only this schema is emitted (org schema stays in root layout).
   * Pass Service / BreadcrumbList / etc. from page-level components.
   */
  schema?: Record<string, unknown> | Record<string, unknown>[];
};

/** Injects JSON-LD so search engines can parse business and page details. */
export function StructuredData({ schema }: StructuredDataProps = {}) {
  const payload =
    schema == null
      ? getOrganizationSchema()
      : Array.isArray(schema)
        ? schema
        : [schema];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload),
      }}
    />
  );
}
