import { CategoryPage } from "@/app/category/category-page";
import { categoryMetadata } from "@/app/category/_lib/category-metadata";

export const category = {
  slug: "windows",
  emoji: "🪟",
  title: "Окна",
  heroKicker: "Категория · Окна",
  heroLead:
    "Качественные окна обеспечивают тепло, комфорт и защиту от шума в доме.",
  introParagraphs: [
    "Подберём пластиковые окна под размер проёма — стандарт и нестандарт, с фурнитурой и комплектующими. Доставка в Каргат и район из Новосибирска по договорённости.",
  ],
  goods: [
    {
      title: "Пластиковые окна",
      body: "Для домов, дач и квартир — сохраняют тепло, снижают шум с улицы, подбираются под размер проёма и тип открывания.",
    },
    {
      title: "Комплектующие и фурнитура",
      body: "Ручки, петли, уплотнители, москитные сетки — для установки, ремонта и обслуживания окон.",
    },
  ],
  priceItems: [
    {
      id: "pvc-window",
      title: "Пластиковое окно",
      hint: "за шт",
      fromValue: 9800,
      unit: "₽/шт",
    },
    {
      id: "window-hardware",
      title: "Фурнитура и комплектующие",
      hint: "от",
      fromValue: 450,
      unit: "₽/комплект",
    },
    {
      id: "window-custom",
      title: "Окно нестандартного размера",
      hint: "за шт",
      fromValue: 12500,
      unit: "₽/шт",
    },
  ],
  meta: {
    title: "Окна Каргат — пластиковые окна с доставкой | ИП Филина Л.В.",
    description:
      "Окна Каргат: пластиковые окна и комплектующие. Доставка окон в Каргат и Каргатский район из Новосибирска.",
  },
};

export const metadata = categoryMetadata(category);

export default function WindowsCategoryPage() {
  return <CategoryPage category={category} />;
}
