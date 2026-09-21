/**
 * Formato dos arquivos em `content/`, como o Keystatic os grava.
 *
 * Por que este arquivo existe: ao importar um `.json`, o TypeScript infere o
 * tipo a partir do **conteúdo atual do arquivo**. Como o Keystatic remove a
 * chave inteira quando um campo de texto fica vazio, limpar um campo pelo
 * painel fazia o build quebrar com "Property 'x' does not exist" — ou seja, o
 * deploy falhava por causa de uma edição legítima de conteúdo.
 *
 * Declarando as formas aqui e fazendo o cast na importação, o tipo passa a ser
 * estável: não depende de quais chaves existem no arquivo hoje. Todo campo é
 * opcional de propósito; os mapeadores em `data/` aplicam os padrões.
 */

/** Texto que pode vir ausente (chave removida), nulo ou vazio. */
type Texto = string | null | undefined;

/** Lista que pode vir ausente. */
type Lista<T> = T[] | null | undefined;

export type ConteudoIdentidade = {
  nome?: Texto;
  cargo?: Texto;
  email?: Texto;
  localizacao?: Texto;
  linkedin?: Texto;
  github?: Texto;
};

export type ConteudoHero = {
  primeiroNome?: Texto;
  sobrenome?: Texto;
  saudacao?: Texto;
  manchete?: Lista<Texto>;
  texto?: Texto;
};

export type ConteudoSobre = {
  titulo?: Texto;
  olho?: Texto;
  foto?: Texto;
  paragrafos?: Lista<Texto>;
  numeros?: Lista<{ rotulo?: Texto; valor?: Texto }>;
  trajetoria?: Lista<{ titulo?: Texto; descricao?: Texto }>;
};

export type ConteudoContato = {
  titulo?: Texto;
  olho?: Texto;
  apoio?: Texto;
};

export type ConteudoImpacto = {
  itens?: Lista<Texto>;
};

export type ConteudoHabilidades = {
  grupos?: Lista<{
    titulo?: Texto;
    /** Chave do ícone (vem de um select no painel). */
    id?: Texto;
    habilidades?: Lista<Texto>;
  }>;
};

export type ConteudoResponsabilidades = {
  grupos?: Lista<{
    titulo?: Texto;
    curto?: Texto;
    /** Chave do ícone (vem de um select no painel). */
    id?: Texto;
    resumo?: Texto;
  }>;
};

export type ConteudoProjetos = {
  projetos?: Lista<{
    nome?: Texto;
    slug?: Texto;
    ordem?: number | null;
    tipo?: Texto;
    categoria?: Texto;
    capaImagem?: Texto;
    usuarios?: Lista<Texto>;
    resumo?: Texto;
    avisoConfidencialidade?: boolean | null;
    contexto?: Texto;
    problema?: Texto;
    objetivo?: Texto;
    abordagem?: Texto;
    dados?: Texto;
    tecnologias?: Lista<Texto>;
    kpis?: Lista<Texto>;
    uso?: Texto;
    resultado?: Texto;
    aprendizado?: Texto;
    impacto?: Lista<Texto>;
  }>;
};
