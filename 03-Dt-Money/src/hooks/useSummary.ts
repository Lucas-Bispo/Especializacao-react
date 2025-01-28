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
  return summary;
}