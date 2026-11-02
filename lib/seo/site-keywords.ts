const brandKeywords = ["ИП Филина Л.В."];

const geoKeywords = [
  "Каргат",
  "Каргатский район",
  "стройматериалы в Каргате",
  "отделочные материалы в Каргате",
];

const roofingKeywords = [
  "кровля в Каргате",
  "металлочерепица в Каргате",
  "профнастил в Каргате",
];

const fenceKeywords = [
  "заборы в Каргате",
  "штакетник в Каргате",
];

const windowKeywords = ["окна в Каргате", "пластиковые окна в Каргате"];

const doorKeywords = ["двери в Каргате", "входные двери в Каргате"];

const facadeKeywords = ["сайдинг в Каргате", "фасад в Каргате"];

const insulationKeywords = ["утеплитель в Каргате"];

const drywallKeywords = ["гипсокартон в Каргате"];

const panelKeywords = ["панели в Каргате", "стеновые панели в Каргате"];

const lumberKeywords = ["пиломатериалы в Каргате"];

const forgingKeywords = [
  "кованые изделия под заказ",
  "кованая калитка",
  "ковка в Каргате",
];

const equipmentKeywords = ["хозтехника в Каргате"];

const deliveryKeywords = [
  "грузоперевозки в Каргате",
  "доставка стройматериалов в Каргат",
  "доставка отделочных материалов Каргат",
];

/** Short site-wide list for the root layout — not every product phrase. */
export const siteKeywords = [
  ...brandKeywords,
  ...geoKeywords,
  "строительные материалы в Каргате",
];

export const categoryKeywords: Record<string, string[]> = {
  roofing: roofingKeywords,
  fences: fenceKeywords,
  windows: windowKeywords,
  doors: doorKeywords,
  facade: facadeKeywords,
  insulation: insulationKeywords,
  drywall: drywallKeywords,
  "wall-panels": panelKeywords,
  lumber: lumberKeywords,
};

export const servicePageKeywords: Record<string, string[]> = {
  forging: forgingKeywords,
  equipment: equipmentKeywords,
  delivery: deliveryKeywords,
};

function uniqueKeywords(keywords: string[]): string[] {
  return [...new Set(keywords)];
}

export function keywordsForCategory(slug: string): string[] {
  return uniqueKeywords([
    ...brandKeywords,
    ...geoKeywords,
    ...(categoryKeywords[slug] ?? []),
  ]);
}

export function keywordsForService(slug: string): string[] {
  return uniqueKeywords([
    ...brandKeywords,
    ...geoKeywords,
    ...(servicePageKeywords[slug] ?? []),
  ]);
}
