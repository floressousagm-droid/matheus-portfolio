import Image from "next/image";
import { Mail } from "lucide-react";

import { Github, Linkedin } from "@/components/ui/brand-icons";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/data-visuals/reveal";
import { contact, identity } from "@/data/site";

export function Contact() {
  return (
    <section
      id="contato"
      aria-label="Contato"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <Image
        src="/images/contato/fundo.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      {/* Escurece mais em cima da imagem, pra manter contraste com o texto. */}
      <div aria-hidden className="absolute inset-0 bg-(--color-surface-0)/55" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="flex items-center justify-center gap-3 text-lg font-semibold text-(--color-accent-300) sm:text-xl">
            <span aria-hidden className="h-5 w-0.5 shrink-0 bg-(--color-accent-500)" />
            {contact.heading}
          </h2>
          {contact.support ? (
            <p className="mt-4 text-base text-(--color-ink-2)">{contact.support}</p>
          ) : null}
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
