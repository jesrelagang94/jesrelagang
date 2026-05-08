import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // Gzip compression
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Only compress files > 10KB
      deleteOriginFile: false
    }),
    // Brotli compression for better performance
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false
    }),
    // Bundle analyzer
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core Vue framework
          if (id.includes('node_modules/vue') || id.includes('node_modules/@vue')) {
            return 'vendor-vue';
          }
          // Router
          if (id.includes('node_modules/vue-router')) {
            return 'vendor-router';
          }
          // Pinia state management
          if (id.includes('node_modules/pinia')) {
            return 'vendor-pinia';
          }
          // Firebase SDK - separate for lazy loading
          if (id.includes('node_modules/firebase') || id.includes('node_modules/@firebase')) {
            return 'vendor-firebase';
          }
          // Animation libraries
          if (id.includes('wow.js') || id.includes('swiper') || id.includes('vanilla-tilt')) {
            return 'animations';
          }
          // Layout library
          if (id.includes('isotope-layout')) {
            return 'isotope';
          }
          // Three.js for 3D
          if (id.includes('three')) {
            return 'vendor-three';
          }
          // Chart.js
          if (id.includes('chart.js') || id.includes('vue-chartjs')) {
            return 'vendor-charts';
          }
        },
        // Better chunk naming for caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          if (/\.(css)$/i.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // Increase chunk size warning limit to 600KB
    chunkSizeWarningLimit: 600,
    // Use terser for better minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // No source maps in production
    sourcemap: false,
    // Optimize CSS
    cssMinify: true,
    // Report compressed size
    reportCompressedSize: true
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'isotope-layout', 'swiper', 'vanilla-tilt', 'wow.js'],
    exclude: ['firebase'] // Lazy load Firebase
  },
  // Server configuration for development
  server: {
    open: true,
    cors: true,
    proxy: {
      // Proxy PHP API requests to Laragon Apache server
      '/api': {
        target: 'http://localhost/jesrelagang/public',
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  },
  // Preview configuration
  preview: {
    port: 4173,
    open: true
  }
})
