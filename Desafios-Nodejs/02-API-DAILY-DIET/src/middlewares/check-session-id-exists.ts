import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'

// Função middleware para verificar a existência de um ID de sessão
export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Obtém o ID da sessão dos cookies da requisição
  const sessionId = request.cookies.sessionId

  // Verifica se o ID da sessão está presente
  if (!sessionId) {
    // Retorna um erro de autorização se o ID da sessão não estiver presente
    return reply.status(401).send({ error: 'Unauthorized' })
  }

  // Busca um usuário no banco de dados com o ID da sessão fornecido
  const user = await knex('users').where({ session_id: sessionId }).first()

  // Verifica se o usuário foi encontrado
  if (!user) {
    // Retorna um erro de autorização se nenhum usuário for encontrado
    return reply.status(401).send({ error: 'Unauthorized' })
  }

  // Define o usuário na requisição para uso posterior
  request.user = user
}
