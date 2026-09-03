import type { NextConfig } from "next";

/**
 * Cabeçalhos de segurança.
 *
 * O site é estático e não tem sessão nem login, então o risco aqui é baixo —
 * mas são proteções baratas. `frame-ancestors` impede que o site (e o painel
 * em /keystatic) seja embutido em um iframe de terceiros para clickjacking.
 *
 * Sem CSP completa de propósito: o Next injeta scripts inline e a Vercel
 * Analytics carrega de outro domínio, então uma CSP mal calibrada quebraria o
 * site em produção sem quebrar em dev — o pior tipo de regressão.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
