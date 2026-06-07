import { VisualCardsSection } from "@/app/components/visual-cards-section";
import type { Category } from "@/lib/data/category";

export function CategoryGoodsSection({ category }: { category: Category }) {
  return (
    <VisualCardsSection
      id="goods"
      kicker="Состав категории"
      title="Что входит в эту категорию"
      lead="Позиции из каталога — для чего применяются и в каких работах чаще всего заказывают."
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
