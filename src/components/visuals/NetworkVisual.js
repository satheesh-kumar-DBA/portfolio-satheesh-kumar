import { useMemo } from 'react';

// Cyber Tech: a node graph with neon edges and packets travelling along them.
// The hub is PostgreSQL-style "core"; satellite nodes are the technologies from the database.

const W = 600;
const H = 340;

function seeded(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildGraph(labels, count = 26, seed = 7) {
  const rand = seeded(seed);
  const hub = { x: W / 2, y: H / 2, r: 9, label: null, hub: true };
  const named = labels.slice(0, 6).map((label, i) => {
    const angle = (i / Math.min(labels.length, 6)) * Math.PI * 2 - Math.PI / 2;
    return { x: W / 2 + Math.cos(angle) * 190, y: H / 2 + Math.sin(angle) * 115, r: 5, label };
  });
  const extra = Array.from({ length: count }, () => ({ x: 20 + rand() * (W - 40), y: 16 + rand() * (H - 32), r: 1.5 + rand() * 2 }));
  const nodes = [hub, ...named, ...extra];

  const edges = [];
  named.forEach((n) => edges.push([hub, n, true]));
  nodes.forEach((a, i) => {
    nodes.slice(i + 1).forEach((b) => {
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 95 && !a.hub && !b.hub) edges.push([a, b, false]);
    });
  });
  return { nodes, edges };
}

export default function NetworkVisual({ data, className = '' }) {
  const labels = data.technologies.map((t) => t.name);
  const { nodes, edges } = useMemo(() => buildGraph(labels), [labels.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true">
      <defs>
        <radialGradient id="nv-hub">
          <stop offset="0%" style={{ stopColor: 'rgb(var(--accent))' }} stopOpacity="0.9" />
          <stop offset="100%" style={{ stopColor: 'rgb(var(--accent))' }} stopOpacity="0" />
        </radialGradient>
      </defs>

      {edges.map(([a, b, main], i) => (
        <line
          key={i}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          style={{ stroke: main ? 'rgb(var(--accent))' : 'rgb(var(--accent2))' }}
          strokeOpacity={main ? 0.55 : 0.18}
          strokeWidth={main ? 1.2 : 0.8}
        />
      ))}

      {/* packets travelling from the hub */}
      {edges
        .filter(([, , main]) => main)
        .map(([a, b], i) => (
          <circle key={`p${i}`} r="2.6" style={{ fill: 'rgb(var(--accent2))', filter: 'drop-shadow(0 0 4px rgb(var(--accent2)))' }}>
            <animateMotion dur={`${2.2 + (i % 3) * 0.6}s`} repeatCount="indefinite" path={`M${a.x},${a.y} L${b.x},${b.y}`} />
          </circle>
        ))}

      <circle cx={W / 2} cy={H / 2} r="46" fill="url(#nv-hub)">
        <animate attributeName="r" values="40;52;40" dur="3s" repeatCount="indefinite" />
      </circle>

      {nodes.map((n, i) => (
        <g key={`n${i}`}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            style={{ fill: n.label || n.hub ? 'rgb(var(--accent))' : 'rgb(var(--fg-400))', filter: n.label || n.hub ? 'drop-shadow(0 0 6px rgb(var(--accent)))' : 'none' }}
            fillOpacity={n.label || n.hub ? 1 : 0.5}
          />
          {n.label && (
            <text
              x={n.x}
              y={n.y + (n.y > H / 2 ? 20 : -12)}
              textAnchor="middle"
              style={{ fill: 'rgb(var(--fg-200))', fontFamily: 'var(--font-mono)' }}
              fontSize="11"
            >
              {n.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
