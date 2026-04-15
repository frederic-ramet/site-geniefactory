import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        ink: {
          50: '#f5f7fb',
          100: '#e7ecf4',
          200: '#c9d4e5',
          300: '#9db1cd',
          400: '#6b87b0',
          500: '#4c6a97',
          600: '#3a537b',
          700: '#2f4363',
          800: '#1f2d43',
          900: '#111827',
          950: '#0a1120',
        },
        brand: {
          50: '#eef6ff',
          100: '#d9ebff',
          200: '#bcdbff',
          300: '#8ec2ff',
          400: '#579dff',
          500: '#2f7bff',
          600: '#1b5df5',
          700: '#1648d3',
          800: '#173daa',
          900: '#183a86',
        },
        accent: {
          400: '#ff9a5b',
          500: '#ff7a2e',
          600: '#e8601a',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'var(--font-display)',
          'var(--font-inter)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(17, 24, 39, 0.18)',
        lift: '0 20px 40px -12px rgba(17, 24, 39, 0.22)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 500ms ease-out both',
        marquee: 'marquee 40s linear infinite',
      },
      backgroundImage: {
        'grid-soft':
          'linear-gradient(to right, rgba(17,24,39,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,24,39,0.06) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
