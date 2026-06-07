import { RequestModalButton } from "@/app/components/request-modal/request-modal-button";
import { Container } from "@/app/components/ui/container";
import { YandexMapEmbed } from "@/app/home/_components/yandex-map-embed";
import { siteHeaderContent } from "@/app/home/_components/site-header-content";

const NSK_COORDS = "82.9204,55.0302";
const OFFICE_COORDS = "80.286982,55.179272";
const MAP_CENTER = "81.604%2C55.115";
const MAP_ZOOM = "8";
const MAP_MARKERS = `${encodeURIComponent(`${NSK_COORDS},pm2blm`)}~${encodeURIComponent(`${OFFICE_COORDS},pm2gnm`)}`;
const YANDEX_BUSINESS_ID = "239928258122";
const YANDEX_HOST = "yandex.ru";
const MAP_EMBED_URL = `https://${YANDEX_HOST}/map-widget/v1/?ll=${MAP_CENTER}&z=${MAP_ZOOM}&l=map&pt=${MAP_MARKERS}`;
const MAP_FULL_URL = `https://${YANDEX_HOST}/maps/org/${YANDEX_BUSINESS_ID}/`;
const OPEN_MAP_LABEL = "Открыть в Яндекс Картах";
const MAP_CAPTION = "Новосибирск → Каргатский район";

export function DeliveryMapSection({
  sectionId = "zone",
}: {
  sectionId?: string;
}) {
  return (
    <section id={sectionId} className="scroll-mt-24 bg-bg py-20 sm:py-24">
      <Container>
        <div className="text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-snug-plus tracking-tightest text-text sm:text-hero">
            Зона доставки
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg-grid-split lg:items-stretch">
          <article className="flex h-full flex-col rounded-card-lg bg-white p-7 shadow-card-sm ring-1 ring-black/3 sm:p-9">
            <div className="inline-flex items-center gap-2">
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent"
                aria-hidden
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2 L4 7 V17 L12 22 L20 17 V7 Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-sm font-semibold tracking-tight text-text">
                {siteHeaderContent.siteName}
              </span>
            </div>

            <p className="mt-6 max-w-md text-body leading-relaxed text-text-muted">
              «Осуществляем доставку из Новосибирска по Каргатскому району и близлежащим населённым пунктам. Сроки и условия доставки зависят от объёма и типа груза.»
            </p>

            <div className="mt-4 flex max-w-md flex-col gap-2">
              <div className="flex items-start gap-2 rounded-xl bg-bg-soft px-3 py-2 text-xs-plus leading-snug text-text/80 ring-1 ring-black/4">
                <span aria-hidden className="mt-px text-sm-tight">
                  📍
                </span>
                <span>
                  Возим не только в Каргатский, но и в другие районы Новосибирской области — по договорённости.
                </span>
              </div>
              <div className="flex items-start gap-2 rounded-xl bg-bg-soft px-3 py-2 text-xs-plus leading-snug text-text/80 ring-1 ring-black/4">
                <span aria-hidden className="mt-px text-sm-tight">
                  📦
                </span>
                <span>
                  Не нужна доставка до адреса? Привезём ваш заказ в наш офис в Каргате — заберёте, когда будет удобно.
                </span>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
              <div>
                <p className="text-caption font-semibold uppercase tracking-kicker-sm text-accent">
                  Наш офис в Каргате
                </p>
                <p className="mt-1 text-sm-tight font-semibold leading-tight text-text">
                  г. Каргат, ул. Ленина, 147
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  {MAP_CAPTION}
                </p>
              </div>
              <RequestModalButton variant="primary" />
            </div>
          </article>

          <div className="h-full overflow-hidden rounded-card-lg bg-white shadow-card-sm ring-1 ring-black/3">
            <div className="relative aspect-use-case w-full bg-bg-soft sm:aspect-map">
              <YandexMapEmbed src={MAP_EMBED_URL} title={MAP_CAPTION} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-4">
              <p className="text-xs text-text-muted">
                {MAP_CAPTION}
              </p>
              <a
                href={MAP_FULL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              >
                {OPEN_MAP_LABEL}
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
