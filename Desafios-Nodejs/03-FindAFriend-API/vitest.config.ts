import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node', // Ambiente Node.js
    globals: true,       // Permite usar describe, it, expect sem importação
    include: ['src/**/*.test.ts'], // Padrão para arquivos de teste
    pool: 'forks',       // Usa forks para suportar módulos nativos
    deps: {
      interopDefault: true, // Garante compatibilidade com módulos CommonJS
      external: [/bcrypt/], // Trata bcrypt como externo, evitando otimização do Vite
    },
  },
});