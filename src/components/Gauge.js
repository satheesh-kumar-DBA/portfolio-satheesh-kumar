import { motion } from 'framer-motion';

const R = 52;
const C = 2 * Math.PI * R;
const ARC = C * 0.75; // 270° dial, open at the bottom

// Circular dial like the reference dashboard's gauges. `fill` is 0..1 and purely visual.
export default function Gauge({ value, label, sublabel, stroke, glow, fill = 0.7 }) {
  const amount = Math.min(Math.max(fill, 0.05), 1);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-32 w-32 sm:h-36 sm:w-36">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-[225deg]">
          <circle cx="60" cy="60" r={R} fill="none" style={{ stroke: 'rgb(var(--ink-600))' }} strokeWidth="7" strokeLinecap="round" strokeDasharray={`${ARC} ${C}`} />
          <motion.circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke={stroke}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${ARC} ${C}`}
            style={{ filter: `drop-shadow(0 0 6px ${glow})` }}
            initial={{ strokeDashoffset: ARC }}
            whileInView={{ strokeDashoffset: ARC * (1 - amount) }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-4xl font-semibold leading-none text-fg-50 sm:text-[2.6rem]">{value}</span>
          <span className="mt-1 text-xs font-medium text-fg-400">{label}</span>
        </div>
      </div>
      {sublabel && <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-500">{sublabel}</span>}
    </div>
  );
}

// Percent values fill proportionally; other values get a fixed decorative fill.
export function gaugeFill(value, idx) {
  const pct = /^(\d+(?:\.\d+)?)\s*%$/.exec(String(value).trim());
  if (pct) return Number(pct[1]) / 100;
  return [0.78, 0.62, 0.7, 0.86][idx % 4];
}
