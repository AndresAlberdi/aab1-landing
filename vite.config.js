import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ecosistemaAab1: resolve(__dirname, 'ecosistema-aab1.html'),
        encuentrame: resolve(__dirname, 'encuentrame.html'),
        privacidad: resolve(__dirname, 'privacidad.html'),
        condiciones: resolve(__dirname, 'condiciones.html'),
        dataDeletion: resolve(__dirname, 'data-deletion.html'),
        mensajeriaWhatsapp: resolve(__dirname, 'mensajeria-whatsapp.html')
      },
    },
  },
});
