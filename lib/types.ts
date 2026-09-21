/** Separa os cases de trabalho dos projetos pessoais nas abas da seção "Projetos". */
export type ProjectKind = "profissional" | "pessoal";

/** Submenu do item "Projetos": leva à seção já com a aba certa selecionada. */
export type NavChild = {
  id: string;
  label: string;
  kind: ProjectKind;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  children?: NavChild[];
};

export type TimelineMarker = {
  id: string;
  title: string;
  description: string;
};

export type ResponsibilityGroup = {
  /** Chave do ícone. Ver `icons` em components/responsibilities/. */
  id: string;
  title: string;
  short: string;
  summary: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  skills: string[];
};

export type ProjectSection = {
  label: string;
  content: string;
};

export type Project = {
  slug: string;
  order: number;
  /** Aba em que o case aparece. Ausente = "profissional". */
  kind?: ProjectKind;
  name: string;
  category: string;
  /** Imagem de capa exibida no topo do card da home. Ausente = placeholder. */
  coverImage?: string;
  users: string[];
  summary: string;
  context: string;
  problem: string;
  objective: string;
  approach: string;
  /** Frase sobre a origem dos dados. Omitida quando a fonte não foi declarada. */
  data?: string;
  technologies: string[];
  kpis: string[];
  usage: string;
  result: string;
  learning: string;
  status?: "confidencial-parcial";
  /**
   * Impactos específicos deste case. Quando omitido, o case study cai na
   * lista transversal de `data/impact.ts`.
   */
  impact?: ImpactItem[];
};

export type VisionPrinciple = {
  id: string;
  title: string;
  description: string;
};

export type ObjectiveStep = {
  id: string;
  label: string;
  title: string;
};

export type ImpactItem = {
  id: string;
  description: string;
};
