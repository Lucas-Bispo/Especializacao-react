// Importa o módulo `axios`, uma biblioteca HTTP amplamente usada para fazer requisições.
import axios from 'axios';

// Cria uma instância personalizada do Axios com uma configuração base.
export const api = axios.create({
  baseURL: 'http://localhost:3333', // Define a URL base para todas as requisições feitas por esta instância.
});