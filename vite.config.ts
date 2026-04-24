import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  // ✅ ADD THIS PROXY CONFIG TO FIX CORB/CORS
  server: {
    proxy: {
      '/api/tmdb': {
        target: 'https://api.themoviedb.org/3',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tmdb/, '')
      }
    }
  }
})