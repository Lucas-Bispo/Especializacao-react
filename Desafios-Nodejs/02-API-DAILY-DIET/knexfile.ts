import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3', // Altere para o cliente do seu banco de dados (ex.: postgres, mysql, etc.)
    connection: {
      filename: './db/db.sqlite', // Caminho para o arquivo SQLite dentro da pasta `db`
    },
    useNullAsDefault: true, // Necessário para SQLite
    migrations: {
      directory: './db/migrations', // Diretório das migrations
    },
  },
};

export default config;