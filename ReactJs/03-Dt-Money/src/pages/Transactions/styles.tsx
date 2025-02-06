// Importa o `styled` do pacote `styled-components`, uma biblioteca para estilização de componentes usando CSS-in-JS.
import styled from "styled-components";

// Define o componente estilizado `TransactionsContainer`, que representa o contêiner principal da página de transações.
export const TransactionsContainer = styled.main`
  width: 100%; // Ocupa 100% da largura disponível.
  max-width: 1120px; // Define uma largura máxima para o contêiner.
  margin: 4rem auto 0; // Centraliza o contêiner horizontalmente e adiciona margem superior.
  padding: 0 1.5rem; // Adiciona espaçamento interno lateral.
`;

// Define o componente estilizado `TransactionsTable`, que representa a tabela de transações.
export const TransactionsTable = styled.table`
  width: 100%; // Ocupa 100% da largura disponível.
  border-collapse: separate; // Define que as bordas das células não serão colapsadas.
  border-spacing: 0 0.5rem; // Define o espaçamento vertical entre as linhas da tabela.
  margin-top: 1.5rem; // Adiciona margem superior à tabela.

  td {
    padding: 1.25rem 2rem; // Adiciona espaçamento interno às células da tabela.
    background: ${props => props.theme["gray-700"]}; // Define a cor de fundo das células baseada no tema.

    &:first-child {
      border-top-left-radius: 6px; // Arredonda o canto superior esquerdo da primeira célula.
      border-bottom-left-radius: 6px; // Arredonda o canto inferior esquerdo da primeira célula.
    }

    &:last-child {
      border-top-right-radius: 6px; // Arredonda o canto superior direito da última célula.
      border-bottom-right-radius: 6px; // Arredonda o canto inferior direito da última célula.
    }
  }
`;

// Define a interface `PriceHighlightProps` para tipar as propriedades do componente `PriceHighlight`.
interface PriceHighlightProps {
  variant: "income" | "outcome"; // A variante pode ser "income" (entrada) ou "outcome" (saída).
}

// Define o componente estilizado `PriceHighlight`, que destaca o valor da transação com base no tipo (entrada ou saída).
export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${props =>
    props.variant === "income"
      ? props.theme["green-300"] // Cor verde para entradas.
      : props.theme["red-300"] // Cor vermelha para saídas.
  };
`;