import type { ComponentType } from "react";

import { DashboardDespesasMockup } from "@/components/projects/mockup/dashboard-despesas";
import { VendasDeVendedoresMockup } from "@/components/projects/mockup/vendas-de-vendedores";

/**
 * Recriações de dashboard por case.
 *
 * Cada dashboard real tem um layout próprio, então cada um ganha seu próprio
 * componente (montado com as primitivas de `mockup-parts.tsx`) em vez de tentar
 * caber num schema genérico. Um case sem entrada aqui simplesmente não exibe
 * mockup.
 */
export const mockupsBySlug: Record<string, ComponentType> = {
  "vendas-de-vendedores": VendasDeVendedoresMockup,
  "dashboard-despesas": DashboardDespesasMockup,
};
