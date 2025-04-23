import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,             // Accept connections from outside Docker
    port: 5173,             // Match your docker-compose port
    watch: {
      usePolling: true      // Force file change detection via polling
    }
  }
});
