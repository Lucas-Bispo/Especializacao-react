import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function userRoutes(app: FastifyInstance) {
  // Aplica o middleware globalmente para todas as rotas de usuário
  app.addHook('preHandler', checkSessionIdExists);

  // Rota para criar um novo usuário
  app.post('/users', async (request, reply) => {
    const { name, email } = request.body as { name: string; email: string };

    try {
      const [user] = await db('users').insert({ name, email }).returning('*');
      return reply.status(201).send(user);
    } catch (error) {
      return reply.status(400).send({ error: 'Error creating user' });
    }
  });

  // Rota para obter um usuário pelo ID
  app.get('/users/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
      const user = await db('users').where({ id }).first();
      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }
      return reply.send(user);
    } catch (error) {
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar um usuário
  app.put('/users/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
    });

    const { id } = paramsSchema.parse(request.params);
    const { name, email } = bodySchema.parse(request.body);

    try {
      const [updatedUser] = await db('users')
        .where({ id })
        .update({ name, email })
        .returning('*');

      if (!updatedUser) {
        return reply.status(404).send({ error: 'User not found' });
      }
      return reply.send(updatedUser);
    } catch (error) {
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Rota para deletar um usuário
  app.delete('/users/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
      await db('users').where({ id }).del();
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}