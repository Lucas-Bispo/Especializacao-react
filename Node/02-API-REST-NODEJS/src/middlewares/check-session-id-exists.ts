import { FastifyReply, FastifyRequest } from 'fastify'

/**
 * Middleware para verificar a existência do 'sessionId' nos cookies da requisição.
 * Se o 'sessionId' não estiver presente, uma resposta de erro 'Unauthorized' é enviada.
 * 
 * @param request - Objeto de requisição do Fastify
 * @param reply - Objeto de resposta do Fastify
 */
export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    return reply.status(401).send({
      error: 'Unauthorized.',
    })
  }
}
