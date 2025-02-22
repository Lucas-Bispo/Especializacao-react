import { FastifyRequest } from 'fastify';

// Estende a interface FastifyRequest para incluir a propriedade 'user'
declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: string;
      name: string;
      email: string;
    };
  }
}