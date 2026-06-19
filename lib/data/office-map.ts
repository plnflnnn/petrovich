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
