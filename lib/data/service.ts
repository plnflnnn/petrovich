import type { SiteImage } from "@/lib/data/site-images";

export type Service = {
  slug: string;
  emoji: string;
  title: string;
  shortDescription: string;
  heroKicker: string;
  heroLead: string;
  heroImage: string;
  heroImageAlt: string;
  heroSlides: SiteImage[];
  paragraphs: string[];
  offerings: string[];
  closingParagraphs: string[];
  meta: { title: string; description: string };
};

export type ServiceDefinition = Omit<
  Service,
  "heroImage" | "heroImageAlt" | "heroSlides"
>;
