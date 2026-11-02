import { HomePage } from "@/app/home/home-page";
import { siteKeywords } from "@/lib/seo/site-keywords";
import type { Metadata } from "next";

const homeTitle =
  "Строительные и отделочные материалы в Каргате — кровля, заборы, окна, двери | ИП Филина Л.В.";
const homeDescription =
  "Строительные и отделочные материалы в Каргате и Каргатском районе: кровля, заборы, окна, двери, сайдинг, утеплитель, гипсокартон, панели, пиломатериалы. Доставка из Новосибирска. Более 13 лет опыта.";

export const metadata: Metadata = {
  title: {
    absolute: homeTitle,
  },
  description: homeDescription,
  keywords: siteKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
};

export default function Page() {
  return <HomePage />;
}
