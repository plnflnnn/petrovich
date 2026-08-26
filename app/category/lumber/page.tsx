import { CategoryPage } from "@/app/category/category-page";
import { categoryMetadata } from "@/app/category/_lib/category-metadata";

export const category = {
  slug: "lumber",
  emoji: "🪵",
  title: "Пиломатериалы и древесина",
  heroKicker: "Категория · Древесина",
  heroLead:
    "Доска, брус и дерево для пола — натуральные пиломатериалы для строительства и отделки под заказ из Новосибирска.",
  goods: [
    {
      title: "Доска",
      body: "Обрезная доска — для обрешётки, настила, опалубки, хозпостроек и отделочных работ.",
    },
    {
      title: "Брус",
      body: "Строительный и строганный брус — для каркаса, стен бани, беседки, навеса и других конструкций.",
    },
    {
      title: "Дерево для пола",
      body: "Доска и брус для полов в доме, бане или хозблоке — под подстилку или чистовое покрытие по проекту.",
    },
    {
      title: "Пиломатериалы под заказ",
      body: "Нестандартное сечение, порода и объём — привозим из Новосибирска, согласуем сроки и расчёт.",
    },
  ],
  priceItems: [
    {
      id: "board",
      title: "Доска",
      hint: "за м³",
      fromValue: 12000,
      unit: "₽/м³",
    },
    {
      id: "timber",
      title: "Брус",
      hint: "за м³",
      fromValue: 14500,
      unit: "₽/м³",
    },
    {
      id: "floor-wood",
      title: "Дерево для пола",
      hint: "цена",
      fromValue: 0,
      unit: "по запросу",
    },
    {
      id: "custom-lumber",
      title: "Пиломатериалы под заказ",
      hint: "цена",
      fromValue: 0,
      unit: "по запросу",
    },
  ],
  meta: {
    title: "Пиломатериалы Каргат — доска и брус с доставкой | ИП Филина Л.В.",
    description:
      "Пиломатериалы в Каргате: доска, брус, дерево для пола под заказ. Доставка из Новосибирска в Каргатский район.",
  },
};

export const metadata = categoryMetadata(category);

export default function LumberCategoryPage() {
  return <CategoryPage category={category} />;
}
