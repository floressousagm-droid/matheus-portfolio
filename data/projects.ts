import type { ImpactItem, Project, ProjectKind } from "@/lib/types";

import projetosJson from "@/content/projetos.json";

/**
 * Projetos exibidos no portfólio.
 *
 * O conteúdo vive em `content/projetos.json`, editável pelo painel em
 * `/keystatic` (adicionar, editar, reordenar e remover cases). Este arquivo
 * traduz o JSON para o tipo `Project` usado pelos componentes.
 *
 * Regras que continuam valendo (o painel não as impõe sozinho):
 * - Nunca incluir dados sensíveis, valores financeiros internos, clientes
 *   identificáveis ou números de resultado não confirmados pelo Matheus.
 * - A recriação ilustrativa do dashboard não é conteúdo: é um componente por
 *   case, registrado em `components/projects/mockup/`. Um projeto novo
 *   simplesmente não exibe mockup até que alguém escreva o dele.
 */

function normalizarTipo(valor: string): ProjectKind {
  return valor === "pessoal" ? "pessoal" : "profissional";
}

function normalizarImpacto(
  itens: { id: string; descricao: string }[],
): ImpactItem[] | undefined {
  // Lista vazia no painel significa "usar os impactos transversais".
  if (itens.length === 0) return undefined;
  return itens.map((item) => ({ id: item.id, description: item.descricao }));
}

// Um "Add" no painel que ainda não foi preenchido não tem slug — filtrar
// aqui evita que um rascunho salvo por engano derrube o site inteiro.
const projetosPublicaveis = projetosJson.projetos.filter(
  (projeto): projeto is typeof projeto & { slug: string } => Boolean(projeto.slug?.trim()),
);

export const projects: Project[] = projetosPublicaveis.map((projeto) => ({
  slug: projeto.slug,
  order: projeto.ordem,
  kind: normalizarTipo(projeto.tipo),
  name: projeto.nome,
  category: projeto.categoria,
  users: projeto.usuarios,
  summary: projeto.resumo,
  context: projeto.contexto,
  problem: projeto.problema,
  objective: projeto.objetivo,
  approach: projeto.abordagem,
  // Campo vazio no painel significa "fonte não declarada". Texto vazio faz
  // o Keystatic omitir a própria chave do JSON — daí o `?.`.
  data: projeto.dados?.trim() || undefined,
  technologies: projeto.tecnologias,
  kpis: projeto.kpis,
  usage: projeto.uso,
  result: projeto.resultado,
  learning: projeto.aprendizado,
  status: projeto.avisoConfidencialidade ? "confidencial-parcial" : undefined,
  impact: normalizarImpacto(projeto.impacto),
}));

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getSortedProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getProjectKind(project: Project): ProjectKind {
  return project.kind ?? "profissional";
}

export function getProjectsByKind(kind: ProjectKind): Project[] {
  return getSortedProjects().filter((project) => getProjectKind(project) === kind);
}
