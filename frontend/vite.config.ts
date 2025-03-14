import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      external: [
        'vue3-carousel',
        'vue3-carousel/dist/carousel.css',
        'html2canvas',
        '@fortawesome/fontawesome-free/css/all.min.css',
        'chart.js/auto'
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name].[ext]'
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(woff|woff2|ttf|eot)$/.test(assetInfo.name)) {
            return `assets/fonts/[name].[ext]`
          }
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
            return `assets/images/[name].[ext]`
          }
          if (/\.css$/.test(assetInfo.name)) {
            return `assets/css/[name].[ext]`
          }
          return `assets/[name].[ext]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        paths: {
          'vue3-carousel': '/node_modules/vue3-carousel/dist/carousel.es.js',
          'vue3-carousel/dist/carousel.css': '/node_modules/vue3-carousel/dist/carousel.css',
          'html2canvas': '/node_modules/html2canvas/dist/html2canvas.esm.js',
          '@fortawesome/fontawesome-free/css/all.min.css': '/node_modules/@fortawesome/fontawesome-free/css/all.min.css',
          'chart.js/auto': '/node_modules/chart.js/auto/auto.esm.js'
        }
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    proxy: {
      '/api': {
        target: 'https://mercandanismanlik.com',
        changeOrigin: true
      },
      '/sanctum': {
        target: 'https://mercandanismanlik.com',
        changeOrigin: true
      }
    }
  }
}) 