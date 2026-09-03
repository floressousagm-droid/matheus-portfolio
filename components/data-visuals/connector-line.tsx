"use client";

import { motion } from "motion/react";

type ConnectorLineProps = {
  d: string;
  delay?: number;
  duration?: number;
  color?: string;
};

/**
 * Linha de conexão desenhada progressivamente (stroke draw-in). Usada para
 * ligar nós em diagramas de pipeline/sistema de dados.
 */
export function ConnectorLine({
  d,
  delay = 0,
  duration = 1.2,
  color = "var(--color-surface-border)",
}: ConnectorLineProps) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={1}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
