import { CategoryPage } from "@/app/category/category-page";
import { categoryMetadata } from "@/app/category/_lib/category-metadata";

export const category = {
  slug: "doors",
  emoji: "🚪",
  title: "Двери",
  heroKicker: "Категория · Двери",
  heroLead:
    "Надёжные двери обеспечивают безопасность, тепло и комфорт в доме и на даче.",
  goods: [
    {
      title: "Входные двери",
      body: "Металлические утеплённые двери — для защиты дома, дачи или коттеджа от холода, шума и взлома.",
    },
    {
      title: "Межкомнатные двери",
      body: "Для зонирования комнат внутри дома — подбираются под стиль интерьера и размер проёма.",
    },
    {
      title: "Комплектующие и фурнитура",
      body: "Петли, ручки, замки, наличники — для монтажа и замены дверей, уточняйте комплектацию по телефону.",
    },
  ],
  priceItems: [
    {
      id: "entry-door",
      title: "Входная дверь",
      hint: "за шт",
      fromValue: 16900,
      unit: "₽/шт",
    },
    {
      id: "interior-door",
      title: "Межкомнатная дверь",
      hint: "за шт",
      fromValue: 4900,
      unit: "₽/шт",
    },
    {
      id: "door-hardware",
      title: "Фурнитура и комплектующие",
      hint: "от",
      fromValue: 350,
      unit: "₽/комплект",
    },
  ],
  meta: {
    title: "Двери — доставка из Новосибирска | ИП Филина",
    description:
      "Входные и межкомнатные двери, фурнитура и комплектующие. Доставка из Новосибирска в Каргатский район под заказ.",
  },
};

export const metadata = categoryMetadata(category);

export default function DoorsCategoryPage() {
  return <CategoryPage category={category} />;
}
