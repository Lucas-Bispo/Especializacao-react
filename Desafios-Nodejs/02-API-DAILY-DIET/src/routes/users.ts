import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';

export async function userRoutes(app: FastifyInstance) {
  // Criar usuário
  app.post('/', async (request, reply) => {
    const createUserSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = createUserSchema.parse(request.body);

    await knex('users').insert({
      id: crypto.randomUUID(),
      name,
      email,
      password,
    });

    return reply.status(201).send({ message: 'User created successfully' });
  });

  // Listar usuários
  app.get('/', async () => {
    const users = await knex('users').select('*');
    return { users };
  });

  // Atualizar usuário
  app.put('/:id', async (request, reply) => {
    const updateUserSchema = z.object({
      id: z.string().uuid(),
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { id, name, email, password } = updateUserSchema.parse(request.body);

    await knex('users').where({ id }).update({ name, email, password });

    return reply.status(200).send({ message: 'User updated successfully' });
  });

  // Deletar usuário
  app.delete('/:id', async (request, reply) => {
    const deleteUserSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = deleteUserSchema.parse(request.params);

    await knex('users').where({ id }).del();

    return reply.status(200).send({ message: 'User deleted successfully' });
  });
}