import { CategoryPage } from "@/app/category/category-page";
import { categoryMetadata } from "@/app/category/_lib/category-metadata";

export const category = {
  slug: "wall-panels",
  emoji: "🧱",
  title: "Панели",
  heroKicker: "Категория · Панели",
  heroLead:
    "Панели для внутренней отделки стен — акцентные поверхности и быстрый монтаж без длительных мокрых работ.",
  introParagraphs: [
    "Стеновые панели под заказ — декоративные и практичные варианты, плинтусы и доборные элементы. Доставка в Каргат и район из Новосибирска.",
  ],
  goods: [
    {
      title: "Панели для стен",
      body: "Декоративные и практичные панели — для быстрой отделки без длительных «мокрых» работ.",
    },
  ],
  priceItems: [
    {
      id: "wall-panels",
      title: "Панели для стен",
      hint: "за м²",
      fromValue: 720,
      unit: "₽/м²",
    },
    {
      id: "wall-trim",
      title: "Плинтусы и доборные элементы",
      hint: "за пог. м",
      fromValue: 180,
      unit: "₽/пог. м",
    },
    {
      id: "wall-custom",
      title: "Панели под заказ",
      hint: "цена",
      fromValue: 0,
      unit: "по запросу",
    },
  ],
  meta: {
    title: "Панели Каргат — стеновые панели с доставкой | ИП Филина Л.В.",
    description:
      "Панели Каргат: стеновые панели для внутренней отделки. Доставка панелей в Каргат из Новосибирска.",
  },
};

export const metadata = categoryMetadata(category);

export default function WallPanelsCategoryPage() {
  return <CategoryPage category={category} />;
}
