<<<<<<< HEAD
import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header/index.tsx'
import { Summary } from '../../components/Summary/index.tsx'
import { TransactionsContext } from '../../contexts/TransactionsContext.tsx'
import { priceFormatter, dateFormatter } from '../../utils/formatter.ts'
import { SearchForm } from './components/SearchForm/index.tsx'
=======
// Importa o hook `useContextSelector` do pacote `use-context-selector`, que permite selecionar partes específicas de um contexto.
import { useContextSelector } from 'use-context-selector';

// Importa componentes reutilizáveis da aplicação.
import { Header } from '../../components/Header'; // Componente de cabeçalho da aplicação.
import { Summary } from '../../components/Summary'; // Componente que exibe o resumo das transações.

// Importa o contexto `TransactionsContext`, que fornece os dados e métodos relacionados às transações.
import { TransactionsContext } from '../../contexts/TransactionsContext';

// Importa funções utilitárias para formatação de valores e datas.
import { dateFormatter, priceFormatter } from '../../utils/formatter';

// Importa o componente `SearchForm` para permitir a busca de transações.
import { SearchForm } from './components/SearchForm';

// Importa componentes estilizados para a página de transações.
>>>>>>> 03-Dt-Money
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
<<<<<<< HEAD
} from './styles.ts'


export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
=======
} from './styles';

// Define o componente funcional `Transactions`, que exibe a lista de transações.
export function Transactions() {
  // Usa o `useContextSelector` para acessar apenas a lista de transações do contexto `TransactionsContext`.
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions; // Retorna a lista de transações.
  });

  return (
    <div>
      {/* Renderiza o componente `Header`, que representa o cabeçalho da aplicação. */}
      <Header />

      {/* Renderiza o componente `Summary`, que exibe um resumo das transações (entradas, saídas e saldo total). */}
      <Summary />

      {/* Contêiner principal para as transações. */}
      <TransactionsContainer>
        {/* Renderiza o formulário de busca (`SearchForm`) para filtrar transações. */}
        <SearchForm />

        {/* Tabela para exibir as transações. */}
        <TransactionsTable>
          <tbody>
            {/* Itera sobre a lista de transações e renderiza uma linha para cada transação. */}
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}> {/* Define a chave única para cada linha. */}
                  {/* Coluna: Descrição da transação (ocupa 50% da largura). */}
                  <td width="50%">{transaction.description}</td>

                  {/* Coluna: Valor da transação, destacado com base no tipo (entrada ou saída). */}
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {/* Adiciona um sinal de menos ("-") se o tipo for "outcome" (saída). */}
                      {transaction.type === 'outcome' && '- '}
                      {/* Formata o valor monetário usando a função `priceFormatter`. */}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>

                  {/* Coluna: Categoria da transação. */}
                  <td>{transaction.category}</td>

                  {/* Coluna: Data da transação, formatada usando a função `dateFormatter`. */}
>>>>>>> 03-Dt-Money
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
<<<<<<< HEAD
              )
=======
              );
>>>>>>> 03-Dt-Money
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
<<<<<<< HEAD
  )
}
=======
  );
}
>>>>>>> 03-Dt-Money
