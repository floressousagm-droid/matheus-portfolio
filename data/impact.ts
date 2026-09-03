import type { ImpactItem } from "@/lib/types";

import impactoJson from "@/content/impacto.json";

/**
 * Impactos qualitativos transversais, usados em qualquer case que não tenha
 * impactos próprios. Conteúdo em `content/impacto.json`, editável pelo painel.
 *
 * Nunca transformar em números/percentuais sem confirmação explícita.
 */
export const impactItems: ImpactItem[] = impactoJson.itens.map((item) => ({
  id: item.id,
  description: item.descricao,
}));
