import type { SkillGroup } from "@/lib/types";

import habilidadesJson from "@/content/habilidades.json";

/** Conteúdo em `content/habilidades.json`, editável pelo painel em `/keystatic`. */
export const skillGroups: SkillGroup[] = habilidadesJson.grupos.map((grupo) => ({
  id: grupo.id,
  title: grupo.titulo,
  skills: grupo.habilidades,
}));
