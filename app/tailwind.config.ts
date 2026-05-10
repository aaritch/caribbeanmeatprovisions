import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#8B0000',
          'primary-dark': '#6B0000',
          charcoal: '#1A1A1A',
          cream: '#F5F1E8',
          gold: '#C9A961',
          green: '#2D5016',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        h1: ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        h2: ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        h3: ['1.875rem', { lineHeight: '1.3', fontWeight: '700' }],
        h4: ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
