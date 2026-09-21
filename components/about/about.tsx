import Image from "next/image";
import { User } from "lucide-react";

import { Reveal } from "@/components/data-visuals/reveal";
import { about } from "@/data/site";

export function About() {
  return (
    <section
      id="sobre"
      aria-label="Sobre mim"
      className="bg-[#070707] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-12 text-4xl font-semibold text-(--color-accent-300) sm:text-5xl md:mb-16">
          {about.heading}
        </h2>

        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="space-y-5 text-base leading-relaxed text-(--color-ink-1)">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.08}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            {about.stats.length > 0 ? (
            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-(--color-surface-border) pt-8 sm:grid-cols-3">
              {about.stats.map((stat, index) => (
                <Reveal key={stat.id} delay={0.1 + index * 0.05}>
                  <dt className="text-xs tracking-wide text-(--color-ink-2) uppercase">{stat.label}</dt>
                  <dd className="mt-1 text-base font-medium text-(--color-ink-0)">{stat.value}</dd>
                </Reveal>
              ))}
            </dl>
            ) : null}
          </div>

          <Reveal delay={0.1}>
            <div className="relative aspect-square">
              <svg
                aria-hidden
                viewBox="0 0 400 400"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 size-full overflow-visible"
              >
                <path
                  d="M-90,230 C40,190 60,270 100,235 C140,200 160,110 200,150 C240,190 260,270 300,235 C340,200 360,130 490,175"
                  fill="none"
                  stroke="var(--color-accent-500)"
                  strokeWidth="2"
                  opacity="0.45"
                />
                <path
                  d="M-90,270 C40,310 60,215 100,255 C140,295 160,185 200,215 C240,245 260,160 300,195 C340,230 360,290 490,245"
                  fill="none"
                  stroke="var(--color-accent-300)"
                  strokeWidth="2"
                  opacity="0.3"
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  aria-hidden
                  className="absolute size-[62%] rounded-full bg-(--color-accent-500)/20 blur-2xl"
                />
                <div className="relative size-[62%] overflow-hidden rounded-full border border-(--color-accent-500)/30 bg-(--color-surface-2)">
                  {about.photo ? (
                    <Image
                      src={about.photo}
                      alt="Foto de Matheus Flores"
                      fill
                      sizes="(min-width: 1024px) 26vw, 60vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center">
                      <User className="size-10 text-(--color-ink-3)" aria-hidden />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
