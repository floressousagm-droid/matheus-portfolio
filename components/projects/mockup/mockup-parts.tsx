import type { ReactNode } from "react";
import { scaleLinear } from "d3-scale";
import { area as d3area, line as d3line, curveMonotoneX } from "d3-shape";

import { cn } from "@/lib/utils";

/**
 * Paleta local das recriações de dashboard.
 *
 * Fica aqui, e não no `@theme` do globals.css, de propósito: um relatório de
 * BI precisa de cores categóricas (séries, estados, status), mas o site em si
 * é monocromático (azul + cinzas). Manter esta paleta contida no mockup evita
 * que ela vaze para o resto da identidade visual.
 */
export const MOCKUP_COLORS = {
  primary: "#3d7dff",
  primarySoft: "#7aa8ff",
  primaryDeep: "#2148c0",
  positive: "#3ecf8e",
  negative: "#f2657a",
  warning: "#f5a524",
  line: "#e8ecf5",
  categorical: ["#7c6cf6", "#2dd4bf", "#3ecf8e", "#f5a524", "#f2657a"],
} as const;

/* ---------------------------------------------------------------- layout */

export function Panel({
  title,
  subtitle,
  icon,
  aside,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-(--color-surface-border) bg-(--color-surface-2) p-4",
        className,
      )}
    >
      {/* flex-wrap em vez de truncate: em telas estreitas a legenda desce para
          a linha de baixo e o título aparece inteiro. */}
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
        <div className="flex min-w-0 items-center gap-2">
          {icon ? (
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-(--color-accent-500)/10 text-(--color-accent-300)">
              {icon}
            </span>
          ) : null}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-(--color-ink-0)">{title}</p>
            {subtitle ? (
              <p className="text-[10px] tracking-[0.12em] text-(--color-ink-3) uppercase">{subtitle}</p>
            ) : null}
          </div>
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-1.5 text-[11px] text-(--color-ink-2)">
          <span aria-hidden className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------- kpi */

export type KpiRow = {
  label: string;
  value: string;
  tone?: "positive" | "negative" | "warning";
};

const TONE_COLORS: Record<NonNullable<KpiRow["tone"]>, string> = {
  positive: MOCKUP_COLORS.positive,
  negative: MOCKUP_COLORS.negative,
  warning: MOCKUP_COLORS.warning,
};

export function KpiCard({
  label,
  value,
  icon,
  rows,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
  rows?: KpiRow[];
}) {
  return (
    <div className="rounded-xl border border-(--color-surface-border) bg-(--color-surface-2) p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-(--color-ink-2)">{label}</p>
        {icon ? (
          <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-(--color-accent-500)/10 text-(--color-accent-300)">
            {icon}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-lg font-semibold tabular-nums text-(--color-ink-0) sm:text-xl">{value}</p>
      {rows?.length ? (
        <dl className="mt-2 space-y-1 border-t border-(--color-surface-border) pt-2">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-2 text-[11px]">
              <dt className="truncate text-(--color-ink-3)">{row.label}</dt>
              <dd
                className="shrink-0 font-medium tabular-nums"
                style={{ color: row.tone ? TONE_COLORS[row.tone] : undefined }}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}

export function StatTile({ value, caption }: { value: string; caption: string }) {
  return (
    <div className="rounded-lg border border-(--color-surface-border) bg-(--color-surface-3) px-3 py-3 text-center">
      <p className="text-base font-semibold tabular-nums text-(--color-accent-300)">{value}</p>
      <p className="mt-0.5 text-[10px] tracking-[0.12em] text-(--color-ink-3) uppercase">{caption}</p>
    </div>
  );
}

/** Valor destacado dentro do texto do resumo automático. */
export function Highlight({ children, tone }: { children: ReactNode; tone?: "warning" }) {
  return (
    <span
      className="rounded px-1 py-0.5 text-xs font-semibold tabular-nums"
      style={{
        backgroundColor: tone === "warning" ? `${MOCKUP_COLORS.warning}22` : `${MOCKUP_COLORS.primary}22`,
        color: tone === "warning" ? MOCKUP_COLORS.warning : MOCKUP_COLORS.primarySoft,
      }}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- charts */

const CHART_W = 520;
const PAD_LEFT = 52;
const PAD_RIGHT = 10;
const PAD_TOP = 12;

function yTickPositions(baseline: number, count: number) {
  const step = (baseline - PAD_TOP) / (count - 1);
  return Array.from({ length: count }, (_, index) => baseline - step * index);
}

/**
 * Barras sobrepostas (duas séries) com uma linha por cima — o formato do
 * gráfico diário do relatório original. Sem valores no eixo Y: o objetivo é
 * mostrar a forma, não sugerir números precisos.
 */
export function ComboBarChart({
  labels,
  tall,
  short,
  line,
  yTicks,
  ariaLabel,
}: {
  labels: string[];
  tall: number[];
  short: number[];
  line: number[];
  yTicks: string[];
  ariaLabel: string;
}) {
  const height = 210;
  const baseline = height - 32;
  const max = Math.max(...tall, ...short, ...line, 1);
  const plotWidth = CHART_W - PAD_LEFT - PAD_RIGHT;
  const slot = plotWidth / labels.length;
  const tallW = slot * 0.6;
  const shortW = slot * 0.32;
  const scaleY = (value: number) => baseline - (value / max) * (baseline - PAD_TOP);
  const centerX = (index: number) => PAD_LEFT + slot * index + slot / 2;

  return (
    <svg viewBox={`0 0 ${CHART_W} ${height}`} className="w-full" role="img" aria-label={ariaLabel}>
      {yTickPositions(baseline, yTicks.length).map((y, index) => (
        <g key={yTicks[index]}>
          <line x1={PAD_LEFT} y1={y} x2={CHART_W - PAD_RIGHT} y2={y} stroke="var(--color-surface-border)" strokeWidth={1} />
          <text x={PAD_LEFT - 8} y={y + 3} textAnchor="end" className="fill-(--color-ink-3) text-[9px]">
            {yTicks[index]}
          </text>
        </g>
      ))}

      {labels.map((label, index) => {
        const cx = centerX(index);
        return (
          <g key={label}>
            <rect
              x={cx - tallW / 2}
              y={scaleY(tall[index] ?? 0)}
              width={tallW}
              height={baseline - scaleY(tall[index] ?? 0)}
              rx={2}
              fill={MOCKUP_COLORS.primary}
              opacity={0.85}
            />
            <rect
              x={cx - shortW / 2}
              y={scaleY(short[index] ?? 0)}
              width={shortW}
              height={baseline - scaleY(short[index] ?? 0)}
              rx={2}
              fill={MOCKUP_COLORS.primarySoft}
            />
            <text x={cx} y={height - 12} textAnchor="middle" className="fill-(--color-ink-3) text-[9px]">
              {label}
            </text>
          </g>
        );
      })}

      <polyline
        points={line.map((value, index) => `${centerX(index)},${scaleY(value)}`).join(" ")}
        fill="none"
        stroke={MOCKUP_COLORS.line}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.9}
      />
    </svg>
  );
}

/** Duas barras lado a lado por categoria (faturamento vs. meta). */
export function GroupedBarChart({
  labels,
  seriesA,
  seriesB,
  yTicks,
  ariaLabel,
}: {
  labels: string[];
  seriesA: { values: number[]; color: string };
  seriesB: { values: number[]; color: string };
  yTicks: string[];
  ariaLabel: string;
}) {
  const height = 200;
  const baseline = height - 30;
  const max = Math.max(...seriesA.values, ...seriesB.values, 1);
  const plotWidth = CHART_W - PAD_LEFT - PAD_RIGHT;
  const slot = plotWidth / labels.length;
  const barW = slot * 0.3;
  const scaleY = (value: number) => baseline - (value / max) * (baseline - PAD_TOP);

  return (
    <svg viewBox={`0 0 ${CHART_W} ${height}`} className="w-full" role="img" aria-label={ariaLabel}>
      {yTickPositions(baseline, yTicks.length).map((y, index) => (
        <g key={yTicks[index]}>
          <line x1={PAD_LEFT} y1={y} x2={CHART_W - PAD_RIGHT} y2={y} stroke="var(--color-surface-border)" strokeWidth={1} />
          <text x={PAD_LEFT - 8} y={y + 3} textAnchor="end" className="fill-(--color-ink-3) text-[9px]">
            {yTicks[index]}
          </text>
        </g>
      ))}

      {labels.map((label, index) => {
        const groupCenter = PAD_LEFT + slot * index + slot / 2;
        const a = seriesA.values[index] ?? 0;
        const b = seriesB.values[index] ?? 0;
        return (
          <g key={label}>
            <rect
              x={groupCenter - barW - 1}
              y={scaleY(a)}
              width={barW}
              height={baseline - scaleY(a)}
              rx={2}
              fill={seriesA.color}
            />
            <rect
              x={groupCenter + 1}
              y={scaleY(b)}
              width={barW}
              height={baseline - scaleY(b)}
              rx={2}
              fill={seriesB.color}
            />
            <text x={groupCenter} y={height - 10} textAnchor="middle" className="fill-(--color-ink-3) text-[9px]">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function DonutChart({ percent, ariaLabel }: { percent: number; ariaLabel: string }) {
  const size = 132;
  const radius = 52;
  const strokeWidth = 15;
  const circumference = 2 * Math.PI * radius;
  const filled = (percent / 100) * circumference;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[132px]" role="img" aria-label={ariaLabel}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-surface-3)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={MOCKUP_COLORS.primary}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circumference - filled}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x={size / 2}
        y={size / 2 + 7}
        textAnchor="middle"
        className="fill-(--color-ink-0) text-[22px] font-semibold"
      >
        {percent}%
      </text>
    </svg>
  );
}

export function AreaChart({
  labels,
  values,
  yTicks,
  ariaLabel,
  pointLabels,
}: {
  labels: string[];
  values: number[];
  yTicks: string[];
  ariaLabel: string;
  /** Valor escrito em cada ponto. Alterna acima/abaixo para não colidir. */
  pointLabels?: string[];
}) {
  const height = 200;
  const baseline = height - 34;
  const x = scaleLinear()
    .domain([0, values.length - 1])
    .range([PAD_LEFT, CHART_W - PAD_RIGHT]);
  const y = scaleLinear()
    .domain([0, Math.max(...values, 1)])
    .range([baseline, PAD_TOP]);

  const linePath =
    d3line<number>()
      .x((_value: number, index: number) => x(index))
      .y((value: number) => y(value))
      .curve(curveMonotoneX)(values) ?? "";
  const areaPath =
    d3area<number>()
      .x((_value: number, index: number) => x(index))
      .y0(baseline)
      .y1((value: number) => y(value))
      .curve(curveMonotoneX)(values) ?? "";

  return (
    <svg viewBox={`0 0 ${CHART_W} ${height}`} className="w-full" role="img" aria-label={ariaLabel}>
      {yTickPositions(baseline, yTicks.length).map((tickY, index) => (
        <g key={yTicks[index]}>
          <line
            x1={PAD_LEFT}
            y1={tickY}
            x2={CHART_W - PAD_RIGHT}
            y2={tickY}
            stroke="var(--color-surface-border)"
            strokeWidth={1}
          />
          <text x={PAD_LEFT - 8} y={tickY + 3} textAnchor="end" className="fill-(--color-ink-3) text-[9px]">
            {yTicks[index]}
          </text>
        </g>
      ))}

      <path d={areaPath} fill={MOCKUP_COLORS.primary} opacity={0.22} />
      <path d={linePath} fill="none" stroke={MOCKUP_COLORS.primary} strokeWidth={1.8} strokeLinecap="round" />
      {values.map((value, index) => (
        <circle key={labels[index]} cx={x(index)} cy={y(value)} r={2.5} fill={MOCKUP_COLORS.primarySoft} />
      ))}
      {pointLabels?.map((pointLabel, index) => (
        <text
          key={`${labels[index]}-valor`}
          x={x(index)}
          y={index % 2 === 0 ? y(values[index] ?? 0) - 8 : y(values[index] ?? 0) + 14}
          textAnchor="middle"
          className="fill-(--color-ink-1) text-[8px] font-medium"
        >
          {pointLabel}
        </text>
      ))}
      {labels.map((label, index) => (
        <text
          key={label}
          x={x(index)}
          y={height - 12}
          textAnchor="middle"
          className="fill-(--color-ink-3) text-[9px]"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

/* ----------------------------------------------------------------- lists */

export function RankingBars({
  items,
  ariaLabel,
  labelWidth = "w-20",
}: {
  items: { id: string; label: string; value: number; display: string }[];
  ariaLabel: string;
  /** Classe de largura da coluna de rótulos (nomes mais longos precisam de mais espaço). */
  labelWidth?: string;
}) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <ul aria-label={ariaLabel} className="space-y-2.5">
      {items.map((item) => {
        const largura = Math.max((item.value / max) * 100, 6);
        const dentro = largura >= 55;

        return (
        <li key={item.id} className="flex items-center gap-3">
          <span className={cn("shrink-0 truncate text-right text-xs text-(--color-ink-2)", labelWidth)}>
            {item.label}
          </span>
          <span className="relative flex h-6 flex-1 items-center gap-2">
            <span
              className="h-full flex-1 overflow-hidden rounded bg-(--color-surface-3)"
              style={{ minWidth: 0 }}
            >
              <span
                className="flex h-full items-center justify-end rounded pr-2"
                style={{ width: `${largura}%`, backgroundColor: MOCKUP_COLORS.primary }}
              >
                {/* O valor só cabe dentro da barra quando ela é longa; senão
                    vai para fora, para não ser cortado em painéis estreitos. */}
                {dentro ? (
                  <span className="text-[10px] font-medium tabular-nums whitespace-nowrap text-white">
                    {item.display}
                  </span>
                ) : null}
              </span>
            </span>
            {dentro ? null : (
              <span className="shrink-0 text-[10px] font-medium tabular-nums whitespace-nowrap text-(--color-ink-1)">
                {item.display}
              </span>
            )}
          </span>
        </li>
        );
      })}
    </ul>
  );
}

export function DistributionList({
  items,
  ariaLabel,
}: {
  items: { id: string; label: string; display: string; percent: number }[];
  ariaLabel: string;
}) {
  return (
    <ul aria-label={ariaLabel} className="space-y-3">
      {items.map((item, index) => (
        <li key={item.id}>
          <div className="flex items-center justify-between gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1.5 font-medium text-(--color-ink-1)">
              <span
                aria-hidden
                className="size-2 rounded-full"
                style={{ backgroundColor: MOCKUP_COLORS.categorical[index % MOCKUP_COLORS.categorical.length] }}
              />
              {item.label}
            </span>
            <span className="tabular-nums text-(--color-ink-2)">
              {item.display} <span className="font-semibold text-(--color-ink-0)">{item.percent}%</span>
            </span>
          </div>
          <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-(--color-surface-3)">
            <span
              className="block h-full rounded-full"
              style={{
                width: `${item.percent}%`,
                backgroundColor: MOCKUP_COLORS.categorical[index % MOCKUP_COLORS.categorical.length],
              }}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

export type DataTableColumn = { label: string; align?: "left" | "right" };
export type DataTableRow = { id: string; cells: ReactNode[] };

export function DataTable({
  columns,
  rows,
  total,
  minWidth = "min-w-[380px]",
}: {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  total?: ReactNode[];
  minWidth?: string;
}) {
  // Primeira coluna à esquerda, demais à direita, salvo indicação explícita.
  const alignOf = (index: number) => columns[index]?.align ?? (index === 0 ? "left" : "right");

  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full border-collapse text-left", minWidth)}>
        <thead>
          <tr className="border-b border-(--color-surface-border)">
            {columns.map((column, index) => (
              <th
                key={column.label}
                scope="col"
                className={cn(
                  "pb-2 text-[11px] font-medium text-(--color-ink-2)",
                  alignOf(index) === "right" && "text-right",
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-(--color-surface-border)/60">
              {row.cells.map((cell, index) => (
                <td
                  key={`${row.id}-${index}`}
                  className={cn(
                    "py-1.5 text-[11px] tabular-nums text-(--color-ink-1)",
                    alignOf(index) === "right" && "text-right",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {total ? (
          <tfoot>
            <tr>
              {total.map((cell, index) => (
                <td
                  key={`total-${index}`}
                  className={cn(
                    "pt-2 text-[11px] font-semibold tabular-nums text-(--color-ink-0)",
                    alignOf(index) === "right" && "text-right",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
}
