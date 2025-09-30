/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./contexts/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Paleta inspirada en Twitch
        'twitch-bg': '#0E0E10',
        'twitch-card': '#18181B',
        'twitch-secondary': '#3A3A3D',
        'twitch-primary': '#9146FF',
        'twitch-primary-hover': '#772CE8',
        'twitch-primary-light': '#A970FF',
        'twitch-text': '#EFEFF1',
        'twitch-text-secondary': '#ADADB8',
        'twitch-text-muted': '#797B86',
        'twitch-success': '#00F593',
        'twitch-warning': '#FFAB00',
        'twitch-error': '#F13C20',
        'twitch-border': '#3A3A3D',
        'twitch-divider': '#26262C',
      },
    },
  },
  plugins: [],
}
