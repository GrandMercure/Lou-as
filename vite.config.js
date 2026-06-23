import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages: https://grandmercure.github.io/Lou-as/
export default defineConfig({
  base: process.env.CI ? '/Lou-as/' : '/',
  plugins: [react(), tailwindcss()],
})
