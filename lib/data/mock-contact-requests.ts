import type { ContactRequestRecord } from "@/lib/admin/types";

function daysAgo(days: number, hour = 12) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hour, 30, 0, 0);
  return date.toISOString();
}

export const mockContactRequests: ContactRequestRecord[] = [
  {
    id: "req-1",
    name: "Анна Смирнова",
    phone: "+79130001234",
    comment: "Нужна консультация по забору из профнастила",
    district: "Каргатский район",
    source: "home-contact",
    createdAt: daysAgo(0, 10),
  },
  {
    id: "req-2",
    name: "Игорь Волков",
    phone: "+79137774567",
    comment: "Интересуют окна ПВХ для дачи",
    district: "Каргат",
    source: "request-modal",
    createdAt: daysAgo(0, 15),
  },
  {
    id: "req-3",
    name: "Мария Кузнецова",
    phone: "+79135559876",
    comment: "Расчёт кровли на дом 8×10",
    district: "Чулымский район",
    source: "category-roofing",
    createdAt: daysAgo(1, 9),
  },
  {
    id: "req-4",
    name: "Пётр Лебедев",
    phone: "+79132223344",
    comment: "",
    district: "Каргатский район",
    source: "home-contact",
    createdAt: daysAgo(2, 14),
  },
  {
    id: "req-5",
    name: "Елена Орлова",
    phone: "+79136667788",
    comment: "Нужна доставка пиломатериалов",
    district: "Каргат",
    source: "service-delivery",
    createdAt: daysAgo(4, 11),
  },
  {
    id: "req-6",
    name: "Дмитрий Соколов",
    phone: "+79131112233",
    comment: "Кованые ворота, нужен замер",
    district: "Каргатский район",
    source: "service-forging",
    createdAt: daysAgo(10, 16),
  },
  {
    id: "req-7",
    name: "Ольга Новикова",
    phone: "+79134445566",
    comment: "Фасадные панели, образцы",
    district: "Чулым",
    source: "category-facade",
    createdAt: daysAgo(35, 13),
  },
  {
    id: "req-8",
    name: "Сергей Морозов",
    phone: "+79139990011",
    comment: "Утепление стен под ключ",
    district: "Каргатский район",
    source: "category-insulation",
    createdAt: daysAgo(120, 10),
  },
];
