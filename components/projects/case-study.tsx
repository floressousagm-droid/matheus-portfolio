import type { ReactNode } from "react";
import { ArrowLeft, ArrowDown } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/data-visuals/reveal";
import { mockupsBySlug } from "@/components/projects/mockup";
import { impactItems } from "@/data/impact";
import type { Project } from "@/lib/types";

type CaseStudyProps = {
  project: Project;
};

type Block = {
  number: string;
  label: string;
  content: ReactNode;
};

export function CaseStudy({ project }: CaseStudyProps) {
  // Impactos do próprio case quando existirem; senão, os transversais.
  const impact = project.impact ?? impactItems;
  const Mockup = mockupsBySlug[project.slug];

  const blocks: Block[] = [
    { number: "01", label: "Contexto", content: <p>{project.context}</p> },
    { number: "02", label: "Problema", content: <p>{project.problem}</p> },
    { number: "03", label: "Objetivo", content: <p>{project.objective}</p> },
    { number: "04", label: "Abordagem", content: <p>{project.approach}</p> },
    {
      number: "05",
      label: "Dados & tecnologias",
      content: (
        <div className="space-y-4">
          {project.data ? <p>{project.data}</p> : null}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="accent">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      ),
    },
    {
      number: "06",
      label: "KPIs & análises",
      content: (
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {project.kpis.map((kpi) => (
            <li
              key={kpi}
              className="rounded-lg border border-(--color-surface-border) bg-(--color-surface-2) px-3 py-2 text-sm break-words text-(--color-ink-1)"
            >
              {kpi}
            </li>
          ))}
        </ul>
      ),
    },
    { number: "07", label: "Uso", content: <p>{project.usage}</p> },
    { number: "08", label: "Resultado", content: <p>{project.result}</p> },
    { number: "09", label: "Aprendizado", content: <p>{project.learning}</p> },
  ];

  return (
    <article className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <Link
        href="/#projetos"
        className="inline-flex items-center gap-2 text-sm text-(--color-ink-2) transition-colors hover:text-(--color-accent-300)"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Voltar para projetos
      </Link>

      <header className="mt-8 border-b border-(--color-surface-border) pb-10">
        <p className="text-xs tracking-[0.2em] text-(--color-accent-300) uppercase">
          {project.category}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-(--color-ink-0) sm:text-4xl">
          {project.name}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-(--color-ink-2)">
          {project.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.users.map((user) => (
            <Badge key={user}>{user}</Badge>
          ))}
        </div>
        {project.status === "confidencial-parcial" ? (
          <p className="mt-6 text-xs text-(--color-ink-3)">
            Alguns detalhes deste projeto foram generalizados por confidencialidade — dados
            internos, valores financeiros e informações de clientes não são divulgados.
          </p>
        ) : null}
      </header>

      {Mockup ? (
        // O mockup respira mais que a coluna de texto: em telas grandes ele
        // avança 4rem para cada lado, sem nunca estourar a viewport.
        <Reveal className="mt-10 lg:-mx-16">
          <Mockup />
        </Reveal>
      ) : null}

      <div className="mt-10 space-y-10">
        {blocks.map((block, index) => (
          <Reveal key={block.number} delay={index * 0.04}>
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-(--color-ink-3)">{block.number}</span>
                <h2 className="text-lg font-semibold text-(--color-ink-0)">{block.label}</h2>
              </div>
              <div className="mt-3 max-w-2xl text-base leading-relaxed text-(--color-ink-1)">
                {block.content}
              </div>
            </div>
            {index < blocks.length - 1 ? (
              <div className="mt-8 flex justify-start pl-1 text-(--color-ink-3)" aria-hidden>
                <ArrowDown className="size-4" />
              </div>
            ) : null}
          </Reveal>
        ))}
      </div>

      <div className="mt-16 rounded-(--radius-card) border border-(--color-surface-border) bg-(--color-surface-2) p-6">
        <h2 className="text-base font-semibold text-(--color-ink-0)">Impacto</h2>
        <p className="mt-1 text-sm text-(--color-ink-3)">
          Impactos qualitativos observados — sem métricas não confirmadas.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {impact.map((item) => (
            <li key={item.id} className="flex gap-2 text-sm text-(--color-ink-2)">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-(--color-accent-500)" />
              {item.description}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
