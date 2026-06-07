import { CategoryPage } from "@/app/category/category-page";
import { categoryMetadata } from "@/app/category/_lib/category-metadata";

export const category = {
  slug: "facade",
  emoji: "🏡",
  title: "Фасад и внешняя отделка",
  heroKicker: "Категория · Фасад",
  heroLead:
    "Фасад — первое, что видят гости и прохожие. Современные отделочные материалы позволяют защитить стены и придать зданию привлекательный внешний вид.",
  goods: [
    {
      title: "Сайдинг",
      body: "Виниловый или металлический сайдинг обшивают стены — защищает фасад от влаги, мороза и выгорания.",
    },
    {
      title: "Фасадные панели",
      body: "Крупноформатные панели для быстрой отделки — подходят для новых домов и обновления старого фасада.",
    },
    {
      title: "Доборные элементы",
      body: "Углы, J- и H-профили, отливы — завершают монтаж и закрывают стыки облицовки.",
    },
  ],
  priceItems: [
    {
      id: "siding",
      title: "Сайдинг",
      hint: "за м²",
      fromValue: 680,
      unit: "₽/м²",
    },
    {
      id: "facade-panels",
      title: "Фасадные панели",
      hint: "за м²",
      fromValue: 920,
      unit: "₽/м²",
    },
    {
      id: "trim",
      title: "Доборные элементы",
      hint: "за пог. м",
      fromValue: 240,
      unit: "₽/пог. м",
    },
  ],
  meta: {
    title: "Фасад и внешняя отделка — доставка из Новосибирска | ИП Филина Л.В.",
    description:
      "Сайдинг, фасадные панели и доборные элементы. Доставка из Новосибирска в Каргатский район под заказ.",
  },
};

export const metadata = categoryMetadata(category);

export default function FacadeCategoryPage() {
  return <CategoryPage category={category} />;
}
