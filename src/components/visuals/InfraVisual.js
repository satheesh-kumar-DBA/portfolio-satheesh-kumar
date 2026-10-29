// Cloud & Infrastructure: a PostgreSQL replication / backup topology with data flowing along the links,
// plus status cards. It illustrates the kind of setup in the skills list (streaming + logical replication,
// WAL archiving, scheduled backups); it shows no live metrics.

const NODES = {
  app: { x: 70, y: 150, label: 'Applications', sub: 'clients' },
  primary: { x: 260, y: 150, label: 'Primary', sub: 'read / write', main: true },
  standby: { x: 470, y: 70, label: 'Standby', sub: 'physical replica' },
  logical: { x: 470, y: 150, label: 'Subscriber', sub: 'logical replica' },
  archive: { x: 470, y: 230, label: 'WAL archive', sub: 'PITR' },
  backup: { x: 260, y: 268, label: 'Backups', sub: 'pg_basebackup' },
};

const LINKS = [
  ['app', 'primary', 'accent'],
  ['primary', 'standby', 'accent'],
  ['primary', 'logical', 'accent2'],
  ['primary', 'archive', 'accent2'],
  ['primary', 'backup', 'accent'],
];

const STATUS = [
  { label: 'Streaming replication', state: 'streaming' },
  { label: 'WAL archiving', state: 'active' },
  { label: 'Backup jobs', state: 'scheduled' },
];

function Node({ x, y, label, sub, main }) {
  const w = main ? 130 : 128;
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - 24}
        width={w}
        height={48}
        rx="9"
        style={{
          fill: 'rgb(var(--ink-800))',
          stroke: main ? 'rgb(var(--accent))' : 'rgb(var(--fg-400) / 0.35)',
          filter: main ? 'drop-shadow(0 0 10px rgb(var(--accent) / 0.45))' : 'none',
        }}
        strokeWidth={main ? 1.5 : 1}
      />
      {/* cylinder glyph */}
      <g transform={`translate(${x - w / 2 + 12}, ${y - 9})`} style={{ stroke: 'rgb(var(--accent))' }} fill="none" strokeWidth="1.3">
        <ellipse cx="7" cy="3" rx="7" ry="3" />
        <path d="M0 3v12c0 1.7 3.1 3 7 3s7-1.3 7-3V3" />
        <path d="M0 9c0 1.7 3.1 3 7 3s7-1.3 7-3" />
      </g>
      <text x={x - w / 2 + 32} y={y - 2} style={{ fill: 'rgb(var(--fg-100))', fontFamily: 'var(--font-sans)' }} fontSize="12" fontWeight="600">
        {label}
      </text>
      <text x={x - w / 2 + 32} y={y + 13} style={{ fill: 'rgb(var(--fg-500))', fontFamily: 'var(--font-mono)' }} fontSize="8.5">
        {sub}
      </text>
    </g>
  );
}

export default function InfraVisual() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-lg border border-line/5 bg-ink-950/40">
        <svg viewBox="0 0 540 310" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {LINKS.map(([from, to, tone], i) => {
            const a = NODES[from];
            const b = NODES[to];
            const path = `M${a.x},${a.y} C${(a.x + b.x) / 2},${a.y} ${(a.x + b.x) / 2},${b.y} ${b.x},${b.y}`;
            return (
              <g key={i}>
                <path d={path} fill="none" style={{ stroke: `rgb(var(--${tone}) / 0.45)` }} strokeWidth="1.4" strokeDasharray="4 4" />
                {[0, 1].map((k) => (
                  <circle key={k} r="3" style={{ fill: `rgb(var(--${tone}))`, filter: `drop-shadow(0 0 4px rgb(var(--${tone})))` }}>
                    <animateMotion dur="2.6s" begin={`${k * 1.3 + i * 0.2}s`} repeatCount="indefinite" path={path} />
                  </circle>
                ))}
              </g>
            );
          })}
          {Object.entries(NODES).map(([key, n]) => (
            <Node key={key} {...n} />
          ))}
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {STATUS.map((s) => (
          <div key={s.label} className="rounded-lg border border-line/5 bg-ink-950/50 px-3 py-2">
            <p className="truncate text-[11px] text-fg-500">{s.label}</p>
            <p className="mt-0.5 flex items-center gap-1.5 font-mono text-xs text-ok">
              <span className="status-dot" /> {s.state}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
