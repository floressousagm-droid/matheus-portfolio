"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import { LinkInicio } from "@/components/nav/link-inicio";
import { useProjectsTab } from "@/components/projects/projects-tab-context";
import { navItems } from "@/data/nav";
import type { NavChild, NavItem } from "@/lib/types";
import { identity } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { setKind } = useProjectsTab();
  const submenuRef = useRef<HTMLDivElement | null>(null);

  // Fora da home (ex.: /projetos/[slug]) as seções não existem nesta página,
  // então o link precisa apontar para "/#id" — só "#id" não navega para lugar
  // nenhum. Na home mantemos "#id" para não recarregar a rota.
  const isHome = pathname === "/";
  const hrefFor = (href: string) => (isHome ? href : `/${href}`);

  // Fecha o menu mobile ao trocar de rota. Ajuste durante o render (padrão
  // recomendado do React) em vez de setState em efeito, que dispararia um
  // render em cascata.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsMenuOpen(false);
    setOpenSubmenu(null);
  }

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  // Dropdown do desktop: fecha com Escape e com clique fora.
  useEffect(() => {
    if (!openSubmenu) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenSubmenu(null);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!submenuRef.current?.contains(event.target as Node)) setOpenSubmenu(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openSubmenu]);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  // Escolhe a aba; o proprio link leva ate a secao.
  function selecionarAba(child: NavChild) {
    setKind(child.kind);
    setOpenSubmenu(null);
    setIsMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-(--color-surface-border) bg-(--color-surface-0)/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <LinkInicio className="text-sm font-semibold text-(--color-ink-0)">
          {identity.name}
        </LinkInicio>

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 md:flex">
          {navItems.map((item: NavItem) => {
            const itemClasses = cn(
              "rounded-full px-3 py-2 text-sm transition-colors",
              activeId === item.id
                ? "text-(--color-accent-300)"
                : "text-(--color-ink-2) hover:text-(--color-ink-0)",
            );

            if (!item.children) {
              return (
                <a
                  key={item.id}
                  href={hrefFor(item.href)}
                  className={itemClasses}
                  aria-current={activeId === item.id ? "true" : undefined}
                >
                  {item.label}
                </a>
              );
            }

            const isOpen = openSubmenu === item.id;

            return (
              <div
                key={item.id}
                ref={isOpen ? submenuRef : undefined}
                className="relative"
                onMouseEnter={() => setOpenSubmenu(item.id)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <button
                  type="button"
                  onClick={() => setOpenSubmenu(isOpen ? null : item.id)}
                  className={cn(itemClasses, "inline-flex items-center gap-1")}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  aria-current={activeId === item.id ? "true" : undefined}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden
                    className={cn("size-3.5 transition-transform", isOpen && "rotate-180")}
                  />
                </button>

                {isOpen ? (
                  <div className="absolute top-full left-1/2 w-44 -translate-x-1/2 pt-2">
                    <div className="flex flex-col gap-0.5 rounded-2xl border border-(--color-surface-border) bg-(--color-surface-2) p-1.5 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.9)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={hrefFor(item.href)}
                          onClick={() => selecionarAba(child)}
                          className="rounded-xl px-3 py-2 text-sm text-(--color-ink-1) transition-colors hover:bg-(--color-surface-3) hover:text-(--color-ink-0)"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open: boolean) => !open)}
          className="flex size-9 items-center justify-center rounded-full border border-(--color-surface-border) text-(--color-ink-1) md:hidden"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
        </button>
      </div>

      {isMenuOpen ? (
        <nav
          aria-label="Navegação principal (mobile)"
          // Fundo opaco: o <header> é translúcido (/80 + blur) e, sem isto, o
          // conteúdo do hero aparece por trás dos itens do menu.
          className="flex flex-col gap-1 border-t border-(--color-surface-border) bg-(--color-surface-0) px-6 py-4 md:hidden"
        >
          {navItems.map((item: NavItem) => (
            <div key={item.id} className="flex flex-col">
              <a
                href={hrefFor(item.href)}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-2 py-3 text-sm text-(--color-ink-1) hover:bg-(--color-surface-2)"
              >
                {item.label}
              </a>
              {item.children ? (
                <div className="mb-1 ml-3 flex flex-col border-l border-(--color-surface-border) pl-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.id}
                      href={hrefFor(item.href)}
                      onClick={() => selecionarAba(child)}
                      className="rounded-lg px-2 py-2.5 text-sm text-(--color-ink-2) hover:bg-(--color-surface-2) hover:text-(--color-ink-0)"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
