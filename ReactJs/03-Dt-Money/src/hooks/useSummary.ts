import { useMemo } from 'react' // Importa o hook useMemo do React para otimizar o cálculo memoizando resultados
import { useContextSelector } from 'use-context-selector' // Importa o hook useContextSelector para selecionar partes do contexto
import { TransactionsContext } from '../contexts/TransactionsContext' // Importa o contexto de transações

export function useSummary() {
  // Define um hook customizado chamado useSummary

  const transactions = useContextSelector(TransactionsContext, (context) => {
    // Seleciona a lista de transações do contexto TransactionsContext
    return context.transactions // Retorna as transações do contexto
  })

  const summary = useMemo(() => {
    // Usa o hook useMemo para memoizar o cálculo do resumo
    return transactions.reduce(
      // Reduz a lista de transações a um único objeto acumulador
      (acc, transaction) => {
        // Função que acumula valores de entrada, saída e total
        if (transaction.type === 'income') {
          // Se o tipo de transação for 'income'
          acc.income += transaction.price // Adiciona o preço à receita
          acc.total += transaction.price // Adiciona o preço ao total
        } else {
          // Caso contrário, se for 'outcome'
          acc.outcome += transaction.price // Adiciona o preço à despesa
          acc.total -= transaction.price // Subtrai o preço do total
        }

        return acc // Retorna o acumulador atualizado
      },
      {
        income: 0, // Valor inicial da receita
        outcome: 0, // Valor inicial da despesa
        total: 0, // Valor inicial do total
      },
    )
  }, [transactions]) // Dependência do useMemo, recalcula quando as transações mudam

  return summary // Retorna o objeto resumo
}
