import { FastifyRequest, FastifyReply } from 'fastify';

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Verifica se o cabeçalho `session-id` está presente
  const sessionId = request.headers['session-id'];

  if (!sessionId) {
    return reply.status(401).send({ error: 'Session ID is required' });
  }

  // Se o cabeçalho estiver presente, continua para a próxima função
  return;
}