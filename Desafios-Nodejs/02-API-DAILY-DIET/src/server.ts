import fastify from 'fastify';
import cors from '@fastify/cors';
import { userRoutes } from './routes/users';
import { mealRoutes } from './routes/meals';

export const app = fastify();

app.register(cors);
app.register(userRoutes, { prefix: '/users' });
app.register(mealRoutes, { prefix: '/meals' });

const start = async () => {
  try {
    await app.listen({ port: 3333 });
    console.log('Server running on http://localhost:3333');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();