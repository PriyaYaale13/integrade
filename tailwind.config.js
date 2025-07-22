/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  important: true,
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        // Base colors from theme-variables.scss
        base: '#ffffff', // Light mode base
        'base-50': '#f9fafb',
        'base-100': '#f3f4f6',
        'base-200': '#e5e7eb',
        'base-300': '#d1d5db',
        'base-400': '#9ca3af',
        'base-500': '#6b7280',
        'base-600': '#4b5563',
        'base-700': '#374151',
        'base-800': '#1f2937',
        'base-900': '#111827',
        'base-content': '#1f2937', // Light mode content

        // Primary colors - updated to match Integrade brand colors
        primary: '#FF881F', // Orange (center of gradient)
        'primary-focus': '#FFAE00', // Amber (left of gradient)
        'primary-content': '#ffffff',
        'primary-accent': '#FF008F', // Magenta (right of gradient)

        // Error colors from theme-variables.scss
        error: '#f44336', // Light mode error
        'error-content': '#ffffff',

        // Define dark mode colors explicitly or use a plugin
        // Dark mode base overrides (example - you might need a plugin for full dark mode)
        'dark-base': '#1f2937',
        'dark-base-100': '#374151',
        'dark-base-content': '#f9fafb',
        'dark-primary': '#FF881F', // Orange for dark mode
        'dark-primary-focus': '#FFAE00', // Amber for dark mode focus
        'dark-primary-content': '#ffffff',
        'dark-primary-accent': '#FF008F', // Magenta for dark mode accent
        'dark-error': '#e57373',
        'dark-error-content': '#ffffff',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  // Add dark mode strategy
  darkMode: 'class',
} 