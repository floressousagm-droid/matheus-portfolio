/**
 * Faixa decorativa presa ao topo do rodapé — ocupa só a área de respiro
 * acima do conteúdo (o `py-14` do container logo abaixo), nunca a área onde
 * o texto do rodapé vive, então pode ser mais larga/visível sem atrapalhar
 * a leitura. Mesma linguagem das linhas onduladas do retrato da seção Sobre.
 */
export function FooterGlow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 110"
      preserveAspectRatio="none"
      className="absolute inset-x-0 top-0 h-12 w-full sm:h-14"
    >
      <defs>
        <linearGradient id="footer-glow-fade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-accent-500)" stopOpacity="0" />
          <stop offset="35%" stopColor="var(--color-accent-500)" stopOpacity="0.5" />
          <stop offset="70%" stopColor="var(--color-accent-500)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-accent-500)" stopOpacity="0" />
        </linearGradient>
        <filter id="footer-glow-blur" x="-10%" y="-100%" width="120%" height="300%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      <path
        d="M-20,70 C120,20 260,100 420,55 C580,10 720,90 880,50 C1000,20 1120,70 1220,40"
        fill="none"
        stroke="url(#footer-glow-fade)"
        strokeWidth="34"
        strokeLinecap="round"
        opacity="0.35"
        filter="url(#footer-glow-blur)"
      />
      <path
        d="M-20,70 C120,20 260,100 420,55 C580,10 720,90 880,50 C1000,20 1120,70 1220,40"
        fill="none"
        stroke="var(--color-accent-300)"
        strokeWidth="1.5"
        opacity="0.5"
      />
    </svg>
  );
}
