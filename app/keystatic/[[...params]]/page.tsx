"use client";

import { notFound } from "next/navigation";
import { makePage } from "@keystatic/next/ui/app";

import config from "@/keystatic.config";

// Mesma regra da rota de API (ver o comentário lá): o painel grava sem
// autenticação, então só existe em desenvolvimento.
const emDesenvolvimento = process.env.NODE_ENV !== "production";

export default emDesenvolvimento ? makePage(config) : () => notFound();
