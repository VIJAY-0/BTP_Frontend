import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // exposes server to local network
    port: 3000,       // sets custom port
    allowedHosts: 'all'  // <- allow all incoming hosts
  }
})
