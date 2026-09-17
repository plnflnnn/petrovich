import { CategoryPage } from "@/app/category/category-page";
import { categoryMetadata } from "@/app/category/_lib/category-metadata";

export const category = {
  slug: "drywall",
  emoji: "📐",
  title: "Гипсокартон",
  heroKicker: "Категория · Гипсокартон",
  heroLead:
    "Листы ГКЛ и комплектующие для перегородок, выравнивания стен и потолков — под заказ с доставкой из Новосибирска.",
  introParagraphs: [
    "Листы, профили и комплектующие для перегородок и отделки — подберём под ваш проект. Доставка в Каргат и район из Новосибирска.",
  ],
  goods: [
    {
      title: "Гипсокартон",
      body: "Листы ГКЛ и ГКЛВ — для обшивки стен и потолков, выравнивания поверхностей под финишную отделку.",
    },
    {
      title: "Профили для ГКЛ",
      body: "Направляющие и стоечные профили — каркас для перегородок, облицовки и потолочных конструкций.",
    },
  ],
  priceItems: [
    {
      id: "gkl",
      title: "Гипсокартон",
      hint: "за лист",
      fromValue: 420,
      unit: "₽/лист",
    },
    {
      id: "gkl-profiles",
      title: "Профили для ГКЛ",
      hint: "за пог. м",
      fromValue: 95,
      unit: "₽/пог. м",
    },
    {
      id: "gkl-custom",
      title: "Комплектующие для ГКЛ",
      hint: "цена",
      fromValue: 0,
      unit: "по запросу",
    },
  ],
  meta: {
    title: "Гипсокартон в Каргате — листы и профили с доставкой | ИП Филина Л.В.",
    description:
      "Гипсокартон в Каргате: листы, профили и комплектующие. Доставка гипсокартона в Каргат из Новосибирска.",
  },
};

export const metadata = categoryMetadata(category);

export default function DrywallCategoryPage() {
  return <CategoryPage category={category} />;
}
