<<<<<<< HEAD
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']};
  }

  body {
    background-color: ${(props) => props.theme['gray-800']};
    color: ${(props) => props.theme['gray-100']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serif;
  }
`
=======
// Importa o `createGlobalStyle` do pacote `styled-components`, que permite criar estilos globais para a aplicação.
import { createGlobalStyle } from "styled-components";

// Define o componente `GlobalStyle`, que aplica estilos globais à aplicação.
export const GlobalStyle = createGlobalStyle`
  // Aplica estilos globais a todos os elementos da página.
  * {
    margin: 0; // Remove margens padrão de todos os elementos.
    padding: 0; // Remove preenchimentos padrão de todos os elementos.
    box-sizing: border-box; // Garante que o tamanho dos elementos inclua padding e bordas.
  }

  // Define o estilo para elementos em estado de foco (ex.: inputs, botões).
  :focus {
    outline: 0; // Remove o contorno padrão ao focar um elemento.
    box-shadow: 0 0 0 2px ${props => props.theme['green-500']}; // Adiciona uma sombra verde ao redor do elemento focado.
  }

  // Define o estilo global para o corpo da página.
  body {
    background-color: ${props => props.theme['gray-800']}; // Define a cor de fundo baseada no tema.
    color: ${props => props.theme['gray-100']}; // Define a cor do texto baseada no tema.
    -webkit-font-smoothing: antialiased; // Melhora a renderização de fontes no navegador (suavização).
  }

  // Define a fonte padrão para o corpo da página e outros elementos como inputs, textareas e botões.
  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serif; // Define a fonte como Roboto, com peso 400 e tamanho 1rem.
  }
`;
>>>>>>> 03-Dt-Money
