// Importação da instância do Axios configurada para comunicação com a API
import { api } from '@/lib/axios'

// Definindo a interface para o corpo da requisição de atualização do perfil
// Esta interface descreve os campos que são enviados ao servidor para atualizar o perfil
export interface UpdateProfileBody {
  name: string // Nome do usuário a ser atualizado
  description: string | null // Descrição do perfil, pode ser nula
}

// Função assíncrona para atualizar o perfil do usuário
// A função recebe o corpo da requisição com os dados a serem atualizados no perfil
export async function updateProfile({ description, name }: UpdateProfileBody) {
  // Realiza a requisição PUT na API para atualizar os dados do perfil do usuário
  // O endpoint '/profile' é chamado, e o corpo da requisição contém o nome e a descrição
  await api.put('/profile', { name, description })
}
