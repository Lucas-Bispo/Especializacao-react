<<<<<<< HEAD
import axios from 'axios'

// O módulo `axios` é usado para fazer requisições HTTP.

export const api = axios.create({
  // A propriedade `baseURL` é usada para definir a URL base para as requisições HTTP.
  baseURL: 'http://localhost:3333',
})

// O objeto `api` é exportado para que possa ser usado em outros componentes.
=======
// Importa o módulo `axios`, uma biblioteca HTTP amplamente usada para fazer requisições.
import axios from 'axios';

// Cria uma instância personalizada do Axios com uma configuração base.
export const api = axios.create({
  baseURL: 'http://localhost:3333', // Define a URL base para todas as requisições feitas por esta instância.
});
>>>>>>> 03-Dt-Money
