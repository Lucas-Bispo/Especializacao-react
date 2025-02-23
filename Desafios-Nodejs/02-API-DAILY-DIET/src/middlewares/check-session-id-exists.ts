/**
 * Verifica se o header 'Session-Id' existe na requisi o. Se n o existir,
 * gera um novo UUID e o adiciona ao header da requisi o.
 *
 * {astifyRequest request - Requisi o recebida pelo Fastify
 * FastifyReply reply - Resposta que ser  enviada pelo Fastify
 */
import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  /**
   * Obt m o valor do header 'Session-Id' da requisi o. Se o valor
   * for nulo ou uma string vazia, um novo UUID ser  gerado.
   */
  const sessionId = request.headers['session-id'];
  /**
   * Verifica se o valor do header 'Session-Id'  nulo, uma string vazia
   * ou se o tipo do valor n o  string. Se sim, gera um novo UUID.
   */
  if (!sessionId || typeof sessionId !== 'string' || sessionId.trim() === '') {
    /**
     * Gera um novo UUID e o adiciona ao header da requisi o.
     */
    const newSessionId = uuidv4();
    request.headers['session-id'] = newSessionId;
  }
}
