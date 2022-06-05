import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // eslint()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.5.128:8000',
        changeOrigin: true,
           secure: false,      
           ws: false,
           rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
