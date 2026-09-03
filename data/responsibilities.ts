import type { ResponsibilityGroup } from "@/lib/types";

import responsabilidadesRaw from "@/content/responsabilidades.json";
import type { ConteudoResponsabilidades } from "@/lib/content-schema";

const responsabilidadesJson = responsabilidadesRaw as ConteudoResponsabilidades;

/** Conteúdo em `content/responsabilidades.json`, editável pelo painel em `/keystatic`. */
export const responsibilityGroups: ResponsibilityGroup[] = (responsabilidadesJson.grupos ?? [])
  // Sem título curto não há o que desenhar no diagrama — a etapa é ignorada.
  .filter((grupo) => (grupo.titulo ?? "").trim() && (grupo.curto ?? "").trim())
  .map((grupo) => ({
    id: (grupo.id ?? "").trim() || "negocio",
    title: (grupo.titulo ?? "").trim(),
    short: (grupo.curto ?? "").trim(),
    summary: (grupo.resumo ?? "").trim(),
  }));
