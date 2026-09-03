import type { ResponsibilityGroup } from "@/lib/types";

import responsabilidadesJson from "@/content/responsabilidades.json";

/** Conteúdo em `content/responsabilidades.json`, editável pelo painel em `/keystatic`. */
export const responsibilityGroups: ResponsibilityGroup[] = responsabilidadesJson.grupos.map(
  (grupo) => ({
    id: grupo.id,
    title: grupo.titulo,
    short: grupo.curto,
    summary: grupo.resumo,
    items: grupo.itens,
  }),
);
