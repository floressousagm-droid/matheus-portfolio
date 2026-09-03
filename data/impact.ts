import type { ImpactItem } from "@/lib/types";

import impactoRaw from "@/content/impacto.json";
import type { ConteudoImpacto } from "@/lib/content-schema";

const impactoJson = impactoRaw as ConteudoImpacto;

/**
 * Impactos qualitativos transversais, usados em qualquer case que não tenha
 * impactos próprios. Conteúdo em `content/impacto.json`, editável pelo painel.
 *
 * Nunca transformar em números/percentuais sem confirmação explícita.
 */
export const impactItems: ImpactItem[] = (impactoJson.itens ?? [])
  .map((descricao) => (descricao ?? "").trim())
  .filter(Boolean)
  // O id existe só como chave de renderização — é gerado, não editado.
  .map((description, index) => ({ id: `impacto-${index}`, description }));
