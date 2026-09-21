import { Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

import { MockupFrame } from "@/components/projects/mockup/mockup-frame";
import {
  AreaChart,
  DataTable,
  MOCKUP_COLORS,
  Panel,
  RankingBars,
} from "@/components/projects/mockup/mockup-parts";
import { cn } from "@/lib/utils";

/**
 * Recriação do relatório "Dashboard Despesas".
 *
 * O layout segue a estrutura real (filtros, leitura do período, 4 KPIs,
 * evolução mensal com rótulo em cada ponto, dois rankings e o Top 10 de
 * lançamentos). TODO o conteúdo é fictício:
 * - lançamentos anonimizados: sem nome de pessoa, fornecedor ou número de NF —
 *   o relatório real traz prova documental, que não pode ser publicada;
 * - categorias genéricas (Pessoal, Ocupação…), alinhadas ao que o próprio case
 *   já descreve em texto, e não à estrutura contábil real da empresa;
 * - valores em ordem de grandeza deliberadamente distante da real;
 * - curva da evolução mensal genérica — o formato de uma curva de despesa
 *   também é informação de negócio.
 *
 * Os números são coerentes entre si: as categorias somam o total do mês, o
 * Top 10 corresponde aos 72% indicados no cabeçalho e a média mensal bate com
 * a série da evolução.
 */

const TOTAL_MES = "R$ 248.500";

function KpiDespesa({
  label,
  value,
  note,
  badge,
  highlight,
}: {
  label: string;
  value: string;
  note: ReactNode;
  badge?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-(--color-surface-border) bg-(--color-surface-2) p-4",
        highlight && "border-l-2 border-l-(--color-accent-500) bg-(--color-accent-500)/10",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
        <p className="text-[11px] font-semibold tracking-[0.1em] text-(--color-accent-300) uppercase">
          {label}
        </p>
        {badge ? (
          <span className="shrink-0 rounded-full bg-(--color-surface-3) px-2 py-0.5 text-[9px] font-semibold tracking-wider text-(--color-ink-2) uppercase">
            {badge}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-xl font-semibold tabular-nums text-(--color-ink-0)">{value}</p>
      <p className="mt-1 text-[11px] text-(--color-ink-3)">{note}</p>
    </div>
  );
}

/** Variação onde cair é bom (despesa): seta para baixo em verde. */
function Variacao({ direction, children }: { direction: "down" | "up"; children: ReactNode }) {
  return (
    <span
      className="font-semibold tabular-nums"
      style={{ color: direction === "down" ? MOCKUP_COLORS.positive : MOCKUP_COLORS.negative }}
    >
      {direction === "down" ? "▼" : "▲"} {children}
    </span>
  );
}

const MESES = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
];

// Série fictícia, em R$ mil. "ago" (248,5) casa com o KPI do mês selecionado.
const EVOLUCAO = [142.8, 168.4, 205.9, 187.3, 231.6, 259.1, 283.7, 248.5, 274.2, 196.8, 221.5, 165.4];

// Nomes construídos sobre letras gregas: têm textura de razão social, mas
// sinalizam ficção de forma inequívoca — e tornam impossível esbarrar por
// acaso no nome de um fornecedor real. A folha de pagamento aparece sem NF,
// como acontece de verdade em um razão de despesas.
const LANCAMENTOS: { id: string; descricao: string; categoria: string; valor: string; pct: string }[] = [
  { id: "l1", descricao: "Folha de pagamento — competência ago", categoria: "Pessoal", valor: "R$ 36.800", pct: "14,81%" },
  { id: "l2", descricao: "Aluguel do centro de distribuição — Beta Administradora · NF 0002", categoria: "Ocupação", valor: "R$ 27.300", pct: "10,99%" },
  { id: "l3", descricao: "Consultoria contábil — Gama Contabilidade · NF 0003", categoria: "Serviços de terceiros", valor: "R$ 22.500", pct: "9,05%" },
  { id: "l4", descricao: "Energia elétrica — Delta Energia · NF 0004", categoria: "Ocupação", valor: "R$ 18.800", pct: "7,57%" },
  { id: "l5", descricao: "Manutenção predial — Épsilon Manutenção · NF 0005", categoria: "Serviços de terceiros", valor: "R$ 16.900", pct: "6,80%" },
  { id: "l6", descricao: "Vale-transporte — Zeta Benefícios · NF 0006", categoria: "Pessoal", valor: "R$ 14.600", pct: "5,87%" },
  { id: "l7", descricao: "Licenças de software — Sigma Tecnologia · NF 0007", categoria: "Serviços de terceiros", valor: "R$ 12.800", pct: "5,15%" },
  { id: "l8", descricao: "Materiais de escritório — Ômega Suprimentos · NF 0008", categoria: "Materiais", valor: "R$ 11.700", pct: "4,71%" },
  { id: "l9", descricao: "Condomínio — Lambda Administradora · NF 0009", categoria: "Ocupação", valor: "R$ 9.500", pct: "3,82%" },
  { id: "l10", descricao: "Uniformes e EPI — Teta Uniformes · NF 0010", categoria: "Materiais", valor: "R$ 8.000", pct: "3,22%" },
];

function PaginaDespesas() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-(--color-surface-border) bg-(--color-surface-2) px-4 py-2.5">
        <span
          className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase italic"
          style={{ color: MOCKUP_COLORS.warning }}
        >
          <Lightbulb className="size-3.5" aria-hidden />
          Leitura do período
        </span>
        <span className="text-[11px] text-(--color-ink-1)">
          Pessoal concentra 45% das despesas do mês
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiDespesa
          label="Total despesas"
          value={TOTAL_MES}
          badge="Headline"
          highlight
          note={
            <>
              <Variacao direction="down">12,4%</Variacao> vs jul
            </>
          }
        />
        <KpiDespesa
          label="Despesa média mensal"
          value="R$ 215.400"
          note="média dos meses com lançamento"
        />
        <KpiDespesa
          label="Forecast anual"
          value="R$ 2.585.000"
          note="mês de referência: ago (fechado) + meses restantes"
        />
        <KpiDespesa
          label="Lançamentos"
          value="214"
          note={
            <>
              <Variacao direction="up">9,8%</Variacao> vs jul · volume
            </>
          }
        />
      </div>

      <Panel title="Evolução mensal de despesas" subtitle="Valores em R$ mil">
        <AreaChart
          labels={MESES}
          values={EVOLUCAO}
          pointLabels={EVOLUCAO.map((valor) => valor.toFixed(1).replace(".", ","))}
          yTicks={["R$ 0", "R$ 300 mil"]}
          ariaLabel="Gráfico de área ilustrativo com a evolução mensal fictícia das despesas"
        />
      </Panel>

      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title="Despesas por categoria">
          <RankingBars
            labelWidth="w-24"
            ariaLabel="Ranking ilustrativo de despesas por categoria (valores fictícios)"
            items={[
              { id: "pessoal", label: "Pessoal", value: 112400, display: "R$ 112.400" },
              { id: "ocupacao", label: "Ocupação", value: 68900, display: "R$ 68.900" },
              { id: "terceiros", label: "Serviços de terceiros", value: 41700, display: "R$ 41.700" },
              { id: "materiais", label: "Materiais", value: 25500, display: "R$ 25.500" },
            ]}
          />
        </Panel>

        <Panel title="Despesas por descrição">
          <RankingBars
            labelWidth="w-24"
            ariaLabel="Ranking ilustrativo de despesas por descrição (valores fictícios)"
            items={[
              { id: "folha", label: "Folha de pagamento", value: 98200, display: "R$ 98.200" },
              { id: "aluguel", label: "Aluguel", value: 52300, display: "R$ 52.300" },
              { id: "contabil", label: "Consultoria contábil", value: 33100, display: "R$ 33.100" },
              { id: "energia", label: "Energia elétrica", value: 21600, display: "R$ 21.600" },
              { id: "manutencao", label: "Manutenção predial", value: 14800, display: "R$ 14.800" },
            ]}
          />
        </Panel>
      </div>

      <Panel
        title="Maiores lançamentos · Top 10"
        subtitle="Prova documental — para investigar depois do resumo"
        aside={
          <p className="text-[11px] text-(--color-ink-2)">
            10 lançamentos listados representam{" "}
            <span className="font-semibold text-(--color-accent-300)">72,0%</span> do total
          </p>
        }
      >
        <DataTable
          minWidth="min-w-[620px]"
          columns={[
            { label: "Lançamento" },
            { label: "Competência" },
            { label: "Categoria" },
            { label: "Valor", align: "right" },
            { label: "% do total", align: "right" },
          ]}
          rows={LANCAMENTOS.map((item) => ({
            id: item.id,
            cells: [
              item.descricao,
              "2026",
              <span key="cat" className="text-(--color-accent-300)">
                {item.categoria}
              </span>,
              item.valor,
              item.pct,
            ],
          }))}
          total={["Total geral", "", "", `${TOTAL_MES},00`, "100%"]}
        />
      </Panel>
    </div>
  );
}

export function DashboardDespesasMockup() {
  return (
    <MockupFrame
      title="Dashboard Despesas"
      filters={[
        { label: "Ano", value: "2026" },
        { label: "Mês", value: "agosto" },
        { label: "Categoria", value: "Despesas fixas" },
      ]}
      caption="Recriação ilustrativa da interface: o layout reproduz a estrutura do relatório real, mas todos os números são fictícios e os lançamentos foram anonimizados — sem fornecedores, pessoas ou números de nota fiscal. Não reproduz valores nem qualquer informação interna da empresa."
      pages={[{ id: "despesas", label: "Despesas", content: <PaginaDespesas /> }]}
    />
  );
}
