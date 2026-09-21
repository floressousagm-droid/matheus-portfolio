import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Search } from "lucide-react";

import { Reveal } from "@/components/data-visuals/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Reveal delay={index * 0.08}>
      <Link
        href={`/projetos/${project.slug}`}
        className="group flex h-full flex-col rounded-(--radius-card) border border-(--color-surface-border) bg-(--color-surface-2) transition-all duration-300 hover:-translate-y-1 hover:border-(--color-accent-500)/50 hover:shadow-[0_0_0_1px_var(--color-accent-500),0_20px_40px_-24px_var(--color-accent-glow)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-(--radius-card) bg-(--color-surface-3)">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <LayoutDashboard
                className="size-8 text-(--color-ink-3)"
                aria-hidden
              />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-semibold tracking-wide text-(--color-ink-0) uppercase">
            {project.name}
          </h3>

          <div className="mt-3 flex-1">
            <p className="text-sm font-semibold text-(--color-ink-0)">
              Objetivos principais e indicadores:
            </p>
            {project.summary ? (
              <p className="mt-1.5 text-sm leading-relaxed text-(--color-ink-2)">
                {project.summary}
              </p>
            ) : null}
          </div>

          <span
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "mt-5 w-fit",
            )}
          >
            <Search aria-hidden />
            Ver detalhes
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
