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