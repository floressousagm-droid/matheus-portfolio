import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { COOKIE_SESSAO, sessaoValida } from "@/lib/painel-auth";

/**
 * Portão do painel de edição.
 *
 * Roda antes de qualquer rota do painel, então nem o HTML do Keystatic chega ao
 * visitante sem sessão. Vale tanto para as páginas quanto para a API — é a API
 * que grava, então deixá-la de fora anularia a proteção.
 *
 * Falha fechado: sem `PAINEL_SEGREDO`/`PAINEL_SENHA` configurados em produção,
 * o painel responde 404 em vez de ficar acessível.
 *
 * Em desenvolvimento sem senha configurada o portão fica desligado, para não
 * atrapalhar a edição local. Definir `PAINEL_SENHA` no `.env.local` liga o
 * portão também localmente, o que serve para testar o fluxo de login.
 *
 * Observação: no Next 16 este arquivo se chama `proxy.ts` — `middleware.ts` foi
 * descontinuado.
 */
export const config = {
  matcher: ["/keystatic/:path*", "/api/keystatic/:path*"],
};

export async function proxy(request: NextRequest) {
  const segredo = process.env.PAINEL_SEGREDO;
  const senha = process.env.PAINEL_SENHA;
  const emProducao = process.env.NODE_ENV === "production";

  // Sem configuração, o painel não existe em produção.
  if (!segredo || !senha) {
    if (emProducao) return new NextResponse("Not Found", { status: 404 });
    return NextResponse.next();
  }

  const cookie = request.cookies.get(COOKIE_SESSAO)?.value;
  if (await sessaoValida(cookie, segredo)) return NextResponse.next();

  // A API responde 401 seco; a página manda para o login e volta depois.
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return new NextResponse("Não autorizado", { status: 401 });
  }

  const login = new URL("/painel/login", request.url);
  login.searchParams.set("de", request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.redirect(login);
}
