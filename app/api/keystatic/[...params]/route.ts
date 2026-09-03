import { makeRouteHandler } from "@keystatic/next/route-handler";

import config from "@/keystatic.config";

/**
 * Segunda camada de proteção do painel.
 *
 * A primeira é o `proxy.ts`, que exige sessão antes desta rota rodar. Esta aqui
 * cobre o outro risco: sem `NEXT_PUBLIC_GITHUB_REPO`, o Keystatic cairia para o
 * armazenamento local, que grava **sem autenticação nenhuma**. Adequado na sua
 * máquina, inaceitável em produção.
 *
 * `makeRouteHandler` só é construído quando o painel está disponível — chamá-lo
 * em modo GitHub sem as chaves lança erro e derrubaria o build do site inteiro,
 * não só do painel.
 */
const painelDisponivel =
  process.env.NODE_ENV !== "production" || Boolean(process.env.NEXT_PUBLIC_GITHUB_REPO);

const handlers = painelDisponivel ? makeRouteHandler({ config }) : null;
const naoEncontrado = () => new Response("Not Found", { status: 404 });

export const GET = handlers?.GET ?? naoEncontrado;
export const POST = handlers?.POST ?? naoEncontrado;
