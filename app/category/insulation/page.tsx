import { CategoryPage } from "@/app/category/category-page";
import { categoryMetadata } from "@/app/category/_lib/category-metadata";

export const category = {
  slug: "insulation",
  emoji: "🧊",
  title: "Изоляция и утепление",
  heroKicker: "Категория · Теплоизоляция",
  heroLead:
    "Утеплители для стен, кровли и полов — дом сохраняет тепло зимой и прохладу летом, расходы на отопление снижаются.",
  goods: [
    {
      title: "Утеплители",
      body: "Общее направление для стен, кровли и полов — снижают теплопотери и расходы на отопление.",
    },
    {
      title: "Минеральная вата",
      body: "Применяют в каркасных стенах, под кровлей и между этажами — негорючий материал с хорошей звукоизоляцией.",
    },
    {
      title: "Пенопласт",
      body: "Утепляют фасады, цоколь и полы — лёгкий материал с низкой теплопроводностью.",
    },
    {
      title: "Пеноплекс",
      body: "Экструдированный пенополистирол — для фундамента, полов под стяжку, отмостки и влажных зон.",
    },
  ],
  priceItems: [
    {
      id: "minvata",
      title: "Минеральная вата",
      hint: "за м²",
      fromValue: 220,
      unit: "₽/м²",
    },
    {
      id: "penoplast",
      title: "Пенопласт",
      hint: "за м³",
      fromValue: 2200,
      unit: "₽/м³",
    },
    {
      id: "penoplex",
      title: "Пеноплекс",
      hint: "за м²",
      fromValue: 540,
      unit: "₽/м²",
    },
  ],
  meta: {
    title: "Изоляция и утепление — доставка из Новосибирска | ИП Филина Л.В.",
    description:
      "Утеплители, минеральная вата, пенопласт и пеноплекс. Доставка из Новосибирска в Каргатский район под заказ.",
  },
};

export const metadata = categoryMetadata(category);

export default function InsulationCategoryPage() {
  return <CategoryPage category={category} />;
}
