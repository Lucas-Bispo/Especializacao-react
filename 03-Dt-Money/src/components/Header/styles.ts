<<<<<<< HEAD
import styled from 'styled-components'

// Este componente define o container da barra de cabeçalho.
export const HeaderContainer = styled.header`
  // A cor de fundo é definida para gray-900.
  background: ${(props) => props.theme['gray-900']};
  // O espaçamento é definido para 2.5rem 0 7.5rem.
  padding: 2.5rem 0 7.5rem;
`

// Este componente define o conteúdo da barra de cabeçalho.
export const HeaderContent = styled.div`
  // A largura é definida para 100% e a largura máxima é definida para 1120px.
  width: 100%;
  max-width: 1120px;
  // A margem é definida para 0 auto.
  margin: 0 auto;
  // O espaçamento é definido para 0 1.5rem.
  padding: 0 1.5rem;

  // O conteúdo é exibido em flexbox com space-between justify-content e align-items: center.
  display: flex;
  justify-content: space-between;
  align-items: center;
`

// Este componente define o botão de nova transação.
export const NewTransactionButton = styled.button`
  // A altura é definida para 50px.
  height: 50px;
  // A borda é definida para 0.
  border: 0;
  // A cor de fundo é definida para green-500.
  background: ${(props) => props.theme['green-500']};
  // A cor é definida para white.
  color: ${(props) => props.theme.white};
  // O peso da fonte é definido para bold.
  font-weight: bold;
  // O espaçamento é definido para 0 1.25rem.
  padding: 0 1.25rem;
  // O raio da borda é definido para 6px.
  border-radius: 6px;
  // O cursor é definido para pointer.
  cursor: pointer;

  // Quando o botão é sobrevoado, a cor de fundo é alterada para green-700.
  &:hover {
    background: ${(props) => props.theme['green-700']};
    transition: background-color 0.2s;
  }
`
=======
// Importa a biblioteca styled-components para criar componentes estilizados
import styled from "styled-components";

// Define o componente estilizado HeaderContainer (um <header>)
export const HeaderContainer = styled.header`
  background: ${props => props.theme["gray-900"]}; /* Define o fundo usando uma cor do tema (cinza escuro) */
  padding: 2.5rem 0 7.5rem; /* Adiciona espaçamento interno: 2.5rem no topo, 0 nas laterais, 7.5rem na base */
`;

// Define o componente estilizado HeaderContent (uma <div>)
export const HeaderContent = styled.div`
  width: 100%; /* Ocupa 100% da largura disponível */
  max-width: 1120px; /* Define uma largura máxima para o conteúdo */
  margin: 0 auto; /* Centraliza o conteúdo horizontalmente */
  padding: 0 1.5rem; /* Adiciona espaçamento interno nas laterais */
  display: flex; /* Usa flexbox para alinhar os itens */
  justify-content: space-between; /* Distribui o espaço entre os itens */
  align-items: center; /* Centraliza os itens verticalmente */
`;

// Define o componente estilizado NewTransactionButton (um <button>)
export const NewTransactionButton = styled.button`
  height: 50px; /* Define a altura do botão */
  border: 0; /* Remove a borda */
  background: ${props => props.theme["green-500"]}; /* Define o fundo usando uma cor do tema (verde) */
  color: ${props => props.theme["white"]}; /* Define a cor do texto usando uma cor do tema (branco) */
  font-weight: bold; /* Define o texto em negrito */
  padding: 0 1.25rem; /* Adiciona espaçamento interno nas laterais */
  border-radius: 6px; /* Adiciona bordas arredondadas */
  cursor: pointer; /* Muda o cursor para pointer ao passar o mouse */

  /* Efeito ao passar o mouse sobre o botão */
  &:hover {
    background: ${props => props.theme["green-700"]}; /* Muda a cor de fundo para um verde mais escuro */
    transition: background-color 0.2s; /* Adiciona uma transição suave para a cor de fundo */
  }
`;
>>>>>>> 03-Dt-Money
