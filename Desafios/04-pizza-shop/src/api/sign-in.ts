// Importação da API configurada a partir da biblioteca Axios.
// O objeto `api` é geralmente uma instância do Axios pré-configurada com informações como base URL, headers, etc.
import { api } from '@/lib/axios'

// Definição de uma interface TypeScript que descreve o formato do corpo da requisição
// para a função de autenticação. Isso garante que o objeto passado para a função
// contenha exatamente as propriedades esperadas.
// - `email`: string - Representa o endereço de e-mail do usuário que deseja autenticar.
export interface SignInBody {
  email: string
}

// Declaração de uma função assíncrona chamada `signIn` que realiza a autenticação do usuário.
// Ela recebe como parâmetro um objeto do tipo `SignInBody` contendo o e-mail do usuário.
export async function signIn({ email }: SignInBody) {
  // Uso da função `post` do Axios para fazer uma requisição HTTP POST para o endpoint `/authenticate`.
  // O corpo da requisição contém o campo `email` fornecido como parâmetro.
  // O `await` pausa a execução até que a requisição seja concluída.
  await api.post('/authenticate', { email })
}
