import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    maxWidth: {
      container: '152px',
      contentContainer: '1120px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        xs: '320px',
        sm: '375px',
        sml: '500px',
        md: '667px',
        mdl: '768px',
        lg: '960px',
        lgl: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
      colors: {
        'main-bg': '#f5f7f9',
        'main-dark-bg': '#20232a',
        'secondary-dark-bg': '#33373e',
        'light-gray': '#F7F7F7',
        red: '#ed1114',
        darkRed: '#db0f12',
        lightRed: '#fcf5f5',
        blue: '#0071dc',
        lightBlue: '#f5f5fc',
        yellow: '#fcd303',
        cartColor: '#73fff6',
        purple: '#ff20fb',
        hoverBg: '#004f9a',
        hoverRed: '#9a0003',
        lightText: '#46474a',
      },
      boxShadow: {
        bannerShadow: '0 1px 2px 1px #00000026',
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
