// ESLint 9 usa "flat config" (eslint.config.*) — o antigo .eslintrc.json era
// simplesmente ignorado e `npm run lint` falhava. O eslint-config-next 16 já
// exporta arrays no formato flat, então basta espalhá-los aqui.
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const config = [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
];

export default config;
