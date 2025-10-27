// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // 1. Colors - Updated with your brand palette
      colors: {
        // Grounded Foundation Colors
        cosmic: '#070C0D',
        mineral: '#192526',
        stone: '#585959',
        parchment: '#F2F2E9',
        clay: '#BFBBB4',
        
        // Visionary Accent Colors
        electric: '#C724B1',
        luminance: '#E6B93D',
        
        // shadcn/ui colors (keeping structure but can reference brand colors)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      
      // 2. Typography - Cinzel for headings as requested
      fontFamily: {
        sans: ['var(--font-montserrat)', ...fontFamily.sans],
        serif: ['var(--font-cinzel)', ...fontFamily.serif],
        inter: ['var(--font-inter)', ...fontFamily.sans],
        'dm-sans': ['var(--font-dm-sans)', ...fontFamily.sans],
        cinzel: ['var(--font-cinzel)', ...fontFamily.serif],
      },
      
      // 3. Consistent spacing scale
      spacing: {
        'section': '6rem',
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // 4. Animation durations matching your CSS
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'luxury-glow': 'luxury-glow 3s ease-in-out infinite',
        'grid-pulse': 'grid-pulse 3s ease-in-out infinite alternate',
      },
      
      // 5. Border radius from CSS
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // 6. Keyframes for animations
      keyframes: {
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'luxury-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(217, 119, 6, 0.3)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(217, 119, 6, 0.5)'
          },
        },
        'grid-pulse': {
          '0%, 100%': {
            opacity: '0.2',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.5',
            transform: 'scale(1.02)',
          },
        },
      },
    },
  },
  plugins: [],
}