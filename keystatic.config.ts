import { config, fields, singleton } from "@keystatic/core";

/**
 * Painel de edição do portfólio.
 *
 * Decisões de modelagem:
 * - Tudo é `singleton` (um arquivo JSON por área), e não `collection`. Isso
 *   mantém o conteúdo importável estaticamente por `data/*.ts`, inclusive de
 *   componentes client — que é o que permite o site continuar 100% estático,
 *   sem leitura de disco em tempo de execução.
 * - Os rótulos estão em português porque o painel é operado pelo Matheus.
 * - O menu (`data/nav.ts`) fica de fora de propósito: os ids precisam bater
 *   com os ids das seções na página; editá-los pelo painel quebraria as
 *   âncoras sem aviso.
 * - As recriações de dashboard também ficam de fora: são componentes React
 *   (`components/projects/mockup/`), não conteúdo.
 */

const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO;

export default config({
  // Em produção grava via GitHub (vira commit + republicação na Vercel);
  // em desenvolvimento grava direto nos arquivos locais.
  storage: GITHUB_REPO
    ? { kind: "github", repo: GITHUB_REPO as `${string}/${string}` }
    : { kind: "local" },

  ui: {
    brand: { name: "Portfólio — Matheus Flores" },
    navigation: {
      Projetos: ["projetos"],
      "Textos do site": ["hero", "sobre", "habilidades", "responsabilidades", "contato"],
      Geral: ["identidade", "impacto"],
    },
  },

  singletons: {
    identidade: singleton({
      label: "Identidade e contato",
      path: "content/identidade",
      format: { data: "json" },
      schema: {
        nome: fields.text({ label: "Nome" }),
        cargo: fields.text({ label: "Cargo" }),
        localizacao: fields.text({ label: "Localização" }),
        email: fields.text({ label: "E-mail" }),
        linkedin: fields.text({
          label: "LinkedIn (URL)",
          description: "Deixe vazio para esconder o link.",
        }),
        github: fields.text({
          label: "GitHub (URL)",
          description: "Deixe vazio para esconder o link.",
        }),
      },
    }),

    hero: singleton({
      label: "Hero (topo da página)",
      path: "content/hero",
      format: { data: "json" },
      schema: {
        saudacao: fields.text({ label: "Saudação" }),
        primeiroNome: fields.text({ label: "Primeiro nome" }),
        sobrenome: fields.text({ label: "Sobrenome" }),
        manchete: fields.array(fields.text({ label: "Linha" }), {
          label: "Manchete",
          description: "Uma linha por frase. A última palavra de cada linha recebe destaque.",
          itemLabel: (props) => props.value,
        }),
        texto: fields.text({ label: "Texto de apresentação", multiline: true }),
      },
    }),

    sobre: singleton({
      label: "Sobre mim",
      path: "content/sobre",
      format: { data: "json" },
      schema: {
        olho: fields.text({ label: "Olho (texto pequeno acima do título)" }),
        titulo: fields.text({ label: "Título" }),
        paragrafos: fields.array(fields.text({ label: "Parágrafo", multiline: true }), {
          label: "Parágrafos",
          itemLabel: (props) => props.value.slice(0, 60) + "…",
        }),
        numeros: fields.array(
          fields.object({
            id: fields.text({ label: "Identificador (sem espaços)" }),
            rotulo: fields.text({ label: "Rótulo" }),
            valor: fields.text({ label: "Valor" }),
          }),
          {
            label: "Números em destaque",
            itemLabel: (props) => `${props.fields.rotulo.value}: ${props.fields.valor.value}`,
          },
        ),
        trajetoria: fields.array(
          fields.object({
            id: fields.text({ label: "Identificador (sem espaços)" }),
            titulo: fields.text({ label: "Título" }),
            descricao: fields.text({ label: "Descrição", multiline: true }),
          }),
          {
            label: "Linha do tempo",
            itemLabel: (props) => props.fields.titulo.value,
          },
        ),
      },
    }),

    habilidades: singleton({
      label: "Habilidades",
      path: "content/habilidades",
      format: { data: "json" },
      schema: {
        grupos: fields.array(
          fields.object({
            id: fields.text({
              label: "Identificador",
              description: "Define o ícone. Use: linguagens, visualizacao ou complementares.",
            }),
            titulo: fields.text({ label: "Título do grupo" }),
            habilidades: fields.array(fields.text({ label: "Habilidade" }), {
              label: "Habilidades",
              itemLabel: (props) => props.value,
            }),
          }),
          {
            label: "Grupos",
            itemLabel: (props) => props.fields.titulo.value,
          },
        ),
      },
    }),

    responsabilidades: singleton({
      label: "O que faço (ciclo de BI)",
      path: "content/responsabilidades",
      format: { data: "json" },
      schema: {
        grupos: fields.array(
          fields.object({
            id: fields.text({
              label: "Identificador",
              description:
                "Define o ícone. Use: negocio, dados, etl, modelagem, metricas, visualizacao, validacao, publicacao ou automacao.",
            }),
            titulo: fields.text({ label: "Título" }),
            curto: fields.text({ label: "Título curto (usado no diagrama)" }),
            resumo: fields.text({ label: "Resumo", multiline: true }),
            itens: fields.array(fields.text({ label: "Item" }), {
              label: "Itens detalhados",
              itemLabel: (props) => props.value,
            }),
          }),
          {
            label: "Etapas",
            itemLabel: (props) => props.fields.titulo.value,
          },
        ),
      },
    }),

    contato: singleton({
      label: "Contato",
      path: "content/contato",
      format: { data: "json" },
      schema: {
        olho: fields.text({ label: "Olho" }),
        titulo: fields.text({ label: "Título" }),
        apoio: fields.text({ label: "Texto de apoio", multiline: true }),
      },
    }),

    impacto: singleton({
      label: "Impactos (lista padrão)",
      path: "content/impacto",
      format: { data: "json" },
      schema: {
        itens: fields.array(
          fields.object({
            id: fields.text({ label: "Identificador (sem espaços)" }),
            descricao: fields.text({ label: "Descrição", multiline: true }),
          }),
          {
            label: "Itens",
            description:
              "Usados em qualquer case que não tenha impactos próprios preenchidos.",
            itemLabel: (props) => props.fields.descricao.value.slice(0, 60),
          },
        ),
      },
    }),

    projetos: singleton({
      label: "Projetos",
      path: "content/projetos",
      format: { data: "json" },
      schema: {
        projetos: fields.array(
          fields.object({
            nome: fields.text({ label: "Nome do projeto" }),
            slug: fields.text({
              label: "Slug (endereço)",
              description:
                "Vira /projetos/SLUG. Só letras minúsculas e hífens. Trocar o slug quebra links antigos.",
            }),
            ordem: fields.integer({
              label: "Ordem",
              description: "Menor aparece primeiro.",
              defaultValue: 1,
            }),
            tipo: fields.select({
              label: "Aba",
              options: [
                { label: "Profissional", value: "profissional" },
                { label: "Pessoal", value: "pessoal" },
              ],
              defaultValue: "profissional",
            }),
            categoria: fields.text({
              label: "Categoria",
              description: 'Ex.: "Comercial · Performance de vendas".',
            }),
            usuarios: fields.array(fields.text({ label: "Usuário" }), {
              label: "Quem usa",
              itemLabel: (props) => props.value,
            }),
            resumo: fields.text({
              label: "Resumo",
              description: "Aparece no card da home.",
              multiline: true,
            }),
            avisoConfidencialidade: fields.checkbox({
              label: "Exibir aviso de confidencialidade",
              defaultValue: true,
            }),

            contexto: fields.text({ label: "01 · Contexto", multiline: true }),
            problema: fields.text({ label: "02 · Problema", multiline: true }),
            objetivo: fields.text({ label: "03 · Objetivo", multiline: true }),
            abordagem: fields.text({ label: "04 · Abordagem", multiline: true }),
            dados: fields.text({
              label: "05 · Origem dos dados",
              description: "Deixe vazio se a fonte não puder ser informada.",
              multiline: true,
            }),
            tecnologias: fields.array(fields.text({ label: "Tecnologia" }), {
              label: "05 · Tecnologias",
              itemLabel: (props) => props.value,
            }),
            kpis: fields.array(fields.text({ label: "KPI" }), {
              label: "06 · KPIs e análises",
              itemLabel: (props) => props.value,
            }),
            uso: fields.text({ label: "07 · Uso", multiline: true }),
            resultado: fields.text({ label: "08 · Resultado", multiline: true }),
            aprendizado: fields.text({ label: "09 · Aprendizado", multiline: true }),

            impacto: fields.array(
              fields.object({
                id: fields.text({ label: "Identificador (sem espaços)" }),
                descricao: fields.text({ label: "Descrição", multiline: true }),
              }),
              {
                label: "Impactos deste projeto",
                description:
                  "Se deixar vazio, o case usa a lista padrão de impactos.",
                itemLabel: (props) => props.fields.descricao.value.slice(0, 60),
              },
            ),
          }),
          {
            label: "Projetos",
            itemLabel: (props) => props.fields.nome.value,
          },
        ),
      },
    }),
  },
});
