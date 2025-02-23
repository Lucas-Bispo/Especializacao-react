import 'knex';

declare module 'knex/types/tables' {
  interface Tables {
    // Definição da tabela `users`
    users: {
      id: string; // ID do usuário
      name: string; // Nome do usuário
      email: string; // Email do usuário
      created_at: Date; // Data de criação
      updated_at: Date; // Data de atualização
    };
    // Definição da tabela `meals`
    meals: {
      id: string; // Identificador único da refeição
      user_id: string; // ID do usuário associado à refeição
      name: string; // Nome da refeição
      description: string; // Descrição da refeição
      date: Date; // Data da refeição
      is_on_diet: boolean; // Indica se a refeição está na dieta
      created_at: Date; // Data de criação do registro
      updated_at: Date; // Data de atualização do registro
    };
  }
}