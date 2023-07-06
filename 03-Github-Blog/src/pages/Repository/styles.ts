// Importando a biblioteca 'styled-components'
import styled from 'styled-components';

// Exportando um componente estilizado chamado 'BlogContainer'
export const BlogContainer = styled.main`
  // Definindo a largura máxima do componente
  max-width: calc(864px + 2rem);
  // Centralizando o componente horizontalmente
  margin-inline: auto;
  // Adicionando um padding horizontal de 1rem
  padding-inline: 1rem;
`;

// Exportando um componente estilizado chamado 'Title'
export const Title = styled.div`
  // Definindo o componente como um flex container
  display: flex;
  // Alinhando os itens do flex container com espaço entre eles
  justify-content: space-between;
  // Adicionando margens superior e inferior
  margin-top: -1rem;
  margin-bottom: .75rem;

  // Estilizando o elemento h3 dentro do componente
  h3 {
    // Definindo o tamanho da fonte
    font-size: 1.125rem;
    // Definindo a cor do texto usando uma propriedade do tema
    color: ${props => props.theme['subtitle']};
  }

  // Estilizando o elemento span dentro do componente
  span {
    // Definindo o tamanho da fonte
    font-size: .875rem;
    // Definindo a cor do texto usando uma propriedade do tema
    color: ${props => props.theme['span']};
  }

  // Adicionando uma media query para estilos que se aplicam quando a largura da tela é menor ou igual a 900px
  @media (max-width: 900px) {
    // Alterando a margem superior do componente
    margin-top: -3rem;
  }
`;

// Exportando um componente estilizado chamado 'Cards'
export const Cards = styled.div`
  // Definindo o componente como um flex container
  display: flex;
  // Centralizando os itens do flex container horizontalmente
  justify-content: center;
  // Permitindo que os itens do flex container sejam quebrados em várias linhas
  flex-wrap: wrap;
  // Adicionando um espaço entre os itens do flex container
  gap : 2rem;
  // Adicionando margens superior e inferior ao componente
  margin-block: 3rem;

  // Estilizando o elemento com classe 'loading' dentro do componente
  .loading {
    // Definindo o elemento como um flex container
    display: flex;
    // Não permitindo que os itens do flex container sejam quebrados em várias linhas
    flex-wrap: nowrap;
    // Adicionando um espaço entre os itens do flex container
    gap : 2rem;
    // Definindo a largura do elemento como sendo igual à largura de seu contêiner pai (100%)
    width: 100%;
  
    // Estilizando os elementos div dentro do elemento com classe 'loading'
    div {
      // Aplicando uma transformação para mover o elemento verticalmente para sua posição original (0)
      transform: translateY(0);
      // Definindo a altura do elemento como sendo igual a 260px
      height: 260px;
    }
  }

   // Adicionando uma media query para estilos que se aplicam quando a largura da tela é menor ou igual a 900px
   @media (max-width:900px) {
     .loading {
       flex-wrap: wrap;
     }
   }
`;
