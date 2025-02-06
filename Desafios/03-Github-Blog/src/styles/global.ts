// Importa a função createGlobalStyle do pacote 'styled-components'
import { createGlobalStyle } from 'styled-components';

// Exporta a constante GlobalStyle que representa um estilo global para a aplicação
export const GlobalStyle = createGlobalStyle`
  /* Define um estilo de reset para todos os elementos */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Define o estilo de fundo para o corpo da página baseado no tema */
  body {
    background: ${props => props.theme['background']};
  }

  /* Define o estilo de cor e fonte para o corpo da página e os inputs */
  body, input {
    color: ${props => props.theme['text']};
    font-family: 'Nunito', sans-serif;
    line-height: 160%;
  }

  /* Define o estilo de cor para os títulos h1, h2, h3 baseado no tema */
  h1, h2, h3 {
    color: ${props => props.theme['title']};
  }

  /* Define o estilo de foco para os elementos focados */
  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['blue']}; 
  }
`;
