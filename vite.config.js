import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacidad: resolve(__dirname, 'privacidad.html'),
        condiciones: resolve(__dirname, 'condiciones.html'),
        dataDeletion: resolve(__dirname, 'data-deletion.html')
      },
    },
  },
});
