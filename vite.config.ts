import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

const APP_VERSION = process.env.npm_package_version || '1.1.4';
const APP_VERSION_CODE = 15;
const BUILD_TIME = new Date().toISOString();
const BUILD_ID = process.env.BUILD_ID || process.env.VITE_APP_BUILD_ID || `v${APP_VERSION}-15-${Date.now()}`;

export default defineConfig(({ command }) => {
  return {
    base: process.env.CAPACITOR_BUILD ? './' : '/',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'generate-version-file',
        buildStart() {
          try {
            const publicDir = path.resolve(__dirname, 'public');
            if (!fs.existsSync(publicDir)) {
              fs.mkdirSync(publicDir, { recursive: true });
            }
            const versionPayload = {
              version: APP_VERSION,
              versionCode: APP_VERSION_CODE,
              buildId: BUILD_ID,
              builtAt: BUILD_TIME,
            };
            fs.writeFileSync(
              path.join(publicDir, 'version.json'),
              JSON.stringify(versionPayload, null, 2)
            );
          } catch (err) {
            console.warn('[Vite build] Could not write public/version.json:', err);
          }
        },
      },
    ],
    define: {
      __APP_BUILD_ID__: JSON.stringify(BUILD_ID),
      __APP_VERSION__: JSON.stringify(APP_VERSION),
      __BUILD_TIMESTAMP__: JSON.stringify(BUILD_TIME),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: false,
      ws: false,
      watch: {
        ignored: ['**/ios/**', '**/android/**', '**/dist/**'],
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined;
            if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            if (id.includes('@supabase')) {
              return 'vendor-supabase';
            }
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('leaflet')) {
              return 'vendor-leaflet';
            }
            if (id.includes('@vis.gl/react-google-maps')) {
              return 'vendor-gmaps';
            }
            if (id.includes('html2canvas') || id.includes('jspdf')) {
              return 'vendor-pdf';
            }
            if (id.includes('motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return undefined;
          },
        },
      },
    },
    optimizeDeps: {
      entries: ['index.html'],
    },
  };
});
