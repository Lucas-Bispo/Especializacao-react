import { knex } from '../database';

export async function calculateMetrics(userId: string) {
  const totalMeals = await knex('meals').where({ user_id: userId }).count('* as total').first();
  const dietMeals = await knex('meals').where({ user_id: userId, is_diet: true }).count('* as total').first();
  const nonDietMeals = await knex('meals').where({ user_id: userId, is_diet: false }).count('* as total').first();

  return {
    totalMeals: totalMeals?.total || 0,
    dietMeals: dietMeals?.total || 0,
    nonDietMeals: nonDietMeals?.total || 0,
  };
}