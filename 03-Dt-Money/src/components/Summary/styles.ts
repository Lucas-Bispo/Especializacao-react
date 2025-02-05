<<<<<<< HEAD
import styled, { css } from 'styled-components'

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;
`

interface SummaryCardProps {
  variant?: 'green'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }

  ${(props) =>
    props.variant === 'green' &&
    css`
      background: ${props.theme['green-700']};
    `}
`
=======
// Importa o `styled` e o utilitário `css` do pacote `styled-components`, uma biblioteca para estilização de componentes usando CSS-in-JS.
import styled, { css } from "styled-components";

// Define o componente estilizado `SummaryContainer`, que representa o contêiner principal dos cartões de resumo.
export const SummaryContainer = styled.section`
  width: 100%; // Ocupa 100% da largura disponível.
  max-width: 1120px; // Define uma largura máxima para o contêiner.
  margin: 0 auto; // Centraliza o contêiner horizontalmente.
  padding: 0 1.5rem; // Adiciona espaçamento interno lateral.
  display: grid; // Usa um layout em grade.
  grid-template-columns: repeat(3, 1fr); // Divide o layout em 3 colunas de largura igual.
  gap: 2rem; // Define o espaçamento entre os elementos da grade.
  margin-top: -5rem; // Desloca o contêiner para cima (usado para sobreposição visual).
`;

// Define a interface `SummaryCardProps` para tipar as propriedades do componente `SummaryCard`.
interface SummaryCardProps {
  variant?: "green"; // A variante pode ser opcionalmente "green" (verde).
}

// Define o componente estilizado `SummaryCard`, que representa um cartão individual de resumo.
export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${props => props.theme["gray-600"]}; // Cor de fundo padrão baseada no tema.
  border-radius: 6px; // Borda arredondada.
  padding: 2rem; // Espaçamento interno.

  header {
    display: flex; // Layout flexível.
    align-items: center; // Alinha os itens verticalmente.
    justify-content: space-between; // Distribui os itens com espaço entre eles.
    color: ${props => props.theme["gray-300"]}; // Cor do texto do cabeçalho.
  }

  strong {
    display: block; // Torna o elemento um bloco.
    margin-top: 1rem; // Espaçamento superior.
    font-size: 2rem; // Tamanho da fonte.
  }

  // Aplica estilos condicionais se a variante for "green".
  ${props =>
    props.variant === "green" &&
    css`
      background: ${props.theme["green-700"]}; // Altera a cor de fundo para verde.
    `}
`;
>>>>>>> 03-Dt-Money
