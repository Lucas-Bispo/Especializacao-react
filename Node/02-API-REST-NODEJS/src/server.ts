import fastify from "fastify";
import { knex } from "./database";

const app = fastify();
app.get('/hello', async () => {

  const tables = knex('sqlite_schema').select('*')

  return tables

  //return 'Hello World';
});

//iniciar servidor

app.listen({ port: 3333}).then(() => {
  console.log('HTTP Server running on http://localhost:3333')
})