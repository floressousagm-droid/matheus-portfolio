/**
 * Fundo decorativo da seção Contato: uma tendência de crescimento (nós
 * conectados por linhas, como um gráfico) em ciano, bem discreta — inspirada
 * numa referência que o Matheus mandou, mas recriada em SVG (sem foto de
 * banco de imagens) e sem depender de nenhuma pessoa na cena.
 */
const nodes = [
  { x: 40, y: 300, r: 14 },
  { x: 260, y: 235, r: 9 },
  { x: 480, y: 280, r: 20 },
  { x: 700, y: 165, r: 11 },
  { x: 920, y: 95, r: 22 },
  { x: 1140, y: 135, r: 9 },
];

export function ContactVisual() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 size-full opacity-20"
    >
      {nodes.slice(1).map((node, index) => {
        const prev = nodes[index]!;
        return (
          <line
            key={`line-${node.x}`}
            x1={prev.x}
            y1={prev.y}
            x2={node.x}
            y2={node.y}
            stroke="var(--color-accent-500)"
            strokeWidth={1.5}
          />
        );
      })}

      {nodes.map((node) => (
        <circle
          key={`node-${node.x}`}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill="none"
          stroke="var(--color-accent-300)"
          strokeWidth={1.5}
        />
      ))}
    </svg>
  );
}
