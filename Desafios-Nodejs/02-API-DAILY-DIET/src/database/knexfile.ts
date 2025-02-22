import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite', // Arquivo SQLite será criado aqui
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/database/migrations', // Diretório das migrations
    },
    seeds: {
      directory: './src/database/seeders', // Diretório dos seeders
    },
  },
};

export default config;