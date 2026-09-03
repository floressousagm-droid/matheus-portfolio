import type { TimelineMarker } from "@/lib/types";

import contatoRaw from "@/content/contato.json";
import heroRaw from "@/content/hero.json";
import identidadeRaw from "@/content/identidade.json";
import sobreRaw from "@/content/sobre.json";
import type {
  ConteudoContato,
  ConteudoHero,
  ConteudoIdentidade,
  ConteudoSobre,
} from "@/lib/content-schema";

// O cast é essencial: sem ele o TypeScript infere o tipo a partir das chaves
// que existem no arquivo hoje, e limpar um campo pelo painel quebraria o build.
const identidadeJson = identidadeRaw as ConteudoIdentidade;
const heroJson = heroRaw as ConteudoHero;
const sobreJson = sobreRaw as ConteudoSobre;
const contatoJson = contatoRaw as ConteudoContato;

/**
 * Textos do site.
 *
 * O conteúdo vive em `content/*.json`, editável pelo painel em `/keystatic`.
 * Este arquivo é a ponte tipada entre aquele JSON e os componentes.
 *
 * Todo acesso aqui é defensivo de propósito: quando um campo de texto fica
 * vazio no painel, o Keystatic **remove a chave inteira** do JSON em vez de
 * gravar `""`. Ler direto (`x.trim()`) derruba o site — daí o `?? ""` em tudo.
 */

/** Normaliza um campo de texto que pode estar vazio ou ausente. */
function texto(valor: string | null | undefined): string {
  return (valor ?? "").trim();
}

export const identity = {
  name: texto(identidadeJson.nome),
  role: texto(identidadeJson.cargo),
  location: texto(identidadeJson.localizacao),
  email: texto(identidadeJson.email),
  // Vazio no painel significa "não exibir o link".
  linkedin: (texto(identidadeJson.linkedin) || null) as string | null,
  github: (texto(identidadeJson.github) || null) as string | null,
};

export const hero = {
  greeting: texto(heroJson.saudacao),
  name: identity.name,
  firstName: texto(heroJson.primeiroNome),
  lastName: texto(heroJson.sobrenome),
  role: identity.role,
  headline: (heroJson.manchete ?? []).map(texto).filter(Boolean),
  subtext: texto(heroJson.texto),
};

export const about = {
  eyebrow: texto(sobreJson.olho),
  heading: texto(sobreJson.titulo),
  paragraphs: (sobreJson.paragrafos ?? []).map(texto).filter(Boolean),
  stats: (sobreJson.numeros ?? [])
    .filter((numero) => texto(numero.rotulo) && texto(numero.valor))
    // O id existe só como chave de renderização — é gerado, não editado.
    .map((numero, index) => ({
      id: `numero-${index}`,
      label: texto(numero.rotulo),
      value: texto(numero.valor),
    })),
};

export const timeline: TimelineMarker[] = (sobreJson.trajetoria ?? [])
  .filter((marco) => texto(marco.titulo))
  .map((marco, index) => ({
    id: `marco-${index}`,
    title: texto(marco.titulo),
    description: texto(marco.descricao),
  }));

export const contact = {
  eyebrow: texto(contatoJson.olho),
  heading: texto(contatoJson.titulo),
  support: texto(contatoJson.apoio),
};
