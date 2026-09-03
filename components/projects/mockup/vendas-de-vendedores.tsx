import { FileText, Gauge, Percent, Receipt, Target, Users, Wallet } from "lucide-react";

import { MockupFrame } from "@/components/projects/mockup/mockup-frame";
import {
  AreaChart,
  ComboBarChart,
  DataTable,
  DistributionList,
  DonutChart,
  GroupedBarChart,
  Highlight,
  KpiCard,
  Legend,
  MOCKUP_COLORS,
  Panel,
  RankingBars,
  StatTile,
} from "@/components/projects/mockup/mockup-parts";

/**
 * Recriação do relatório "Vendas de Vendedores" (duas páginas no mesmo BI:
 * desempenho comercial e carteira de clientes).
 *
 * O layout segue a estrutura real; TODO o conteúdo é fictício e foi escolhido
 * em uma ordem de grandeza deliberadamente distante da real, para que nenhum
 * número verdadeiro possa ser inferido a partir daqui:
 * - clientes anonimizados com nomes construídos sobre letras gregas (Alfa,
 *   Beta, Gama…): têm textura de razão social, mas sinalizam ficção e tornam
 *   impossível esbarrar por acaso no nome de um cliente real;
 * - estados e distribuição percentual inventados;
 * - curvas dos gráficos genéricas — o formato de uma curva de faturamento
 *   também é informação de negócio.
 *
 * Os números fictícios são coerentes entre si de propósito (ticket × clientes
 * ≈ faturamento; faturamento ÷ cotação = conversão), para que o painel leia
 * como um dashboard plausível e não como números aleatórios.
 */

const DIAS = ["3", "4", "5", "6", "7", "10", "11", "12", "13", "14", "17", "18", "19", "20", "21"];

function PaginaDesempenho() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <KpiCard
          label="Faturamento"
          value="R$ 8,60 mi"
          icon={<Wallet className="size-3.5" aria-hidden />}
          rows={[
            { label: "Vs mês anterior", value: "+18%", tone: "positive" },
            { label: "Vs ano anterior", value: "−6%", tone: "negative" },
          ]}
        />
        <KpiCard
          label="Cotação"
          value="R$ 13,90 mi"
          icon={<FileText className="size-3.5" aria-hidden />}
          rows={[{ label: "Conversão", value: "62%", tone: "positive" }]}
        />
        <KpiCard
          label="Meta mensal"
          value="R$ 15,00 mi"
          icon={<Target className="size-3.5" aria-hidden />}
          rows={[
            { label: "Falta", value: "R$ 6,40 mi" },
            { label: "Total", value: "57%", tone: "negative" },
          ]}
        />
        <KpiCard
          label="Meta diária"
          value="R$ 710 mil"
          icon={<Gauge className="size-3.5" aria-hidden />}
          rows={[
            { label: "Hoje", value: "68%", tone: "negative" },
            { label: "Total", value: "57%" },
          ]}
        />
        <KpiCard
          label="Ticket médio"
          value="R$ 12,4 mil"
          icon={<Receipt className="size-3.5" aria-hidden />}
          rows={[{ label: "Base", value: "690 clientes" }]}
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.7fr_1fr]">
        <Panel
          title="Cotação por faturamento diário"
          aside={
            <Legend
              items={[
                { label: "Cotação", color: MOCKUP_COLORS.primary },
                { label: "Faturamento", color: MOCKUP_COLORS.primarySoft },
              ]}
            />
          }
        >
          <ComboBarChart
            labels={DIAS}
            tall={[74, 52, 88, 61, 43, 96, 58, 70, 49, 84, 66, 38, 91, 55, 78]}
            short={[31, 22, 36, 25, 18, 40, 24, 29, 20, 35, 27, 16, 38, 23, 32]}
            line={[33, 24, 38, 27, 20, 42, 26, 31, 22, 37, 29, 18, 40, 25, 34]}
            yTicks={["R$ 0,0 mi", "R$ 0,4 mi", "R$ 0,8 mi"]}
            ariaLabel="Gráfico de barras diário ilustrativo, comparando cotação e faturamento fictícios ao longo do mês"
          />
        </Panel>

        <Panel title="PDV de clientes" subtitle="Cobertura de carteira" icon={<Users className="size-3.5" aria-hidden />}>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:flex-nowrap">
            <DonutChart percent={34} ariaLabel="Rosca ilustrativa: 34% de cobertura de carteira (valor fictício)" />
            <dl className="min-w-0 flex-1 space-y-2 text-[11px]">
              {[
                { label: "Clientes realizados", value: "690" },
                { label: "Meta de clientes", value: "2.030" },
                { label: "Faltam", value: "1.340", tone: MOCKUP_COLORS.warning },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3">
                  <dt className="inline-flex items-center gap-1.5 text-(--color-ink-2)">
                    <span aria-hidden className="size-1.5 rounded-full bg-(--color-ink-3)" />
                    {item.label}
                  </dt>
                  <dd
                    className="font-semibold tabular-nums"
                    style={{ color: item.tone ?? MOCKUP_COLORS.primarySoft }}
                  >
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Panel>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr]">
        <Panel
          title="Faturamento por meta mensal"
          aside={
            <Legend
              items={[
                { label: "Faturamento", color: MOCKUP_COLORS.primary },
                { label: "Meta", color: MOCKUP_COLORS.primaryDeep },
              ]}
            />
          }
        >
          <GroupedBarChart
            labels={["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set"]}
            seriesA={{ values: [52, 71, 44, 83, 60, 39, 76, 55, 86], color: MOCKUP_COLORS.primary }}
            seriesB={{ values: [64, 66, 62, 70, 65, 61, 72, 63, 74], color: MOCKUP_COLORS.primaryDeep }}
            yTicks={["R$ 0 mi", "R$ 20 mi"]}
            ariaLabel="Gráfico de barras mensal ilustrativo, comparando faturamento e meta fictícios"
          />
        </Panel>

        <Panel title="Resumo inteligente" subtitle="Análise automática do período">
          <div className="grid grid-cols-3 gap-2">
            <StatTile value="57%" caption="Meta PDV" />
            <StatTile value="R$ 8,6 mi" caption="Faturamento" />
            <StatTile value="34%" caption="Clientes" />
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-(--color-ink-2)">
            O PDV registra atualmente <Highlight>57%</Highlight> da meta mensal. Para atingir o
            resultado projetado, é necessário um ritmo médio de mais{" "}
            <Highlight tone="warning">R$ 640 mil/dia</Highlight>. A conversão encontra-se em{" "}
            <Highlight>62%</Highlight>, com <Highlight>34%</Highlight> do PDV de clientes já em
            carteira.
          </p>
        </Panel>
      </div>
    </div>
  );
}

function PaginaClientes() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard
          label="Faturamento"
          value="R$ 128,0 mi"
          icon={<Wallet className="size-3.5" aria-hidden />}
          rows={[
            { label: "Vs mês anterior", value: "+7%", tone: "positive" },
            { label: "Vs ano anterior", value: "−4%", tone: "negative" },
          ]}
        />
        <KpiCard
          label="Clientes ativos"
          value="6.400"
          icon={<Users className="size-3.5" aria-hidden />}
          rows={[{ label: "Vs mês anterior", value: "+12%", tone: "positive" }]}
        />
        <KpiCard
          label="Ticket médio"
          value="R$ 20,0 mil"
          icon={<Receipt className="size-3.5" aria-hidden />}
          rows={[{ label: "Vs mês anterior", value: "−3%", tone: "negative" }]}
        />
        <KpiCard
          label="Taxa de conversão"
          value="16,0%"
          icon={<Percent className="size-3.5" aria-hidden />}
          rows={[{ label: "Vs mês anterior", value: "+5 p.p.", tone: "positive" }]}
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr]">
        <Panel title="Clientes por faturamento e conversão">
          <DataTable
            minWidth="min-w-[440px]"
            columns={[
              { label: "Cliente" },
              { label: "Faturamento" },
              { label: "Cotação" },
              { label: "% Conversão" },
            ]}
            rows={[
              { id: "a", cells: ["Alfa Metalúrgica", "R$ 6,40 mi", "R$ 11,20 mi", "57%"] },
              { id: "b", cells: ["Beta Indústria", "R$ 5,15 mi", "R$ 18,40 mi", "28%"] },
              { id: "c", cells: ["Gama Componentes", "R$ 4,80 mi", "R$ 7,50 mi", "64%"] },
              { id: "d", cells: ["Delta Equipamentos", "R$ 3,95 mi", "R$ 21,90 mi", "18%"] },
              { id: "e", cells: ["Épsilon Estruturas", "R$ 3,20 mi", "R$ 4,10 mi", "78%"] },
              { id: "f", cells: ["Zeta Montagens", "R$ 2,75 mi", "R$ 9,80 mi", "28%"] },
              { id: "g", cells: ["Sigma Usinagem", "R$ 2,40 mi", "R$ 3,60 mi", "67%"] },
              { id: "h", cells: ["Ômega Caldeiraria", "R$ 1,95 mi", "R$ 6,30 mi", "31%"] },
            ]}
            total={["Total", "R$ 128,0 mi", "R$ 800,0 mi", "16%"]}
          />
        </Panel>

        <Panel
          title="Faturamento por estado"
          aside={
            <div className="text-right">
              <p className="text-[10px] tracking-[0.12em] text-(--color-ink-3) uppercase">Total</p>
              <p className="text-sm font-semibold tabular-nums text-(--color-ink-0)">R$ 128,0 mi</p>
            </div>
          }
        >
          <DistributionList
            ariaLabel="Distribuição ilustrativa de faturamento por estado (valores fictícios)"
            items={[
              { id: "mg", label: "MG", display: "R$ 44,8 mi", percent: 35 },
              { id: "sp", label: "SP", display: "R$ 33,3 mi", percent: 26 },
              { id: "ba", label: "BA", display: "R$ 20,5 mi", percent: 16 },
              { id: "rs", label: "RS", display: "R$ 15,4 mi", percent: 12 },
              { id: "go", label: "GO", display: "R$ 14,0 mi", percent: 11 },
            ]}
          />
        </Panel>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_1.25fr]">
        <Panel title="Top 5 clientes">
          <RankingBars
            ariaLabel="Ranking ilustrativo dos cinco maiores clientes (valores fictícios)"
            labelWidth="w-28"
            items={[
              { id: "a", label: "Alfa Metalúrgica", value: 640, display: "R$ 6,40 mi" },
              { id: "b", label: "Beta Indústria", value: 515, display: "R$ 5,15 mi" },
              { id: "c", label: "Gama Componentes", value: 480, display: "R$ 4,80 mi" },
              { id: "d", label: "Delta Equipamentos", value: 395, display: "R$ 3,95 mi" },
              { id: "e", label: "Épsilon Estruturas", value: 320, display: "R$ 3,20 mi" },
            ]}
          />
        </Panel>

        <Panel title="Evolução mensal">
          <AreaChart
            labels={["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]}
            values={[46, 63, 51, 78, 58, 84, 69, 92, 74, 88, 65, 81]}
            yTicks={["R$ 0 mi", "R$ 20 mi"]}
            ariaLabel="Gráfico de área ilustrativo com a evolução mensal fictícia do faturamento"
          />
        </Panel>
      </div>
    </div>
  );
}

export function VendasDeVendedoresMockup() {
  return (
    <MockupFrame
      title="Painel de Vendas"
      updatedAt="01/06/2026 08:00"
      pages={[
        { id: "desempenho", label: "Desempenho de vendas", content: <PaginaDesempenho /> },
        { id: "clientes", label: "Clientes", content: <PaginaClientes /> },
      ]}
    />
  );
}
