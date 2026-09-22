/**
 * Rate limit por IP, em memória.
 *
 * Ressalva honesta: em serverless a memória é por instância, então isso não é
 * uma barreira forte — instâncias novas começam com o contador zerado. Ainda
 * assim corta o caso real (um script em loop reusa a mesma instância quente) e
 * não exige serviço externo. Se algum endpoint virar alvo de verdade, trocar
 * por um contador compartilhado (Vercel KV / Upstash).
 */

type Balde = { marcas: number[] };

const baldes = new Map<string, Balde>();

/**
 * Descobre o IP de origem atrás do proxy da Vercel.
 *
 * `x-vercel-forwarded-for` é escrito pela borda da Vercel a partir da conexão
 * TCP real — o cliente não consegue sobrescrevê-lo. Não usar `x-forwarded-for`
 * como fonte confiável: é um cabeçalho que o próprio cliente pode enviar, e a
 * Vercel *anexa* o IP real a ele em vez de substituí-lo, então o primeiro
 * valor da lista pode continuar sendo o que o requisitante escreveu — um
 * atacante manda um `X-Forwarded-For` diferente a cada tentativa de login e
 * contorna o rate limit por completo, já que cada valor cria um balde novo.
 */
export function ipDaRequisicao(request: Request): string {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "desconhecido"
  );
}

export function excedeuLimite(
  chave: string,
  { max, janelaMs }: { max: number; janelaMs: number },
): boolean {
  const agora = Date.now();
  const recentes = (baldes.get(chave)?.marcas ?? []).filter((t) => agora - t < janelaMs);

  if (recentes.length >= max) {
    baldes.set(chave, { marcas: recentes });
    return true;
  }

  recentes.push(agora);
  baldes.set(chave, { marcas: recentes });

  // Impede o Map de crescer sem limite na instância.
  if (baldes.size > 1000) {
    for (const [k, balde] of baldes) {
      if (balde.marcas.every((t) => agora - t >= janelaMs)) baldes.delete(k);
    }
  }

  return false;
}
