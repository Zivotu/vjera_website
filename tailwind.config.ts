import type { Config } from 'tailwindcss';

// This configuration mirrors the structure in the original project.  It enables
// dark mode via the `class` strategy and scans a handful of common file
// locations for class names.  You can customise it further as needed.
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;