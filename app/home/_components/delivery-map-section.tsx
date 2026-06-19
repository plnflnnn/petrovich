import { RequestModalButton } from "@/app/components/request-modal/request-modal-button";
import { SiteLogo } from "@/app/components/site-logo";
import { WorkingHoursList } from "@/app/components/working-hours-list";
import { Container } from "@/app/components/ui/container";
import { buildYandexMapEmbedUrl, buildYandexMapFullUrl } from "@/lib/data/office-map";
import { YandexMapEmbed } from "@/app/home/_components/yandex-map-embed";
import { siteHeaderContent } from "@/app/home/_components/site-header-content";

const MAP_EMBED_URL = buildYandexMapEmbedUrl();
const MAP_FULL_URL = buildYandexMapFullUrl();
const OPEN_MAP_LABEL = "Открыть в Яндекс Картах";
const DELIVERY_ZONE_NOTE = "Доставка из Новосибирска по Каргатскому району";

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
            <div className="inline-flex items-center gap-2.5">
              <SiteLogo size={28} className="shrink-0" />
              <span className="text-sm font-semibold tracking-tight text-text">
                {siteHeaderContent.legalName}
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
                  {siteHeaderContent.officeAddress}
                </p>
                <WorkingHoursList className="mt-2 max-w-xs" />
                <p className="mt-2 text-xs text-text-muted">
                  {DELIVERY_ZONE_NOTE}
                </p>
              </div>
              <RequestModalButton variant="primary" />
            </div>
          </article>

          <div className="h-full overflow-hidden rounded-card-lg bg-white shadow-card-sm ring-1 ring-black/3">
            <div className="relative aspect-map w-full bg-bg-soft">
              <YandexMapEmbed
                embedUrl={MAP_EMBED_URL}
                title={siteHeaderContent.officeAddress}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-4">
              <p className="text-xs text-text-muted">
                {siteHeaderContent.officeAddress}
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
