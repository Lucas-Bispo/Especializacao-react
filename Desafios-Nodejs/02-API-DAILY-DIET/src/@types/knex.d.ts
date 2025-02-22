import 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string; // Identificador único do usuário
      session_id: string; // ID da sessão do usuário
      name: string; // Nome do usuário
      email: string; // Email do usuário
      created_at: string; // Data de criação do usuário (formato ISO string)
      updated_at: string; // Data de atualização do usuário (formato ISO string)
    };
    meals: {
      id: string; // Identificador único da refeição
      user_id: string; // ID do usuário associado à refeição
      name: string; // Nome da refeição
      description: string; // Descrição da refeição
      is_on_diet: boolean; // Indica se a refeição está dentro da dieta
      date: number; // Data da refeição em formato de timestamp Unix
      created_at: string; // Data de criação da refeição (formato ISO string)
      updated_at: string; // Data de atualização da refeição (formato ISO string)
    };
  }
}