/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kavach': {
          'teal': '#0F5B4E',
          'teal-dark': '#0B3D34',
          'teal-light': '#147A69',
          'teal-soft': '#E6F4F1',
          'mint': '#10B981',
          'mint-dark': '#059669',
          'mint-soft': '#ECFDF5',
          'canvas': '#F8FAFC',
          'card': '#FFFFFF',
          'border': '#E2E8F0',
          'border-light': '#F1F5F9',
        },
        'gov': {
          'blue': '#123B63',
          'blue-dark': '#0B2540',
          'blue-light': '#1C5182',
        }
      },
      fontFamily: {
        sans: ['Inter', '"Source Sans 3"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'kavach': '0 1px 3px rgba(15, 91, 78, 0.08), 0 1px 2px rgba(15, 91, 78, 0.04)',
        'kavach-md': '0 4px 6px -1px rgba(15, 91, 78, 0.1), 0 2px 4px -1px rgba(15, 91, 78, 0.06)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
