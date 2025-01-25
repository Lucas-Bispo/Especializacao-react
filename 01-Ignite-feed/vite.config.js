import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3007, // Define uma porta alternativa
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // Define '@' como atalho para 'src'
    },
  },
  build: {
    outDir: 'build', // Define o diretório de saída como "build"
  },
  base: '/', // O site está na raiz do domínio, então a base é "/"
});
