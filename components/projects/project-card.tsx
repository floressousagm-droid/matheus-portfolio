import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/data-visuals/reveal";
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
        className="group block h-full rounded-(--radius-card) border border-(--color-surface-border) bg-(--color-surface-2) p-6 transition-all duration-300 hover:-translate-y-1 hover:border-(--color-accent-500)/60 hover:shadow-[0_0_0_1px_var(--color-accent-500),0_20px_40px_-24px_var(--color-accent-glow)]"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-xs text-(--color-ink-3)">
            {String(project.order).padStart(2, "0")}
          </span>
          <ArrowUpRight
            className="size-4 text-(--color-ink-3) transition-colors group-hover:text-(--color-accent-300)"
            aria-hidden
          />
        </div>

        <p className="mt-4 text-xs tracking-wide text-(--color-accent-300) uppercase">
          {project.category}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-(--color-ink-0)">{project.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-(--color-ink-2)">{project.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {project.technologies.length > 4 ? (
            <Badge>+{project.technologies.length - 4}</Badge>
          ) : null}
        </div>
      </Link>
    </Reveal>
  );
}
