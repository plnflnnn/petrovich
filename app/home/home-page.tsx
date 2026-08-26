import { StructuredData } from "@/app/components/structured-data";
import { getHomePageSchema } from "@/lib/seo/home-schema";
import { AboutSection } from "./_components/about-section";
import { CategoriesSection } from "./_components/categories-section";
import { ServicesSection } from "./_components/services-section";
import { ContactSection } from "./_components/contact-section";
import { DeliveryMapSection } from "./_components/delivery-map-section";
import { FooterSection } from "./_components/footer-section";
import { HeroSection } from "./_components/hero-section";
import { ProcessSection } from "./_components/process-section";
import { SiteHeader } from "./_components/site-header";

export function HomePage() {
  return (
    <>
      <StructuredData schema={getHomePageSchema()} />
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <CategoriesSection />
        <ServicesSection />
        <ProcessSection />
        <DeliveryMapSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}
