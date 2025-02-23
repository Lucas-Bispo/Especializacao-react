import knex from 'knex';
import { env } from './env'; // Importa as variáveis de ambiente validadas

// Configuração do Knex
const db = knex({
  client: 'sqlite3', // Altere para o cliente do seu banco de dados (e.g., 'pg' para PostgreSQL)
  connection: {
    filename: env.DATABASE_URL || './db.sqlite', // Caminho para o arquivo SQLite ou URL do banco
  },
  useNullAsDefault: true, // Necessário para SQLite
});

// Exporta o objeto `db` para ser usado em outros arquivos
export { db };