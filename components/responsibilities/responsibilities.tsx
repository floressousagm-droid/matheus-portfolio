import { SectionHeading } from "@/components/data-visuals/section-heading";
import { ResponsibilitiesTimeline } from "@/components/responsibilities/responsibilities-timeline";
import { ResponsibilitiesWave } from "@/components/responsibilities/responsibilities-wave";
import { responsibilityGroups } from "@/data/responsibilities";

export function Responsibilities() {
  return (
    <section
      id="o-que-faco"
      aria-label="O que faço"
      className="bg-(--color-surface-1) py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="O que faço"
          title="Responsabilidades no ciclo de BI"
          description="Minha rotina cobre praticamente todas as etapas abaixo — não como especialização em cada uma, mas como responsabilidade prática pelo conjunto, do entendimento do problema à manutenção da solução."
        />
        <ResponsibilitiesWave groups={responsibilityGroups} />
        <ResponsibilitiesTimeline groups={responsibilityGroups} />
      </div>
    </section>
  );
}
