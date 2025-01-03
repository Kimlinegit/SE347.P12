
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Địa chỉ backend
        changeOrigin: true,
        secure: false,
      }
    },
    host: 'localhost',
    port: 5173
  }
});







