// Importa o componente Header de um arquivo local
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";

import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { SearchForm } from "./components/SearchForm";

// Define e exporta o componente funcional Transactions
export function Transactions() {
  return (
    // Renderiza uma div como contêiner principal
    <div>
      {/* Renderiza o componente Header dentro da div */}
      <Header />

      <Summary/>

      <TransactionsContainer>

      <SearchForm />

        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <PriceHighlight variant="income">
                  R$ 12.000,00
                </PriceHighlight>
              </td>
              <td>Venda</td>
              <td>13/04/2022</td>
            </tr>
            <tr>
              <td width="50%">Hambúrguer</td>
              <td>
                <PriceHighlight variant="outcome">
                  -R$ 59,00
                </PriceHighlight>
              </td>
              <td>Alimentação</td>
              <td>10/04/2022</td>
            </tr>
            
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>

    </div>
  );
}