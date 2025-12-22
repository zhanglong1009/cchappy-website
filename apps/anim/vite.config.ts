import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5175,
    strictPort: true
  },
  base:'./',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
