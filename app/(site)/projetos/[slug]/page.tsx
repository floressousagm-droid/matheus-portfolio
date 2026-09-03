import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/projects/case-study";
import { SiteNav } from "@/components/nav/site-nav";
import { getProjectBySlug, projects } from "@/data/projects";
import { identity } from "@/data/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: `Projeto não encontrado — ${identity.name}` };
  }

  return {
    title: `${project.name} — ${identity.name}`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <SiteNav />
      <main id="conteudo-principal">
        <CaseStudy project={project} />
      </main>
    </>
  );
}
