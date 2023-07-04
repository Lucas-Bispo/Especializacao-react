// Importa a função defineConfig do pacote 'vite'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
// Importa o plugin 'react' do pacote '@vitejs/plugin-react'
export default defineConfig({
  // Exporta por padrão a função defineConfig chamada com um objeto contendo a configuração do Vite
  plugins: [react()],
  // Define a propriedade plugins como uma lista de plugins a serem usados pelo Vite
  // Neste caso, o plugin 'react' é adicionado à lista usando a sintaxe de chamada de função react()
  // Isso habilita o suporte ao React no ambiente de desenvolvimento
  server: {
    // Define a propriedade server como um objeto contendo as opções do servidor de desenvolvimento do Vite
    port: 3000,
    // Define a propriedade port como 3000, o que significa que o servidor será iniciado na porta 3000
    host: true
    // Define a propriedade host como true, permitindo que o servidor seja acessível a partir de qualquer endereço IP
  }
})
