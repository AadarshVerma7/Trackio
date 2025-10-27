import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: ['.replit.dev', 'localhost','5a6bf347-5c27-4ff8-9515-56913f82c56b-00-28ytqelp9b7jk.sisko.replit.dev']
  }
})
