import { Container } from "@/app/components/ui/container";
import { SectionHeader } from "@/app/home/_components/section-header";
import { businessLines } from "@/lib/data/business-lines";
import Link from "next/link";

const homeServiceLines = businessLines.filter((l) => l.id !== "materials");

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 bg-bg py-20 sm:py-24">
      <Container>
        <div className="card-panel-soft p-6 sm:p-10 lg:p-12">
          <SectionHeader
            kicker="Услуги"
            title="Дополнительные услуги"
            lead="Помимо поставки материалов — изготовление и перевозка под заказ, детали обсуждаем индивидуально."
          />

          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {homeServiceLines.map((line) => (
              <li key={line.id}>
                <Link
                  href={line.href}
                  className="group flex h-full flex-col gap-5 rounded-card-md bg-bg-soft p-6 ring-1 ring-black/4 transition-lift duration-300 hover:bg-white hover:shadow-card-hover-sm hover:ring-accent/20 sm:p-7"
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-card-xs ring-1 ring-black/5 transition-colors group-hover:bg-accent/10"
                    aria-hidden
                  >
                    {line.emoji}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-body font-semibold leading-snug text-text">
                      {line.title}
                    </h3>
                    <p className="mt-2 text-sm-tight leading-relaxed text-text-muted">
                      {line.items.slice(0, 3).join(", ")}
                      {line.items.length > 3 ? " и др." : ""}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs-plus font-semibold text-accent transition-transform group-hover:translate-x-0.5">
                    {line.linkLabel} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
