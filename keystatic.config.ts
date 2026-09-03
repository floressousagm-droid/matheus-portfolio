import { config, fields, singleton } from "@keystatic/core";

/**
 * Painel de edição do portfólio.
 *
 * Convenções:
 * - Campos marcados com `*` são obrigatórios: o painel recusa o "Save" se
 *   estiverem vazios. São poucos, e só onde a ausência quebra o site ou deixa
 *   o item sem sentido (ex.: um projeto sem slug não tem endereço).
 * - Todo o resto é opcional. Campo vazio simplesmente não é renderizado — o
 *   bloco correspondente some da página em vez de aparecer em branco.
 * - Não há campos de "identificador" para o usuário inventar: onde o código
 *   precisava de um, ou ele é gerado sozinho, ou virou uma lista de opções.
 *
 * Modelagem:
 * - Tudo é `singleton` (um JSON por área), e não `collection`, para o conteúdo
 *   continuar importável estaticamente por `data/*.ts` — é isso que mantém o
 *   site 100% estático.
 * - O menu (`data/nav.ts`) fica de fora: os ids precisam bater com os ids das
 *   seções na página, e editá-los pelo painel quebraria as âncoras.
 * - As recriações de dashboard também: são componentes React
 *   (`components/projects/mockup/`), não conteúdo.
 */

const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO;

/**
 * O modo "local" grava sem autenticação nenhuma — correto em desenvolvimento,
 * inaceitável em produção (deixaria `POST /api/keystatic/update` aberto).
 * Por isso a escolha abaixo falha FECHADO: em produção sem repo configurado,
 * não cai para local; o painel é desligado nas rotas (ver app/keystatic/ e
 * app/api/keystatic/). Atenção: `NEXT_PUBLIC_*` é embutido em build time, então
 * a variável precisa existir em TODOS os ambientes da Vercel — inclusive
 * Preview — e não só em Production.
 */
const EM_PRODUCAO = process.env.NODE_ENV === "production";
const USAR_LOCAL = !EM_PRODUCAO && !GITHUB_REPO;

const OBRIGATORIO = { isRequired: true } as const;

/** Ícones disponíveis para os grupos de habilidades (ver `components/skills/skills.tsx`). */
const ICONES_HABILIDADES = [
  { label: "Banco de dados", value: "linguagens" },
  { label: "Gráfico / BI", value: "visualizacao" },
  { label: "Camadas", value: "complementares" },
  { label: "Código", value: "codigo" },
  { label: "Nuvem", value: "nuvem" },
  { label: "Ferramentas", value: "ferramentas" },
] as const;

/** Ícones das etapas do ciclo de BI (ver `components/responsibilities/`). */
const ICONES_RESPONSABILIDADES = [
  { label: "Pessoas / negócio", value: "negocio" },
  { label: "Banco de dados", value: "dados" },
  { label: "Filtro / ETL", value: "etl" },
  { label: "Camadas / modelagem", value: "modelagem" },
  { label: "Calculadora / métricas", value: "metricas" },
  { label: "Gráfico / visualização", value: "visualizacao" },
  { label: "Escudo / validação", value: "validacao" },
  { label: "Foguete / publicação", value: "publicacao" },
  { label: "Faísca / automação", value: "automacao" },
] as const;

export default config({
  // Em produção grava via GitHub (vira commit + republicação na Vercel);
  // em desenvolvimento grava direto nos arquivos locais.
  storage: USAR_LOCAL
    ? { kind: "local" }
    : { kind: "github", repo: (GITHUB_REPO ?? "repo/nao-configurado") as `${string}/${string}` },

  locale: "pt-BR",

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
        nome: fields.text({
          label: "Nome",
          description: "Obrigatório. Aparece no topo, no rodapé e no título da aba do navegador.",
          validation: OBRIGATORIO,
        }),
        cargo: fields.text({
          label: "Cargo",
          description: "Obrigatório. Aparece abaixo do nome e no título da aba.",
          validation: OBRIGATORIO,
        }),
        email: fields.text({
          label: "E-mail",
          description:
            "Obrigatório. Além de aparecer no site, é para onde o formulário de contato envia as mensagens.",
          validation: OBRIGATORIO,
        }),
        localizacao: fields.text({
          label: "Localização",
          description: "Opcional. Vazio esconde a linha.",
        }),
        linkedin: fields.url({
          label: "LinkedIn (URL)",
          description: "Opcional. Vazio esconde o link.",
        }),
        github: fields.url({
          label: "GitHub (URL)",
          description: "Opcional. Vazio esconde o link.",
        }),
      },
    }),

    hero: singleton({
      label: "Hero (topo da página)",
      path: "content/hero",
      format: { data: "json" },
      schema: {
        primeiroNome: fields.text({
          label: "Primeiro nome",
          description: "Obrigatório. É o título principal da página.",
          validation: OBRIGATORIO,
        }),
        sobrenome: fields.text({
          label: "Sobrenome",
          description: "Opcional. Aparece destacado em azul ao lado do primeiro nome.",
        }),
        saudacao: fields.text({
          label: "Saudação",
          description: 'Opcional. Ex.: "Olá, me chamo". Vazio esconde a linha.',
        }),
        manchete: fields.array(fields.text({ label: "Linha" }), {
          label: "Manchete",
          description:
            "Opcional. Uma linha por frase; a última palavra de cada linha recebe destaque. Vazio esconde o bloco.",
          itemLabel: (props) => props.value || "(linha vazia)",
        }),
        texto: fields.text({
          label: "Texto de apresentação",
          description: "Opcional. Vazio esconde o parágrafo.",
          multiline: true,
        }),
      },
    }),

    sobre: singleton({
      label: "Sobre mim",
      path: "content/sobre",
      format: { data: "json" },
      schema: {
        titulo: fields.text({
          label: "Título da seção",
          description: "Obrigatório.",
          validation: OBRIGATORIO,
        }),
        olho: fields.text({
          label: "Olho (texto pequeno acima do título)",
          description: "Opcional. Vazio esconde a linha.",
        }),
        paragrafos: fields.array(fields.text({ label: "Parágrafo", multiline: true }), {
          label: "Parágrafos",
          description: "Opcional.",
          itemLabel: (props) => props.value.slice(0, 60) || "(parágrafo vazio)",
        }),
        numeros: fields.array(
          fields.object({
            rotulo: fields.text({
              label: "Rótulo",
              description: "Obrigatório.",
              validation: OBRIGATORIO,
            }),
            valor: fields.text({
              label: "Valor",
              description: "Obrigatório.",
              validation: OBRIGATORIO,
            }),
          }),
          {
            label: "Números em destaque",
            description: "Opcional.",
            itemLabel: (props) =>
              `${props.fields.rotulo.value || "?"}: ${props.fields.valor.value || "?"}`,
          },
        ),
        trajetoria: fields.array(
          fields.object({
            titulo: fields.text({
              label: "Título",
              description: "Obrigatório.",
              validation: OBRIGATORIO,
            }),
            descricao: fields.text({
              label: "Descrição",
              description: "Opcional.",
              multiline: true,
            }),
          }),
          {
            label: "Linha do tempo",
            description: "Opcional. A numeração (01, 02, …) é gerada sozinha.",
            itemLabel: (props) => props.fields.titulo.value || "(sem título)",
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
            titulo: fields.text({
              label: "Título do grupo",
              description: "Obrigatório.",
              validation: OBRIGATORIO,
            }),
            id: fields.select({
              label: "Ícone",
              description: "Obrigatório. Escolha o ícone exibido acima do grupo.",
              options: ICONES_HABILIDADES,
              defaultValue: "complementares",
            }),
            habilidades: fields.array(fields.text({ label: "Habilidade" }), {
              label: "Habilidades",
              description: "Opcional.",
              itemLabel: (props) => props.value || "(vazio)",
            }),
          }),
          {
            label: "Grupos",
            itemLabel: (props) => props.fields.titulo.value || "(sem título)",
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
            titulo: fields.text({
              label: "Título",
              description: "Obrigatório.",
              validation: OBRIGATORIO,
            }),
            curto: fields.text({
              label: "Título curto",
              description: "Obrigatório. É o que aparece no diagrama — use poucas palavras.",
              validation: OBRIGATORIO,
            }),
            id: fields.select({
              label: "Ícone",
              description: "Obrigatório.",
              options: ICONES_RESPONSABILIDADES,
              defaultValue: "negocio",
            }),
            resumo: fields.text({
              label: "Resumo",
              description: "Opcional. Frase exibida abaixo do título no diagrama.",
              multiline: true,
            }),
          }),
          {
            label: "Etapas",
            description: "A numeração (01, 02, …) é gerada sozinha, na ordem desta lista.",
            itemLabel: (props) => props.fields.titulo.value || "(sem título)",
          },
        ),
      },
    }),

    contato: singleton({
      label: "Contato",
      path: "content/contato",
      format: { data: "json" },
      schema: {
        titulo: fields.text({
          label: "Título",
          description: "Obrigatório.",
          validation: OBRIGATORIO,
        }),
        olho: fields.text({ label: "Olho", description: "Opcional." }),
        apoio: fields.text({
          label: "Texto de apoio",
          description: "Opcional.",
          multiline: true,
        }),
      },
    }),

    impacto: singleton({
      label: "Impactos (lista padrão)",
      path: "content/impacto",
      format: { data: "json" },
      schema: {
        itens: fields.array(
          fields.text({
            label: "Impacto",
            description: "Obrigatório.",
            validation: OBRIGATORIO,
            multiline: true,
          }),
          {
            label: "Itens",
            description:
              "Usados em qualquer case que não tenha impactos próprios preenchidos. Nunca transformar em números sem confirmação.",
            itemLabel: (props) => props.value.slice(0, 60) || "(vazio)",
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
            nome: fields.text({
              label: "Nome do projeto",
              description: "Obrigatório.",
              validation: OBRIGATORIO,
            }),
            slug: fields.text({
              label: "Slug (endereço)",
              description:
                "Obrigatório. Vira /projetos/SLUG. Só letras minúsculas, números e hífens. Trocar o slug quebra links antigos.",
              validation: {
                isRequired: true,
                pattern: {
                  regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                  message: "Use só letras minúsculas, números e hífens. Ex.: dashboard-de-vendas",
                },
              },
            }),
            ordem: fields.integer({
              label: "Ordem",
              description: "Obrigatório. Menor aparece primeiro.",
              defaultValue: 1,
              validation: { isRequired: true, min: 0 },
            }),
            tipo: fields.select({
              label: "Aba",
              description: "Em qual aba da seção Projetos este case aparece.",
              options: [
                { label: "Profissional", value: "profissional" },
                { label: "Pessoal", value: "pessoal" },
              ],
              defaultValue: "profissional",
            }),
            categoria: fields.text({
              label: "Categoria",
              description: 'Opcional. Ex.: "Comercial · Performance de vendas".',
            }),
            usuarios: fields.array(fields.text({ label: "Usuário" }), {
              label: "Quem usa",
              description: "Opcional.",
              itemLabel: (props) => props.value || "(vazio)",
            }),
            resumo: fields.text({
              label: "Resumo",
              description: "Opcional. Aparece no card da home.",
              multiline: true,
            }),
            avisoConfidencialidade: fields.checkbox({
              label: "Exibir aviso de confidencialidade",
              defaultValue: true,
            }),

            contexto: fields.text({ label: "Contexto", description: "Opcional.", multiline: true }),
            problema: fields.text({ label: "Problema", description: "Opcional.", multiline: true }),
            objetivo: fields.text({ label: "Objetivo", description: "Opcional.", multiline: true }),
            abordagem: fields.text({
              label: "Abordagem",
              description: "Opcional.",
              multiline: true,
            }),
            dados: fields.text({
              label: "Origem dos dados",
              description: "Opcional. Deixe vazio se a fonte não puder ser informada.",
              multiline: true,
            }),
            tecnologias: fields.array(fields.text({ label: "Tecnologia" }), {
              label: "Tecnologias",
              description: "Opcional.",
              itemLabel: (props) => props.value || "(vazio)",
            }),
            kpis: fields.array(fields.text({ label: "KPI" }), {
              label: "KPIs e análises",
              description: "Opcional.",
              itemLabel: (props) => props.value || "(vazio)",
            }),
            uso: fields.text({ label: "Uso", description: "Opcional.", multiline: true }),
            resultado: fields.text({
              label: "Resultado",
              description: "Opcional.",
              multiline: true,
            }),
            aprendizado: fields.text({
              label: "Aprendizado",
              description: "Opcional.",
              multiline: true,
            }),

            impacto: fields.array(
              fields.text({
                label: "Impacto",
                description: "Obrigatório.",
                validation: OBRIGATORIO,
                multiline: true,
              }),
              {
                label: "Impactos deste projeto",
                description: "Opcional. Vazio faz o case usar a lista padrão de impactos.",
                itemLabel: (props) => props.value.slice(0, 60) || "(vazio)",
              },
            ),
          }),
          {
            label: "Projetos",
            description:
              "A numeração dos blocos (01 Contexto, 02 Problema, …) é gerada sozinha: blocos vazios são omitidos e a contagem se ajusta.",
            itemLabel: (props) => props.fields.nome.value || "(sem nome)",
          },
        ),
      },
    }),
  },
});
