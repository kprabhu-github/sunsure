import type { Config } from 'tailwindcss';

// Tailwind reads the same CSS variables as the hand-written CSS — tokens live in styles/tokens.css only.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: 'var(--ink-950)', 900: 'var(--ink-900)', 800: 'var(--ink-800)', 600: 'var(--ink-600)' },
        paper: { DEFAULT: 'var(--paper)', warm: 'var(--paper-warm)' },
        signal: { DEFAULT: 'var(--signal)', deep: 'var(--signal-deep)' },
        forest: 'var(--forest)', mint: 'var(--mint)', sky: 'var(--sky)',
      },
      fontFamily: { sans: ['var(--font-sans)'] },
      spacing: { gutter: 'var(--gutter)' },
    },
  },
  plugins: [],
};
export default config;
