// Small building blocks shared by the section components.
import { useCallback } from 'react';
import { barColors } from '../theme';
import { useTheme } from '../themes/ThemeContext';

// Renders SVG markup stored in the database. Content is only writable by admins
// (see supabase/migrations), so it is trusted markup.
export function SvgIcon({ svg, className = '' }) {
  if (!svg) return null;
  return <span className={`svg-icon ${className}`} aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />;
}

// Renders text where **word** marks a highlighted span.
export function RichText({ text, highlightClassName = 'text-accent-300 font-medium' }) {
  if (!text) return null;
  return text.split('**').map((part, idx) =>
    idx % 2 === 1 ? (
      <span key={idx} className={highlightClassName}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

// Section header; its style follows the active theme's `heading` setting
export function SectionHeading({ title, eyebrow, index }) {
  const { heading } = useTheme();
  if (!title) return null;

  if (heading === 'terminal') {
    return (
      <div className="mb-10 font-mono">
        <p className="mb-2 text-sm text-fg-500">
          <span className="text-accent">visitor@portfolio</span>:<span className="text-accent2">~</span>$ cat ./
          {(eyebrow || 'section').toLowerCase()}.md
        </p>
        <h2 className="text-2xl font-bold text-fg-50 md:text-3xl">
          <span className="text-accent"># </span>
          {title}
        </h2>
        <div className="mt-4 h-px w-full border-t border-dashed border-accent/40" />
      </div>
    );
  }

  if (heading === 'editorial') {
    return (
      <div className="mb-14 grid gap-4 md:grid-cols-12">
        <p className="text-xs uppercase tracking-[0.3em] text-fg-500 md:col-span-3 md:pt-4">
          {index && <span className="mr-2 text-accent">{index}</span>}
          {eyebrow}
        </p>
        <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fg-50 md:col-span-9 md:text-6xl">{title}</h2>
      </div>
    );
  }

  if (heading === 'corporate') {
    return (
      <div className="mb-12">
        {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>}
        <h2 className="font-display text-3xl font-bold tracking-tight text-fg-50 md:text-4xl">{title}</h2>
        <div className="mt-5 h-1 w-14 rounded-full bg-accent" />
      </div>
    );
  }

  if (heading === 'cyber') {
    return (
      <div className="mb-10">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent2">
          [ {index} ] {eyebrow}
        </p>
        <h2
          className="font-display text-3xl font-bold uppercase tracking-[0.08em] text-fg-50 md:text-4xl"
          style={{ textShadow: '0 0 18px rgb(var(--accent) / 0.55)' }}
        >
          {title}
        </h2>
        <div className="relative mt-5 h-px w-full overflow-hidden bg-accent/20">
          <div className="glow-line absolute inset-y-0 left-0 w-2/3" />
        </div>
      </div>
    );
  }

  if (heading === 'plain') {
    return (
      <div className="mb-10">
        {eyebrow && <p className="mb-2 text-sm font-medium text-accent">{eyebrow}</p>}
        <h2 className="font-display text-3xl font-semibold tracking-tight text-fg-50 md:text-4xl">{title}</h2>
      </div>
    );
  }

  // indexed (default): "01 / ABOUT" eyebrow, title and a glowing rule
  return (
    <div className="mb-10">
      {(eyebrow || index) && (
        <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-accent">
          <span className="inline-block h-3 w-1 rounded-sm bg-accent shadow-[0_0_8px_rgb(var(--accent)/0.8)]" />
          {index && <span className="text-fg-500">{index} /</span>}
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-fg-50 md:text-4xl">{title}</h2>
      <div className="relative mt-5 h-px w-full overflow-hidden bg-line/5">
        <div className="glow-line absolute inset-y-0 left-0 w-1/3" />
        <div className="scan absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-accent-300/70 to-transparent" />
      </div>
    </div>
  );
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Mouse-follow 3D tilt for the Interactive 3D theme. Returns props to spread on any element.
export function useTilt(strength = 8) {
  const { tilt } = useTheme();
  const onMouseMove = useCallback(
    (e) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-y * strength).toFixed(2)}deg) rotateY(${(x * strength).toFixed(2)}deg)`;
    },
    [strength]
  );
  const onMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform = '';
  }, []);
  if (!tilt || prefersReducedMotion()) return {};
  return { onMouseMove, onMouseLeave };
}

// Dashboard panel with an accent bar before the title
export function Panel({ title, accent = 'sky', right, children, className = '', bodyClassName = 'p-5', hover = true }) {
  const tiltProps = useTilt(hover ? 8 : 4);
  return (
    <div className={`panel shadow-panel ${hover ? 'panel-hover' : ''} ${className}`} {...tiltProps}>
      {(title || right) && (
        <div className="flex items-center justify-between gap-3 border-b border-line/5 px-5 py-3.5">
          {title && (
            <h3 className="flex items-center gap-2.5 text-sm font-semibold text-fg-200">
              <span className={`bar-item__bar inline-block h-3.5 w-1 rounded-sm ${accent === 'amber' ? 'bg-accent2' : 'bg-accent'}`} />
              {title}
            </h3>
          )}
          {right}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

// List row with a colored left bar, like the "Top Active Sessions" table
export function BarItem({ children, idx = 0, right }) {
  return (
    <div className="flex items-start gap-3 border-b border-line/5 py-3 last:border-b-0">
      <span className={`bar-item__bar mt-1.5 inline-block h-3.5 w-1 flex-shrink-0 rounded-sm ${barColors[idx % barColors.length]}`} />
      <div className="flex-1 text-sm leading-relaxed text-fg-300">{children}</div>
      {right && <div className="flex-shrink-0 font-display text-base font-medium tabular-nums text-fg-300">{right}</div>}
    </div>
  );
}

export function ArrowIcon() {
  return (
    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export const isExternal = (href = '') => /^https?:\/\//.test(href);

export const externalProps = (href) => (isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {});
