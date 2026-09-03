import type { ImpactItem, Project, ProjectKind } from "@/lib/types";

import projetosRaw from "@/content/projetos.json";
import type { ConteudoProjetos } from "@/lib/content-schema";

// Ver lib/content-schema.ts: o cast mantém o tipo estável mesmo quando o
// Keystatic remove chaves de campos esvaziados no painel.
const projetosJson = projetosRaw as ConteudoProjetos;

/**
 * Projetos exibidos no portfólio.
 *
 * O conteúdo vive em `content/projetos.json`, editável pelo painel em
 * `/keystatic` (adicionar, editar, reordenar e remover cases).
 *
 * Todo acesso é defensivo: quando um campo de texto fica vazio no painel, o
 * Keystatic **remove a chave inteira** do JSON em vez de gravar `""`. Além
 * disso, um case recém-adicionado e ainda não preenchido não pode derrubar o
 * site — daí os filtros abaixo.
 *
 * Regras que continuam valendo (o painel não as impõe sozinho):
 * - Nunca incluir dados sensíveis, valores financeiros internos, clientes
 *   identificáveis ou números de resultado não confirmados pelo Matheus.
 * - A recriação ilustrativa do dashboard não é conteúdo: é um componente por
 *   case, registrado em `components/projects/mockup/`. Um projeto novo
 *   simplesmente não exibe mockup até que alguém escreva o dele.
 */

/** Normaliza um campo de texto que pode estar vazio ou ausente. */
function texto(valor: string | null | undefined): string {
  return (valor ?? "").trim();
}

function normalizarTipo(valor: string | null | undefined): ProjectKind {
  return valor === "pessoal" ? "pessoal" : "profissional";
}

function normalizarImpacto(
  itens: (string | null | undefined)[] | null | undefined,
): ImpactItem[] | undefined {
  const descricoes = (itens ?? []).map(texto).filter(Boolean);
  // Lista vazia no painel significa "usar os impactos transversais".
  if (descricoes.length === 0) return undefined;
  return descricoes.map((description, index) => ({
    id: `impacto-${index}`,
    description,
  }));
}

const vistos = new Set<string>();

const publicaveis = (projetosJson.projetos ?? []).filter((projeto) => {
  const slug = texto(projeto.slug);
  // Um "Add" no painel ainda não preenchido não tem slug nem nome; ignorar
  // aqui evita que um rascunho salvo por engano derrube o site.
  if (!slug || !texto(projeto.nome)) return false;
  // Slug duplicado quebraria o build (duas rotas iguais) — fica o primeiro.
  if (vistos.has(slug)) return false;
  vistos.add(slug);
  return true;
});

export const projects: Project[] = publicaveis.map((projeto) => ({
  slug: texto(projeto.slug),
  order: typeof projeto.ordem === "number" ? projeto.ordem : 0,
  kind: normalizarTipo(projeto.tipo),
  name: texto(projeto.nome),
  category: texto(projeto.categoria),
  users: (projeto.usuarios ?? []).map(texto).filter(Boolean),
  summary: texto(projeto.resumo),
  context: texto(projeto.contexto),
  problem: texto(projeto.problema),
  objective: texto(projeto.objetivo),
  approach: texto(projeto.abordagem),
  // Campo vazio no painel significa "fonte não declarada".
  data: texto(projeto.dados) || undefined,
  technologies: (projeto.tecnologias ?? []).map(texto).filter(Boolean),
  kpis: (projeto.kpis ?? []).map(texto).filter(Boolean),
  usage: texto(projeto.uso),
  result: texto(projeto.resultado),
  learning: texto(projeto.aprendizado),
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
