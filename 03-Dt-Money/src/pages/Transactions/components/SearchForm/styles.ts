<<<<<<< HEAD
import styled from 'styled-components'

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
=======
// Importa o `styled` do pacote `styled-components`, uma biblioteca para estilização de componentes usando CSS-in-JS.
import styled from "styled-components";

// Define o componente estilizado `SearchFormContainer`, que representa o formulário de busca.
export const SearchFormContainer = styled.form`
  display: flex; // Usa um layout flexível para organizar os elementos do formulário.
  gap: 1rem; // Define o espaçamento entre os elementos (input e botão).

  input {
    flex: 1; // O input ocupa todo o espaço disponível dentro do contêiner.
    border-radius: 6px; // Aplica bordas arredondadas ao input.
    border: 0; // Remove a borda padrão do input.
    background: ${props => props.theme["gray-900"]}; // Define a cor de fundo baseada no tema.
    color: ${props => props.theme["gray-300"]}; // Define a cor do texto baseada no tema.
    padding: 1rem; // Adiciona espaçamento interno ao input.

    &::placeholder {
      color: ${props => props.theme["gray-500"]}; // Define a cor do texto do placeholder.
>>>>>>> 03-Dt-Money
    }
  }

  button {
<<<<<<< HEAD
    display: flex;
    align-items: center;
    gap: 0.75rem;

    border: 0;
    padding: 1rem;
    background: transparent;
    border: 1px solid ${(props) => props.theme['green-300']};
    color: ${(props) => props.theme['green-300']};
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${(props) => props.theme['green-500']};
      border-color: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }
`
=======
    display: flex; // Usa um layout flexível para organizar os elementos internos do botão.
    align-items: center; // Alinha os itens verticalmente ao centro.
    gap: 0.75rem; // Define o espaçamento entre o ícone e o texto do botão.
    border: 0; // Remove a borda padrão do botão.
    padding: 1rem; // Adiciona espaçamento interno ao botão.
    background: transparent; // Define o fundo do botão como transparente.
    border: 1px solid ${props => props.theme["green-300"]}; // Adiciona uma borda com cor baseada no tema.
    color: ${props => props.theme["green-300"]}; // Define a cor do texto baseada no tema.
    font-weight: bold; // Aplica negrito ao texto.
    border-radius: 6px; // Aplica bordas arredondadas ao botão.
    cursor: pointer; // Altera o cursor para indicar que o botão é clicável.

    &:disabled {
      opacity: 0.6; // Reduz a opacidade quando o botão está desabilitado.
      cursor: not-allowed; // Altera o cursor para indicar que o botão não pode ser clicado.
    }

    &:not(:disabled):hover {
      background: ${props => props.theme["green-500"]}; // Altera a cor de fundo ao passar o mouse.
      border-color: ${props => props.theme["green-500"]}; // Altera a cor da borda ao passar o mouse.
      color: ${props => props.theme["white"]}; // Altera a cor do texto ao passar o mouse.
      transition: background-color 0.2s, color 0.2s, border-color 0.2s; // Adiciona uma transição suave para as mudanças de estilo.
    }
  }
`;
>>>>>>> 03-Dt-Money
