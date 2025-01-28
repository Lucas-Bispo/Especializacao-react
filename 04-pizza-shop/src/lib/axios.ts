// Importa o módulo Axios, uma biblioteca para realizar requisições HTTP.
import axios from 'axios'

// Importa as variáveis de ambiente definidas no projeto.
import { env } from '@/env'

// Cria uma instância personalizada do Axios, chamada `api`, com configurações específicas para o projeto.
export const api = axios.create({
  // Define a URL base para todas as requisições HTTP, utilizando a variável de ambiente `VITE_API_URL`.
  baseURL: env.VITE_API_URL,
  // Habilita o envio automático de cookies e cabeçalhos de autenticação nas requisições.
  withCredentials: true,
})

// Verifica se a variável de ambiente `VITE_ENABLE_API_DELAY` está habilitada.
// Essa funcionalidade é útil para simular atrasos na API durante o desenvolvimento ou testes.
if (env.VITE_ENABLE_API_DELAY) {
  // Adiciona um interceptor à instância `api` para manipular as requisições antes de serem enviadas.
  api.interceptors.request.use(async (config) => {
    // Introduz um atraso aleatório entre 0 e 3000 milissegundos (3 segundos).
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )

    // Retorna a configuração original da requisição para continuar o fluxo normal.
    return config
  })
}
