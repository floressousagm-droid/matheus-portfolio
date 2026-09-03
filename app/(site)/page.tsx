import { SiteNav } from "@/components/nav/site-nav";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { Responsibilities } from "@/components/responsibilities/responsibilities";
import { ProjectsSection } from "@/components/projects/projects-section";
import { Skills } from "@/components/skills/skills";
import { Contact } from "@/components/contact/contact";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="conteudo-principal">
        <Hero />
        <About />
        <Responsibilities />
        <ProjectsSection />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
