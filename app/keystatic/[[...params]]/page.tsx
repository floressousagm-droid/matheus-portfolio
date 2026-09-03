"use client";

import { notFound } from "next/navigation";
import { makePage } from "@keystatic/next/ui/app";

import config from "@/keystatic.config";

// Mesma regra da rota de API (ver o comentário lá). O acesso em si é barrado
// antes, pelo proxy.ts — isto evita servir o painel em modo local por engano.
const painelDisponivel =
  process.env.NODE_ENV !== "production" || Boolean(process.env.NEXT_PUBLIC_GITHUB_REPO);

export default painelDisponivel ? makePage(config) : () => notFound();
