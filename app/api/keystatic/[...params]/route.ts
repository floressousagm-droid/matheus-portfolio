import { makeRouteHandler } from "@keystatic/next/route-handler";

import config from "@/keystatic.config";

/**
 * O painel só existe em desenvolvimento.
 *
 * O armazenamento é local (grava direto nos arquivos), o que **não tem
 * autenticação nenhuma**: em um site público isso deixaria
 * `POST /api/keystatic/update` aberto para qualquer visitante. Por isso, em
 * produção, todas as rotas do painel respondem 404.
 *
 * O fluxo de publicação é: editar local → commitar → push → a Vercel republica.
 */
const emDesenvolvimento = process.env.NODE_ENV !== "production";

const handlers = emDesenvolvimento ? makeRouteHandler({ config }) : null;
const naoEncontrado = () => new Response("Not Found", { status: 404 });

export const GET = handlers?.GET ?? naoEncontrado;
export const POST = handlers?.POST ?? naoEncontrado;
