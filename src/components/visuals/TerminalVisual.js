import { useMemo } from 'react';
import { useTypedLines } from './useTypedLines';

// psql session that "queries" the portfolio. Every value printed comes from the database content.
function pad(s, n) {
  return String(s).padEnd(n, ' ');
}

export function buildPsqlLines({ profile, technologies, projects, skills }) {
  const nameW = Math.max(4, profile.full_name.length);
  const roleW = Math.max(4, (profile.headline || '').length);
  const lines = [
    { type: 'cmd', prompt: '$', text: 'psql -d portfolio' },
    { type: 'out', text: 'psql (17) — connected to "portfolio"', tone: 'dim' },
    { type: 'cmd', prompt: 'portfolio=#', text: 'SELECT name, role FROM profile;' },
    { type: 'out', text: ` ${pad('name', nameW)} | ${pad('role', roleW)}`, tone: 'head' },
    { type: 'out', text: `-${'-'.repeat(nameW)}-+-${'-'.repeat(roleW)}`, tone: 'dim' },
    { type: 'out', text: ` ${pad(profile.full_name, nameW)} | ${profile.headline || ''}` },
    { type: 'out', text: '(1 row)', tone: 'dim' },
  ];

  if (technologies.length) {
    lines.push(
      { type: 'cmd', prompt: 'portfolio=#', text: 'SELECT string_agg(name, \', \') FROM technologies;' },
      { type: 'out', text: ` ${technologies.slice(0, 5).map((t) => t.name).join(', ')}`, tone: 'accent' }
    );
  }

  if (projects.length) {
    lines.push({ type: 'cmd', prompt: 'portfolio=#', text: 'SELECT title FROM projects ORDER BY sort_order;' });
    projects.slice(0, 3).forEach((p) => lines.push({ type: 'out', text: ` ${p.title}` }));
    lines.push({ type: 'out', text: `(${Math.min(projects.length, 3)} rows)`, tone: 'dim' });
  } else if (skills.length) {
    lines.push({ type: 'cmd', prompt: 'portfolio=#', text: 'SELECT name FROM skills LIMIT 3;' });
    skills.slice(0, 3).forEach((s) => lines.push({ type: 'out', text: ` ${s.name}` }));
  }
  return lines;
}

const toneClass = {
  dim: 'text-fg-500',
  head: 'text-fg-100 font-semibold',
  accent: 'text-accent-300',
};

export function TerminalLines({ shown, typing }) {
  const lastPrompt = [...shown].reverse().find((l) => l.type === 'cmd')?.prompt ?? '$';
  const renderLine = (l, i, isTyping) => (
    <div key={i} className="whitespace-pre-wrap break-words">
      {l.type === 'cmd' ? (
        <>
          <span className="text-accent">{l.prompt} </span>
          <span className="text-fg-100">{l.text}</span>
          {isTyping && <span className="caret ml-0.5" />}
        </>
      ) : (
        <span className={toneClass[l.tone] ?? 'text-fg-300'}>{l.content ?? l.text}</span>
      )}
    </div>
  );

  return (
    <>
      {shown.map((l, i) => renderLine(l, i, false))}
      {typing && renderLine(typing, 'typing', true)}
      {!typing && (
        <div>
          <span className="text-accent">{lastPrompt === '$' ? '$' : 'portfolio=#'} </span>
          <span className="caret" />
        </div>
      )}
    </>
  );
}

export function TerminalWindow({ title, children, className = '' }) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-xl border border-line/10 bg-ink-950/80 font-mono text-[13px] leading-6 shadow-panel ${className}`}>
      <div className="flex items-center gap-2 border-b border-line/10 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate text-xs text-fg-500">{title}</span>
      </div>
      <div className="flex-1 overflow-hidden p-4">{children}</div>
    </div>
  );
}

export default function TerminalVisual({ data }) {
  const lines = useMemo(() => buildPsqlLines(data), [data]);
  const { shown, typing } = useTypedLines(lines);
  return (
    <TerminalWindow title="psql — portfolio" className="h-full min-h-[300px]">
      <TerminalLines shown={shown} typing={typing} />
    </TerminalWindow>
  );
}
