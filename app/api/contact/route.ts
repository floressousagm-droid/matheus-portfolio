import { NextResponse } from "next/server";
import { Resend } from "resend";

import { identity } from "@/data/site";

// Route Handler que recebe o formulário de contato e envia a mensagem por
// e-mail via Resend. Precisa da variável de ambiente RESEND_API_KEY
// configurada (veja README.md — seção "Formulário de contato (Resend)").
export const runtime = "nodejs";

// Endereço de remetente. O domínio de testes do Resend (onboarding@resend.dev)
// funciona sem nenhuma configuração extra, mas só entrega e-mails para o
// endereço cadastrado na conta Resend. Depois de verificar um domínio
// próprio na Resend, troque por algo como "Portfólio <contato@seudominio.com>".
const FROM_ADDRESS = "Portfólio <onboarding@resend.dev>";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Limites de tamanho: sem eles, o endpoint aceita um corpo de vários MB por
// requisição. Generosos para uso real, apertados para abuso.
const LIMITES = { nome: 100, email: 200, mensagem: 5000 } as const;

// Rate limit por IP, em memória.
//
// Ressalva honesta: em serverless a memória é por instância, então isso não é
// uma barreira forte — instâncias novas começam com o contador zerado. Ainda
// assim corta o caso real (um script em loop reusa a mesma instância quente) e
// não exige serviço externo. Se o formulário virar alvo de verdade, trocar por
// um contador compartilhado (Vercel KV / Upstash).
const JANELA_MS = 10 * 60 * 1000;
const MAX_POR_JANELA = 5;
const envios = new Map<string, number[]>();

function excedeuLimite(ip: string): boolean {
  const agora = Date.now();
  const recentes = (envios.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);

  if (recentes.length >= MAX_POR_JANELA) {
    envios.set(ip, recentes);
    return true;
  }

  recentes.push(agora);
  envios.set(ip, recentes);

  // Impede o Map de crescer sem limite na instância.
  if (envios.size > 1000) {
    for (const [chave, marcas] of envios) {
      if (marcas.every((t) => agora - t >= JANELA_MS)) envios.delete(chave);
    }
  }
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "desconhecido";

  if (excedeuLimite(ip)) {
    return NextResponse.json(
      { error: "Muitas mensagens em pouco tempo. Tente novamente mais tarde." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const { name, email, message, website } = (body ?? {}) as Record<string, unknown>;

  // Campo-armadilha (honeypot): fica invisível para pessoas, mas bots
  // costumam preencher todo campo de formulário que encontram.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.length > LIMITES.nome ||
    typeof email !== "string" ||
    !isValidEmail(email) ||
    email.length > LIMITES.email ||
    typeof message !== "string" ||
    message.trim().length < 10 ||
    message.length > LIMITES.mensagem
  ) {
    return NextResponse.json(
      { error: "Preencha nome, e-mail e mensagem corretamente." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY não configurada — veja README.md.");
    return NextResponse.json(
      { error: "Envio de e-mail ainda não configurado no servidor." },
      { status: 500 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: identity.email,
      replyTo: email,
      subject: `Novo contato pelo portfólio — ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    });

    if (error) {
      console.error("Erro ao enviar e-mail via Resend:", error);
      return NextResponse.json(
        { error: "Não foi possível enviar a mensagem agora." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erro inesperado ao enviar e-mail:", err);
    return NextResponse.json(
      { error: "Não foi possível enviar a mensagem agora." },
      { status: 500 },
    );
  }
}
