import { NotFoundView } from "@/components/not-found-view";

// Responde ao notFound() das rotas do site (ex.: /projetos/slug-inexistente).
export default function NotFound() {
  return <NotFoundView />;
}
