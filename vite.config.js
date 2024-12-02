import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Abre automáticamente el navegador
    host: true, // Permite conexiones externas (útil para pruebas)
  },
});
