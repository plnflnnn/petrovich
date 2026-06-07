import type { SiteImage } from "@/lib/data/site-images";

export type CategoryGood = {
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
};

/** Category data from page modules before `enrichCategory` adds images. */
export type CategoryDefinition = Omit<Category, "heroSlides">;

export type Category = {
  slug: string;
  emoji: string;
  title: string;
  heroKicker: string;
  heroLead: string;
  heroSlides: SiteImage[];
  goods: CategoryGood[];
  priceItems: Array<{
    id: string;
    title: string;
    hint: string;
    fromValue: number;
    unit: string;
  }>;
  meta: { title: string; description: string };
};
