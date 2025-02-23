import 'fastify';
import 'fastify'; // Importa o módulo Fastify para extensão

declare module 'fastify' { // Extende o módulo 'fastify'
  export interface FastifyRequest { // Declara uma interface para o FastifyRequest
    user?: { // Propriedade opcional 'user'
      id: string; // Identificador único do usuário
      session_id: string; // ID da sessão do usuário
      name: string; // Nome do usuário
      email: string; // Email do usuário
      created_at: string; // Data de criação do usuário (formato ISO string)
      updated_at: string; // Data de atualização do usuário (formato ISO string)
    };
  }
}

declare module 'fastify' {
  export interface FastifyRequest {
    user?: {
      id: string; // Identificador único do usuário
      session_id: string; // ID da sessão do usuário
      name: string; // Nome do usuário
      email: string; // Email do usuário
      created_at: string; // Data de criação do usuário (formato ISO string)
      updated_at: string; // Data de atualização do usuário (formato ISO string)
    };
  }
}