  // Importa a instância configurada do Axios, utilizada para realizar requisições HTTP.
import { api } from '@/lib/axios'

// Define a interface que representa a estrutura esperada da resposta da API ao obter o perfil do usuário.
export interface GetProfileResponse {
  id: string // Identificador único do usuário.
  name: string // Nome do usuário.
  email: string // Endereço de e-mail do usuário.
  phone: string | null // Número de telefone do usuário (pode ser nulo caso não esteja definido).
  role: 'manager' | 'customer' // Função do usuário: pode ser 'manager' (gerente) ou 'customer' (cliente).
  createdAt: Date | null // Data de criação do perfil (pode ser nula caso não seja fornecida pela API).
  updatedAt: Date | null // Data da última atualização do perfil (pode ser nula caso não seja fornecida pela API).
}

// Função assíncrona para obter as informações do perfil do usuário autenticado.
export async function getProfile() {
  // Faz uma requisição GET ao endpoint '/me', que retorna os dados do perfil do usuário.
  // O tipo da resposta é definido como `GetProfileResponse` para garantir que a estrutura retornada corresponda ao esperado.
  const response = await api.get<GetProfileResponse>('/me')

  // Retorna os dados do perfil extraídos da resposta da API.
  return response.data
}
