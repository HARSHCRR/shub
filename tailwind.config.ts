import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#F2F4F5',   // off-white page bg
        foreground: '#121212',   // near-black text + btn bg
        darkCard:   '#1C1C1E',   // services card background
        highlight:  '#A0A0A0',   // secondary text / accents
        white:      '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-neue)', 'sans-serif'],
      },
      fontSize: {
        hero:    ['20vw', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
        section: ['4rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        card:    ['3.5rem',{ lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        body:    ['1.125rem', { lineHeight: '1.5', letterSpacing: '0em' }],
        eyebrow: ['0.875rem', { lineHeight: '1.2', letterSpacing: '0.05em' }],
      },
      transitionTimingFunction: {
        'expo-out':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'quart-out': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'smooth':    'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      borderRadius: {
        card: '2rem',
      },
    },
  },
  plugins: [],
}
export default config
