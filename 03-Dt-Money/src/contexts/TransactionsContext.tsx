import { ReactNode, useState, useCallback, useEffect } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

// A interface `Transaction` define as propriedades de uma transação.
interface Transaction {
  id: number;
  descrição: string;
  tipo: "receita" | "despesa";
  preço: number;
  categoria: string;
  criadaEm: string;
}

// A interface `CreateTransactionInput` define as propriedades de uma transação que pode ser criada.
interface CreateTransactionInput {
  descrição: string;
  preço: number;
  categoria: string;
  tipo: "receita" | "despesa";
}

// A interface `TransactionContextType` define o tipo do `TransactionsContext`.
interface TransactionContextType {
  transações: Transaction[];
  buscarTransações: (consulta?: string) => Promise<void>;
  criarTransação: (dados: CreateTransactionInput) => Promise<void>;
}

// A interface `TransactionsProviderProps` define as propriedades do componente `TransactionsProvider`.
interface TransactionsProviderProps {
  filhos: ReactNode;
}

// O `TransactionsContext` é um contexto personalizado que é usado para armazenar as transações e fornecer métodos para buscar e criar transações.
export const TransactionsContext = createContext({} as TransactionContextType);

// O componente `TransactionsProvider` é o provedor do `TransactionsContext`.
export function TransactionsProvider({ filhos }: TransactionsProviderProps) {
  // O estado do componente `TransactionsProvider` é um array de transações.
  const [transações, setTransações] = useState<Transaction[]>([]);

  // A função `buscarTransações` é usada para buscar as transações da API.
  const buscarTransações = useCallback(async (consulta?: string) => {
    const resposta = await api.get('transações', {
      params: {
        _sort: 'criadaEm',
        _order: 'desc',
        q: consulta,
      },
    });

    setTransações(resposta.data);
  }, []);

  // A função `criarTransação` é usada para criar uma nova transação.
  const criarTransação = useCallback(
    async (dados: CreateTransactionInput) => {
      const { descrição, preço, categoria, tipo } = dados;

      const resposta = await api.post('transações', {
        descrição,
        preço,
        categoria,
        tipo,
        criadaEm: new Date(),
      });

      setTransações((estado) => [resposta.data, ...estado]);
    },
    [],
  );

  // O gancho `useEffect` é usado para buscar as transações quando o componente monta.
  useEffect(() => {
    buscarTransações();
  }, [buscarTransações]);

  // O componente `TransactionsContext.Provider` é usado para fornecer o `TransactionContext` aos seus filhos.
  return (
    <TransactionsContext.Provider
      value={{
        transações,
        buscarTransações,
        criarTransação,
      }}
    >
      {filhos}
    </TransactionsContext.Provider>
  );
}
