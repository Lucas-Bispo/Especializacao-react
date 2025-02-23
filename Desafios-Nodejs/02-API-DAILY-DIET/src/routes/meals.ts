import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '../database';

export async function mealRoutes(app: FastifyInstance) {
  // Rota para criar uma nova refeição
  app.post('/meals', async (request, reply) => {
    const createMealSchema = z.object({
      user_id: z.string().uuid(),
      name: z.string(),
      description: z.string(),
      date: z.string().datetime(), // Validado como string
      is_on_diet: z.boolean(), // Corrigido de isDiet para is_on_diet
    });

    const { user_id, name, description, date, is_on_diet } = createMealSchema.parse(request.body);

    try {
      const [meal] = await db('meals')
        .insert({
          user_id,
          name,
          description,
          date: new Date(date), // Convertendo string para Date
          is_on_diet, // Corrigido de isDiet para is_on_diet
        })
        .returning('*');

      return reply.status(201).send(meal);
    } catch (error) {
      return reply.status(400).send({ error: 'Error creating meal' });
    }
  });

  // Rota para listar todas as refeições de um usuário
  app.get('/meals', async (request, reply) => {
    const querySchema = z.object({
      user_id: z.string().uuid(),
    });

    const { user_id } = querySchema.parse(request.query);

    try {
      const meals = await db('meals').where({ user_id });
      return reply.send(meals);
    } catch (error) {
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Rota para obter uma refeição pelo ID
  app.get('/meals/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
      const meal = await db('meals').where({ id }).first();
      if (!meal) {
        return reply.status(404).send({ error: 'Meal not found' });
      }
      return reply.send(meal);
    } catch (error) {
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar uma refeição
  app.put('/meals/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      date: z.string().datetime().optional(),
      is_on_diet: z.boolean().optional(), // Corrigido de isDiet para is_on_diet
    });

    const { id } = paramsSchema.parse(request.params);
    const { name, description, date, is_on_diet } = bodySchema.parse(request.body);

    try {
      const [updatedMeal] = await db('meals')
        .where({ id })
        .update({
          name,
          description,
          date: date ? new Date(date) : undefined,
          is_on_diet, // Corrigido de isDiet para is_on_diet
        })
        .returning('*');

      if (!updatedMeal) {
        return reply.status(404).send({ error: 'Meal not found' });
      }
      return reply.send(updatedMeal);
    } catch (error) {
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Rota para deletar uma refeição
  app.delete('/meals/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
      await db('meals').where({ id }).del();
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}