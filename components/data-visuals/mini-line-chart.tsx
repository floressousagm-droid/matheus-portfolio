"use client";

import { useId, useMemo } from "react";
import { scaleLinear } from "d3-scale";
import { line as d3line, curveMonotoneX } from "d3-shape";
import { motion } from "motion/react";

type MiniLineChartProps = {
  values: number[];
  width?: number;
  height?: number;
  className?: string;
  label?: string;
};

/**
 * Sparkline ilustrativa gerada com D3 (d3-scale + d3-shape). Usada como
 * linguagem visual de "dados em movimento" — não representa números reais de
 * cliente, apenas um padrão genérico (ver regra de confidencialidade).
 */
export function MiniLineChart({
  values,
  width = 240,
  height = 64,
  className,
  label = "Tendência ilustrativa",
}: MiniLineChartProps) {
  const gradientId = useId();

  const { linePath, areaPath } = useMemo(() => {
    const padding = 6;
    const x = scaleLinear().domain([0, values.length - 1]).range([padding, width - padding]);
    const y = scaleLinear()
      .domain([Math.min(...values), Math.max(...values)])
      .range([height - padding, padding]);

    const generator = d3line<number>()
      .x((_value: number, i: number) => x(i))
      .y((value: number) => y(value))
      .curve(curveMonotoneX);

    const path = generator(values) ?? "";
    const area = `${path} L${x(values.length - 1)},${height - padding} L${x(0)},${height - padding} Z`;

    return { linePath: path, areaPath: area };
  }, [values, width, height]);

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-500)" stopOpacity={0.25} />
          <stop offset="100%" stopColor="var(--color-accent-500)" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
      <motion.path
        d={linePath}
        fill="none"
        stroke="var(--color-accent-500)"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
