import { NextResponse } from "next/server";

import {
  COOKIE_SESSAO,
  DURACAO_SESSAO_MS,
  comparacaoSegura,
  criarSessao,
} from "@/lib/painel-auth";
import { excedeuLimite, ipDaRequisicao } from "@/lib/rate-limit";

export const runtime = "nodejs";

// Apertado de propósito: é um endpoint de senha, e o dono só precisa acertar
// uma vez. Cinco tentativas erradas por IP a cada 15 minutos.
const LIMITE = { max: 5, janelaMs: 15 * 60 * 1000 };

export async function POST(request: Request) {
  const senhaEsperada = process.env.PAINEL_SENHA;
  const segredo = process.env.PAINEL_SEGREDO;

  // Sem configuração o painel não existe — mesma resposta do proxy, para não
  // revelar que a rota está ali.
  if (!senhaEsperada || !segredo) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const ip = ipDaRequisicao(request);
  if (excedeuLimite(`login:${ip}`, LIMITE)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em alguns minutos." },
      { status: 429 },
    );
  }

  let corpo: unknown;
  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const { senha } = (corpo ?? {}) as Record<string, unknown>;
  if (typeof senha !== "string" || !comparacaoSegura(senha, senhaEsperada)) {
    // Mensagem genérica: não diz se o problema foi formato, tamanho ou valor.
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  const resposta = NextResponse.json({ ok: true });
  resposta.cookies.set({
    name: COOKIE_SESSAO,
    value: await criarSessao(segredo),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DURACAO_SESSAO_MS / 1000,
  });
  return resposta;
}
