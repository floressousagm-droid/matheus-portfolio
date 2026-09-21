"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

import { LinkInicio } from "@/components/nav/link-inicio";
import { Github, Linkedin } from "@/components/ui/brand-icons";
import { FooterGlow } from "@/components/footer/footer-glow";
import { useProjectsTab } from "@/components/projects/projects-tab-context";

import { navItems } from "@/data/nav";
import { identity } from "@/data/site";

// Reaproveita as mesmas abas ("Profissionais"/"Pessoais") definidas para o
// submenu do header, em vez de listar cada projeto individualmente.
const projectTabs = navItems.find((item) => item.id === "projetos")?.children ?? [];

// Todas as seções/âncoras existentes na home — o footer funciona como um
// mapa do site, então usa "/#id" (não "#id") para funcionar também a partir
// de outras rotas, como as páginas de case study em /projetos/[slug].
const sectionLinks = [
  { id: "hero", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "habilidades", label: "Habilidades" },
];

const linkClasses =
  "text-(--color-ink-2) transition-colors hover:text-(--color-accent-300)";

export function SiteFooter() {
  const { setKind } = useProjectsTab();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      <FooterGlow />
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-14">
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
              {projectTabs.map((tab) => (
                <li key={tab.id}>
                  <Link
                    href="/#projetos"
                    onClick={() => setKind(tab.kind)}
                    className={linkClasses}
                  >
                    {tab.label}
                  </Link>
                </li>
              ))}
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

        <div className="mt-12 border-t border-(--color-surface-border) pt-6 text-xs text-(--color-ink-3)">
          <p>
            © {year} {identity.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
