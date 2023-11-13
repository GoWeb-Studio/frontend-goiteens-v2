const { colors } = require(`tailwindcss/defaultTheme`);

module.exports = {
  content: ['./src/**/*.{html,js,json}'],
  theme: {
    // MEDIA QUERIES
    screens: {
      sm: '480px',
      md: '768px',
      xl: '1280px',
      xxl: '1600px',
      smOnly: { max: '767.98px' },
      mdOnly: { min: '768px', max: '1279.98px' },
      notXl: { max: '1279.98px' },
    },
    // BASE FONT
    fontFamily: {
      gotham: ['Gotham', 'sans-serif'], // class="font-gotham"
      IBMPlexMono: ['IBMPlexMono', 'sans-serif'], // class="font-IBMPlexMono"
      IBMPlexSans: ['IBMPlexSans', 'sans-serif'], // class="font-IBMPlexSans"
    },
    // SHADOW
    boxShadow: {
      orange: '2px 8px 29px rgba(240, 127, 46, 0.2)', // class="shadow-orange"
      gray: '0px 1px 3px 0px rgba(0, 0, 0, 0.20)',
      black:
        '48px 0px 84px 0px rgba(0, 0, 0, 0.06), 0px 0px 0px 0px rgba(0, 0, 0, 0.05), 33px -13px 78px 0px rgba(0, 0, 0, 0.05), 133px -51px 142px 0px rgba(0, 0, 0, 0.04), 299px -114px 192px 0px rgba(0, 0, 0, 0.03), 532px -203px 228px 0px rgba(0, 0, 0, 0.01), 832px -318px 249px 0px rgba(0, 0, 0, 0.00);',
    },
    // THEME
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
      }),
      backgroundImage: {
        check: "url('../images/agree-checkbox.svg')",
      },
      // ALL COLORS
      colors: {
        body: '#ffffff', // class="bg-body"
        black: {
          DEFAULT: '#000000', // class="bg-black text-black border-black"
          light: '#474747', // class="bg-black-light text-black-light border-black-light"
          dark: '#1A1A1A',
        },
        white: {
          DEFAULT: '#ffffff', // class="bg-white text-white border-white"
          dark: '#F2FAE6', // class="bg-white-dark text-white-dark border-white-dark"
        },
        accent: '#5331B2', // class="bg-accent text-accent border-accent"
        primary: '#F5F5F5',
        second: '#90C8F0',
        grey: {
          DEFAULT: '#202020',
          dark: '#2E2F30',
          light: '#ABABAB',
        },
        yellow: '#FEC830',
        purple: '#653CD9',
        pink: '#F5BAE2',
      },
      // CONTAINER
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '1.25rem',
          md: '2rem',
          xl: '2.5rem',
          xxl: '3.5rem',
        },
      },
      // KEYFRAMES
      keyframes: {
        side: {
          '0%, 100%': { transform: 'translateX(25%)' },
          '50%': { transform: ' translateY(0)' },
        },
      },
      // ANIMATION
      animation: {
        side: 'side 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
