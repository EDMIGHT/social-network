/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
      colors: {
        'light-bg-main': '#f6f8f9',
        'light-bg-content': '#fff',
        activity: '#84AFE6',
        highlight: '#8A84E2',
        'secondary-text': '#9da9b9',
      },
      fontFamily: {
        'open-sans': ['OpenSans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
