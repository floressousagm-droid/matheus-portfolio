"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Link para o início (usado na logo do header e na do rodapé).
 *
 * Já na home, clicar num `<Link href="/">` não navega — é a mesma rota — e o
 * Next não reseta o scroll, então o clique fica sem efeito nenhum. Nesse caso
 * levamos ao topo manualmente. Fora da home, é uma navegação normal.
 *
 * Existe como componente compartilhado justamente para que header e rodapé não
 * se comportem de formas diferentes.
 */
export function LinkInicio({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      onClick={(event) => {
        if (pathname !== "/") return;
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={className}
    >
      {children}
    </Link>
  );
}
