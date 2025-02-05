<<<<<<< HEAD
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
=======
// Importações necessárias do React e de bibliotecas externas
import { ReactNode, useCallback, useEffect, useState } from 'react';
// `ReactNode` é usado para tipar o conteúdo dos filhos no contexto.
// `useCallback`, `useEffect` e `useState` são hooks do React.
import { createContext } from 'use-context-selector';
// `createContext` do `use-context-selector` permite criar um contexto com suporte a seleção de partes específicas.
import { api } from '../lib/axios';
// Importa a instância do Axios configurada para fazer requisições à API.

// Define a interface para representar uma transação
interface Transaction {
  id: number; // ID único da transação
  description: string; // Descrição da transação
  type: 'income' | 'outcome'; // Tipo da transação: entrada ('income') ou saída ('outcome')
  price: number; // Valor da transação
  category: string; // Categoria da transação (ex.: Alimentação, Salário)
  createdAt: string; // Data de criação da transação
}

// Define a interface para os dados necessários para criar uma nova transação
interface CreateTransactionInput {
  description: string; // Descrição da transação
  price: number; // Valor da transação
  category: string; // Categoria da transação
  type: 'income' | 'outcome'; // Tipo da transação
}

// Define a interface para o tipo do contexto de transações
interface TransactionContextType {
  transactions: Transaction[]; // Lista de transações
  fetchTransactions: (query?: string) => Promise<void>; // Função para buscar transações
  createTransaction: (data: CreateTransactionInput) => Promise<void>; // Função para criar uma nova transação
}

// Define a interface para as propriedades do provedor de contexto
interface TransactionsProviderProps {
  children: ReactNode; // O conteúdo que será envolvido pelo provedor
}

// Cria o contexto de transações com o tipo definido acima
export const TransactionsContext = createContext({} as TransactionContextType);

// Componente provedor de contexto para gerenciar as transações
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  // Estado para armazenar a lista de transações
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Função para buscar transações da API
  const fetchTransactions = useCallback(async (query?: string) => {
    // Faz uma requisição GET para a rota 'transactions' da API
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt', // Ordena por data de criação
        _order: 'desc', // Em ordem decrescente (mais recentes primeiro)
        q: query, // Parâmetro opcional para filtrar transações por descrição
      },
    });
    // Atualiza o estado com os dados recebidos da API
    setTransactions(response.data);
  }, []);

  // Função para criar uma nova transação
  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      // Desestrutura os dados recebidos para criar a transação
      const { description, price, category, type } = data;
      // Faz uma requisição POST para a rota 'transactions' da API
      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(), // Define a data atual como a data de criação
      });
      // Adiciona a nova transação ao início da lista de transações
      setTransactions((state) => [response.data, ...state]);
>>>>>>> 03-Dt-Money
    },
    [],
  );

<<<<<<< HEAD
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
=======
  // Efeito para buscar transações quando o componente é montado
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Retorna o provedor de contexto com os valores e funções fornecidos
  return (
    <TransactionsContext.Provider
      value={{
        transactions, // Lista de transações
        fetchTransactions, // Função para buscar transações
        createTransaction, // Função para criar transações
      }}
    >
      {children} {/* Renderiza os componentes filhos */}
    </TransactionsContext.Provider>
  );
}
>>>>>>> 03-Dt-Money
