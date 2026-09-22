"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Valida que `valor` é um caminho interno de verdade, não uma forma disfarçada
 * de sair do site.
 *
 * `destino.startsWith("/")` sozinho não basta: "//evil.com" e "/\evil.com"
 * também começam com "/", mas o navegador os resolve como URL protocol-relative
 * para outro domínio (herda o protocolo atual). Como o valor vem da query
 * string — e portanto pode ter sido montado por quem mandou o link, não só
 * gerado pelo `proxy.ts` — um link `/painel/login?de=//phishing.com` faria o
 * dono do site logar de verdade (a senha vai pro domínio certo) e só depois
 * ser redirecionado pro domínio do atacante.
 */
function caminhoInternoSeguro(valor: string | null): string | null {
  if (!valor || !valor.startsWith("/")) return null;
  if (valor.startsWith("//") || valor.startsWith("/\\")) return null;
  return valor;
}

/**
 * Login do painel de edição.
 *
 * Fica fora do route group `(site)` de propósito: não deve herdar o rodapé nem
 * o menu do portfólio. Quem chega aqui foi redirecionado pelo `proxy.ts`.
 */
export default function LoginDoPainel() {
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEnviando(true);
    setErro(null);

    const dados = new FormData(evento.currentTarget);

    try {
      const resposta = await fetch("/api/painel/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha: dados.get("senha") }),
      });

      if (!resposta.ok) {
        const corpo = (await resposta.json().catch(() => ({}))) as { error?: string };
        setErro(corpo.error ?? "Não foi possível entrar.");
        setEnviando(false);
        return;
      }

      // Recarrega no destino para o proxy revalidar o cookie recém-criado.
      const destino = new URLSearchParams(window.location.search).get("de");
      window.location.href = caminhoInternoSeguro(destino) ?? "/keystatic";
    } catch {
      setErro("Falha de conexão. Tente novamente.");
      setEnviando(false);
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-(--color-surface-0) px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full border border-(--color-surface-border) bg-(--color-surface-2) text-(--color-accent-300)">
            <Lock className="size-4" aria-hidden />
          </span>
          <div>
            <h1 className="text-lg font-semibold text-(--color-ink-0)">Painel de edição</h1>
            <p className="text-sm text-(--color-ink-3)">Acesso restrito</p>
          </div>
        </div>

        <form onSubmit={aoEnviar} className="mt-8">
          <label
            htmlFor="senha"
            className="text-xs tracking-wide text-(--color-ink-2) uppercase"
          >
            Senha
          </label>
          <input
            id="senha"
            name="senha"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            className="mt-2 w-full rounded-(--radius-card) border border-(--color-surface-border) bg-(--color-surface-2) px-4 py-2.5 text-sm text-(--color-ink-0) outline-none transition-colors placeholder:text-(--color-ink-3) focus:border-(--color-accent-500)"
          />

          <Button type="submit" disabled={enviando} className="mt-4 w-full">
            {enviando ? <Loader2 className="animate-spin" aria-hidden /> : null}
            {enviando ? "Entrando..." : "Entrar"}
          </Button>

          <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm">
            {erro ? <span className="text-red-400">{erro}</span> : null}
          </p>
        </form>
      </div>
    </main>
  );
}
