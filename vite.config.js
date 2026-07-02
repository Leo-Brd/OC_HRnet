import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Force une seule copie de React (le package lié en local a la sienne)
    dedupe: ['react', 'react-dom'],
    alias: {
      react: fileURLToPath(new URL('./node_modules/react', import.meta.url)),
      'react-dom': fileURLToPath(new URL('./node_modules/react-dom', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ['@leo_brd/react-datetimepicker'],
  },
  build: {
    sourcemap: false, // Disable sourcemaps to prevent JSX MIME type errors in console
    // Optimized chunk splitting for better caching and loading
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('redux')) return 'vendor-react'
            if (id.includes('react-router')) return 'vendor-routing'
            if (id.includes('react-data-table')) return 'vendor-table'
            return 'vendor'
          }
        },
      },
    },
    // Enable report to see bundle analysis
    reportCompressedSize: true,
    commonjsOptions: {
      include: /node_modules/,
    },
  },
})
