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
  // O Next 16, em dev, só confia em "localhost" por padrão — qualquer outra
  // origem tem os assets bloqueados com 403 (proteção contra sites maliciosos
  // sondando o dev server). O fluxo de setup do Keystatic exige "127.0.0.1"
  // (boa prática de OAuth), então precisa entrar aqui explicitamente, senão o
  // React nunca hidrata e formulários caem no submit nativo do navegador.
  allowedDevOrigins: ["127.0.0.1"],
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
