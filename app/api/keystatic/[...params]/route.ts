import { makeRouteHandler } from "@keystatic/next/route-handler";

import config from "@/keystatic.config";

/**
 * Guarda de segurança do painel.
 *
 * Sem `NEXT_PUBLIC_GITHUB_REPO`, o Keystatic cairia para o armazenamento
 * "local", que **não tem autenticação nenhuma**: expõe
 * `POST /api/keystatic/update` para qualquer visitante. Isso é o comportamento
 * certo em desenvolvimento e inaceitável em produção.
 *
 * Em produção sem a variável, o painel inteiro responde 404 em vez de virar um
 * editor aberto. `makeRouteHandler` só é construído quando o painel está
 * disponível — chamá-lo sem as chaves do GitHub lança erro e derrubaria o build
 * do site inteiro, não só do painel.
 *
 * Atenção: `NEXT_PUBLIC_*` é embutido em build time, então a variável precisa
 * existir em TODOS os ambientes da Vercel (inclusive Preview), não só em
 * Production. Ver README, "Painel de edição".
 */
const painelDisponivel =
  process.env.NODE_ENV !== "production" || Boolean(process.env.NEXT_PUBLIC_GITHUB_REPO);

const handlers = painelDisponivel ? makeRouteHandler({ config }) : null;
const naoEncontrado = () => new Response("Not Found", { status: 404 });

export const GET = handlers?.GET ?? naoEncontrado;
export const POST = handlers?.POST ?? naoEncontrado;
