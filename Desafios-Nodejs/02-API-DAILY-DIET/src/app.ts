import fastify from 'fastify';
import { env } from './env'; // Importando variáveis de ambiente validadas
import { userRoutes } from './routes/users'; // Importando rotas de usuários
import { mealRoutes } from './routes/meals'; // Importando rotas de refeições

// Criação da instância do Fastify
const app = fastify({
  logger: true, // Habilita logs para facilitar o debug
});

// Middleware global para capturar erros
app.setErrorHandler((error, request, reply) => {
  console.error(error); // Log do erro no console
  reply.status(500).send({ error: 'Internal Server Error' });
});

// Registra as rotas de usuários
app.register(userRoutes, { prefix: '/api/users' });

// Registra as rotas de refeições
app.register(mealRoutes, { prefix: '/api/meals' });

// Exporta a aplicação para ser usada no server.ts
export default app;