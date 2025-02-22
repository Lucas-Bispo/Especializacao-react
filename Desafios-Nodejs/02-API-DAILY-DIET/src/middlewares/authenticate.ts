import { FastifyRequest, FastifyReply } from 'fastify';
import db from '../database'; // Importa a instância do Knex configurada

// Middleware de autenticação
export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Obtém o cabeçalho 'user-id' da requisição
    const userId = request.headers['user-id'];

    // Verifica se o cabeçalho 'user-id' foi fornecido
    if (!userId) {
      return reply.status(401).send({ error: 'Unauthorized: Missing user-id header' });
    }

    // Busca o usuário no banco de dados pelo ID
    const user = await db('users').where({ id: userId }).first();

    // Verifica se o usuário existe
    if (!user) {
      return reply.status(401).send({ error: 'Unauthorized: Invalid user-id' });
    }

    // Adiciona o usuário ao objeto de requisição (request.user)
    // Isso é possível porque estendemos a interface FastifyRequest em @types/fastify.d.ts
    request.user = user;
  } catch (error) {
    // Trata qualquer erro inesperado
    console.error('Authentication error:', error);
    return reply.status(500).send({ error: 'Internal server error during authentication' });
  }
}