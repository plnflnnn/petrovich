import { DeliveryMapSection } from "@/app/home/_components/delivery-map-section";
import { FooterSection } from "@/app/home/_components/footer-section";
import { SiteHeader } from "@/app/home/_components/site-header";
import { StructuredData } from "@/app/components/structured-data";
import type { ServiceDefinition } from "@/lib/data/service";
import { enrichService } from "@/lib/data/site-images";
import { getServicePageSchema } from "@/lib/seo/service-page-schema";
import { ServiceContentSection } from "./_components/service-content-section";
import { ServiceHeroSection } from "./_components/service-hero-section";

type ServicePageProps = {
  service: ServiceDefinition;
};

export function ServicePage({ service: serviceSource }: ServicePageProps) {
  const service = enrichService(serviceSource);

  return (
    <>
      <StructuredData schema={getServicePageSchema(service)} />
      <SiteHeader />
      <main className="flex-1">
        <ServiceHeroSection service={service} />
        <ServiceContentSection service={service} />
        {service.slug === "delivery" ? (
          <DeliveryMapSection sectionId="zone" />
        ) : null}
      </main>
      <FooterSection />
    </>
  );
}
