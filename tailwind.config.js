/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── AR3 Brand Palette ──────────────────────────────────────
        brand: {
          // Blues
          'navy':      '#0A1628',   // Deep navy – hero bg, footer
          'blue':      '#1B3B6F',   // Mid-blue – section bg
          'sky':       '#1D6FA4',   // Accent blue – buttons, borders
          // Oranges
          'orange':    '#F26522',   // Primary orange – CTAs, highlights
          'amber':     '#FF8C42',   // Light orange – hover states
          // Neutrals
          'white':     '#FFFFFF',
          'offwhite':  '#F5F5F0',   // Section backgrounds
          'gray':      '#E8E8E4',   // Dividers
          'dark':      '#111111',   // Body text
        },
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      fontSize: {
        'fluid-hero': 'clamp(2.5rem, 7vw, 7rem)',
        'fluid-xl':   'clamp(2rem, 5vw, 4.5rem)',
        'fluid-lg':   'clamp(1.5rem, 3vw, 2.5rem)',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        // Cursor blink used in hero typing effect
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
        // Floating particles in hero
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-20px)' },
        },
        // Shimmer overlay for skeleton loaders
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        // Marquee / ticker
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        blink:   'blink 1s step-end infinite',
        float:   'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [],
}
