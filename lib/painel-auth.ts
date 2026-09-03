/**
 * Sessão do painel de edição.
 *
 * O cookie guarda apenas a data de expiração, assinada com HMAC-SHA256. Não há
 * banco nem estado no servidor: a assinatura é o que prova que a sessão foi
 * emitida por nós, e a data embutida é o que a faz expirar.
 *
 * Usa Web Crypto (e não o `crypto` do Node) porque o `proxy.ts` do Next roda no
 * runtime Edge, onde o módulo do Node não existe.
 */

export const COOKIE_SESSAO = "painel-sessao";

/** Quanto tempo a sessão dura antes de pedir a senha de novo. */
export const DURACAO_SESSAO_MS = 7 * 24 * 60 * 60 * 1000;

const codificador = new TextEncoder();

async function importarChave(segredo: string) {
  return crypto.subtle.importKey(
    "raw",
    codificador.encode(segredo),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

function paraHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Comparação em tempo constante.
 *
 * Um `===` normal para de comparar no primeiro caractere diferente, e essa
 * diferença de tempo vaza informação sobre a senha. Aqui todos os caracteres
 * são sempre percorridos.
 */
export function comparacaoSegura(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diferenca = 0;
  for (let i = 0; i < a.length; i += 1) {
    diferenca |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diferenca === 0;
}

/** Cria o valor do cookie: `expiraEm.assinatura`. */
export async function criarSessao(segredo: string, agora = Date.now()): Promise<string> {
  const expiraEm = agora + DURACAO_SESSAO_MS;
  const chave = await importarChave(segredo);
  const assinatura = await crypto.subtle.sign(
    "HMAC",
    chave,
    codificador.encode(String(expiraEm)),
  );
  return `${expiraEm}.${paraHex(assinatura)}`;
}

/** Verifica assinatura e validade. Qualquer coisa fora do formato é rejeitada. */
export async function sessaoValida(
  valor: string | undefined,
  segredo: string,
  agora = Date.now(),
): Promise<boolean> {
  if (!valor) return false;

  const separador = valor.indexOf(".");
  if (separador <= 0) return false;

  const expiraEm = Number(valor.slice(0, separador));
  if (!Number.isFinite(expiraEm) || expiraEm <= agora) return false;

  const chave = await importarChave(segredo);
  const esperada = await crypto.subtle.sign(
    "HMAC",
    chave,
    codificador.encode(String(expiraEm)),
  );

  return comparacaoSegura(valor.slice(separador + 1), paraHex(esperada));
}
