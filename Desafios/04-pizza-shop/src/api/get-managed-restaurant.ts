// Importa a instância personalizada do Axios, previamente configurada para realizar requisições HTTP.
import { api } from '@/lib/axios'

// Define a interface `GetManagedRestaurantResponse` para tipar a resposta da API.
// Essa interface descreve a estrutura esperada dos dados retornados pela chamada.
export interface GetManagedRestaurantResponse {
  id: string // Identificador único do restaurante.
  name: string // Nome do restaurante.
  createdAt: Date | null // Data de criação do restaurante (pode ser nula).
  updatedAt: Date | null // Data da última atualização do restaurante (pode ser nula).
  description: string | null // Descrição do restaurante (opcional).
  managerId: string | null // Identificador do gerente associado ao restaurante (pode ser nulo).
}

// Função assíncrona para obter os dados do restaurante gerenciado.
// Essa função faz uma requisição GET para o endpoint '/managed-restaurant'.
export async function getManagedRestaurant() {
  // Executa a requisição usando a instância do Axios e tipa a resposta com `GetManagedRestaurantResponse`.
  const response = await api.get<GetManagedRestaurantResponse>(
    '/managed-restaurant', // Endpoint da API para buscar o restaurante gerenciado.
  )

  // Retorna os dados obtidos da resposta da API.
  return response.data
}
