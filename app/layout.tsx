import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { identity } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${identity.name} — ${identity.role}`,
  description:
    "Portfólio de Matheus Flores, Analista de BI Júnior: entendimento de problemas de negócio, estruturação de dados e construção de soluções de BI de ponta a ponta.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: identity.name,
  },
};

/**
 * Layout raiz deliberadamente mínimo: só o documento e as fontes.
 *
 * O "chrome" do site (skip link, rodapé, provider das abas) vive em
 * `app/(site)/layout.tsx`, para que o painel de edição em `/keystatic` — que
 * fica fora desse grupo — não herde rodapé nem skip link.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
