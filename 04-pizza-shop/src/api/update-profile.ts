// Importa a instância configurada do Axios para fazer requisições HTTP
import { api } from '@/lib/axios'

// Define a interface para o corpo da requisição para atualização do perfil
export interface UpdateProfileBody {
  name: string // Nome do perfil a ser atualizado
  description: string | null // Descrição do perfil (pode ser nula)
}

// Função assíncrona para atualizar o perfil do usuário
// Recebe um objeto contendo 'name' e 'description' e faz uma requisição PUT
// para atualizar as informações do perfil no servidor
export async function updateProfile({ description, name }: UpdateProfileBody) {
  // Envia uma requisição PUT para o endpoint '/profile' com o nome e a descrição
  await api.put('/profile', { name, description })
}
