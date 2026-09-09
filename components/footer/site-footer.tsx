import Link from "next/link";
import { Mail } from "lucide-react";

import { LinkInicio } from "@/components/nav/link-inicio";
import { Github, Linkedin } from "@/components/ui/brand-icons";

import { getSortedProjects } from "@/data/projects";
import { identity } from "@/data/site";

// Todas as seções/âncoras existentes na home — o footer funciona como um
// mapa do site, então usa "/#id" (não "#id") para funcionar também a partir
// de outras rotas, como as páginas de case study em /projetos/[slug].
const sectionLinks = [
  { id: "hero", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "o-que-faco", label: "O que faço" },
  { id: "projetos", label: "Projetos" },
  { id: "habilidades", label: "Habilidades" },
  { id: "contato", label: "Contato" },
];

const linkClasses =
  "text-(--color-ink-2) transition-colors hover:text-(--color-accent-300)";

export function SiteFooter() {
  const projects = getSortedProjects();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-(--color-surface-border) bg-(--color-surface-1)">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <LinkInicio className="text-base font-semibold text-(--color-ink-0)">
              {identity.name}
            </LinkInicio>
            <p className="mt-2 text-sm text-(--color-ink-2)">{identity.role}</p>
            <p className="mt-4 text-xs text-(--color-ink-3)">{identity.location}</p>
          </div>

          <div>
            <p className="text-xs tracking-[0.15em] text-(--color-ink-3) uppercase">
              Navegação
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {sectionLinks.map((item) => (
                <li key={item.id}>
                  <Link href={`/#${item.id}`} className={linkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.15em] text-(--color-ink-3) uppercase">
              Projetos
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <li key={project.slug}>
                    <Link href={`/projetos/${project.slug}`} className={linkClasses}>
                      {project.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-(--color-ink-3)">Em breve</li>
              )}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.15em] text-(--color-ink-3) uppercase">
              Contato
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${identity.email}`}
                  className={`flex items-center gap-2 ${linkClasses}`}
                >
                  <Mail className="size-4" aria-hidden />
                  {identity.email}
                </a>
              </li>
              {identity.linkedin ? (
                <li>
                  <a
                    href={identity.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-2 ${linkClasses}`}
                  >
                    <Linkedin className="size-4" aria-hidden />
                    LinkedIn
                  </a>
                </li>
              ) : null}
              {identity.github ? (
                <li>
                  <a
                    href={identity.github}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-2 ${linkClasses}`}
                  >
                    <Github className="size-4" aria-hidden />
                    GitHub
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-(--color-surface-border) pt-6 text-xs text-(--color-ink-3) sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {identity.name}. Todos os direitos reservados.
          </p>
          <p>Construído com Next.js, Tailwind CSS e Motion.</p>
        </div>
      </div>
    </footer>
  );
}
