// The 12 portfolio themes (see portfolio_theme_list.pdf). The active key comes from
// public.site_settings.active_theme and is chosen in the admin app; names and descriptions
// live in public.themes. This file holds only how each theme looks and lays out the content.
//
// Knobs:
//   scheme          base color scheme ('dark' | 'light'); sectionSchemes overrides it per section slug
//   palettes        { dark, light } palettes ({ bg, accent, accent2 }) used for each scheme
//   fonts           CSS font stacks + optional Google Fonts URL loaded on demand
//   hero.layout     split | bento | corporate | editorial | terminal
//   hero.visual     chart | terminal | network | infra | kpi | security | db3d
//   background      circuit | grid | dots | scanlines | network | blobs | hex | perspective | none
//   heading         indexed | terminal | editorial | corporate | cyber | plain
//   stats           gauge | numbers | kpi | terminal
//   projects        cards | bento | editorial
//   nav             default | terminal
//   tilt            3D tilt on hover for panels

const FONT = {
  inter: "'Inter', ui-sans-serif, system-ui, sans-serif",
  barlow: "'Barlow Condensed', 'Inter', sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
  jakarta: "'Plus Jakarta Sans', 'Inter', sans-serif",
  grotesk: "'Space Grotesk', 'Inter', sans-serif",
  orbitron: "'Orbitron', 'Inter', sans-serif",
  fraunces: "'Fraunces', Georgia, serif",
};

const GF = (families) => `https://fonts.googleapis.com/css2?${families.map((f) => `family=${f}`).join('&')}&display=swap`;

const DARK_CODE = { mode: 'dark', bg: '#0b1120', accent: '#22d3ee', accent2: '#a78bfa' };

const base = {
  scheme: 'dark',
  sectionSchemes: {},
  fonts: { sans: FONT.inter, display: FONT.barlow, mono: FONT.mono, href: null },
  radius: '14px',
  hero: { layout: 'split', visual: 'chart' },
  background: 'circuit',
  heading: 'indexed',
  stats: 'gauge',
  projects: 'cards',
  nav: 'default',
  tilt: false,
};

const defineTheme = (key, overrides) => ({ ...base, key, ...overrides, hero: { ...base.hero, ...overrides.hero } });

export const THEMES = {
  'dark-db-engineer': defineTheme('dark-db-engineer', {
    palettes: {
      dark: { mode: 'dark', bg: '#060a14', accent: '#22d3ee', accent2: '#818cf8' },
      light: { mode: 'light', bg: '#f1f5f9', accent: '#0891b2', accent2: '#4f46e5' },
    },
    hero: { layout: 'split', visual: 'terminal' },
    background: 'grid',
  }),

  'corporate-blue': defineTheme('corporate-blue', {
    scheme: 'light',
    palettes: {
      light: { mode: 'light', bg: '#f4f7fc', accent: '#1d4ed8', accent2: '#0e7490' },
      dark: { mode: 'dark', bg: '#0b1a3a', accent: '#60a5fa', accent2: '#22d3ee' },
    },
    fonts: { sans: FONT.inter, display: FONT.jakarta, mono: FONT.mono, href: GF(['Plus+Jakarta+Sans:wght@600;700;800']) },
    radius: '16px',
    hero: { layout: 'corporate' },
    background: 'none',
    heading: 'corporate',
    stats: 'numbers',
  }),

  bento: defineTheme('bento', {
    palettes: {
      dark: { mode: 'dark', bg: '#09090b', accent: '#38bdf8', accent2: '#a78bfa' },
      light: { mode: 'light', bg: '#f4f4f5', accent: '#0284c7', accent2: '#7c3aed' },
    },
    fonts: { sans: FONT.inter, display: FONT.grotesk, mono: FONT.mono, href: GF(['Space+Grotesk:wght@500;600;700']) },
    radius: '22px',
    hero: { layout: 'bento' },
    background: 'dots',
    heading: 'plain',
    stats: 'numbers',
    projects: 'bento',
  }),

  terminal: defineTheme('terminal', {
    palettes: {
      dark: {
        mode: 'dark',
        bg: '#030603',
        accent: '#22c55e',
        accent2: '#facc15',
        fg: { 50: '#dcfce7', 100: '#bbf7d0', 200: '#86efac', 300: '#86efac', 400: '#4ade80', 500: '#16a34a', 600: '#15803d' },
      },
      light: { mode: 'light', bg: '#f0fdf4', accent: '#15803d', accent2: '#a16207' },
    },
    fonts: { sans: FONT.mono, display: FONT.mono, mono: FONT.mono, href: null },
    radius: '0px',
    hero: { layout: 'terminal' },
    background: 'scanlines',
    heading: 'terminal',
    stats: 'terminal',
    nav: 'terminal',
  }),

  'cyber-tech': defineTheme('cyber-tech', {
    palettes: {
      dark: { mode: 'dark', bg: '#03030a', accent: '#00e5ff', accent2: '#ff2bd6' },
      light: { mode: 'light', bg: '#f0fbff', accent: '#0891b2', accent2: '#c026d3' },
    },
    fonts: { sans: FONT.inter, display: FONT.orbitron, mono: FONT.mono, href: GF(['Orbitron:wght@500;700;800']) },
    radius: '4px',
    hero: { layout: 'split', visual: 'network' },
    background: 'network',
    heading: 'cyber',
  }),

  'cloud-infra': defineTheme('cloud-infra', {
    palettes: {
      dark: { mode: 'dark', bg: '#070a10', accent: '#38bdf8', accent2: '#f59e0b' },
      light: { mode: 'light', bg: '#f1f5f9', accent: '#0284c7', accent2: '#d97706' },
    },
    hero: { layout: 'split', visual: 'infra' },
    background: 'circuit',
  }),

  'minimal-editorial': defineTheme('minimal-editorial', {
    scheme: 'light',
    palettes: {
      light: {
        mode: 'light',
        bg: '#faf8f4',
        accent: '#9a3412',
        accent2: '#57534e',
        fg: { 50: '#1c1917', 100: '#292524', 200: '#44403c', 300: '#57534e', 400: '#57534e', 500: '#78716c', 600: '#a8a29e' },
      },
      dark: { mode: 'dark', bg: '#1c1917', accent: '#fdba74', accent2: '#d6d3d1' },
    },
    fonts: { sans: FONT.inter, display: FONT.fraunces, mono: FONT.mono, href: GF(['Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700']) },
    radius: '0px',
    hero: { layout: 'editorial' },
    background: 'none',
    heading: 'editorial',
    stats: 'numbers',
    projects: 'editorial',
  }),

  glass: defineTheme('glass', {
    palettes: {
      dark: { mode: 'dark', bg: '#0a0718', accent: '#60a5fa', accent2: '#f472b6' },
      light: { mode: 'light', bg: '#eef2ff', accent: '#4f46e5', accent2: '#db2777' },
    },
    fonts: { sans: FONT.jakarta, display: FONT.jakarta, mono: FONT.mono, href: GF(['Plus+Jakarta+Sans:wght@400;500;600;700;800']) },
    radius: '24px',
    hero: { layout: 'split', visual: 'chart' },
    background: 'blobs',
    heading: 'plain',
  }),

  'data-analytics': defineTheme('data-analytics', {
    scheme: 'light',
    palettes: {
      light: { mode: 'light', bg: '#eef1f6', accent: '#2563eb', accent2: '#ea580c' },
      dark: { mode: 'dark', bg: '#0b1120', accent: '#60a5fa', accent2: '#fb923c' },
    },
    fonts: { sans: FONT.inter, display: FONT.barlow, mono: FONT.mono, href: null },
    radius: '12px',
    hero: { layout: 'split', visual: 'kpi' },
    background: 'grid',
    stats: 'kpi',
  }),

  'enterprise-security': defineTheme('enterprise-security', {
    palettes: {
      dark: { mode: 'dark', bg: '#06101f', accent: '#10b981', accent2: '#38bdf8' },
      light: { mode: 'light', bg: '#f0f5f9', accent: '#047857', accent2: '#0369a1' },
    },
    hero: { layout: 'split', visual: 'security' },
    background: 'hex',
  }),

  'split-light-dark': defineTheme('split-light-dark', {
    scheme: 'light',
    sectionSchemes: { skills: 'dark', projects: 'dark' },
    palettes: {
      light: { mode: 'light', bg: '#f8fafc', accent: '#0891b2', accent2: '#4f46e5' },
      dark: DARK_CODE,
    },
    fonts: { sans: FONT.inter, display: FONT.grotesk, mono: FONT.mono, href: GF(['Space+Grotesk:wght@500;600;700']) },
    hero: { layout: 'split', visual: 'terminal', visualScheme: 'dark' },
    background: 'none',
    heading: 'plain',
    stats: 'numbers',
  }),

  'interactive-3d': defineTheme('interactive-3d', {
    palettes: {
      dark: { mode: 'dark', bg: '#05060f', accent: '#818cf8', accent2: '#22d3ee' },
      light: { mode: 'light', bg: '#eef2ff', accent: '#4f46e5', accent2: '#0891b2' },
    },
    fonts: { sans: FONT.inter, display: FONT.grotesk, mono: FONT.mono, href: GF(['Space+Grotesk:wght@500;600;700']) },
    radius: '18px',
    hero: { layout: 'split', visual: 'db3d' },
    background: 'perspective',
    heading: 'plain',
    tilt: true,
  }),
};

export const DEFAULT_THEME_KEY = 'dark-db-engineer';

export function getTheme(key) {
  return THEMES[key] ?? THEMES[DEFAULT_THEME_KEY];
}
