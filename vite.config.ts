import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'BENNI·OS — Sovereign Autonomy System',
        short_name: 'BENNI·OS',
        description: 'The Sovereign Autonomy System — Built from first principles.',
        theme_color: '#09090b',
        background_color: '#09090b',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/assets/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 60 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,woff2,svg,ico,txt}'],
        runtimeCaching: [
          {
            urlPattern: /\.(?:mp4|webm|webp|png|jpg|jpeg)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'media-cache-v2',
              expiration: {
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 dias
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          },
          {
            urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'cdn-assets' }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'admin.html'
      }
    }
  },
  publicDir: 'public'
});
