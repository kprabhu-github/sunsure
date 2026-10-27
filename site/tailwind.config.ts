import type { Config } from 'tailwindcss';

// Every value resolves to a CSS variable in styles/tokens.css — change tokens there, never here.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: 'var(--paper)', 0: 'var(--paper-0)', 2: 'var(--paper-2)', 3: 'var(--paper-3)' },
        ink: { DEFAULT: 'var(--ink)', 2: 'var(--ink-2)', 3: 'var(--ink-3)' },
        red: { DEFAULT: 'var(--red)', ink: 'var(--red-ink)' },
        deep: 'var(--deep)',
        line: 'var(--line)',
      },
      fontFamily: { sans: ['var(--font-sans)'], mono: ['var(--font-mono)'] },
      fontSize: {
        'display-xl': ['var(--fs-display-xl)', { lineHeight: 'var(--lh-display)', letterSpacing: 'var(--tracking-display)' }],
        display: ['var(--fs-display)', { lineHeight: 'var(--lh-display)', letterSpacing: 'var(--tracking-display)' }],
        h1: ['var(--fs-h1)', { lineHeight: 'var(--lh-heading)', letterSpacing: 'var(--tracking-heading)' }],
        h2: ['var(--fs-h2)', { lineHeight: 'var(--lh-heading)', letterSpacing: 'var(--tracking-heading)' }],
        h3: ['var(--fs-h3)', { lineHeight: 'var(--lh-heading)', letterSpacing: 'var(--tracking-heading)' }],
        lead: ['var(--fs-lead)', { lineHeight: '1.4' }],
        body: ['var(--fs-body)', { lineHeight: 'var(--lh-body)' }],
        small: ['var(--fs-small)', { lineHeight: '1.45' }],
      },
      spacing: { gutter: 'var(--gutter)', section: 'var(--section-y)', header: 'var(--header-h)' },
      borderRadius: { DEFAULT: 'var(--radius)' },
      maxWidth: { container: 'var(--container)' },
    },
  },
  plugins: [],
};
export default config;
