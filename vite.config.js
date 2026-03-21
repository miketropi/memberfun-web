import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'chart.js',
      'react-chartjs-2'
    ],
    exclude: [], 
  },
  server: {
    allowedHosts: [
      'memberfun-api.beplus-agency.cloud', // Allow this specific host
      '.beplus-agency.cloud'           // Wildcard to allow all subdomains (alternative)
    ],
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,   
    watch: {
      usePolling: true  
    }
  },
})
