import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // 监听所有 IP
    port: 5174,
    strictPort: true
  },
  base:'./',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
