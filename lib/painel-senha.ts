import { randomBytes, scrypt, timingSafeEqual, type ScryptOptions } from "node:crypto";

/**
 * Senha do painel: derivação e verificação com scrypt.
 *
 * A senha nunca é guardada — nem no repositório, nem no `.env.local`, nem nas
 * variáveis da Vercel. O que fica armazenado é `PAINEL_SENHA_HASH`, no formato
 * `scrypt:N:r:p:sal:hash`. Quem obtiver esse valor (vazamento de env, print do
 * painel da Vercel, log) ainda precisaria quebrar o scrypt para chegar na
 * senha — e com uma senha longa e aleatória isso é inviável.
 *
 * O separador é `:` e não o `$` convencional (bcrypt/PHC) de propósito: o
 * carregador de `.env` do Next faz expansão de variáveis, então `$32768` virava
 * string vazia e o hash chegava aqui truncado em `"scrypt"` — com o login
 * recusando a senha certa. Não troque para `$`.
 *
 * Por que scrypt e não SHA-256: hash de senha precisa ser *lento* e caro em
 * memória, justamente para inviabilizar força bruta offline. SHA-256 é rápido
 * demais para esse fim. O scrypt vem do próprio Node, sem dependência nova.
 *
 * Este módulo é Node-only (usa `node:crypto`). Não pode ser importado pelo
 * `proxy.ts`, que roda no runtime Edge — lá só existe Web Crypto. Por isso a
 * sessão (HMAC) vive em `lib/painel-auth.ts`, separada daqui.
 */

/**
 * `scrypt` em forma de Promise.
 *
 * Feito à mão em vez de `promisify` porque o `promisify` resolve para a
 * sobrecarga sem `options` do `scrypt`, e é justamente nas options que vão os
 * parâmetros de custo. Também é assíncrono de propósito: `scryptSync` travaria
 * o event loop por ~100ms a cada tentativa de login.
 */
function derivar(
  senha: string,
  sal: Buffer,
  tamanho: number,
  opcoes: ScryptOptions,
): Promise<Buffer> {
  return new Promise((resolver, rejeitar) => {
    scrypt(senha, sal, tamanho, opcoes, (erro, chave) => {
      if (erro) rejeitar(erro);
      else resolver(chave);
    });
  });
}

/** Custo de CPU/memória. 2^15 usa ~32 MB e leva ~100ms — imperceptível no
 *  login, caríssimo para quem tenta bilhões de tentativas offline. */
const N = 32768;
const R = 8;
const P = 1;
const TAMANHO_SAL = 16;
const TAMANHO_HASH = 32;

/** Teto de memória por derivação. Protege contra um `PAINEL_SENHA_HASH`
 *  adulterado pedir parâmetros absurdos e derrubar a função por OOM. */
const MAX_MEM = 96 * 1024 * 1024;

/** Acima disso não é senha, é tentativa de fazer o servidor gastar CPU. */
export const TAMANHO_MAXIMO_SENHA = 512;

const FORMATO = /^scrypt:(\d+):(\d+):(\d+):([0-9a-f]+):([0-9a-f]+)$/;

/**
 * Gera o valor de `PAINEL_SENHA_HASH` para uma senha.
 * Usado pelo script `scripts/gerar-senha-hash.mjs` — não pelo runtime do site.
 */
export async function gerarHashDeSenha(senha: string): Promise<string> {
  const sal = randomBytes(TAMANHO_SAL);
  const hash = await derivar(senha.normalize("NFKC"), sal, TAMANHO_HASH, {
    N,
    r: R,
    p: P,
    maxmem: MAX_MEM,
  });

  return `scrypt:${N}:${R}:${P}:${sal.toString("hex")}:${hash.toString("hex")}`;
}

/**
 * Confere a senha enviada contra o hash armazenado.
 *
 * Nunca lança: qualquer entrada fora do esperado (hash malformado, parâmetros
 * fora de faixa, senha gigante) vira `false`. Lançar aqui viraria um 500 que
 * distingue "hash quebrado" de "senha errada" para quem está sondando.
 */
export async function senhaConfere(senha: string, armazenado: string): Promise<boolean> {
  if (typeof senha !== "string" || senha.length === 0) return false;
  if (senha.length > TAMANHO_MAXIMO_SENHA) return false;

  const partes = FORMATO.exec(armazenado);
  if (!partes) return false;

  const n = Number(partes[1]);
  const r = Number(partes[2]);
  const p = Number(partes[3]);
  const sal = Buffer.from(partes[4]!, "hex");
  const esperado = Buffer.from(partes[5]!, "hex");

  // Faixas sãs: fora delas o scrypt ou fica fraco demais ou estoura a memória.
  const parametrosOk =
    Number.isInteger(n) &&
    n >= 16384 &&
    n <= 1048576 &&
    (n & (n - 1)) === 0 &&
    Number.isInteger(r) &&
    r >= 1 &&
    r <= 32 &&
    Number.isInteger(p) &&
    p >= 1 &&
    p <= 16 &&
    sal.length >= 8 &&
    esperado.length >= 16;

  if (!parametrosOk) return false;
  if (128 * n * r > MAX_MEM) return false;

  try {
    const calculado = await derivar(senha.normalize("NFKC"), sal, esperado.length, {
      N: n,
      r,
      p,
      maxmem: MAX_MEM,
    });

    // timingSafeEqual exige mesmo tamanho; o `esperado.length` acima garante.
    return timingSafeEqual(calculado, esperado);
  } catch {
    return false;
  }
}
