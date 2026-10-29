import { motion } from 'framer-motion';
import MonitorChart from '../MonitorChart';

// Data Analytics: KPI tiles from the stats table, a trend chart and a before/after comparison
// derived from any percentage stat (e.g. "60% Efficiency Improvement").

export function Sparkline({ seed = 1, className = '' }) {
  const pts = Array.from({ length: 16 }, (_, i) => {
    const v = Math.sin(i * 0.7 + seed) * 0.35 + Math.sin(i * 0.31 + seed * 2) * 0.25 + i / 22;
    return [i * (100 / 15), 28 - v * 16];
  });
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  return (
    <svg viewBox="0 0 100 32" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d={`${d} L100 32 L0 32 Z`} style={{ fill: 'rgb(var(--accent) / 0.12)' }} />
      <path d={d} fill="none" style={{ stroke: 'rgb(var(--accent))' }} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function KpiVisual({ data }) {
  const stats = data.stats.slice(0, 4);
  const pctStat = data.stats.find((s) => /%\s*$/.test(String(s.value)));
  const pct = pctStat ? Math.min(Math.max(parseFloat(pctStat.value), 0), 100) : null;

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.id} className="rounded-lg border border-line/10 bg-ink-950/60 p-3">
            <p className="truncate text-[11px] font-medium uppercase tracking-wider text-fg-500">{s.label}</p>
            <p className="mt-1 font-display text-2xl font-semibold text-fg-50">{s.value}</p>
            <Sparkline seed={i + 1} className="mt-1 h-6 w-full" />
          </div>
        ))}
      </div>

      <div className="grid flex-1 gap-3 sm:grid-cols-5">
        <div className="relative min-h-[160px] overflow-hidden rounded-lg border border-line/10 bg-ink-950/60 sm:col-span-3">
          <MonitorChart className="absolute inset-0 h-full w-full" />
        </div>
        {pct !== null && (
          <div className="flex flex-col justify-center gap-3 rounded-lg border border-line/10 bg-ink-950/60 p-4 sm:col-span-2">
            <p className="text-xs font-semibold text-fg-200">
              {pctStat.label} {pctStat.sublabel}
            </p>
            {[
              ['Before', 100, 'bg-fg-500'],
              ['After', 100 - pct, 'bg-accent'],
            ].map(([label, width, color]) => (
              <div key={label}>
                <div className="mb-1 flex justify-between text-[11px] text-fg-500">
                  <span>{label}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-line/10">
                  <motion.div
                    className={`h-full rounded-full ${color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                  />
                </div>
              </div>
            ))}
            <p className="text-[11px] text-fg-500">Manual effort, relative</p>
          </div>
        )}
      </div>
    </div>
  );
}
