import type { Config } from 'tailwindcss'

const {nextui} = require("@nextui-org/react");

//NextUI is configured here to work with tailwind
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}
export default config
