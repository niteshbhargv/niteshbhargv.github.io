import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    middlewareMode: false,
    fs: {
      strict: false,
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
  },
})
