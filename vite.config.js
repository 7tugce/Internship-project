import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    mimeTypes: {
      'application/javascript': ['js'],
    },
  },
  optimizeDeps: {
    include: ['react-konva', 'konva'],
  },
});
