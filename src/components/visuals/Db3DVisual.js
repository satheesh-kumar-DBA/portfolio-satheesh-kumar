import { useCallback, useRef } from 'react';

// Interactive 3D: a floating database stack with the technologies orbiting it in 3D space.
// Moving the pointer over it tilts the whole scene.

function DatabaseStack() {
  const disc = (y, i) => (
    <g key={i} transform={`translate(0 ${y})`}>
      <path d="M-70 0 v26 a70 18 0 0 0 140 0 v-26" style={{ fill: `url(#db3d-side)` }} />
      <ellipse cx="0" cy="0" rx="70" ry="18" style={{ fill: 'url(#db3d-top)', stroke: 'rgb(var(--accent-200) / 0.6)' }} strokeWidth="1" />
      <ellipse cx="0" cy="26" rx="70" ry="18" fill="none" style={{ stroke: 'rgb(var(--accent) / 0.35)' }} strokeWidth="1" strokeDasharray="2 4" />
    </g>
  );
  return (
    <svg viewBox="-90 -40 180 150" className="h-40 w-40 sm:h-48 sm:w-48" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 28px rgb(var(--accent) / 0.55))' }}>
      <defs>
        <linearGradient id="db3d-side" x1="0" x2="1">
          <stop offset="0%" style={{ stopColor: 'rgb(var(--accent) / 0.25)' }} />
          <stop offset="50%" style={{ stopColor: 'rgb(var(--accent) / 0.65)' }} />
          <stop offset="100%" style={{ stopColor: 'rgb(var(--accent2) / 0.35)' }} />
        </linearGradient>
        <linearGradient id="db3d-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: 'rgb(var(--accent-200))' }} />
          <stop offset="100%" style={{ stopColor: 'rgb(var(--accent))' }} />
        </linearGradient>
      </defs>
      {[60, 30, 0].map((y, i) => disc(y, i))}
    </svg>
  );
}

export default function Db3DVisual({ data }) {
  const sceneRef = useRef(null);
  const labels = data.technologies.slice(0, 8).map((t) => t.name);

  const onMove = useCallback((e) => {
    const el = sceneRef.current;
    if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-y * 18).toFixed(1)}deg) rotateY(${(x * 24).toFixed(1)}deg)`;
  }, []);
  const onLeave = useCallback(() => {
    if (sceneRef.current) sceneRef.current.style.transform = '';
  }, []);

  return (
    <div
      className="relative flex h-full min-h-[320px] items-center justify-center overflow-hidden rounded-lg border border-line/5 bg-ink-950/40"
      style={{ perspective: '900px' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="perspective-floor pointer-events-none absolute inset-x-[-20%] bottom-[-30%] h-[70%] opacity-60" />
      <div ref={sceneRef} className="relative transition-transform duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
        <div className="float-y relative z-10" style={{ transform: 'translateZ(40px)' }}>
          <DatabaseStack />
        </div>
        {/* orbit ring */}
        <div className="spin-y pointer-events-none absolute left-1/2 top-1/2 h-0 w-0" style={{ transformStyle: 'preserve-3d' }}>
          {labels.map((label, i) => (
            <div
              key={label}
              className="absolute whitespace-nowrap rounded-full border border-accent/40 bg-ink-900/80 px-3 py-1 text-xs font-medium text-accent-200 shadow-glow"
              style={{ transform: `rotateY(${(i * 360) / labels.length}deg) translateZ(170px) translate(-50%, -50%)`, backfaceVisibility: 'hidden' }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
