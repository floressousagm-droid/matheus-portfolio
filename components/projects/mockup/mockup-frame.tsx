"use client";

import { ChevronDown } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type MockupPage = {
  id: string;
  label: string;
  content: ReactNode;
};

type MockupFrameProps = {
  /** Título exibido na barra superior do relatório. */
  title: string;
  /** Texto do "última atualização" — sempre fictício. */
  updatedAt?: string;
  /** Filtros do relatório, desenhados como selects (decorativos). */
  filters?: { label: string; value: string }[];
  /** Frase da legenda. O padrão serve para a maioria dos relatórios. */
  caption?: string;
  pages: MockupPage[];
};

const CAPTION_PADRAO =
  "Recriação ilustrativa da interface: o layout reproduz a estrutura do relatório real, mas todos os números, nomes e séries dos gráficos são fictícios. Não reproduz valores nem qualquer informação interna da empresa.";

/**
 * Moldura das recriações de dashboard.
 *
 * As abas espelham as páginas reais do relatório no Power BI. A natureza
 * fictícia é sinalizada em três lugares — olho acima, badge dentro da própria
 * moldura e legenda abaixo — para que sobreviva mesmo a um recorte da imagem.
 */
export function MockupFrame({ title, updatedAt, filters, caption, pages }: MockupFrameProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(pages[0]?.id ?? "");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = Math.max(
    pages.findIndex((page) => page.id === activeId),
    0,
  );
  const activePage = pages[activeIndex];

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const lastIndex = pages.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
    else if (event.key === "ArrowLeft") nextIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = lastIndex;

    if (nextIndex === null) return;

    event.preventDefault();
    const nextPage = pages[nextIndex];
    if (!nextPage) return;
    setActiveId(nextPage.id);
    tabRefs.current[nextIndex]?.focus();
  }

  if (!activePage) return null;

  return (
    <figure>
      <p className="text-xs font-medium tracking-[0.2em] text-(--color-accent-300) uppercase">
        Recriação ilustrativa do dashboard
      </p>

      <div className="mt-3 overflow-hidden rounded-(--radius-card) border border-(--color-surface-border) bg-(--color-surface-1)">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--color-surface-border) bg-(--color-surface-3) px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-(--color-ink-0)">{title}</span>
            <Badge variant="accent">Dados fictícios</Badge>
          </div>
          {updatedAt ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-(--color-surface-border) bg-(--color-surface-2) px-3 py-1 text-[11px] text-(--color-ink-2)">
              <span aria-hidden className="size-1.5 rounded-full bg-(--color-accent-500)" />
              Última atualização: {updatedAt}
            </span>
          ) : null}
        </div>

        {filters?.length ? (
          // Selects decorativos: reproduzem os filtros do relatório real sem
          // fingir interatividade que o mockup não tem.
          <div className="flex flex-wrap gap-3 border-b border-(--color-surface-border) bg-(--color-surface-2) px-4 py-3">
            {filters.map((filter) => (
              <div key={filter.label} className="min-w-0">
                <p className="text-[10px] text-(--color-ink-3)">{filter.label}</p>
                <p
                  aria-hidden
                  className="mt-1 flex items-center justify-between gap-3 rounded-md border border-(--color-surface-border) bg-(--color-surface-3) px-2.5 py-1 text-[11px] text-(--color-ink-1)"
                >
                  {filter.value}
                  <ChevronDown className="size-3 shrink-0 text-(--color-ink-3)" />
                </p>
              </div>
            ))}
          </div>
        ) : null}

        {/* Renderização condicional em vez do atributo `hidden`: a classe
            `flex` do Tailwind venceria o `display:none` do atributo. */}
        {pages.length > 1 ? (
          <div
            role="tablist"
            aria-label="Páginas do relatório"
            className="flex gap-1 border-b border-(--color-surface-border) bg-(--color-surface-2) px-3 py-2"
          >
            {pages.map((page, index) => {
              const isActive = page.id === activePage.id;
              return (
                <button
                  key={page.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${page.id}`}
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel-${page.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveId(page.id)}
                  onKeyDown={handleKeyDown}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    isActive
                      ? "bg-(--color-accent-500)/15 text-(--color-accent-300)"
                      : "text-(--color-ink-3) hover:text-(--color-ink-1)",
                  )}
                >
                  {page.label}
                </button>
              );
            })}
          </div>
        ) : null}

        {pages.map((page) => (
          <div
            key={page.id}
            role="tabpanel"
            id={`${baseId}-panel-${page.id}`}
            aria-labelledby={`${baseId}-tab-${page.id}`}
            hidden={page.id !== activePage.id}
            className="p-3 sm:p-4"
          >
            {page.content}
          </div>
        ))}
      </div>

      <figcaption className="mt-3 text-xs leading-relaxed text-(--color-ink-3)">
        {caption ?? CAPTION_PADRAO}
      </figcaption>
    </figure>
  );
}
