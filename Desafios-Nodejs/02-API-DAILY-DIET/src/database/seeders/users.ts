import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deleta todos os registros existentes
  await knex('users').del();

  // Insere novos usuários
  await knex('users').insert([
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174001',
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
    },
  ]);
}