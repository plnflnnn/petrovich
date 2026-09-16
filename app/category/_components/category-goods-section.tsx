import { VisualCardsSection } from "@/app/components/visual-cards-section";
import type { Category } from "@/lib/data/category";

export function CategoryGoodsSection({ category }: { category: Category }) {
  const intros = category.introParagraphs ?? [];

  return (
    <VisualCardsSection
      id="goods"
      kicker="Состав категории"
      title="Что входит в эту категорию"
      lead="Позиции из каталога — для чего применяются и в каких работах чаще всего заказывают."
      headerAfterTitle={
        intros.length > 0 ? (
          <div className="mt-6 max-w-3xl space-y-4 text-body leading-relaxed text-text-muted">
            {intros.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : undefined
      }
      items={category.goods.map((good) => ({
        title: good.title,
        body: good.body,
        image: good.image,
        imageAlt: good.imageAlt ?? `${good.title} — ${category.title}`,
        placeholderEmoji: category.emoji,
      }))}
    />
  );
}
