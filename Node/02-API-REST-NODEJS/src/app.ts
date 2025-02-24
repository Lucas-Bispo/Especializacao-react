import fastify from 'fastify' // Importa o framework Fastify
import cookie from '@fastify/cookie' // Importa o plugin de cookies para Fastify

import { transactionsRoutes } from './routes/transactions' // Importa as rotas de transações

export const app = fastify() // Cria uma nova instância do Fastify

app.register(cookie) // Registra o plugin de cookies no aplicativo Fastify

app.register(transactionsRoutes, {
  prefix: 'transactions', // Define o prefixo 'transactions' para as rotas de transações
})
