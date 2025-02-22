import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';

export async function mealRoutes(app: FastifyInstance) {
  // Criar refeição
  app.post('/', async (request, reply) => {
    const createMealSchema = z.object({
      name: z.string(),
      description: z.string(),
      datetime: z.string(),
      is_diet: z.boolean(),
    });

    const { name, description, datetime, is_diet } = createMealSchema.parse(request.body);

    const userId = request.headers['user-id'] as string;

    await knex('meals').insert({
      id: crypto.randomUUID(),
      user_id: userId,
      name,
      description,
      datetime,
      is_diet,
    });

    return reply.status(201).send({ message: 'Meal registered successfully' });
  });

  // Listar refeições
  app.get('/', async (request) => {
    const userId = request.headers['user-id'] as string;

    const meals = await knex('meals').where({ user_id: userId }).select('*');

    return { meals };
  });

  // Atualizar refeição
  app.put('/:id', async (request, reply) => {
    const updateMealSchema = z.object({
      id: z.string().uuid(),
      name: z.string(),
      description: z.string(),
      datetime: z.string(),
      is_diet: z.boolean(),
    });

    const { id, name, description, datetime, is_diet } = updateMealSchema.parse(request.body);

    await knex('meals').where({ id }).update({ name, description, datetime, is_diet });

    return reply.status(200).send({ message: 'Meal updated successfully' });
  });

  // Deletar refeição
  app.delete('/:id', async (request, reply) => {
    const deleteMealSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = deleteMealSchema.parse(request.params);

    await knex('meals').where({ id }).del();

    return reply.status(200).send({ message: 'Meal deleted successfully' });
  });
}