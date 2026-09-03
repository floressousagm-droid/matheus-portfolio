import { NextResponse } from "next/server";

import { COOKIE_SESSAO } from "@/lib/painel-auth";

export const runtime = "nodejs";

/** Encerra a sessão do painel apagando o cookie. */
export async function POST() {
  const resposta = NextResponse.json({ ok: true });
  resposta.cookies.set({
    name: COOKIE_SESSAO,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return resposta;
}
