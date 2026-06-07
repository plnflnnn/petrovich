import type { ClientRecord } from "@/lib/admin/types";

function daysAgo(days: number, hour = 12) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}

export const mockClients: ClientRecord[] = [
  {
    id: "client-1",
    name: "Виктор Панов",
    phone: "+79130001122",
    address: "Каргат, ул. Ленина, 12",
    memo: "Предпочитает доставку по субботам",
    orderCount: 3,
    lastOrderAt: daysAgo(0, 11),
    createdAt: daysAgo(90, 9),
  },
  {
    id: "client-2",
    name: "Алёна Громова",
    phone: "+79137773322",
    address: "Каргатский район, пос. Чулым",
    memo: "",
    orderCount: 1,
    lastOrderAt: daysAgo(1, 15),
    createdAt: daysAgo(1, 15),
  },
  {
    id: "client-3",
    name: "Николай Жданов",
    phone: "+79135554433",
    address: "Каргат, ул. Мира, 45",
    memo: "Заказывал профнастил для забора",
    orderCount: 2,
    lastOrderAt: daysAgo(3, 10),
    createdAt: daysAgo(45, 12),
  },
  {
    id: "client-4",
    name: "Татьяна Белова",
    phone: "+79132221100",
    address: "Каргат, ул. Садовая, 8",
    memo: "Постоянный клиент, скидка обсуждается отдельно",
    orderCount: 5,
    lastOrderAt: daysAgo(6, 14),
    createdAt: daysAgo(200, 8),
  },
  {
    id: "client-5",
    name: "Роман Ефимов",
    phone: "+79136668899",
    address: "",
    memo: "",
    orderCount: 1,
    lastOrderAt: daysAgo(12, 16),
    createdAt: daysAgo(12, 16),
  },
  {
    id: "client-6",
    name: "Ирина Шестакова",
    phone: "+79131117766",
    address: "Каргат, ул. Пушкина, 3",
    memo: "Интересовалась коваными воротами",
    orderCount: 2,
    lastOrderAt: daysAgo(28, 13),
    createdAt: daysAgo(60, 11),
  },
  {
    id: "client-7",
    name: "Андрей Климов",
    phone: "+79134442211",
    address: "Чулымский район, д. Новая",
    memo: "",
    orderCount: 4,
    lastOrderAt: daysAgo(80, 9),
    createdAt: daysAgo(150, 10),
  },
];
