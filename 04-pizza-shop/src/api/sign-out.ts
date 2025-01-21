// Importa a instância configurada do Axios, utilizada para realizar requisições HTTP.
import { api } from '@/lib/axios'

// Função assíncrona para realizar o processo de logout (sign-out) do usuário.
export async function signOut() {
  // Faz uma requisição POST para o endpoint '/sign-out'.
  // Essa requisição geralmente informa ao backend que a sessão do usuário deve ser encerrada.
  await api.post('/sign-out')
}
