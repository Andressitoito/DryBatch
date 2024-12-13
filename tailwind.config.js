module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1A237E',     // Dark blue from the logo
        secondary: '#00796B',   // Teal color from the logo
        accent: '#FBBF24',      // Accent yellow
        lightAccent: '#5C6BC0', // Optional lighter blue accent
        background: '#F5F5F5',  // Light gray background
        textPrimary: '#000000', // Main text color (black)
        textSecondary: '#4F4F4F', // Secondary text color (dark gray)
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      fontWeight: {
        bold: '500',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};