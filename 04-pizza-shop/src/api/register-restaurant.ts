// Importa a instância configurada do Axios, utilizada para realizar requisições HTTP.
import { api } from '@/lib/axios'

// Define uma interface para descrever o formato do corpo da requisição.
// Isso ajuda a garantir que os dados enviados para a função tenham os campos corretos.
export interface RegisterRestaurantBody {
  restaurantName: string // Nome do restaurante
  managerName: string    // Nome do gerente responsável pelo restaurante
  email: string          // E-mail de contato do restaurante
  phone: string          // Telefone de contato do restaurante
}

// Função assíncrona para registrar um restaurante.
// Recebe como parâmetro um objeto que segue a estrutura da interface RegisterRestaurantBody.
export async function registerRestaurant({
  email,          // E-mail de contato
  managerName,    // Nome do gerente
  phone,          // Telefone de contato
  restaurantName, // Nome do restaurante
}: RegisterRestaurantBody) {
  // Realiza uma requisição POST para o endpoint '/restaurants'.
  // Envia no corpo da requisição os dados do restaurante (email, managerName, phone, restaurantName).
  await api.post('/restaurants', { email, managerName, phone, restaurantName })
}
