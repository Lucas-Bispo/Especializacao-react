<<<<<<< HEAD
import { useContext } from "use-context-selector";
import { TransactionsContext } from "../contexts/TransactionsContext";

// O hook `useContext` é usado para acessar o contexto `TransactionsContext`.
export function useSummary() {
  // O contexto `TransactionsContext` é um contexto personalizado que é usado para armazenar as transações.
  const { transactions } = useContext(TransactionsContext);

  // O método `reduce` é usado para calcular o resumo das transações.
  const summary = transactions.reduce(
    (acc, transaction) => {
      // Se a transação é uma receita, o valor da receita é adicionado ao resumo.
      if (transaction.type === 'income') {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        // Se a transação é uma despesa, o valor da despesa é subtraído do resumo.
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }

      // O resumo é retornado.
      return acc;
    },
    {
      // O resumo inicial é inicializado com os valores 0.
      income: 0,
      outcome: 0,
      total: 0,
    },
  );

  // O resumo é retornado.
=======
// Importa o hook `useMemo` do React para memoizar valores computados.
import { useMemo } from 'react';
// Importa o hook `useContextSelector` do pacote `use-context-selector` para selecionar partes específicas de um contexto.
import { useContextSelector } from 'use-context-selector';
// Importa o contexto `TransactionsContext`, que contém as transações e métodos relacionados.
import { TransactionsContext } from '../contexts/TransactionsContext';

// Define o hook personalizado `useSummary`, que calcula um resumo das transações (entradas, saídas e saldo total).
export function useSummary() {
  // Usa o `useContextSelector` para acessar apenas a lista de transações do contexto `TransactionsContext`.
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions; // Retorna apenas a propriedade `transactions` do contexto.
  });

  // Usa o `useMemo` para calcular e memoizar o resumo das transações.
  const summary = useMemo(() => {
    // Usa o método `reduce` para iterar sobre as transações e calcular o resumo.
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          // Se o tipo da transação for "income" (entrada), adiciona o valor ao total de entradas e ao saldo total.
          acc.income += transaction.price;
          acc.total += transaction.price;
        } else {
          // Se o tipo da transação for "outcome" (saída), adiciona o valor ao total de saídas e subtrai do saldo total.
          acc.outcome += transaction.price;
          acc.total -= transaction.price;
        }
        return acc; // Retorna o acumulador atualizado.
      },
      {
        income: 0, // Inicializa o total de entradas como 0.
        outcome: 0, // Inicializa o total de saídas como 0.
        total: 0, // Inicializa o saldo total como 0.
      },
    );
  }, [transactions]); // Memoiza o cálculo apenas quando a lista de transações mudar.

  // Retorna o resumo calculado.
>>>>>>> 03-Dt-Money
  return summary;
}