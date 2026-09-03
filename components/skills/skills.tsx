import { BarChart3, Database, Layers, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/data-visuals/reveal";
import { SectionHeading } from "@/components/data-visuals/section-heading";
import { skillGroups } from "@/data/skills";

const groupIcons: Record<string, LucideIcon> = {
  linguagens: Database,
  visualizacao: BarChart3,
  complementares: Layers,
};

export function Skills() {
  return (
    <section id="habilidades" aria-label="Habilidades" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Habilidades"
          title="Competências por área"
          description="Sem barras de progresso ou percentuais — a experiência real varia por ferramenta, e é mais honesto descrever do que quantificar artificialmente."
        />

        <div className="mt-4 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {skillGroups.map((group, index) => {
            const Icon = groupIcons[group.id] ?? Layers;

            return (
              <Reveal key={group.id} delay={index * 0.1}>
                <div className="flex flex-col gap-5">
                  <div className="flex size-14 shrink-0 rotate-45 items-center justify-center rounded-md border border-(--color-accent-500)/40 bg-(--color-surface-2)">
                    <Icon className="size-5 -rotate-45 text-(--color-accent-300)" aria-hidden />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-(--color-ink-0)">{group.title}</h3>

                    <ul className="mt-4 space-y-2.5">
                      {group.skills.map((skill) => (
                        <li key={skill} className="flex items-start gap-2.5 text-sm text-(--color-ink-2)">
                          <span
                            aria-hidden
                            className="mt-[0.45rem] size-1.5 shrink-0 rotate-45 bg-(--color-accent-500)"
                          />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
