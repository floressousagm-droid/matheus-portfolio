"use client";

import { motion } from "motion/react";

type NodeDotProps = {
  cx: number;
  cy: number;
  r?: number;
  delay?: number;
  active?: boolean;
};

/**
 * Nó de dados usado nos diagramas em SVG (hero, workflow). Um ponto fixo com
 * um pulso azul discreto — não decorativo por decorativo: representa um
 * ponto de dado/etapa dentro de um sistema.
 */
export function NodeDot({ cx, cy, r = 4, delay = 0, active = false }: NodeDotProps) {
  return (
    <g>
      {active ? (
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--color-accent-500)"
          strokeWidth={1}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 2.4 }}
          transition={{ duration: 2.4, repeat: Infinity, delay, ease: "easeOut" }}
        />
      ) : null}
      <circle cx={cx} cy={cy} r={r} fill={active ? "var(--color-accent-500)" : "var(--color-ink-3)"} />
    </g>
  );
}
