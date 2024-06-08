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
    extend: {},
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
          color: '#ffffff',
        },
        // rgb to hex for (27,27,27) is
      },
    ],
  },
};
