import { deliveryPath, homeAnchor, servicePath } from "@/lib/utils/routes";

export type BusinessLine = {
  id: string;
  emoji: string;
  title: string;
  items: string[];
  href: string;
  linkLabel: string;
};

export const businessLines: BusinessLine[] = [
  {
    id: "materials",
    emoji: "🏠",
    title: "Строительные и отделочные материалы",
    items: [
      "Кровельные материалы",
      "Профнастил",
      "Штакетник",
      "Сайдинг и панели",
      "Утеплитель",
      "Гипсокартон",
      "Панели",
      "Дерево для пола",
      "Окна и двери",
    ],
    href: homeAnchor("#categories"),
    linkLabel: "Смотреть категории",
  },
  {
    id: "forging",
    emoji: "⚒️",
    title: "Кованые изделия ручной работы",
    items: [
      "Заборы",
      "Ворота",
      "Калитки",
      "Декоративные элементы",
      "Подставки для цветов",
      "Арки",
    ],
    href: servicePath("forging"),
    linkLabel: "Подробнее о ковке",
  },
  {
    id: "equipment",
    emoji: "🚜",
    title: "Хозяйственная техника под заказ",
    items: [
      "Тракторы и техника для хозяйственных работ",
      "Оборудование для уборки снега",
      "Техника для обработки земли",
      "Решения под индивидуальные задачи",
    ],
    href: servicePath("equipment"),
    linkLabel: "Подробнее о технике",
  },
  {
    id: "transport",
    emoji: "🚚",
    title: "Грузоперевозки в Каргате",
    items: [
      "Доставка строительных материалов в Каргат",
      "Перевозка мебели по Каргатскому району",
      "Перевозка оборудования",
      "Грузоперевозки по договорённости по НСО",
    ],
    href: deliveryPath,
    linkLabel: "Грузоперевозки в Каргате",
  },
];
