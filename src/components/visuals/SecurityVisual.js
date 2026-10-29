import { useEffect, useState } from 'react';

// Enterprise Security: a pgAudit-style log stream next to a role/privilege matrix.
// Entries are illustrative examples of the log format, not real audit records.

const SAMPLE = [
  ['READ', 'SELECT', 'public.orders'],
  ['WRITE', 'UPDATE', 'public.inventory'],
  ['DDL', 'ALTER TABLE', 'public.customers'],
  ['ROLE', 'GRANT', 'reporting_ro'],
  ['READ', 'SELECT', 'public.invoices'],
  ['WRITE', 'INSERT', 'audit.login_events'],
  ['DDL', 'CREATE INDEX', 'public.orders'],
  ['ROLE', 'REVOKE', 'temp_contractor'],
];

const MATRIX = {
  roles: ['dba', 'app_rw', 'reporting_ro'],
  privileges: ['SELECT', 'INSERT', 'DDL'],
  grants: [
    [true, true, true],
    [true, true, false],
    [true, false, false],
  ],
};

const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const classTone = { READ: 'text-accent2-300', WRITE: 'text-accent-300', DDL: 'text-accent2', ROLE: 'text-violet' };

export default function SecurityVisual() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduced()) return undefined;
    const t = setInterval(() => setOffset((o) => o + 1), 1600);
    return () => clearInterval(t);
  }, []);

  const rows = Array.from({ length: 11 }, (_, i) => {
    const n = offset + i;
    const [cls, cmd, obj] = SAMPLE[n % SAMPLE.length];
    return { n, cls, cmd, obj };
  });

  return (
    <div className="grid h-full gap-3 lg:grid-cols-5">
      <div className="flex min-h-[260px] flex-col overflow-hidden rounded-lg border border-line/10 bg-ink-950/70 font-mono text-[11.5px] lg:col-span-3">
        <div className="flex items-center justify-between border-b border-line/10 px-3 py-2 text-[11px] text-fg-500">
          <span>postgresql.log · pgaudit</span>
          <span className="flex items-center gap-1.5 text-ok">
            <span className="status-dot" /> streaming
          </span>
        </div>
        <div className="flex-1 space-y-1.5 overflow-hidden p-3">
          {rows.map((r, i) => (
            <div key={r.n} className="truncate transition-opacity duration-500" style={{ opacity: 0.45 + (i / rows.length) * 0.55 }}>
              <span className="text-fg-500">AUDIT: SESSION,{r.n + 1},1,</span>
              <span className={classTone[r.cls]}>{r.cls}</span>
              <span className="text-fg-500">,</span>
              <span className="text-fg-100">{r.cmd}</span>
              <span className="text-fg-500">,{r.obj}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:col-span-2">
        <div className="flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/10 p-3">
          <svg className="h-9 w-9 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-fg-50">Audit logging</p>
            <p className="text-xs text-fg-400">Session & object auditing</p>
          </div>
        </div>
        <div className="flex-1 rounded-lg border border-line/10 bg-ink-950/60 p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-fg-500">Access control</p>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-fg-500">
                <th className="pb-1.5 font-medium">role</th>
                {MATRIX.privileges.map((p) => (
                  <th key={p} className="pb-1.5 text-center font-mono font-medium">
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX.roles.map((role, r) => (
                <tr key={role} className="border-t border-line/5">
                  <td className="py-1.5 font-mono text-fg-200">{role}</td>
                  {MATRIX.grants[r].map((g, c) => (
                    <td key={c} className={`py-1.5 text-center ${g ? 'text-ok' : 'text-fg-600'}`} aria-label={g ? 'granted' : 'denied'}>
                      {g ? '✓' : '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
