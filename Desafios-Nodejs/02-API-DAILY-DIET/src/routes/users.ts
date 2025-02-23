import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function userRoutes(app: FastifyInstance) {
  // Middleware global para verificar se o sessionId existe
  app.addHook('preHandler', checkSessionIdExists);

  // Rota para criar um novo usuário
  app.post('/', async (request, reply) => {
    const createUserSchema = z.object({
      name: z.string(),
      email: z.string().email(),
    });

    const { name, email } = createUserSchema.parse(request.body);

    try {
      const [user] = await db('users').insert({ name, email }).returning('*');
      return reply.status(201).send({ message: 'User created successfully', user });
    } catch (error) {
      console.error('Error creating user:', error);
      return reply.status(400).send({ error: 'Error creating user' });
    }
  });

  // Rota para obter um usuário pelo ID
  app.get('/:id', async (request, reply) => {
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
      console.error('Error fetching user:', error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar um usuário
  app.put('/:id', async (request, reply) => {
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
      return reply.send({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Rota para deletar um usuário
  app.delete('/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
      const deletedCount = await db('users').where({ id }).del();
      if (deletedCount === 0) {
        return reply.status(404).send({ error: 'User not found' });
      }
      return reply.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}