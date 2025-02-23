import { defineConfig } from 'vite'

// Define a configura o do Vite
export default defineConfig({

  // Configura o do modo de teste
  test: {

    // Habilita a globaliza o de vari veis para que possam ser acessadas em todos os arquivos de teste
    globals: true,

    // Define o tipo de relatorio de teste que ser  exibido
    reporters: 'verbose',

    // Este fix resolve o conflito entre switches de testes e o banco de dados nico
    pool: 'forks',

    // Op es para o pool de execu o de testes
    poolOptions: {
      // Executa todos os testes em um nico processo
      forks: {
        singleFork: true,
      },
    },
  },
})
