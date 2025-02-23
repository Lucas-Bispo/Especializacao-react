import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 as uuidv4 } from 'uuid';

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const sessionId = request.headers['session-id'];
  if (!sessionId || typeof sessionId !== 'string' || sessionId.trim() === '') {
    const newSessionId = uuidv4();
    request.headers['session-id'] = newSessionId;
  }
}