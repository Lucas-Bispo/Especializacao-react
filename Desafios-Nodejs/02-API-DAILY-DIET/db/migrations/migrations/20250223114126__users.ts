import type { Knex } from 'knex';

/**
 * Função que cria a tabela 'users' no banco de dados.
 * @param knex - Objeto que representa a conexão com o banco de dados.
 */
export async function up(knex: Knex): Promise<void> {
  // Cria a tabela 'users' com as colunas 'id', 'session_id', 'name', 'email', 'created_at' e 'updated_at'.
  await knex.schema.createTable('users', (table) => {
    // Cria a coluna 'id' como chave primária.
    table.uuid('id').primary();
    // Cria a coluna 'session_id' como string, não nula e única.
    table.string('session_id').notNullable().unique();
    // Cria a coluna 'name' como string, não nula.
    table.string('name').notNullable();
    // Cria a coluna 'email' como string, não nula e única.
    table.string('email').notNullable().unique();
    // Cria as colunas 'created_at' e 'updated_at' com timestamps.
    table.timestamps(true, true);
  });
}

/**
 * Função que deleta a tabela 'users' do banco de dados.
 * @param knex - Objeto que representa a conexão com o banco de dados.
 */
export async function down(knex: Knex): Promise<void> {
  // Deleta a tabela 'users'.
  await knex.schema.dropTable('users');
}
