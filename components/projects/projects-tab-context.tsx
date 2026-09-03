"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import type { ProjectKind } from "@/lib/types";

type ProjectsTabValue = {
  kind: ProjectKind;
  setKind: (kind: ProjectKind) => void;
};

const ProjectsTabContext = createContext<ProjectsTabValue | null>(null);

/**
 * Guarda qual aba da seção "Projetos" está ativa.
 *
 * Vive no layout (e não dentro da seção) porque o menu do header também
 * escolhe a aba — inclusive a partir de uma página de case study, onde a
 * seção nem está montada. Como o layout sobrevive à navegação client-side do
 * App Router, a escolha continua valendo quando a home é aberta.
 */
export function ProjectsTabProvider({ children }: { children: ReactNode }) {
  const [kind, setKind] = useState<ProjectKind>("profissional");
  const value = useMemo(() => ({ kind, setKind }), [kind]);

  return <ProjectsTabContext.Provider value={value}>{children}</ProjectsTabContext.Provider>;
}

export function useProjectsTab(): ProjectsTabValue {
  const context = useContext(ProjectsTabContext);
  if (!context) {
    throw new Error("useProjectsTab precisa estar dentro de <ProjectsTabProvider>.");
  }
  return context;
}
