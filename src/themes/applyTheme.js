import { cssBlock, paletteToVars } from './palette';
import { DEFAULT_THEME_KEY, THEMES, getTheme } from './registry';

const CACHE_KEY = 'portfolio-theme-key';

// Writes the theme's CSS variables (root + per-scheme blocks), font stacks and data-theme attribute.
export function applyTheme(key) {
  const theme = getTheme(key);
  const root = document.documentElement;

  const baseVars = paletteToVars(theme.palettes[theme.scheme]);
  const shared = {
    '--font-sans': theme.fonts.sans,
    '--font-display': theme.fonts.display,
    '--font-mono': theme.fonts.mono,
    '--radius': theme.radius,
  };

  const css = [
    cssBlock(':root', { ...baseVars, ...shared }),
    cssBlock('.scheme-dark', paletteToVars(theme.palettes.dark)),
    cssBlock('.scheme-light', paletteToVars(theme.palettes.light)),
  ].join('\n');

  let style = document.getElementById('theme-vars');
  if (!style) {
    style = document.createElement('style');
    style.id = 'theme-vars';
    document.head.appendChild(style);
  }
  style.textContent = css;

  root.dataset.theme = theme.key;

  // Load the theme's display font on demand
  let font = document.getElementById('theme-font');
  if (theme.fonts.href) {
    if (!font) {
      font = document.createElement('link');
      font.id = 'theme-font';
      font.rel = 'stylesheet';
      document.head.appendChild(font);
    }
    if (font.href !== theme.fonts.href) font.href = theme.fonts.href;
  } else if (font) {
    font.remove();
  }

  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.palettes[theme.scheme].bg);

  try {
    localStorage.setItem(CACHE_KEY, theme.key);
  } catch {
    // storage unavailable — the theme still applies for this visit
  }
  return theme;
}

// `?theme=<key>` previews a theme without saving it (used by the admin app's Preview button)
export function previewThemeKey() {
  const key = new URLSearchParams(window.location.search).get('theme');
  return key && THEMES[key] ? key : null;
}

// Paint with the last-seen theme before content arrives, to avoid a flash of the wrong theme
export function applyInitialTheme() {
  let key = previewThemeKey();
  if (!key) {
    try {
      key = localStorage.getItem(CACHE_KEY);
    } catch {
      key = null;
    }
  }
  return applyTheme(key && THEMES[key] ? key : DEFAULT_THEME_KEY);
}
