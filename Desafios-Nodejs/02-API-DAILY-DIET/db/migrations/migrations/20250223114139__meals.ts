import type { Knex } from 'knex';

/**
 * Função para criar a tabela 'meals' no banco de dados
 * @param knex Conexão com o banco de dados
 */
export async function up(knex: Knex): Promise<void> {
  // Cria a tabela 'meals' com as colunas especificadas
  await knex.schema.createTable('meals', (table) => {
    // Chave primária da tabela
    table.uuid('id').primary();

    // Chave estrangeira para a tabela 'users'
    table.uuid('user_id').references('users.id').notNullable();

    // Nome da refeição
    table.string('name').notNullable();

    // Descrição da refeição
    table.string('description').notNullable();

    // Campo booleano para indicar se a refeição está na dieta
    table.boolean('is_on_diet').notNullable();

    // Data da refeição
    table.date('date').notNullable();

    // Cria as colunas 'created_at' e 'updated_at'
    table.timestamps(true, true);
  });
}

/**
 * Função para excluir a tabela 'meals' do banco de dados
 * @param knex Conexão com o banco de dados
 */
export async function down(knex: Knex): Promise<void> {
  // Exclui a tabela 'meals'
  await knex.schema.dropTable('meals');
}
