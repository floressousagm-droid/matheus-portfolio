"use client";

import { useId, useRef, type KeyboardEvent } from "react";

import { SectionHeading } from "@/components/data-visuals/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { getProjectsByKind } from "@/data/projects";
import { useProjectsTab } from "@/components/projects/projects-tab-context";
import type { ProjectKind } from "@/lib/types";
import { cn } from "@/lib/utils";

type Tab = {
  kind: ProjectKind;
  label: string;
  description: string;
  /** Texto exibido quando ainda não há nenhum case nesta aba. */
  empty: string;
  /** Rodapé da aba, quando já existem cases. */
  note: string;
};

const tabs: Tab[] = [
  {
    kind: "profissional",
    label: "Profissionais",
    description:
      "Projetos reais, desenvolvidos em ambiente de trabalho. Detalhes sensíveis são generalizados por confidencialidade — o foco é o raciocínio, o problema e a solução.",
    empty: "Nenhum case profissional publicado ainda.",
    note: "Mais cases serão adicionados aqui à medida que novos projetos forem concluídos.",
  },
  {
    kind: "pessoal",
    label: "Pessoais",
    description:
      "Projetos desenvolvidos por conta própria, para estudar, testar ideias e resolver problemas fora do ambiente de trabalho.",
    empty: "Ainda não há projetos pessoais publicados — em breve.",
    note: "Novos projetos pessoais serão adicionados aqui.",
  },
];

export function ProjectsSection() {
  const baseId = useId();
  // A aba vive no layout: o menu do header também a controla.
  const { kind: activeKind, setKind: setActiveKind } = useProjectsTab();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = tabs.findIndex((tab) => tab.kind === activeKind);
  const activeTab = tabs[activeIndex] ?? tabs[0]!;
  const projects = getProjectsByKind(activeTab.kind);

  const tabId = (kind: ProjectKind) => `${baseId}-tab-${kind}`;
  const panelId = (kind: ProjectKind) => `${baseId}-panel-${kind}`;

  // Navegação por teclado exigida pelo padrão de tabs: setas percorrem as
  // abas (circular) e Home/End vão para a primeira/última.
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const lastIndex = tabs.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
    else if (event.key === "ArrowLeft") nextIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = lastIndex;

    if (nextIndex === null) return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    if (!nextTab) return;
    setActiveKind(nextTab.kind);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section
      id="projetos"
      aria-label="Projetos"
      className="bg-(--color-surface-1) py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Projetos"
          title="Cases e projetos"
          description={activeTab.description}
        />

        <div
          role="tablist"
          aria-label="Tipo de projeto"
          className="-mt-6 mb-10 inline-flex items-center gap-1 rounded-full border border-(--color-surface-border) bg-(--color-surface-2) p-1"
        >
          {tabs.map((tab, index) => {
            const isActive = tab.kind === activeKind;
            return (
              <button
                key={tab.kind}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={tabId(tab.kind)}
                aria-selected={isActive}
                aria-controls={panelId(tab.kind)}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveKind(tab.kind)}
                onKeyDown={handleKeyDown}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-(--color-accent-500) text-white"
                    : "text-(--color-ink-2) hover:text-(--color-ink-0)",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={panelId(activeTab.kind)}
          aria-labelledby={tabId(activeTab.kind)}
          tabIndex={0}
        >
          {projects.length > 0 ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                  <ProjectCard key={project.slug} project={project} index={index} />
                ))}
              </div>
              <p className="mt-10 text-sm text-(--color-ink-2)">{activeTab.note}</p>
            </>
          ) : (
            <p className="rounded-(--radius-card) border border-dashed border-(--color-surface-border) px-6 py-12 text-center text-sm text-(--color-ink-2)">
              {activeTab.empty}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
