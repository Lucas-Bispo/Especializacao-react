import type { Knex } from "knex";


// Essa função up é responsável por criar a tabela 'users' no banco de dados.
// Ela recebe como parâmetro uma instância do knex, que é um cliente de banco de dados.
export async function up(knex: Knex): Promise<void> {
    // Cria a tabela 'users' com as seguintes colunas:
    // - id: um identificador único para cada usuário, do tipo UUID.
    // - name: o nome do usuário, do tipo string.
    // - email: o e-mail do usuário, do tipo string, e único no banco de dados.
    // - password: a senha do usuário, do tipo string.
    // - created_at: a data e hora de criação do usuário, do tipo timestamp, com valor padrão igual à data e hora atual.
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary(); // Chave primária da tabela.
        table.string('name').notNullable(); // Nome do usuário.
        table.string('email').unique().notNullable(); // E-mail do usuário, único no banco de dados.
        table.string('password').notNullable(); // Senha do usuário.
        table.timestamp('created_at').defaultTo(knex.fn.now()); // Data e hora de criação do usuário, com valor padrão igual à data e hora atual.
    });
}


// Essa função down é responsável por excluir a tabela 'users' do banco de dados.
// Ela recebe como parâmetro uma instância do knex, que é um cliente de banco de dados.
export async function down(knex: Knex): Promise<void> {
    // Exclui a tabela 'users' do banco de dados.
    await knex.schema.dropTable('users');
}

