import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  // Rota para listar todas as transações de um usuário
  app.get(
    '/',
    {
      // Verifica se o header 'Session-Id' existe na requisição
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      // Pega o valor do header 'Session-Id' da requisição
      const { sessionId } = request.cookies

      // Busca todas as transações do usuário com o sessionId informado
      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      // Retorna as transações encontradas
      return { transactions }
    },
  )


  // Rota para buscar uma transação específica de um usuário
  app.get(
    '/:id',
    {
      // Verifica se o header 'Session-Id' existe na requisição
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      // Pega o valor do parametro 'id' da requisição
      const getTransactionsParamsSchema = z.object({
        id: z.string().uuid(),
      })

      // Pega o valor do parametro 'id' da requisição e valida com o schema
      const { id } = getTransactionsParamsSchema.parse(request.params)

      // Pega o valor do header 'Session-Id' da requisição
      const { sessionId } = request.cookies

      // Busca a transação específica do usuário com o sessionId informado
      const transaction = await knex('transactions')
        .where({
          session_id: sessionId,
          id,
        })
        .first()

      // Retorna a transação encontrada
      return {
        transaction,
      }
    },
  )

  // Rota para calcular o saldo de um usuário
  app.get(
    '/summary',
    {
      // Verifica se o header 'Session-Id' existe na requisição
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      // Pega o valor do header 'Session-Id' da requisição
      const { sessionId } = request.cookies

      // Calcula o saldo do usuário com o sessionId informado
      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      // Retorna o saldo do usuário
      return { summary }
    },
  )

  // Rota para criar uma nova transação
  app.post('/', async (request, reply) => {
    // Pega o corpo da requisição e valida com o schema
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    // Pega o valor do header 'Session-Id' da requisição
    let sessionId = request.cookies.sessionId

    // Se o header 'Session-Id' não existir, gera um novo UUID
    if (!sessionId) {
      sessionId = randomUUID()

      // Adiciona o novo UUID ao header 'Session-Id' da requisição
      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    // Insere a nova transação no banco de dados
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    // Retorna um status 201 Created
    return reply.status(201).send()
  })
}


