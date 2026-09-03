import type { TimelineMarker } from "@/lib/types";

import contatoJson from "@/content/contato.json";
import heroJson from "@/content/hero.json";
import identidadeJson from "@/content/identidade.json";
import sobreJson from "@/content/sobre.json";

/**
 * Textos do site.
 *
 * O conteúdo em si vive em `content/*.json`, editável pelo painel em
 * `/keystatic`. Este arquivo é só a ponte tipada entre aquele JSON e os
 * componentes — é aqui que campos vazios viram `null`/`undefined` e que os
 * nomes em português do painel viram os nomes usados no código.
 */

export const identity = {
  name: identidadeJson.nome,
  role: identidadeJson.cargo,
  location: identidadeJson.localizacao,
  email: identidadeJson.email,
  // Vazio no painel significa "não exibir o link". Texto vazio faz o
  // Keystatic omitir a própria chave do JSON — daí o `?.`.
  linkedin: (identidadeJson.linkedin?.trim() || null) as string | null,
  github: (identidadeJson.github?.trim() || null) as string | null,
};

export const hero = {
  greeting: heroJson.saudacao,
  name: identity.name,
  firstName: heroJson.primeiroNome,
  lastName: heroJson.sobrenome,
  role: identity.role,
  headline: heroJson.manchete,
  subtext: heroJson.texto,
};

export const about = {
  eyebrow: sobreJson.olho,
  heading: sobreJson.titulo,
  paragraphs: sobreJson.paragrafos,
  stats: sobreJson.numeros.map((numero) => ({
    id: numero.id,
    label: numero.rotulo,
    value: numero.valor,
  })),
};

export const timeline: TimelineMarker[] = sobreJson.trajetoria.map((marco) => ({
  id: marco.id,
  title: marco.titulo,
  description: marco.descricao,
}));

export const contact = {
  eyebrow: contatoJson.olho,
  heading: contatoJson.titulo,
  support: contatoJson.apoio,
};
