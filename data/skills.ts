import type { SkillGroup } from "@/lib/types";

import habilidadesRaw from "@/content/habilidades.json";
import type { ConteudoHabilidades } from "@/lib/content-schema";

const habilidadesJson = habilidadesRaw as ConteudoHabilidades;

/** Conteúdo em `content/habilidades.json`, editável pelo painel em `/keystatic`. */
export const skillGroups: SkillGroup[] = (habilidadesJson.grupos ?? [])
  .filter((grupo) => (grupo.titulo ?? "").trim())
  .map((grupo) => ({
    id: (grupo.id ?? "").trim() || "complementares",
    title: (grupo.titulo ?? "").trim(),
    skills: (grupo.habilidades ?? []).map((s) => (s ?? "").trim()).filter(Boolean),
  }));
