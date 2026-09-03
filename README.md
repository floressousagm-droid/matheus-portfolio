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

## Painel de edição

O conteúdo do site (textos e projetos) é editado por um painel, sem mexer no código.

### Onde o conteúdo mora

Os textos ficam em `content/*.json`. Os arquivos em `data/*.ts` **não são mais
conteúdo**: viraram uma ponte tipada entre aquele JSON e os componentes — é lá que
campo vazio vira "não exibir", que o checkbox de confidencialidade vira o aviso, etc.
Editar `content/` pelo painel é o caminho normal; mexer em `data/` só é necessário
para mudar comportamento.

### Como funciona o acesso

O painel fica atrás de **duas camadas**, e vale entender por que são duas:

1. **Sua senha** (`/painel/login`) — é o portão. Sem ela, nem o HTML do painel é
   servido: `/keystatic` redireciona para o login e `/api/keystatic/*` responde
   401. A sessão dura 7 dias num cookie assinado.
2. **Login do GitHub**, por dentro do painel — só em produção. Não é redundância:
   é o que efetivamente grava. Cada "Save" vira um commit assinado por você, e o
   Keystatic não tem modo com token de servidor. Você faz esse login uma vez; o
   token dura meses.

Localmente, sem `NEXT_PUBLIC_GITHUB_REPO`, o painel grava direto nos arquivos e
não pede GitHub nenhum.

### Editando localmente

```bash
npm run dev
```

Abra <http://localhost:3000/keystatic>. Sem `PAINEL_SENHA` no `.env.local`, o
portão fica desligado e você edita direto — grava nos arquivos em `content/`.

Para testar o fluxo de login na sua máquina, defina `PAINEL_SENHA` e
`PAINEL_SEGREDO` no `.env.local` (veja `.env.local.example`).

Depois é só commitar e enviar:

```bash
git add content/ && git commit -m "Atualiza conteúdo" && git push
```

### Habilitando o painel em produção

Uma vez só. **A ordem importa**: o assistente do Keystatic só roda em
desenvolvimento, então o GitHub App é criado na sua máquina e as chaves são
copiadas para a Vercel depois.

1. **Gere a senha e o segredo:**

   ```bash
   node -e "console.log('PAINEL_SENHA=' + require('crypto').randomBytes(18).toString('base64url'))"
   node -e "console.log('PAINEL_SEGREDO=' + require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Crie o GitHub App localmente.** Ponha no `.env.local`:

   ```bash
   NEXT_PUBLIC_GITHUB_REPO=seu-usuario/seu-repo
   ```

   Rode `npm run dev` e acesse <http://localhost:3000/keystatic/setup>. O
   Keystatic conduz a criação e grava as chaves no seu `.env.local`.

3. **Configure na Vercel** (Settings → Environment Variables) as sete variáveis:
   `PAINEL_SENHA`, `PAINEL_SEGREDO`, `NEXT_PUBLIC_GITHUB_REPO`,
   `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`, `KEYSTATIC_GITHUB_CLIENT_ID`,
   `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` — além de
   `RESEND_API_KEY`.

   > Marque para **todos** os ambientes (Production, Preview e Development).
   > `NEXT_PUBLIC_*` é embutido em *build time*: se ficar só em Production, os
   > deploys de Preview saem sem painel.

4. **Faça o deploy.** Acesse `SEU-SITE.vercel.app/keystatic`, digite a senha, e
   faça o login do GitHub uma vez.

### O que acontece se faltar configuração

Falha fechado, sempre — o painel some em vez de ficar aberto:

| Situação | Resultado |
| --- | --- |
| Produção sem `PAINEL_SENHA`/`PAINEL_SEGREDO` | `/keystatic` e `/api/keystatic/*` → **404** |
| Produção sem `NEXT_PUBLIC_GITHUB_REPO` | painel → **404** (evita o modo local, que grava sem autenticação) |
| Senha errada | 401; cinco tentativas por IP a cada 15 min |
| Cookie forjado ou expirado | 401 |

O site público nunca é afetado por nada disso: continua no ar normalmente.

### Campos obrigatórios e opcionais

Campos obrigatórios aparecem com um **asterisco vermelho** e a descrição começa
com "Obrigatório." — o painel recusa o "Save" se estiverem vazios. São poucos, e
só onde a ausência quebraria algo:

| Área | Obrigatório | Por quê |
| --- | --- | --- |
| Identidade | Nome, Cargo, E-mail | O e-mail é o destino do formulário de contato |
| Hero | Primeiro nome | É o título principal da página |
| Sobre / Contato | Título da seção | Sem ele a seção fica sem cabeçalho |
| Projetos | Nome, Slug, Ordem | O slug é o endereço da página; a ordem define a posição |
| Grupos (habilidades / etapas) | Título e Ícone | Sem título não há o que rotular |

**Todo o resto é opcional, e vazio simplesmente some da página** — não fica um
título solto com nada embaixo. Num case, os blocos são renumerados sozinhos:
se você deixar "Objetivo" em branco, a numeração segue 01, 02, 03… sem buraco.

Um projeto adicionado mas ainda não preenchido (sem slug) é ignorado pelo site
até você completá-lo, então um rascunho salvo por engano não derruba nada.

> A mensagem de erro de campo vazio aparece em inglês ("… must not be empty").
> É um texto fixo dentro do Keystatic, não traduzível pela configuração; o resto
> do painel está em português.

### O que o painel NÃO edita (de propósito)

- **O menu** (`data/nav.ts`): os ids precisam bater com os ids das seções na página.
  Editar pelo painel quebraria as âncoras sem aviso.
- **As recriações de dashboard** (`components/projects/mockup/`): são componentes
  React, não conteúdo. Um projeto novo criado pelo painel simplesmente não exibe
  mockup até que alguém escreva o dele.

## Como adicionar um novo projeto

Pelo painel: **Projetos → Add**, preencher os campos e salvar. O card na home e a
página `/projetos/[slug]` são gerados automaticamente. O campo "Ordem" define a
posição no grid, e "Aba" escolhe entre Profissionais e Pessoais.

Sempre revise a seção "Regras de confidencialidade" e "Regra de autenticidade" no
`content/PORTFOLIO_CONTEUDO.md` antes de publicar um novo case — o painel não impõe
essas regras sozinho.

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
