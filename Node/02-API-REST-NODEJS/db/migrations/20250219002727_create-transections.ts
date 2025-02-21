import type { Knex } from "knex";


// Esta função é responsável por criar a tabela 'transactions' no banco de dados
export async function up(knex: Knex): Promise<void> {
    // Cria a tabela 'transactions' com a coluna 'id' como primary key, que é um uuid
    await knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary();
        table.text('title').notNullable();
        table.decimal('amount', 10, 2).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());

    })
}


// Esta função é responsável por reverter a criação da tabela 'transactions' no banco de dados
export async function down(knex: Knex): Promise<void> {
    // Neste caso, a função down está vazia, pois não há nada a ser feito para reverter a criação da tabela
    await knex.schema.dropTable('transactions');
}

