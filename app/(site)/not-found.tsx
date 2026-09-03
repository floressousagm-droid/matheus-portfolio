import Link from "next/link";

export default function NotFound() {
  return (
    <main id="conteudo-principal" className="flex min-h-screen flex-col items-center justify-center gap-4 bg-(--color-surface-0) px-6 text-center text-(--color-ink-0)">
      <p className="font-mono text-sm text-(--color-ink-3)">404</p>
      <h1 className="text-2xl font-semibold">Página não encontrada</h1>
      <p className="max-w-md text-sm text-(--color-ink-2)">
        O conteúdo que você procura não existe ou foi movido.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-(--color-accent-500) px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-(--color-accent-600)"
      >
        Voltar para o início
      </Link>
    </main>
  );
}
