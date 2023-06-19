import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import svgrPlugin from 'vite-plugin-svgr'

// see all documentation here https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build change as your need
  // comment this out if that isn't relevant for your project
  server: {
    watch: {
      usePolling: true
    },
    port: 3000,
    hmr: true,
  },
  build: {
    outDir: 'build',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-refresh'],
  },
  plugins: [
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
})