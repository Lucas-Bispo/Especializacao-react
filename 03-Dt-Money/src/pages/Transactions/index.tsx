import { useContext } from "react";
import { Header } from "../../components/Header/index.tsx";
import { TransactionsContext } from "../../contexts/TransactionsContext.tsx";
import { Summary } from "../../components/Summary/index.tsx";
import { SearchForm } from "../../components/SearchForm/index.tsx";
import { priceFormatter, dateFormatter } from "../../utils/formatter.ts";
import { TransactionsContainer, TransactionsTable, PriceHighlight } from "./styles.ts";


export function Transactions() {
  const { transactions } = useContext(TransactionsContext)
  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map(transaction => {
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
                  <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
