import { Mail } from "lucide-react";

import { Github, Linkedin } from "@/components/ui/brand-icons";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/data-visuals/reveal";
import { contact, identity } from "@/data/site";

export function Contact() {
  return (
    <section id="contato" aria-label="Contato" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="text-xs tracking-[0.2em] text-(--color-accent-300) uppercase">
            {contact.eyebrow}
          </p>
          <h2 className="mt-6 text-3xl font-semibold text-(--color-ink-0) sm:text-4xl">
            {contact.heading}
          </h2>
          <p className="mt-4 text-base text-(--color-ink-2)">{contact.support}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild>
              <a href={`mailto:${identity.email}`} aria-label="Enviar e-mail para Matheus Flores">
                <Mail aria-hidden />
                {identity.email}
              </a>
            </Button>

            {identity.linkedin ? (
              <Button asChild variant="outline">
                <a href={identity.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin aria-hidden />
                  LinkedIn
                </a>
              </Button>
            ) : null}

            {identity.github ? (
              <Button asChild variant="outline">
                <a href={identity.github} target="_blank" rel="noreferrer">
                  <Github aria-hidden />
                  GitHub
                </a>
              </Button>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 text-xs text-(--color-ink-3)">{identity.location}</p>
        </Reveal>
      </div>
    </section>
  );
}
