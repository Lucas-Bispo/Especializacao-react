// importa a biblioteca axios que permite fazer requisi es HTTP
import axios from 'axios'

// cria uma inst ncia da classe axios com a base URL do backend
export const api = axios.create({
  // define a base URL do backend
  baseURL: 'http://backend:3333',
})

// a base URL do backend  a URL do servidor que vai processar as requisi es
// no caso, o backend est  rodando na porta 3333 do host "backend"
// essa configura o  necess ria para que o frontend possa fazer requisi es
// para o backend, pois o frontend n o tem como saber qual a URL do backend
// sem essa configura o, o frontend n o poderia fazer requisi es para o backend

