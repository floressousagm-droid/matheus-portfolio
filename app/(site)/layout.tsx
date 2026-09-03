import { SiteFooter } from "@/components/footer/site-footer";
import { ProjectsTabProvider } from "@/components/projects/projects-tab-context";

/**
 * Chrome do site público. Fica num route group para que `/keystatic` (o painel
 * de edição) não herde rodapé, skip link nem o provider das abas.
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-(--color-accent-500) focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Ir para o conteúdo principal
      </a>
      <ProjectsTabProvider>{children}</ProjectsTabProvider>
      <SiteFooter />
    </>
  );
}
