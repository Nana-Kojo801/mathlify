import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'logo.svg'],
      manifest: {
        name: 'Mathlify',
        short_name: 'Mathlify',
        description:
          'Mathlify transforms mental math training into an exciting competitive experience. Challenge yourself in "Casual" addition sequences or "Speed Solve" rapid calculations while competing against friends and players worldwide. Customize practice sessions, join global leaderboards, and track your progress as your calculation speed and accuracy improve. Sharpen your mind, climb the rankings, and become a mental math champion!',
        theme_color: '#00BFFF',
        background_color: '#101828',
        display: 'fullscreen',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: '/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: '/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,gif}'],
        runtimeCaching: [
          {
            // Cache avatar images from Convex
            urlPattern: /.*\.convex\.cloud.*\/(storage|get-url)\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'avatar-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // Cache for 1 week
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          }
        ],
      },
      devOptions: {
        enabled: process.env.NODE_ENV === 'development',
        type: 'module',
        navigateFallback: 'index.html',
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@convex': resolve(__dirname, './convex'),
    },
  },
})
