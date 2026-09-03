import type { NavItem } from "@/lib/types";

export const navItems: NavItem[] = [
  { id: "sobre", label: "Sobre", href: "#sobre" },
  {
    id: "projetos",
    label: "Projetos",
    href: "#projetos",
    children: [
      { id: "projetos-profissionais", label: "Profissionais", kind: "profissional" },
      { id: "projetos-pessoais", label: "Pessoais", kind: "pessoal" },
    ],
  },
  { id: "habilidades", label: "Habilidades", href: "#habilidades" },
  { id: "contato", label: "Contato", href: "#contato" },
];
