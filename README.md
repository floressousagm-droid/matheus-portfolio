# Portfólio — Matheus Flores

Código-fonte do portfólio pessoal/profissional de Matheus Flores (Analista de BI Júnior),
construído com Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui (padrões de
componentes), Motion, D3, Lucide React e Resend (envio do formulário de contato).

## Antes de rodar: importante

Este projeto foi escrito inteiramente neste ambiente, mas **o ambiente de execução usado
para gerá-lo não tinha acesso ao registro do npm** (bloqueio de rede da organização), então
`npm install` e `next build`/`next dev` não puderam ser executados nem verificados aqui.
O código foi revisado manualmente e passou por uma checagem de sintaxe com o compilador
TypeScript, mas a primeira coisa a fazer, no seu computador (ou em CI), é:

```bash
npm install
npm run dev
```

e revisar visualmente cada seção antes de publicar. Se algo não compilar de primeira,
é provável que seja um detalhe de versão de dependência (ex.: Tailwind v4/shadcn) — o
código segue as convenções mais recentes dessas bibliotecas até a data deste projeto,
mas vale confirmar as versões exatas disponíveis no seu `npm install`.

## Estrutura

```
app/                     rotas (App Router)
  layout.tsx             fontes (Geist), metadata, Vercel Analytics
  page.tsx               monta todas as seções da home
  projetos/[slug]/       página de case study de cada projeto
  api/contact/           Route Handler que envia o formulário de contato via Resend
components/
  nav/                   navegação fixa com indicador de seção ativa
  hero/                  hero + visualização de dados animada (SVG + Motion)
  about/                 seção "Sobre" + linha do tempo
  responsibilities/      seção "O que faço"
  projects/              grid de projetos + case study completo
  skills/                seção "Habilidades"
  ai/                    seção "IA aplicada"
  contact/               seção "Contato" (botões de e-mail/LinkedIn/GitHub + formulário)
  data-visuals/          primitivas reutilizáveis (linhas SVG, nós, sparkline em D3, reveal)
  ui/                    componentes base no padrão shadcn/ui (button, badge)
data/                    todo o conteúdo do site em arquivos tipados (fonte de verdade)
lib/                     tipos e utilitários (cn, hook de prefers-reduced-motion)
content/                 PORTFOLIO_CONTEUDO.md — documento de conteúdo/narrativa completo
```

## Como adicionar um novo projeto

Toda a seção de projetos foi construída para crescer sem alterar a arquitetura:

1. Abra `data/projects.ts`.
2. Copie o objeto do projeto existente e preencha os mesmos campos para o novo case.
3. Defina um `slug` único e um `order` (define a posição no grid).
4. Nada mais precisa ser alterado — o card na home e a página `/projetos/[slug]` são
   gerados automaticamente a partir do array.

Sempre revise a seção "Regras de confidencialidade" e "Regra de autenticidade" no
`content/PORTFOLIO_CONTEUDO.md` antes de publicar um novo case.

## Design

- Tema fixo dark, acento azul (`app/globals.css`, tokens em `@theme`).
- Tipografia Geist (via `next/font/google`).
- Animações com Motion (`motion/react`), respeitando `prefers-reduced-motion`
  (hook em `lib/use-prefers-reduced-motion.ts`, além do CSS global).
- Visualizações com SVG + D3 (`d3-scale`, `d3-shape`) em `components/data-visuals`.

## Formulário de contato (Resend)

A seção "Contato" tem um formulário (nome, e-mail, mensagem) que envia a mensagem
direto para o e-mail do Matheus (`identity.email` em `data/site.ts`), usando o
serviço [Resend](https://resend.com). O envio acontece em `app/api/contact/route.ts`.

**Importante:** este projeto foi escrito sem acesso à internet neste ambiente, então
não foi possível testar o envio real de e-mail nem instalar o pacote `resend` aqui —
o código segue a API documentada do SDK oficial (`resend.emails.send`), mas vale
confirmar contra a documentação atual do Resend ao configurar.

Passo a passo:

1. Crie uma conta gratuita em [resend.com](https://resend.com).
2. Em **API Keys**, crie uma chave e copie o valor.
3. Localmente, copie `.env.local.example` para `.env.local` e cole a chave em
   `RESEND_API_KEY`. Na Vercel, adicione a mesma variável em
   **Project Settings → Environment Variables**.
4. Sem nenhum domínio verificado, o remetente padrão (`onboarding@resend.dev`,
   definido em `FROM_ADDRESS` no route handler) já funciona, mas só entrega
   e-mails para o endereço cadastrado na sua conta Resend — bom para testar.
5. Para receber mensagens de qualquer visitante em produção, verifique um
   domínio próprio em **Domains** no painel da Resend e troque `FROM_ADDRESS`
   em `app/api/contact/route.ts` por um endereço nesse domínio (ex.:
   `"Portfólio <contato@seudominio.com>"`).
6. O formulário tem um campo-armadilha (honeypot) simples contra bots — não é
   necessária nenhuma configuração adicional para isso.

Sem a variável `RESEND_API_KEY` configurada, o formulário mostra uma mensagem de
erro amigável em vez de travar a build ou o site.

## Deploy

O projeto está pronto para deploy direto na Vercel (`vercel.com/new`, importar o
repositório). O componente `@vercel/analytics` já está instalado em `app/layout.tsx`.
Lembre-se de configurar `RESEND_API_KEY` nas variáveis de ambiente do projeto na
Vercel antes do deploy (veja a seção acima) — sem ela, o formulário de contato
não envia e-mails.

## Pendências de conteúdo

O seguinte campo ainda não foi informado e aparece como `null` em `data/site.ts`
(o código já trata a ausência sem quebrar, simplesmente ocultando o link
correspondente):

- Link do currículo

Basta preencher `identity.resumeUrl` em `data/site.ts` quando estiver disponível.
Esse link não é exibido na seção de Contato atualmente (que mostra apenas
e-mail, LinkedIn, GitHub e o formulário de mensagem), mas fica pronto no dado
caso você queira reintroduzi-lo em outro ponto do site.
