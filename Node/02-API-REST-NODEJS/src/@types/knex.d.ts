// Criar arquivo nex.d.ts dentro da pasta types
// A extensão .d.ts é específica para definição de tipos

// Importar o Nex para reaproveitar seus tipos existentes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import knex from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      id: string;
      title: string;
      amount: number;
      created_at: string; // Timestamp no banco, mas string no TypeScript
      session_id?: string; // Campo opcional
    };
  }
}