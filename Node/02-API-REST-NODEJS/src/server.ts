import fastify from "fastify";

const app = fastify();
app.get('/hello', () => {
  return 'Hello World';
});

//iniciar servidor

app.listen({ port: 3333}).then(() => {
  console.log('HTTP Server running on http://localhost:3333')
})