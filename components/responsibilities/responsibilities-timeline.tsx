import {
  Users,
  Database,
  Filter,
  Layers,
  Calculator,
  LineChart,
  ShieldCheck,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/data-visuals/reveal";
import type { ResponsibilityGroup } from "@/lib/types";

const icons: Record<string, LucideIcon> = {
  negocio: Users,
  dados: Database,
  etl: Filter,
  modelagem: Layers,
  metricas: Calculator,
  visualizacao: LineChart,
  validacao: ShieldCheck,
  publicacao: Rocket,
  automacao: Sparkles,
};

type ResponsibilitiesTimelineProps = {
  groups: ResponsibilityGroup[];
};

/**
 * Versão em coluna única do ciclo de BI, usada abaixo do breakpoint em que
 * o diagrama ondulado (ResponsibilitiesWave) deixa de caber com conforto.
 * Nunca precisa de rolagem horizontal: cresce apenas verticalmente.
 */
export function ResponsibilitiesTimeline({ groups }: ResponsibilitiesTimelineProps) {
  return (
    <div className="relative mt-16 min-[860px]:hidden">
      <span
        aria-hidden
        className="absolute top-[1.35rem] bottom-[1.35rem] left-[1.35rem] w-px bg-(--color-surface-border)"
      />
      <ol className="list-none">
        {groups.map((group, index) => {
          const Icon = icons[group.id] ?? Sparkles;
          const number = String(index + 1).padStart(2, "0");

          return (
            <Reveal key={group.id} as="li" delay={(index % 4) * 0.06} className="relative flex gap-4 py-5 first:pt-0 last:pb-0">
              <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-(--color-accent-500)/30 bg-(--color-surface-2) text-(--color-accent-300) shadow-[0_0_0_4px_var(--color-surface-1)]">
                <Icon className="size-4" aria-hidden />
              </span>
              <div>
                <span className="font-mono text-[11px] tracking-[0.2em] text-(--color-accent-300)">
                  {number}
                </span>
                <h3 className="mt-1 text-sm font-semibold text-(--color-ink-0)">{group.short}</h3>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
