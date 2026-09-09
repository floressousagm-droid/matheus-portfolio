import { NotFoundView } from "@/components/not-found-view";

/**
 * 404 para URLs que não casam com rota nenhuma (ex.: /qualquer-coisa).
 *
 * Precisa estar na raiz de `app/`: um not-found dentro de um route group, como
 * `app/(site)/not-found.tsx`, só atende às rotas daquele grupo. Sem este
 * arquivo o visitante caía no 404 padrão do Next, sem link de volta ao site.
 */
export default function NotFound() {
  return <NotFoundView />;
}
