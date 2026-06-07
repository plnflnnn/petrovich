import { FooterSection } from "@/app/home/_components/footer-section";
import { SiteHeader } from "@/app/home/_components/site-header";
import type { CategoryDefinition } from "@/lib/data/category";
import { enrichCategory } from "@/lib/data/site-images";
import { DeliveryMapSection } from "@/app/home/_components/delivery-map-section";
import { CategoryHeroSection } from "./_components/category-hero-section";
import { CategoryTrustSection } from "./_components/category-trust-section";
import { CategoryGoodsSection } from "./_components/category-goods-section";

type CategoryPageProps = {
  category: CategoryDefinition;
};

export function CategoryPage({ category: categorySource }: CategoryPageProps) {
  const category = enrichCategory(categorySource);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CategoryHeroSection category={category} />
        <CategoryGoodsSection category={category} />
        <DeliveryMapSection />
        <CategoryTrustSection />
      </main>
      <FooterSection />
    </>
  );
}
