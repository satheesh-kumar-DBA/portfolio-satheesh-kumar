import { motion } from 'framer-motion';
import { useMemo } from 'react';

// Decorative "query response times" chart: a spiky cyan series, a smooth amber series
// and a thin baseline, drawn from a seeded generator so it looks the same on every load.

const W = 600;
const H = 240;
const POINTS = 140;

function seeded(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const bump = (x, center, width, height) => height * Math.exp(-((x - center) ** 2) / (2 * width ** 2));

function buildSeries() {
  const rand = seeded(17);
  const xs = Array.from({ length: POINTS }, (_, i) => (i / (POINTS - 1)) * W);

  const spiky = xs.map((x, i) => {
    const t = i / POINTS;
    const envelope = bump(t, 0.28, 0.1, 1) + bump(t, 0.45, 0.06, 0.8) + 0.18;
    const spike = rand() > 0.82 ? rand() * 0.9 : rand() * 0.25;
    return H - 30 - (envelope * 120 + spike * 90 * envelope);
  });

  const smooth = xs.map((x) => {
    const t = x / W;
    return H - 30 - (bump(t, 0.37, 0.035, 150) + bump(t, 0.6, 0.06, 110) + bump(t, 0.76, 0.05, 125) + bump(t, 0.88, 0.04, 105) + 28);
  });

  const base = xs.map((x) => {
    const t = x / W;
    return H - 30 - (55 + 25 * Math.sin(t * Math.PI * 1.1) + bump(t, 0.35, 0.12, 30));
  });

  return { xs, spiky, smooth, base };
}

const line = (xs, ys) => xs.map((x, i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(' ');
const area = (xs, ys) => `${line(xs, ys)} L${W} ${H} L0 ${H} Z`;

export default function MonitorChart({ className = '' }) {
  const { xs, spiky, smooth, base } = useMemo(buildSeries, []);
  const draw = { initial: { pathLength: 0 }, animate: { pathLength: 1 } };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mc-accent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: 'rgb(var(--accent))' }} stopOpacity="0.45" />
          <stop offset="100%" style={{ stopColor: 'rgb(var(--accent))' }} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="mc-accent2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: 'rgb(var(--accent2))' }} stopOpacity="0.55" />
          <stop offset="100%" style={{ stopColor: 'rgb(var(--accent2))' }} stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* grid */}
      <g style={{ stroke: 'rgb(var(--fg-400))' }} strokeOpacity="0.1" vectorEffect="non-scaling-stroke">
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1="0" x2={W} y1={(i * H) / 6} y2={(i * H) / 6} vectorEffect="non-scaling-stroke" />
        ))}
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`v${i}`} y1="0" y2={H} x1={(i * W) / 12} x2={(i * W) / 12} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      <motion.path d={area(xs, smooth)} fill="url(#mc-accent2)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.6 }} />
      <motion.path d={area(xs, spiky)} fill="url(#mc-accent)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }} />

      <motion.path
        d={line(xs, smooth)}
        fill="none"
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
        style={{ stroke: 'rgb(var(--accent2))', filter: 'drop-shadow(0 0 4px rgb(var(--accent2) / 0.7))' }}
        {...draw}
        transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.2 }}
      />
      <motion.path
        d={line(xs, spiky)}
        fill="none"
        strokeWidth="1.4"
        vectorEffect="non-scaling-stroke"
        style={{ stroke: 'rgb(var(--accent))', filter: 'drop-shadow(0 0 4px rgb(var(--accent) / 0.8))' }}
        {...draw}
        transition={{ duration: 2.4, ease: 'easeInOut' }}
      />
      <motion.path
        d={line(xs, base)}
        fill="none"
        style={{ stroke: 'rgb(var(--fg-200))' }}
        strokeOpacity="0.55"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        {...draw}
        transition={{ duration: 2.4, ease: 'easeInOut', delay: 0.4 }}
      />
    </svg>
  );
}
