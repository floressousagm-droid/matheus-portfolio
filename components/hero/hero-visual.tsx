"use client";

import { motion } from "motion/react";

import { ConnectorLine } from "@/components/data-visuals/connector-line";
import { NodeDot } from "@/components/data-visuals/node-dot";
import { MiniLineChart } from "@/components/data-visuals/mini-line-chart";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * Visualização conceitual do hero: um pequeno "sistema de dados" — fontes,
 * transformação, modelo e saída — representado como nós conectados, com
 * fluxo discreto entre eles.
 */
const nodes = [
  { id: "fonte-1", x: 40, y: 90, label: "SQL" },
  { id: "problema", x: 40, y: 200, label: "PROBLEMA" },
  { id: "etl", x: 170, y: 145, label: "ETL" },
  { id: "modelo", x: 300, y: 90, label: "Modelo" },
  { id: "regras", x: 300, y: 220, label: "Regras" },
  { id: "saida", x: 420, y: 155, label: "Dashboard" },
];

const connections: Array<[string, string]> = [
  ["fonte-1", "etl"],
  ["problema", "etl"],
  ["etl", "modelo"],
  ["etl", "regras"],
  ["modelo", "saida"],
  ["regras", "saida"],
];

function findNode(id: string) {
  return nodes.find((node) => node.id === id)!;
}

function pathBetween(a: { x: number; y: number }, b: { x: number; y: number }) {
  const midX = (a.x + b.x) / 2;
  return `M${a.x},${a.y} C${midX},${a.y} ${midX},${b.y} ${b.x},${b.y}`;
}

export function HeroVisual() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-[2rem] bg-data-grid opacity-60"
      />
      <svg
        role="img"
        aria-label="Diagrama conceitual de um fluxo de dados: fontes conectadas a um processo de transformação, que alimenta um modelo e regras de negócio, resultando em um dashboard."
        viewBox="0 0 460 300"
        className="w-full"
      >
        {connections.map(([fromId, toId], index) => {
          const from = findNode(fromId);
          const to = findNode(toId);
          return (
            <ConnectorLine
              key={`${fromId}-${toId}`}
              d={pathBetween(from, to)}
              delay={index * 0.15}
            />
          );
        })}

        {!prefersReducedMotion &&
          connections.slice(0, 2).map(([fromId, toId], index) => {
            const from = findNode(fromId);
            const to = findNode(toId);
            return (
              <motion.circle
                key={`flow-${fromId}-${toId}`}
                r={2.5}
                fill="var(--color-accent-300)"
                // cx/cy precisam existir já no primeiro frame: sem isso o SVG
                // recebe cx="undefined" antes de a animação assumir e o browser
                // reclama ("Expected length").
                initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                animate={{ cx: [from.x, to.x], cy: [from.y, to.y], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  delay: index * 0.9 + 1,
                  ease: "easeInOut",
                }}
              />
            );
          })}

        {nodes.map((node, index) => (
          <g key={node.id}>
            <NodeDot cx={node.x} cy={node.y} r={5} delay={index * 0.3} active={index % 2 === 0} />
            <text
              x={node.x}
              y={node.y - 14}
              textAnchor="middle"
              className="fill-(--color-ink-2) text-[10px] tracking-wide uppercase"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-(--color-surface-border) bg-(--color-surface-1)/80 p-4 backdrop-blur-sm">
        <div>
          <p className="font-mono text-sm tracking-wide text-(--color-ink-1) uppercase">
            Dados → Decisão
          </p>
        </div>
        <MiniLineChart values={[3, 5, 4, 7, 6, 9, 8, 11]} width={140} height={44} />
      </div>
    </div>
  );
}
