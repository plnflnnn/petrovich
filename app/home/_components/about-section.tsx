import { Container } from "@/app/components/ui/container";
import { aboutContent } from "@/lib/data/about";

export function AboutSection() {
  const { headline } = aboutContent;

  return (
    <section
      id="about"
      className="scroll-mt-24 bg-bg-soft py-20 sm:py-24"
    >
      <Container>
        <div className="card-panel-soft overflow-hidden p-6 sm:p-10 lg:p-14">
          <header className="mx-auto max-w-3xl text-center">
            <p className="badge-kicker">{aboutContent.kicker}</p>
            <h2 className="section-title mt-6 text-balance">
              {headline.before}{" "}
              <span className="section-title-em">{headline.highlight}</span>{" "}
              {headline.after}
            </h2>
          </header>

          <div className="mx-auto mt-10 max-w-4xl space-y-5 body-lg">
            {aboutContent.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <figure className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-card-sm bg-accent/8 px-6 py-6 text-center ring-1 ring-accent/15 sm:px-10 sm:py-8">
            <blockquote className="font-display text-lg leading-relaxed text-text italic sm:text-xl-tight">
              {aboutContent.valuesStatement}
            </blockquote>
          </figure>

          <div className="mx-auto mt-14 max-w-4xl">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-black/8" aria-hidden />
              <p className="kicker-label shrink-0">
                {aboutContent.highlightsLabel}
              </p>
              <div className="h-px flex-1 bg-black/8" aria-hidden />
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {aboutContent.highlights.map((item) => (
                <li
                  key={item.text}
                  className="group flex gap-3.5 rounded-card-sm bg-bg-soft p-4 ring-1 ring-black/4 transition-lift duration-300 hover:bg-white hover:shadow-card-xs hover:ring-accent/20 sm:p-5"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-card-xs ring-1 ring-black/5 transition-colors group-hover:bg-accent/10"
                    aria-hidden
                  >
                    {item.emoji}
                  </span>
                  <p className="min-w-0 pt-1.5 text-sm-plus leading-relaxed text-text/85">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
