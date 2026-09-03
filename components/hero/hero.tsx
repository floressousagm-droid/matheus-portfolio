import { ArrowDown } from "lucide-react";

import { Reveal } from "@/components/data-visuals/reveal";
import { HeroVisual } from "@/components/hero/hero-visual";
import { hero } from "@/data/site";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Apresentação"
      // Ocupa a viewport inteira na abertura, com o conteúdo centrado no
      // espaço abaixo do header fixo. `min-h-svh` (e não `dvh`) para que a
      // dobra caiba mesmo com a barra do navegador visível no mobile. Sem
      // `border-b`: a linha entregava a seção seguinte logo na abertura.
      className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
        <div>
          <Reveal>
            <p className="text-lg font-medium text-(--color-ink-0) sm:text-xl">
              {hero.greeting}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-2 text-5xl font-semibold text-(--color-ink-0) sm:text-6xl">
              {hero.firstName}{" "}
              <span className="bg-gradient-to-r from-(--color-accent-300) via-(--color-accent-500) to-(--color-accent-600) bg-clip-text text-transparent">
                {hero.lastName}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-lg font-medium text-(--color-accent-300)">{hero.role}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-2xl leading-snug font-medium text-(--color-ink-0) sm:text-3xl">
              {hero.headline.map((line) => {
                const words = line.split(" ");
                const lastWord = words.pop();
                const rest = words.join(" ");
                return (
                  <span key={line} className="block">
                    {rest ? `${rest} ` : null}
                    <span className="bg-gradient-to-r from-(--color-accent-300) via-(--color-accent-500) to-(--color-accent-600) bg-clip-text text-transparent">
                      {lastWord}
                    </span>
                  </span>
                );
              })}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-(--color-ink-2)">
              {hero.subtext}
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#projetos"
                className="inline-flex items-center gap-2 rounded-full bg-(--color-accent-500) px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-(--color-accent-600)"
              >
                Ver projetos
                <ArrowDown className="size-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:pl-4">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
