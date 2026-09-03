"use client";

import {
  Users,
  Database,
  Filter,
  Layers,
  Calculator,
  LineChart,
  ShieldCheck,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import type { ResponsibilityGroup } from "@/lib/types";

const icons: Record<string, LucideIcon> = {
  negocio: Users,
  dados: Database,
  etl: Filter,
  modelagem: Layers,
  metricas: Calculator,
  visualizacao: LineChart,
  validacao: ShieldCheck,
  publicacao: Rocket,
  automacao: Sparkles,
};

// Coordenadas em um espaço percentual (0–100) para que o diagrama seja
// inteiramente fluido: nunca ultrapassa a largura do contêiner, então não
// há necessidade de rolagem horizontal em nenhum tamanho de tela em que
// esta versão é exibida (>= 860px, ver breakpoint em responsibilities.tsx).
const VB_WIDTH = 1000;
const VB_HEIGHT = 400;
const ICON_RADIUS = 28;
const LABEL_GAP = 10;
const LABEL_OFFSET = ICON_RADIUS + LABEL_GAP;
// Metade da largura da legenda (w-40 = 10rem) — usado para "recuar" a
// trilha de nós em relação às bordas do contêiner.
const LABEL_INSET = "5rem";

type NodePosition = { xPercent: number; yPercent: number; top: boolean };

function computePositions(count: number): NodePosition[] {
  // 0–100%: as extremidades (01 e 09) ficam nas bordas da "trilha" interna,
  // que já reserva espaço lateral (ver a div com inset em LABEL_INSET) para
  // as legendas não ultrapassarem o contêiner e não causarem rolagem lateral.
  return Array.from({ length: count }, (_, index) => ({
    xPercent: count === 1 ? 50 : (index * 100) / (count - 1),
    yPercent: index % 2 === 0 ? 30 : 70,
    top: index % 2 === 0,
  }));
}

function pathBetween(a: { x: number; y: number }, b: { x: number; y: number }) {
  const midX = (a.x + b.x) / 2;
  return `C${midX},${a.y} ${midX},${b.y} ${b.x},${b.y}`;
}

type ResponsibilitiesWaveProps = {
  groups: ResponsibilityGroup[];
};

type WaveNode = { group: ResponsibilityGroup; index: number; number: string } & NodePosition;

export function ResponsibilitiesWave({ groups }: ResponsibilitiesWaveProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const nodes: WaveNode[] = computePositions(groups.length).map((pos, index) => ({
    ...pos,
    group: groups[index] as ResponsibilityGroup,
    index,
    number: String(index + 1).padStart(2, "0"),
  }));

  const vbPoints = nodes.map((node) => ({
    x: (node.xPercent / 100) * VB_WIDTH,
    y: (node.yPercent / 100) * VB_HEIGHT,
  }));

  const firstPoint = vbPoints[0];

  let wavePath = "";
  let previousPoint: { x: number; y: number } | null = null;
  for (const point of vbPoints) {
    wavePath += previousPoint ? ` ${pathBetween(previousPoint, point)}` : `M${point.x},${point.y}`;
    previousPoint = point;
  }

  return (
    <div
      className="relative mt-[4.5rem] hidden min-h-[32rem] w-full min-[860px]:block"
      style={{ aspectRatio: `${VB_WIDTH} / ${VB_HEIGHT}` }}
    >
      <div className="absolute inset-y-0" style={{ left: LABEL_INSET, right: LABEL_INSET }}>
        <svg
          aria-hidden
          viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <motion.path
            d={wavePath}
            fill="none"
            stroke="var(--color-surface-border)"
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          {!prefersReducedMotion && firstPoint ? (
            <motion.circle
              r={3}
              fill="var(--color-accent-300)"
              // Ver comentário em hero-visual.tsx: sem `initial` o círculo é
              // renderizado com cx/cy indefinidos no primeiro frame.
              initial={{ cx: firstPoint.x, cy: firstPoint.y, opacity: 0 }}
              animate={{
                cx: vbPoints.map((p) => p.x),
                cy: vbPoints.map((p) => p.y),
                opacity: vbPoints.map((_, i) => (i === 0 || i === vbPoints.length - 1 ? 0 : 1)),
              }}
              transition={{
                duration: vbPoints.length * 0.9,
                repeat: Infinity,
                ease: "linear",
                times: vbPoints.map((_, i) => i / (vbPoints.length - 1)),
              }}
            />
          ) : null}
        </svg>

        {nodes.map((node) => {
          const Icon = icons[node.group.id] ?? Sparkles;
          return (
            <div
              key={node.group.id}
              className="absolute"
              style={{
                left: `${node.xPercent}%`,
                top: `${node.yPercent}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: node.index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex size-14 items-center justify-center rounded-full border border-(--color-accent-500)/40 bg-(--color-surface-2) text-(--color-accent-300) shadow-[0_0_0_6px_var(--color-surface-1)]"
              >
                <Icon className="size-5" aria-hidden />
              </motion.div>
            </div>
          );
        })}

        {nodes.map((node) => (
          <div
            key={`${node.group.id}-label`}
            className="absolute w-40 text-center"
            style={{
              left: `${node.xPercent}%`,
              top: `${node.yPercent}%`,
              transform: node.top
                ? `translate(-50%, calc(-100% - ${LABEL_OFFSET}px))`
                : `translate(-50%, ${LABEL_OFFSET}px)`,
            }}
          >
            <span className="font-mono text-[11px] tracking-[0.2em] text-(--color-accent-300)">
              {node.number}
            </span>
            <h3 className="mt-1 text-sm font-semibold text-(--color-ink-0)">{node.group.short}</h3>
            <p className="mt-1 text-xs leading-relaxed text-(--color-ink-2)">{node.group.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
