/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        // shades of gray :)
        'shd-27': 'oklch(var(--shd-27) / <alpha-value>)',
        'shd-56': 'oklch(var(--shd-56) / <alpha-value>)',
        'shd-75': 'oklch(var(--shd-75) / <alpha-value>)',
        'shd-170': 'oklch(var(--shd-170) / <alpha-value>)',
        // link
        'lnk-1': 'oklch(var(--lnk-1) / <alpha-value>)',
        'lnk-2': 'oklch(var(--lnk-2) / <alpha-value>)', // hover
        // border
        'bdr-orng-1': 'oklch(var(--bdr-orng-1) / <alpha-value>)',
        'bdr-orng-2': 'oklch(var(--bdr-orng-2) / <alpha-value>)', //hover
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes')['black'],
          primary: '#a991f7',
          secondary: '#f6d860',
          accent: '#37cdbe',
          neutral: '#121212',
          'neutral-content': '#121212',
          'base-100': '#1b1b1b',
          '--shd-27': '22.21% 0 0',
          '--shd-56': '34.07% 0 0',
          '--shd-75': '41.28% 0 0',
          '--shd-170': '73.8% 0 0',
          '--lnk-1': '72.01% 0.092 267.3',
          '--lnk-2': '85.03% 0.07 268',
          '--bdr-orng-1': '61.96% 0.115 42.29',
          '--bdr-orng-2': '35% 0.039 43.54',
        },
      },
    ],
  },
};
