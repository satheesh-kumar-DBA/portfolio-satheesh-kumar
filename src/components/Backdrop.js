import { useMemo } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { buildGraph } from './visuals/NetworkVisual';

// Fixed page background; the pattern follows the active theme's `background` setting.

function Circuit() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.55]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="bg-circuit" width="220" height="220" patternUnits="userSpaceOnUse">
          <g fill="none" style={{ stroke: 'rgb(var(--accent))' }} strokeOpacity="0.07" strokeWidth="1">
            <path d="M0 40 H60 L80 60 H140" />
            <path d="M220 120 H170 L150 100 H100 V150" />
            <path d="M40 220 V180 L60 160 H90" />
            <path d="M180 0 V30 L200 50 H220" />
            <path d="M110 220 V200 L130 180 H180" />
          </g>
          <g style={{ fill: 'rgb(var(--accent))' }} fillOpacity="0.12">
            <circle cx="140" cy="60" r="2.5" />
            <circle cx="100" cy="150" r="2.5" />
            <circle cx="90" cy="160" r="2" />
            <circle cx="180" cy="180" r="2" />
            <circle cx="0" cy="40" r="2" />
          </g>
        </pattern>
        <radialGradient id="bg-fade" cx="50%" cy="40%" r="75%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="bg-mask">
          <rect width="100%" height="100%" fill="url(#bg-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-circuit)" mask="url(#bg-mask)" />
    </svg>
  );
}

const fadeMask = {
  WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)',
  maskImage: 'radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)',
};

function Grid() {
  return (
    <div
      className="absolute inset-0"
      style={{
        ...fadeMask,
        backgroundImage:
          'linear-gradient(rgb(var(--accent) / 0.07) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--accent) / 0.07) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    />
  );
}

function Dots() {
  return (
    <div
      className="absolute inset-0"
      style={{ ...fadeMask, backgroundImage: 'radial-gradient(rgb(var(--fg-400) / 0.22) 1px, transparent 1px)', backgroundSize: '22px 22px' }}
    />
  );
}

function Hex() {
  return (
    <svg className="absolute inset-0 h-full w-full" style={fadeMask} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="bg-hex" width="56" height="97" patternUnits="userSpaceOnUse">
          <path d="M28 0 L56 16 V48 L28 64 L0 48 V16 Z M28 64 V97" fill="none" style={{ stroke: 'rgb(var(--accent))' }} strokeOpacity="0.09" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-hex)" />
    </svg>
  );
}

function NetworkLines() {
  const { nodes, edges } = useMemo(() => buildGraph([], 60, 21), []);
  return (
    <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" style={fadeMask}>
      {edges.map(([a, b], i) => (
        <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} style={{ stroke: 'rgb(var(--accent))' }} strokeOpacity="0.12" strokeWidth="0.6" />
      ))}
      {nodes.map((n, i) =>
        n.hub ? null : (
          <circle key={i} cx={n.x} cy={n.y} r={n.r * 0.7} style={{ fill: i % 5 ? 'rgb(var(--accent))' : 'rgb(var(--accent2))' }} fillOpacity="0.45">
            <animate attributeName="fill-opacity" values="0.15;0.6;0.15" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
          </circle>
        )
      )}
    </svg>
  );
}

function Blobs() {
  return (
    <>
      <div className="drift absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-accent/45 blur-[110px]" />
      <div className="drift absolute right-[-10%] top-1/3 h-[480px] w-[480px] rounded-full bg-accent2/40 blur-[110px]" style={{ animationDelay: '-6s' }} />
      <div className="drift absolute bottom-[-10%] left-1/3 h-[420px] w-[420px] rounded-full bg-violet/30 blur-[110px]" style={{ animationDelay: '-12s' }} />
    </>
  );
}

export default function Backdrop() {
  const { background, scheme } = useTheme();
  const glows = scheme === 'dark' && background !== 'blobs' && background !== 'scanlines';

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-900" aria-hidden="true">
      {glows && (
        <>
          <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute -bottom-40 right-[-10%] h-[420px] w-[620px] rounded-full bg-accent2/[0.06] blur-[120px]" />
        </>
      )}
      {scheme === 'light' && background !== 'none' && (
        <div className="absolute -top-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      )}
      {background === 'circuit' && <Circuit />}
      {background === 'grid' && <Grid />}
      {background === 'dots' && <Dots />}
      {background === 'hex' && <Hex />}
      {background === 'network' && <NetworkLines />}
      {background === 'blobs' && <Blobs />}
      {background === 'scanlines' && (
        <>
          <div className="scanlines absolute inset-0" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgb(0 0 0 / 0.55))' }} />
        </>
      )}
      {background === 'perspective' && (
        <>
          <div className="absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
          <div className="perspective-floor absolute inset-x-[-30%] bottom-[-25%] h-[60%] opacity-40" />
        </>
      )}
    </div>
  );
}
