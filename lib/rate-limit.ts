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

/** Descobre o IP de origem atrás do proxy da Vercel. */
export function ipDaRequisicao(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
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
