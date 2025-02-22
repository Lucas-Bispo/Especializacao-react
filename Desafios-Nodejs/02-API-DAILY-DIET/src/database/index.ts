// src/database/index.ts
import { knex } from 'knex';
import knexConfig from './knexfile';

// Carrega a configuração do ambiente de desenvolvimento
const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

// Cria uma instância do Knex com a configuração carregada
const db = knex(config);

export default db;