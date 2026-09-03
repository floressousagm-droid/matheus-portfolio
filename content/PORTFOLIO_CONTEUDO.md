# Conteúdo do Portfólio — Matheus Flores

> Documento de base narrativa e arquitetura de informação. Este material define o
> conteúdo definitivo do portfólio (textos, estrutura, ordem das seções e regras
> de extensão). Nenhuma informação aqui foi inventada — tudo vem do que Matheus
> informou. Onde ainda não há informação (ex.: LinkedIn, GitHub, currículo), o
> campo é marcado como **[a preencher]** em vez de recebido um valor fictício.
>
> Este documento é a fonte de verdade usada para gerar os arquivos de dados do
> código (`data/*.ts`). Qualquer alteração de conteúdo deve começar aqui.

---

## Sumário

01. Apresentação (Hero)
02. Sobre
03. O que faço
04. Como trabalho *(removida do site atual — texto mantido para referência)*
05. Projetos
06. Habilidades
07. IA aplicada
08. Minha visão sobre BI *(removida do site atual — texto mantido para referência)*
09. Objetivo profissional *(removida do site atual — texto mantido para referência)*
10. Contato

---

## 01 — Apresentação (Hero)

**Saudação:** Olá, me chamo

**Nome:** Matheus Flores

**Cargo:** Analista de BI Júnior

**Posicionamento (headline principal):**

> Entendo o problema. Estruturo os dados. Construo a solução.

**Subtexto de apoio (contextualiza a atuação atual):**

> Analista de BI Jr. com atuação no desenvolvimento de modelos de dados,
> processos de ETL, análise de dados e construção de análises com Power BI.
> Transformo dados e necessidades de negócio em soluções analíticas objetivas,
> buscando simplificar processos, automatizar informações e gerar insights que
> apoiem decisões do dia a dia.

Esse subtexto é intencionalmente factual: comunica amplitude de atuação sem
adjetivar senioridade.

O hero não exibe links de contato — o CTA é só "Ver projetos". E-mail,
LinkedIn e GitHub ficam na seção de Contato (ver seção 11).

---

## 02 — Sobre

**Diretriz de tom:** humano, profissional, sem autobiografia longa e sem frases
genéricas ("sou apaixonado por dados", "profissional data-driven"). O texto
comunica evolução, contexto e posicionamento — não uma lista de qualidades.

### Texto principal

Antes do BI, Matheus teve contato com desenvolvimento web e se formou em
Desenvolvimento de Software Multiplataforma. Ao longo da formação e dos
projetos que desenvolveu, percebeu que seu interesse estava menos no
desenvolvimento tradicional e mais em entender problemas e usar dados para
resolvê-los.

Foi no BI que encontrou essa combinação entre tecnologia, análise e negócio.
A primeira oportunidade profissional de Matheus veio diretamente como
Analista de BI Júnior, após já ter desenvolvido projetos relacionados à área.

Hoje, Matheus atua em diferentes etapas do ciclo de BI, da estruturação e
transformação dos dados à modelagem, indicadores e dashboards, buscando
transformar problemas reais em soluções que apoiem decisões.

### Marcos da trajetória (linha do tempo editorial)

Usar como sequência narrativa visual na seção Sobre — cada marco é um ponto,
não um texto longo:

1. **Desenvolvimento** — contato inicial com programação e desenvolvimento web.
2. **Estudos** — graduação em Desenvolvimento de Software Multiplataforma;
   percepção de que o interesse real estava em dados e problemas de negócio,
   não em desenvolvimento de software tradicional.
3. **BI** — decisão de direcionar a trajetória para Business Intelligence, por
   unir tecnologia, análise, raciocínio e negócio.
4. **Primeiro projeto real** — primeira experiência profissional como
   Analista de BI Júnior; primeiro contato com dados, usuários e decisões
   reais.
5. **Responsabilidade pelo ciclo completo** — responsabilidade por diferentes
   etapas das soluções de BI, da necessidade à entrega e manutenção.
6. **Evolução contínua** — aprendizado constante, uso de IA como ferramenta de
   produtividade, objetivo de caminhar para Pleno e, depois, Sênior.

### Dados resumidos (para uso em destaques visuais, não em barras de progresso)

- Experiência profissional em BI: **8 meses**
- Forma de atuação: Analista Júnior de BI
- Formação anterior: Desenvolvimento de Software Multiplataforma

---

## 03 — O que faço

**Enquadramento da seção:** Matheus atua em praticamente todas as etapas do
ciclo de vida de uma solução de BI. Isso é apresentado como responsabilidade
prática do dia a dia, não como alegação de domínio sênior sobre cada etapa.

As responsabilidades estão organizadas em categorias. Cada categoria deve
aparecer como um grupo visualmente distinto (ver seção correspondente no
documento de design), não como uma lista corrida de tarefas.

### Entendimento do negócio
- Conversa com gestores e usuários.
- Entende a dor da área.
- Define o que precisa ser respondido.
- Identifica como os dados podem ajudar.

### Dados
- Busca informações em fontes como SQL e SAP Business One.
- Trabalha com dados estruturados.
- Utiliza views existentes e também constrói estruturas reutilizáveis.

### ETL / ELT
- Trata e prepara os dados.
- Padroniza informações.
- Resolve problemas de qualidade e estrutura antes da construção dos
  indicadores.

### Modelagem
- Trabalha com fatos e dimensões.
- Estrutura modelos dimensionais.
- Define relacionamentos e organização dos dados.

### Métricas e regras
- Define regras de negócio.
- Cria medidas em DAX.
- Desenvolve KPIs.
- Estrutura indicadores de acordo com o problema que precisa ser respondido.

### Visualização
- Organiza informações de acordo com boas práticas.
- Utiliza storytelling.
- Utiliza Figma para estruturar layouts de dashboards.
- Busca facilitar a interpretação e a tomada de decisão.

### Validação
- Compara os resultados com o banco/origem.
- Investiga divergências.
- Verifica se os problemas vêm de modelagem, regras ou fonte.
- Faz uma revisão completa antes da entrega.

### Publicação e sustentação
- Publica dashboards.
- Gerencia workspace.
- Configura atualizações.
- Trabalha com RLS em determinados relatórios.
- Presta suporte.
- Corrige problemas.
- Monitora os relatórios após a entrega.

### Automação
- Automatiza algumas rotinas.
- Mantém relatórios com atualizações automatizadas.
- Participa da geração de informações diárias para a diretoria.
- Utiliza IA para aumentar produtividade e acelerar tarefas.

---

## 04 — Como trabalho

> **Status: removida do site atual a pedido do Matheus.** O texto abaixo fica
> guardado aqui caso ele queira reativar a seção mais adiante — não está sendo
> renderizado no código nem na prévia no momento.

O objetivo desta seção era deixar claro que o dashboard é uma consequência de
um processo, não o ponto de partida.

**Fluxo:**

```
Entendimento → Problema → Dados → ETL/ELT → Modelagem → Regras → KPIs →
Storytelling → Validação → Entrega → Evolução
```

### 01 — Entendimento
Antes de começar qualquer projeto, Matheus conversa com o responsável pela
área para compreender a necessidade. O objetivo não é simplesmente perguntar
"qual dashboard você quer?", e sim entender qual é a dor, por que ela existe,
o que precisa ser acompanhado, quem vai usar a informação e qual decisão
precisa ser tomada.

### 02 — Definição do problema
A necessidade inicial é transformada em perguntas de negócio. A prioridade é
entender **qual pergunta precisa ser respondida** antes de definir **qual
gráfico será usado**.

### 03 — Dados
Depois do problema definido, são identificadas as fontes necessárias: SQL,
SAP Business One, bases estruturadas existentes ou outras fontes que o
projeto exigir.

### 04 — ETL / ELT
Antes da criação dos indicadores, os dados são tratados e preparados. Essa
etapa é parte fundamental da confiabilidade da solução — não é um detalhe
técnico secundário.

### 05 — Modelagem
Os dados são organizados em modelos dimensionais, com fatos e dimensões, para
permitir análises consistentes e reutilizáveis.

### 06 — Regras de negócio e métricas
Somente depois de entender o problema, os dados e as regras é que os
indicadores são construídos. O KPI não é o ponto de partida: é consequência
da definição correta do problema.

### 07 — Storytelling
A informação é organizada para que o usuário consiga entender o contexto,
identificar o que aconteceu, perceber mudanças relevantes, encontrar pontos de
atenção e chegar à informação necessária.

> "Dados contam histórias e precisam estar organizados como um livro, com
> começo, meio e fim."

Usar essa frase com moderação — ela explica a filosofia de visualização de
Matheus, não é um slogan a ser repetido em toda a página.

### 08 — Validação
Antes da publicação: os dados são comparados com a fonte, as medidas são
verificadas, as regras são revisadas, e o dashboard é analisado como se
Matheus fosse o usuário final.

### 09 — Entrega
Depois da validação: o dashboard é publicado, os acessos são configurados, a
segurança é configurada quando necessário, as atualizações são configuradas e
os usuários recebem acesso à solução.

### 10 — Evolução
A entrega não é o fim. Matheus acompanha os relatórios, recebe feedback,
investiga inconsistências e faz melhorias quando elas realmente agregam
valor.

---

## 05 — Projetos

**Regra de arquitetura (obrigatória):** a seção de projetos precisa ser
modular e expansível. A estrutura de dados não pode depender de uma
quantidade fixa de cases — hoje há um projeto documentado, e a mesma estrutura
de campos deve suportar qualquer número de projetos futuros sem alterações na
arquitetura do site.

**Formato padrão de cada projeto:**

| Campo | Descrição |
|---|---|
| Nome | Nome do projeto/case |
| Contexto | Qual era a situação? |
| Problema | Qual problema precisava ser resolvido? |
| Objetivo | O que a solução precisava permitir? |
| Abordagem | Como Matheus pensou e construiu a solução? |
| Dados | Quais fontes foram utilizadas? |
| Tecnologias | Quais ferramentas participaram? |
| KPIs / análises | Quais indicadores ou análises foram relevantes? |
| Resultado | O que mudou para os usuários? (qualitativo, sem números não informados) |
| Aprendizado | O que Matheus desenvolveu profissionalmente com o projeto? |

**Regra de confidencialidade:** os projetos são reais, desenvolvidos em
ambiente de trabalho, e podem envolver dados internos da empresa. O conteúdo
público deve descrever problema, processo, arquitetura, metodologia, KPIs em
termos gerais, decisões e aprendizados — nunca dados sensíveis, valores
financeiros internos, clientes identificáveis ou estruturas internas que não
possam ser publicadas. Imagens, quando existirem, devem ser anonimizadas ou
recriadas.

**Regra de autenticidade:** nenhum número de resultado (percentual, tempo
economizado, ganho financeiro, produtividade, quantidade de usuários) pode
ser adicionado a um projeto sem que Matheus tenha informado esse número.
Resultados sem métrica confirmada são descritos qualitativamente.

### Projeto 01 — Vendas de Vendedores

**Contexto**
A área comercial precisava acompanhar a performance individual dos
vendedores, metas e evolução das vendas.

**Problema**
Gestores e vendedores não tinham uma forma clara de entender o desempenho
comercial e identificar rapidamente mudanças na performance.

**Usuários**
Gestores e vendedores.

**Objetivo**
Permitir que gestores e vendedores entendessem melhor o desempenho comercial
e identificassem rapidamente mudanças na performance.

**Abordagem / Desenvolvimento**
Matheus foi responsável pelo projeto de ponta a ponta: entendimento do
problema, levantamento das necessidades, estruturação dos dados, tratamento,
modelagem, criação de métricas, construção do dashboard, validação e entrega.

**Dados**
Dados de vendas provenientes do SAP Business One.

**Tecnologias**
SQL · Power BI · Power Query · DAX · ETL · Modelagem dimensional · Claude
(apoio de IA no desenvolvimento).

**KPIs / análises principais**
Faturamento, metas, comparação mensal, comparação anual, variações,
desempenho individual, clientes, regiões, setores e períodos.

**Uso**
O usuário consegue acompanhar sua performance e comparar resultados com
períodos anteriores, além de explorar os dados por diferentes dimensões
(cliente, região, setor, período).

**Resultado**
O dashboard se tornou uma ferramenta importante para o acompanhamento de
vendas e metas. O principal impacto foi facilitar o acesso às informações e
permitir um acompanhamento mais frequente da performance comercial.

**Aprendizado**
O projeto aumentou a experiência de Matheus com análises voltadas a vendas,
metas e performance, além da definição de KPIs e do acompanhamento de
indicadores para tomada de decisão.

### Espaço para próximos projetos

A estrutura acima deve se repetir para cada novo case. Quando Matheus
adicionar um projeto novo, basta preencher os mesmos campos — nenhuma outra
parte do portfólio precisa ser redesenhada.

---

## 06 — Impacto dos projetos (transversal)

Impactos qualitativos já identificados, válidos para o projeto atual e como
padrão para os próximos, **sempre sem transformá-los em números**:

- Redução do tempo necessário para encontrar informações.
- Maior facilidade para acompanhamento diário.
- Centralização de informações.
- Maior disponibilidade de dados para gestores.
- Redução da necessidade de buscar informações manualmente.
- Maior agilidade na análise.

Proibido inventar: percentual de produtividade, horas economizadas, valor
financeiro, ROI, percentual de redução, número de usuários, quantidade de
decisões ou qualquer indicador não informado por Matheus.

---

## 07 — Habilidades

Sem barras de progresso, sem percentuais (ex.: "Power BI — 90%"). Organização
por área de conhecimento, com nível descrito apenas quando há distinção clara
entre "conheço" e "tenho experiência prática" — e, havendo dúvida, priorizar a
descrição mais conservadora.

### Linguagens e Banco de dados
- Python para análise de dados
- SQL para extração de dados
- R para modelagem estatística (aprendendo)
- Banco de dados SQLite, MySQL

### Visualização de dados e BI
Power BI · DAX · Power Query · ETL/ELT · Storytelling · Modelagem Dimensional

### Tecnologias Complementares
Excel · SharePoint · Figma · Git / GitHub · Claude AI · SAP Business One · API's

---

## 08 — IA aplicada

**Posicionamento correto (obrigatório respeitar):** IA aplicada à
produtividade e ao desenvolvimento de soluções de BI. Matheus **não** é
apresentado como especialista em inteligência artificial, não criou
ferramentas de IA próprias e não desenvolveu nenhuma plataforma própria.

### Como Matheus usa IA no trabalho
Matheus utiliza principalmente Claude (e outras ferramentas de IA) para:
- Auxiliar na criação de medidas.
- Analisar problemas.
- Investigar erros.
- Acelerar o desenvolvimento.
- Explorar soluções.
- Apoiar automações.
- Melhorar produtividade.
- Auxiliar na interação com ferramentas.

Ele utiliza **Claude com MCP integrado ao Power BI** no fluxo de trabalho.

### Fluxo conceitual da seção
```
Problema → IA → Ferramentas → Validação → Resultado
```

### Frase-guia (uso interno, não necessariamente literal na página)
> A ferramenta acelera o processo, mas o entendimento do problema, a validação
> e a decisão continuam sendo responsabilidade do profissional.

---

## 09 — Minha visão sobre BI

> **Status: removida do site atual a pedido do Matheus.** O texto abaixo fica
> guardado aqui caso ele queira reativar a seção mais adiante — não está sendo
> renderizado no código nem na prévia no momento.

**Mensagem central:**

> BI não é sobre criar gráficos. É sobre criar informação confiável que ajude
> alguém a tomar uma decisão.

**Princípios (cada um com uma linha de explicação, sem tom motivacional):**

- **Consistência** — dados confiáveis.
- **Contexto** — informação precisa fazer sentido.
- **Clareza** — o usuário precisa entender rapidamente.
- **Decisão** — o resultado deve ajudar alguém a agir.

**Complemento (uso opcional, tom mais direto):**

> Uma boa solução de BI não é a que possui mais gráficos. É a que possui dados
> confiáveis e consegue apoiar uma decisão real.

---

## 10 — Objetivo profissional

> **Status: removida do site atual a pedido do Matheus.** O texto abaixo fica
> guardado aqui caso ele queira reativar a seção mais adiante — não está sendo
> renderizado no código nem na prévia no momento.

**Diretriz:** apresentar como direção, não como promessa.

```
Hoje                    → Analista de BI Júnior
Próximo passo            → Analista Pleno
Direção                  → Especialização em BI e Dados
Interesse                → Mercado financeiro e ambientes de alta evolução
```

**Texto de apoio:**

O objetivo de Matheus é se tornar um especialista em BI e Dados. Ele busca
ambientes em constante evolução, com desafios reais, que permitam
desenvolvimento técnico e contato direto com problemas de negócio. O mercado
financeiro é uma área de interesse especial para sua trajetória futura — sem
que isso signifique limitar sua experiência apenas a esse setor. A visão de
Matheus é que um bom profissional de dados precisa conseguir compreender
diferentes contextos e setores, mesmo podendo desenvolver uma especialização
maior em determinada área. No horizonte de 2 a 3 anos, o objetivo é estar como
Analista Pleno, caminhando depois para uma posição Sênior e para uma
especialização mais profunda em BI e Dados.

---

## 11 — Contato

**Nome:** Matheus Flores
**Cargo:** Analista de BI Júnior
**Localização:** Taboão da Serra, São Paulo, Brasil
**E-mail:** matheus.sousagm@gmail.com
**LinkedIn:** https://www.linkedin.com/in/floresmatheus/
**GitHub:** https://github.com/Theussousa
**Currículo:** [a preencher]

**Encerramento (statement final, não um simples "entre em contato"):**

> Vamos transformar problemas em soluções orientadas por dados.

Este encerramento retoma o posicionamento do hero e fecha a narrativa do
portfólio (quem sou → o que faço → como penso → como trabalho → o que já
entreguei → o que sei → como utilizo IA → para onde estou indo → contato).

**Elementos exibidos na seção (a pedido do Matheus, apenas estes quatro):**

1. Botão de e-mail (`mailto:`).
2. Botão para o LinkedIn.
3. Botão para o GitHub.
4. Formulário de mensagem (nome, e-mail, mensagem) que envia direto para o
   e-mail do Matheus via Resend — ver `app/api/contact/route.ts` e a seção
   "Formulário de contato (Resend)" no `README.md` do projeto para o setup.

O link do currículo existe como dado (`identity.resumeUrl`) mas não é
exibido nesta seção atualmente — fica pronto para uso caso o Matheus queira
reintroduzi-lo em outro ponto do site no futuro.

---

## Regras de conteúdo (checklist a revisar antes de qualquer publicação)

- [ ] Nenhuma experiência, empresa, projeto, tecnologia, cargo, certificação,
      cliente ou número de impacto foi inventado.
- [ ] Nenhum percentual, valor financeiro, prazo economizado ou quantidade de
      usuários foi atribuído sem confirmação de Matheus.
- [ ] Nenhuma informação de projeto expõe dados sensíveis, financeiros
      internos ou identificação de clientes.
- [ ] O texto não posiciona Matheus como Pleno/Sênior nem como especialista em
      IA.
- [ ] Campos ainda não informados (atualmente só o currículo) aparecem como
      "[a preencher]", nunca com um valor fictício.
- [ ] O dashboard aparece como consequência de um processo, nunca como ponto
      de partida.
