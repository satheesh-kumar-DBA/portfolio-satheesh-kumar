// Presentation only: maps the color keys stored in the database to Tailwind classes.
// Class names must be written out in full so Tailwind keeps them in the build.

// Status chips in the hero
export const badgeColors = {
  green: 'border-ok/30 bg-ok/10 text-ok',
  blue: 'border-accent/30 bg-accent/10 text-accent-300',
  purple: 'border-violet/30 bg-violet/10 text-violet',
  amber: 'border-accent2/30 bg-accent2/10 text-accent2-300',
  slate: 'border-fg-400/30 bg-fg-400/10 text-fg-300',
};

// Project tags render as chart-legend swatches
export const tagColors = {
  blue: 'bg-accent',
  cyan: 'bg-accent-300',
  emerald: 'bg-emerald-400',
  slate: 'bg-fg-400',
  amber: 'bg-accent2',
  purple: 'bg-violet-400',
  green: 'bg-green-400',
};

// Stat gauges alternate the theme's two accents like the reference dashboard
const gauge = (v) => ({ stroke: `rgb(var(--${v}))`, glow: `rgb(var(--${v}) / 0.55)` });
const sky = gauge('accent');
const cyan = gauge('accent-300');
const amber = gauge('accent2');
const orange = gauge('accent2-300');

export const statColors = { sky, cyan, amber, orange, blue: sky, indigo: orange };

export const actionVariants = {
  primary: 'bg-accent text-on-accent hover:bg-accent-300 shadow-glow',
  secondary: 'border border-accent/50 text-accent-300 hover:bg-accent/10 hover:border-accent-300',
  outline: 'border border-accent2/50 text-accent2-300 hover:bg-accent2/10 hover:border-accent2-300',
};

// Row accent bars cycle through these (like the "Top Active Sessions" list)
export const barColors = ['bg-accent', 'bg-accent2', 'bg-accent-300', 'bg-accent2-300'];

export const pick = (map, key, fallbackKey) => map[key] ?? map[fallbackKey];
