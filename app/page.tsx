import { HomePage } from "@/app/home/home-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Доставка строительных и отделочных материалов из Новосибирска в Каргатский район и другие районы Новосибирской области | ИП Филина Л.В.",
  },
  description:
    "Быстро, надёжно и по понятным расчётам.",
};

export default function Page() {
  return <HomePage />;
}
