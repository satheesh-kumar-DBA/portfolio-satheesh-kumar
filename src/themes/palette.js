// Turns a small palette ({ mode, bg, accent, accent2 }) into the CSS variables used by tailwind.config.js.
// Every color variable is an "r g b" triplet so Tailwind opacity modifiers (bg-accent/10) keep working.

const WHITE = [255, 255, 255];
const BLACK = [0, 0, 0];

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

const mix = (a, b, t) => a.map((c, i) => Math.round(c + (b[i] - c) * t));

// WCAG relative luminance
function luminance([r, g, b]) {
  const lin = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

const SLATE = {
  50: [248, 250, 252],
  100: [241, 245, 249],
  200: [226, 232, 240],
  300: [203, 213, 225],
  400: [148, 163, 184],
  500: [100, 116, 139],
  600: [71, 85, 105],
  700: [51, 65, 85],
  800: [30, 41, 59],
  900: [15, 23, 42],
};

export function paletteToVars({ mode, bg: bgHex, accent: accentHex, accent2: accent2Hex, fg: fgOverride }) {
  const dark = mode !== 'light';
  const bg = hexToRgb(bgHex);
  const accent = hexToRgb(accentHex);
  const accent2 = hexToRgb(accent2Hex);

  // Surfaces: dark palettes lift toward an accent-tinted white so panels keep the theme's hue;
  // light palettes use white cards on a tinted page.
  const lift = mix(WHITE, accent, 0.4);
  const ink = dark
    ? {
        950: mix(bg, BLACK, 0.35),
        900: bg,
        850: mix(bg, lift, 0.025),
        800: mix(bg, lift, 0.045),
        700: mix(bg, lift, 0.07),
        600: mix(bg, lift, 0.11),
        500: mix(bg, lift, 0.16),
      }
    : {
        950: mix(bg, WHITE, 0.75),
        900: bg,
        850: mix(bg, WHITE, 0.8),
        800: mix(bg, WHITE, 0.9),
        700: mix(bg, WHITE, 0.96),
        600: mix(bg, BLACK, 0.1),
        500: mix(bg, BLACK, 0.16),
      };

  const fg = fgOverride
    ? Object.fromEntries(Object.entries(fgOverride).map(([k, v]) => [k, hexToRgb(v)]))
    : dark
      ? { 50: SLATE[50], 100: SLATE[100], 200: SLATE[200], 300: SLATE[300], 400: SLATE[400], 500: SLATE[500], 600: SLATE[600] }
      : { 50: SLATE[900], 100: SLATE[800], 200: SLATE[700], 300: SLATE[600], 400: SLATE[600], 500: SLATE[500], 600: SLATE[400] };

  // Lighter accent shades read well on dark backgrounds; darker shades on light ones
  const shade = (c, amount) => (dark ? mix(c, WHITE, amount) : mix(c, BLACK, amount));

  const vars = {
    '--accent': accent,
    '--accent-300': shade(accent, dark ? 0.3 : 0.2),
    '--accent-200': shade(accent, dark ? 0.55 : 0.35),
    '--accent2': accent2,
    '--accent2-300': shade(accent2, dark ? 0.3 : 0.2),
    '--accent2-200': shade(accent2, dark ? 0.55 : 0.35),
    '--on-accent': luminance(accent) > 0.4 ? [5, 8, 13] : WHITE,
    '--line': dark ? WHITE : SLATE[900],
    // Semantic colors for status chips
    '--ok': dark ? [110, 231, 183] : [5, 150, 105],
    '--violet': dark ? [196, 181, 253] : [109, 40, 217],
  };
  for (const [k, c] of Object.entries(ink)) vars[`--ink-${k}`] = c;
  for (const [k, c] of Object.entries(fg)) vars[`--fg-${k}`] = c;

  const out = {};
  for (const [k, c] of Object.entries(vars)) out[k] = c.join(' ');
  out['--shadow-strength'] = dark ? '0.8' : '0.12';
  out['color-scheme'] = dark ? 'dark' : 'light';
  return out;
}

export function cssBlock(selector, vars) {
  return `${selector}{${Object.entries(vars)
    .map(([k, v]) => `${k}:${v}`)
    .join(';')}}`;
}
