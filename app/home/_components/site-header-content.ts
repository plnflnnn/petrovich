import { businessLines } from "@/lib/data/business-lines";

const forgingLine = businessLines.find((l) => l.id === "forging")!;
const equipmentLine = businessLines.find((l) => l.id === "equipment")!;
const transportLine = businessLines.find((l) => l.id === "transport")!;

export const siteHeaderContent = {
  /** Short label in the header next to the logo. */
  siteName: "ИП Филина Л.В.",
  /** Public site name used in metadata, footer, and content blocks. */
  publicSiteName: "Строительные и отделочные материалы под заказ",
  legalName: "ИП Филина Л.В.",
  inn: "542305896546",
  ogrnip: "313548502300064",
  nav: {
    items: [
      { label: "Главная", href: "/", kind: "page" as const },
      { label: "Категории", href: "#categories", kind: "categories" as const },
      { label: "Услуги", href: "#services", kind: "services" as const },
      { label: "Доставка", href: transportLine.href, kind: "page" as const },
      { label: "Контакты", href: "#contact", kind: "anchor" as const },
    ],
    phoneLabel: "Позвонить",
    cta: "Оставить заявку",
    categoriesMenuLabel: "Материалы",
    servicesMenuLabel: "Услуги",
  },
  phoneDisplay: "8-913-000-59-59",
  phoneTel: "+79130005959",
  email: "filin_gruz@mail.ru",
  officeAddress: "г. Каргат, ул. Ленина, 147",
  workingHours: [
    { days: "Пн — Пт", hours: "10:00–15:00" },
    { days: "Сб — Вс", hours: "Выходной" },
  ] as const,
  workingHoursSummary: "Пн–Пт, 10:00–15:00",
  categories: {
    items: [
      {
        title: "Кровля и водосточные системы",
        slug: "roofing",
        description: "Кровельные материалы, профнастил, водосток и доборные элементы.",
      },
      {
        title: "Заборы и ограждения",
        slug: "fences",
        description: "Штакетник, профнастил, чёрный металл, ворота и калитки.",
      },
      {
        title: "Окна",
        slug: "windows",
        description: "Пластиковые окна и комплектующие.",
      },
      {
        title: "Двери",
        slug: "doors",
        description: "Входные и межкомнатные двери, фурнитура.",
      },
      {
        title: "Фасад и внешняя отделка",
        slug: "facade",
        description: "Сайдинг, фасадные панели и доборные элементы.",
      },
      {
        title: "Изоляция и утепление",
        slug: "insulation",
        description: "Утеплители, минеральная вата, пенопласт и пеноплекс.",
      },
      {
        title: "Гипсокартон",
        slug: "drywall",
        description: "Листы ГКЛ, профили и комплектующие для перегородок.",
      },
      {
        title: "Панели",
        slug: "wall-panels",
        description: "Панели для внутренней отделки под заказ.",
      },
      {
        title: "Пиломатериалы и древесина",
        slug: "lumber",
        description: "Доска, брус, дерево для пола и пиломатериалы под заказ.",
      },
    ],
  },
  services: {
    items: [
      {
        title: forgingLine.title,
        slug: "forging",
        description: forgingLine.items.slice(0, 3).join(", ") + " и др.",
      },
      {
        title: equipmentLine.title,
        slug: "equipment",
        description: equipmentLine.items[0],
      },
      {
        title: transportLine.title,
        slug: "delivery",
        description: transportLine.items.slice(0, 2).join(", ") + " и др.",
      },
    ],
  },
};
