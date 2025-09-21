import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    babel: {
      overrides: [
        {
          test: ['./src/table-view.jsx'],
          plugins: [
            'babel-plugin-react-compiler'
          ]
        },
      ]
    },
  })],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
