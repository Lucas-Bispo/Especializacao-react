<<<<<<< HEAD
import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme['gray-800']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme['gray-900']};
      color: ${(props) => props.theme['gray-300']};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme['gray-500']};
      }
    }

    button[type='submit'] {
      height: 50px;
      border: 0;
      background: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.25rem;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${(props) => props.theme['green-700']};
        transition: background-color 0.2s;
      }
    }
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};
`

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`

interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(
  RadioGroup.Item,
)<TransactionTypeButtonProps>`
  background: ${(props) => props.theme['gray-700']};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  color: ${(props) => props.theme['gray-300']};

  svg {
    color: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-300']
        : props.theme['red-300']};
  }

  &[data-state='unchecked']:hover {
    transition: background-color 0.2s;
    background: ${(props) => props.theme['gray-600']};
  }

  &[data-state='checked'] {
    color: ${(props) => props.theme.white};
    background: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-500']
        : props.theme['red-500']};

    svg {
      color: ${(props) => props.theme.white};
    }
  }
`
=======
// Importa o `styled` do pacote `styled-components`, uma biblioteca para estilização de componentes usando CSS-in-JS.
import styled from "styled-components";

// Importa componentes do pacote `@radix-ui/react-dialog`, usado para criar modais acessíveis e personalizáveis.
import * as Dialog from '@radix-ui/react-dialog';

// Importa componentes do pacote `@radix-ui/react-radio-group`, usado para criar grupos de botões de rádio acessíveis.
import * as RadioGroup from '@radix-ui/react-radio-group';

// Define o componente estilizado `Overlay`, que representa o fundo escurecido do modal.
export const Overlay = styled(Dialog.Overlay)`
  position: fixed; // Fixa o overlay na tela.
  width: 100vw; // Ocupa 100% da largura da viewport.
  height: 100vh; // Ocupa 100% da altura da viewport.
  inset: 0; // Posiciona o overlay em todas as bordas (top, right, bottom, left).
  background: rgba(0, 0, 0, 0.75); // Fundo semi-transparente escuro.
`;

// Define o componente estilizado `Content`, que representa o conteúdo principal do modal.
export const Content = styled(Dialog.Content)`
  min-width: 32rem; // Largura mínima do modal.
  border-radius: 6px; // Borda arredondada.
  padding: 2.5rem 3rem; // Espaçamento interno.
  background: ${props => props.theme["gray-800"]}; // Cor de fundo baseada no tema.
  position: fixed; // Fixa o modal na tela.
  top: 50%; // Centraliza verticalmente.
  left: 50%; // Centraliza horizontalmente.
  transform: translate(-50%, -50%); // Ajusta a posição para centralizar perfeitamente.

  form {
    margin-top: 2rem; // Espaçamento superior do formulário.
    display: flex; // Layout flexível.
    flex-direction: column; // Organiza os elementos em coluna.
    gap: 1rem; // Espaçamento entre os elementos.

    input {
      border-radius: 6px; // Borda arredondada.
      border: 0; // Remove a borda padrão.
      background: ${props => props.theme["gray-900"]}; // Cor de fundo baseada no tema.
      color: ${props => props.theme["gray-300"]}; // Cor do texto.
      padding: 1rem; // Espaçamento interno.

      &::placeholder {
        color: ${props => props.theme["gray-500"]}; // Cor do texto do placeholder.
      }
    }

    button[type="submit"] {
      height: 50px; // Altura do botão.
      border: 0; // Remove a borda padrão.
      background: ${props => props.theme["green-500"]}; // Cor de fundo baseada no tema.
      color: ${props => props.theme.white}; // Cor do texto.
      font-weight: bold; // Texto em negrito.
      padding: 0 1.25rem; // Espaçamento interno.
      border-radius: 6px; // Borda arredondada.
      margin-top: 1.25rem; // Espaçamento superior.
      cursor: pointer; // Cursor de ponteiro ao passar o mouse.

      &:disabled {
        opacity: 0.6; // Reduz a opacidade quando desabilitado.
        cursor: not-allowed; // Cursor de "não permitido" quando desabilitado.
      }

      &:not(:disabled):hover {
        background: ${props => props.theme["green-700"]}; // Altera a cor de fundo ao passar o mouse.
        transition: background-color 0.2s; // Animação suave da transição.
      }
    }
  }
`;

// Define o componente estilizado `CloseButton`, que representa o botão de fechamento do modal.
export const CloseButton = styled(Dialog.Close)`
  position: absolute; // Posiciona o botão absolutamente dentro do modal.
  background: transparent; // Fundo transparente.
  border: 0; // Remove a borda.
  top: 1.5rem; // Posiciona na parte superior.
  right: 1.5rem; // Posiciona na parte direita.
  line-height: 0; // Remove o espaçamento interno do texto.
  cursor: pointer; // Cursor de ponteiro ao passar o mouse.
  color: ${props => props.theme["gray-500"]}; // Cor do ícone.
`;

// Define o componente estilizado `TransactionType`, que representa o grupo de botões de rádio para selecionar o tipo de transação.
export const TransactionType = styled(RadioGroup.Root)`
  display: grid; // Layout em grade.
  grid-template-columns: repeat(2, 1fr); // Duas colunas de largura igual.
  gap: 1rem; // Espaçamento entre os botões.
  margin-top: 0.5rem; // Espaçamento superior.
`;

// Define a interface `TransactionTypeButtonProps` para tipar as propriedades do botão de tipo de transação.
interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome'; // Variante pode ser "income" (entrada) ou "outcome" (saída).
}

// Define o componente estilizado `TransactionTypeButton`, que representa um botão de rádio individual.
export const TransactionTypeButton = styled(RadioGroup.Item)<TransactionTypeButtonProps>`
  background: ${props => props.theme["gray-700"]}; // Cor de fundo baseada no tema.
  padding: 1rem; // Espaçamento interno.
  display: flex; // Layout flexível.
  align-items: center; // Alinha os itens verticalmente.
  justify-content: center; // Centraliza os itens horizontalmente.
  gap: 0.5rem; // Espaçamento entre o ícone e o texto.
  border-radius: 6px; // Borda arredondada.
  cursor: pointer; // Cursor de ponteiro ao passar o mouse.
  border: 0; // Remove a borda.
  color: ${props => props.theme["gray-300"]}; // Cor do texto.

  svg {
    color: ${props => props.variant === 'income' ? props.theme["green-300"] : props.theme["red-300"]}; // Cor do ícone baseada na variante.
  }

  &[data-state='unchecked']:hover {
    transition: background-color 0.2s; // Animação suave da transição.
    background: ${props => props.theme["gray-600"]}; // Altera a cor de fundo ao passar o mouse.
  }

  &[data-state='checked'] {
    color: ${props => props.theme.white}; // Altera a cor do texto quando selecionado.
    background: ${props => props.variant === 'income' ? props.theme["green-500"] : props.theme["red-500"]}; // Altera a cor de fundo baseada na variante.
    svg {
      color: ${props => props.theme.white}; // Altera a cor do ícone quando selecionado.
    }
  }
`;
>>>>>>> 03-Dt-Money
