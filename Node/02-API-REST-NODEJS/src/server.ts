import fastify from "fastify";
import { knex } from "./database";

// Cria um servidor Fastify
const app = fastify();

// Cria uma rota GET para a URL '/hello'
app.get('/hello', async () => {

  // Executa uma consulta no banco de dados para obter todas as tabelas
  const tables = await knex('sqlite_schema').select('*')

  // Retorna as tabelas como resposta da API
  return tables

  // Caso queira, pode ser retornado um simples "Hello World"
  //return 'Hello World';
});

// Inicia o servidor
app.listen({ port: 3333}).then(() => {
  // Imprime uma mensagem no console para informar que o servidor est  rodando
  console.log('HTTP Server running on http://localhost:3333')
})
