"use client";

import { makePage } from "@keystatic/next/ui/app";

import config from "@/keystatic.config";

// Mesma guarda da rota de API (ver o comentário lá): em produção sem GitHub
// configurado, o painel não existe, em vez de virar um editor sem senha.
const painelDisponivel =
  process.env.NODE_ENV !== "production" || Boolean(process.env.NEXT_PUBLIC_GITHUB_REPO);

function PainelIndisponivel() {
  return (
    <main style={{ padding: "4rem 1.5rem", textAlign: "center", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: "1.25rem" }}>Painel não configurado</h1>
      <p style={{ marginTop: "0.5rem", opacity: 0.7 }}>
        Defina as variáveis do GitHub no ambiente para habilitar a edição. Veja o README.
      </p>
    </main>
  );
}

export default painelDisponivel ? makePage(config) : PainelIndisponivel;
