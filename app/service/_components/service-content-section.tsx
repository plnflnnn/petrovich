import { VisualCardsSection } from "@/app/components/visual-cards-section";
import type { Service } from "@/lib/data/service";
import {
  getServiceGalleryCards,
  serviceImages,
} from "@/lib/data/site-images";

export function ServiceContentSection({ service }: { service: Service }) {
  const imgs = serviceImages[service.slug as keyof typeof serviceImages];
  const gallery = imgs?.gallery;

  if (!gallery) {
    return null;
  }

  const cards = getServiceGalleryCards(
    service.slug as keyof typeof serviceImages,
    service.offerings,
  );

  const bodyParagraphs = [
    ...service.paragraphs,
    ...service.closingParagraphs,
  ];

  return (
    <VisualCardsSection
      id="offerings"
      kicker={gallery.kicker}
      title={gallery.title}
      lead={gallery.lead}
      headerAfterTitle={
        <div className="space-y-4 text-body leading-relaxed text-text-muted">
          {bodyParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      }
      items={cards}
    />
  );
}
