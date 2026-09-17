import { CategoryPage } from "@/app/category/category-page";
import { categoryMetadata } from "@/app/category/_lib/category-metadata";

export const category = {
  slug: "fences",
  emoji: "🚧",
  title: "Заборы и ограждения",
  heroKicker: "Категория · Заборы",
  heroLead:
    "Красивый и прочный забор защищает территорию и подчёркивает внешний вид участка. Поставляем материалы для ограждений из Новосибирска.",
  introParagraphs: [
    "Металлический штакетник, профнастил, ворота и калитки — подберём под длину и рельеф участка. Доставка в Каргат и район из Новосибирска.",
  ],
  goods: [
    {
      title: "Металлический штакетник",
      body: "Для декоративных и прочных заборов на участке — удобен при неровном рельефе, хорошо смотрится с обеих сторон.",
    },
    {
      title: "Профнастил для ограждений",
      body: "Сплошное ограждение территории — часто выбирают для дач, частных домов и хозяйственных зон.",
    },
    {
      title: "Чёрный металл",
      body: "Лист и профиль для сварных и сборных ограждений — под заказ под размеры и конфигурацию участка.",
    },
  ],
  priceItems: [
    {
      id: "shtaketnik",
      title: "Металлический штакетник",
      hint: "за шт",
      fromValue: 78,
      unit: "₽/шт",
    },
    {
      id: "profnastil-fence",
      title: "Профнастил для ограждений",
      hint: "за м²",
      fromValue: 520,
      unit: "₽/м²",
    },
    {
      id: "gates",
      title: "Ворота и калитки",
      hint: "от",
      fromValue: 8500,
      unit: "₽/комплект",
    },
  ],
  meta: {
    title: "Заборы в Каргате — штакетник и профнастил с доставкой | ИП Филина Л.В.",
    description:
      "Заборы в Каргате: металлический штакетник, профнастил, ворота и калитки. Доставка забора в Каргат из Новосибирска.",
  },
};

export const metadata = categoryMetadata(category);

export default function FencesCategoryPage() {
  return <CategoryPage category={category} />;
}
