import Image from "next/image";
import { User } from "lucide-react";

import { about } from "@/data/site";

// Hexágono "em pé": topo e base em ponta, laterais retas.
const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

/**
 * Retrato em moldura hexagonal, no lugar do diagrama abstrato do hero.
 * Sem foto de fundo (paisagem): o "fundo" é o mesmo motivo de linhas de
 * dados usado no retrato da seção Sobre mim, para manter a identidade visual.
 */
export function HeroPhoto() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <div
        aria-hidden
        className="absolute inset-0 -translate-x-3 -translate-y-3 border border-(--color-accent-300)/30"
        style={{ clipPath: HEX_CLIP }}
      />
      <div
        aria-hidden
        className="absolute inset-8 rounded-full bg-(--color-accent-500)/20 blur-3xl"
      />

      <div
        className="relative size-full overflow-hidden border-2 border-(--color-accent-500) bg-(--color-surface-1)"
        style={{ clipPath: HEX_CLIP }}
      >
        <svg
          aria-hidden
          viewBox="0 0 400 400"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
        >
          <path
            d="M-10,230 C40,190 60,270 100,235 C140,200 160,110 200,150 C240,190 260,270 300,235 C340,200 360,130 410,175"
            fill="none"
            stroke="var(--color-accent-500)"
            strokeWidth="2"
            opacity="0.45"
          />
          <path
            d="M-10,270 C40,310 60,215 100,255 C140,295 160,185 200,215 C240,245 260,160 300,195 C340,230 360,290 410,245"
            fill="none"
            stroke="var(--color-accent-300)"
            strokeWidth="2"
            opacity="0.3"
          />
        </svg>

        {about.photo ? (
          <Image
            src={about.photo}
            alt="Foto de Matheus Flores"
            fill
            sizes="(min-width: 1024px) 30vw, 70vw"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <User className="size-16 text-(--color-ink-3)" aria-hidden />
          </div>
        )}
      </div>
    </div>
  );
}
