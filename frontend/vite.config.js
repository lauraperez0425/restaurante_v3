import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    // Proxy para facilitar el desarrollo local (opcional)
    proxy: {
      // Si necesitas usar un único endpoint para todas las APIs
      // '/api': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    }
  }
})
