/** @type {import('tailwindcss').Config} */

// Colors, fonts and radius are CSS variables so the active theme (src/themes) can restyle the
// whole site at runtime. Color variables are "r g b" triplets so opacity modifiers keep working.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces, darkest (inputs) to lightest (raised)
        ink: {
          950: v('ink-950'),
          900: v('ink-900'),
          850: v('ink-850'),
          800: v('ink-800'),
          700: v('ink-700'),
          600: v('ink-600'),
          500: v('ink-500'),
        },
        // Text, strongest (50) to dimmest (600)
        fg: {
          50: v('fg-50'),
          100: v('fg-100'),
          200: v('fg-200'),
          300: v('fg-300'),
          400: v('fg-400'),
          500: v('fg-500'),
          600: v('fg-600'),
        },
        accent: { DEFAULT: v('accent'), 300: v('accent-300'), 200: v('accent-200') },
        accent2: { DEFAULT: v('accent2'), 300: v('accent2-300'), 200: v('accent2-200') },
        'on-accent': v('on-accent'),
        line: v('line'),
        ok: v('ok'),
        violet: v('violet'),
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        theme: 'var(--radius)',
      },
      boxShadow: {
        panel: '0 0 0 1px rgb(var(--accent) / 0.03), 0 24px 48px -24px rgb(0 0 0 / var(--shadow-strength))',
        glow: '0 0 28px -6px rgb(var(--accent) / 0.45)',
        'glow-amber': '0 0 28px -6px rgb(var(--accent2) / 0.45)',
      },
    },
  },
  plugins: [],
}
