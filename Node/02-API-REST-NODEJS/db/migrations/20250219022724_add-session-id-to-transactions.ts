import type { Knex } from "knex";


/**
 * Fun o que altera a tabela 'transactions' para adicionar uma coluna 'session_id'
 * que  um identificador  nico para cada sess o de transfer ncias.
 * A coluna  adicionada ap s a coluna 'id' e tem um ndice para facilitar a busca.
 */
export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('transactions', (table) => {
        table.uuid('session_id').after('id').index()
    })
}


/**
 * Fun o que reverte a altera o feita na tabela 'transactions' para remover a coluna 'session_id'
 */
export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('transactions', (table) => {
        table.dropColumn('session_id')
    })
}

