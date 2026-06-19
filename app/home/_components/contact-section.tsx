import { WorkingHoursList } from "@/app/components/working-hours-list";
import { Container } from "@/app/components/ui/container";
import { SectionHeader } from "@/app/home/_components/section-header";
import { siteHeaderContent } from "@/app/home/_components/site-header-content";
import { ContactForm } from "./contact-form";

const contactChannels = [
  {
    id: "phone",
    emoji: "📞",
    label: "Телефон",
    content: (
      <a
        href={`tel:${siteHeaderContent.phoneTel}`}
        className="text-lg-tight font-semibold tabular-nums tracking-tight text-text transition-colors hover:text-accent"
      >
        {siteHeaderContent.phoneDisplay}
      </a>
    ),
    hint: `Позвоните в рабочие часы — ${siteHeaderContent.workingHoursSummary}`,
  },
  {
    id: "office",
    emoji: "📍",
    label: "Офис в Каргате",
    content: (
      <p className="text-sm-plus font-semibold leading-snug text-text">
        {siteHeaderContent.officeAddress}
      </p>
    ),
    hint: "Можно забрать заказ в офисе, если доставка до адреса не нужна",
  },
  {
    id: "hours",
    emoji: "🕐",
    label: "Режим работы",
    content: <WorkingHoursList />,
    hint: "Заявки с сайта принимаем в любое время — ответим в рабочие часы",
  },
] as const;

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-bg-soft pb-20 pt-20 sm:pb-24 sm:pt-24">
      <Container>
        <div className="overflow-hidden rounded-card-lg bg-white p-6 shadow-card-md ring-1 ring-black/3 sm:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-14">
            <div>
              <SectionHeader
                align="left"
                kicker="Контакты"
                title="Свяжитесь с нами"
                lead="Перезвоним, ответим на вопросы и поможем с подбором материалов или услуги."
              />

              <ul className="mt-8 space-y-3">
                {contactChannels.map((channel) => (
                  <li
                    key={channel.id}
                    className="flex gap-3.5 rounded-card-sm bg-bg-soft p-4 ring-1 ring-black/4 sm:p-5"
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-card-xs ring-1 ring-black/5"
                      aria-hidden
                    >
                      {channel.emoji}
                    </span>
                    <div className="min-w-0">
                      <p className="text-caption font-semibold uppercase tracking-kicker-sm text-accent">
                        {channel.label}
                      </p>
                      <div className="mt-1.5">{channel.content}</div>
                      <p className="mt-2 text-xs-plus leading-relaxed text-text-muted">
                        {channel.hint}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="contact-form"
              className="scroll-mt-28 rounded-card-md bg-bg-soft p-6 ring-1 ring-black/4 sm:p-8"
            >
              <p className="text-caption font-semibold uppercase tracking-kicker-sm text-accent">
                Заявка на сайте
              </p>
              <h3 className="mt-2 text-xl-tight font-semibold tracking-tight text-text">
                Оставить заявку
              </h3>
              <p className="mt-2 text-sm-tight leading-relaxed text-text-muted">
                Заполните форму — мы свяжемся с вами в рабочие часы (
                {siteHeaderContent.workingHoursSummary}).
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        {/* <CtaBandPanel className="mt-8" showBody={false} /> */}
      </Container>
    </section>
  );
}
