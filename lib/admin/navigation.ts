export const adminNavItems = [
  {
    href: "/admin/requests",
    label: "Список заявок",
    description: "Обращения с сайта",
  },
  {
    href: "/admin/clients",
    label: "Список клиентов",
    description: "Клиенты с заказами",
  },
  {
    href: "/admin/price-markup",
    label: "Наценка на прайс",
    description: "Обновление цен в Excel",
  },
  {
    href: "/admin/file-converter",
    label: "Конвертер файлов",
    description: "CSV, Excel, Word, PDF",
  },
] as const;
