export const officeCoords = {
  lon: 80.286982,
  lat: 55.179272,
} as const;

export const yandexOrgId = "239928258122";
const yandexHost = "yandex.ru";

export function buildYandexMapEmbedUrl(zoom = 16): string {
  const { lon, lat } = officeCoords;
  const marker = encodeURIComponent(`${lon},${lat},pm2gnm`);
  return `https://${yandexHost}/map-widget/v1/?ll=${lon}%2C${lat}&z=${zoom}&l=map&pt=${marker}`;
}

export function buildYandexMapFullUrl(): string {
  return `https://${yandexHost}/maps/org/${yandexOrgId}/`;
}

/** Lightweight static preview while the interactive widget loads. */
export function buildYandexStaticMapUrl(width = 900, height = 600, zoom = 16): string {
  const { lon, lat } = officeCoords;
  return `https://static-maps.yandex.ru/1.x/?lang=ru_RU&ll=${lon},${lat}&size=${width},${height}&z=${zoom}&l=map&pt=${lon},${lat},pm2gnm`;
}
