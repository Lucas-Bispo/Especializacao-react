import axios from 'axios'

// O módulo `axios` é usado para fazer requisições HTTP.

export const api = axios.create({
  // A propriedade `baseURL` é usada para definir a URL base para as requisições HTTP.
  baseURL: 'http://localhost:3333',
})

// O objeto `api` é exportado para que possa ser usado em outros componentes.