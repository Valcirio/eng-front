import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#f3f4f6',
        danger: '#dc2626',
        foreground: '#374151',
        border: '#d1d5db',
        primary: '#74A3FF'
      },
      width: {
        mobileForm: '20rem',
        webForm: '32rem'
      }

    }
  },
  plugins: []
}
export default config
