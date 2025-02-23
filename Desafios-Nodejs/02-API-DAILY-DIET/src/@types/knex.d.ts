import 'knex';

// Declaração de módulo para estender as definições de tipos do Knex
declare module 'knex/types/tables' {
  // Interface que define as tabelas do banco de dados
  interface Tables {
    // Definição da tabela `users`
    users: {
      id: string; // ID único do usuário
      name: string; // Nome do usuário
      email: string; // Email do usuário
      created_at: Date; // Data e hora de criação do registro do usuário
      updated_at: Date; // Data e hora de atualização do registro do usuário
    };
    // Definição da tabela `meals`
    meals: {
      id: string; // ID único da refeição
      user_id: string; // ID do usuário associado à refeição
      name: string; // Nome da refeição
      description: string; // Descrição da refeição
      date: Date; // Data em que a refeição ocorreu
      is_on_diet: boolean; // Indicador se a refeição está de acordo com a dieta
      created_at: Date; // Data e hora de criação do registro da refeição
      updated_at: Date; // Data e hora de atualização do registro da refeição
    };
  }
}
