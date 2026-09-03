import { Reveal } from "@/components/data-visuals/reveal";
import { timeline } from "@/data/site";

/**
 * Linha do tempo editorial simples: um trilho vertical com marcos. Evita
 * complexidade visual desnecessária — o objetivo é narrativa, não um gráfico.
 */
export function AboutTimeline() {
  return (
    <ol className="relative border-l border-(--color-surface-border) pl-8">
      {timeline.map((marker, index) => (
        <Reveal as="li" key={marker.id} delay={index * 0.06} className="relative pb-10 last:pb-0">
          <span
            aria-hidden
            className="absolute top-1.5 -left-[calc(2rem+1px)] size-2.5 -translate-x-1/2 rounded-full border-2 border-(--color-surface-0) bg-(--color-accent-500)"
          />
          <p className="text-xs font-medium tracking-[0.15em] text-(--color-accent-300) uppercase">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-(--color-ink-0)">{marker.title}</h3>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-(--color-ink-2)">
            {marker.description}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
