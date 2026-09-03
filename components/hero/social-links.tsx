import { Mail } from "lucide-react";

import { Github, Linkedin } from "@/components/ui/brand-icons";

import { identity } from "@/data/site";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
};

/**
 * Mostra apenas os canais que já existem (e-mail sempre; LinkedIn/GitHub só
 * quando informados). Nunca renderiza um link fictício.
 */
export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-4 text-(--color-ink-2)", className)}>
      <a
        href={`mailto:${identity.email}`}
        className="flex items-center gap-2 text-sm transition-colors hover:text-(--color-accent-300)"
        aria-label="Enviar e-mail para Matheus Flores"
      >
        <Mail className="size-4" aria-hidden />
        {identity.email}
      </a>
      {identity.linkedin ? (
        <a
          href={identity.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn de Matheus Flores"
          className="transition-colors hover:text-(--color-accent-300)"
        >
          <Linkedin className="size-5" aria-hidden />
        </a>
      ) : null}
      {identity.github ? (
        <a
          href={identity.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub de Matheus Flores"
          className="transition-colors hover:text-(--color-accent-300)"
        >
          <Github className="size-5" aria-hidden />
        </a>
      ) : null}
    </div>
  );
}
