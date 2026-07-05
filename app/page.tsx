import { HomePage } from "@/app/home/home-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Доставка строительных и отделочных материалов из Новосибирска в Каргатский район и другие районы Новосибирской области | ИП Филина Л.В.",
  },
  description:
    "Строительные и отделочные материалы под заказ с доставкой из Новосибирска в Каргат и районы НСО: кровля, заборы, окна, двери, фасад, утеплитель, гипсокартон, пиломатериалы. Более 13 лет опыта, честные расчёты.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <HomePage />;
}
