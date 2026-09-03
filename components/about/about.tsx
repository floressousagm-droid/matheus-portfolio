import { Reveal } from "@/components/data-visuals/reveal";
import { SectionHeading } from "@/components/data-visuals/section-heading";
import { AboutTimeline } from "@/components/about/timeline";
import { about } from "@/data/site";

export function About() {
  return (
    <section id="sobre" aria-label="Sobre mim" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Sobre mim" title={about.heading} />

        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="space-y-5 text-base leading-relaxed text-(--color-ink-1)">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.08}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-(--color-surface-border) pt-8 sm:grid-cols-3">
              {about.stats.map((stat, index) => (
                <Reveal key={stat.id} delay={0.1 + index * 0.05}>
                  <dt className="text-xs tracking-wide text-(--color-ink-2) uppercase">{stat.label}</dt>
                  <dd className="mt-1 text-base font-medium text-(--color-ink-0)">{stat.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <div>
            <AboutTimeline />
          </div>
        </div>
      </div>
    </section>
  );
}
