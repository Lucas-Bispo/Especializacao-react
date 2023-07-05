import styled from 'styled-components';

// Importa a função 'styled' do pacote 'styled-components' para estilizar componentes com CSS-in-JS

// Exporta o componente 'HomeContainer' estilizado como 'main'
export const HomeContainer = styled.main`
  // Define estilos para a classe 'loading'
  .loading {
    height: 100px; // Define a altura como 100 pixels
    width: calc(50% - 1rem); // Define a largura como metade do container menos 1rem
    transform: translateX(0); // Aplica uma transformação de translação no eixo X
  }
  
  // Define regras de estilo quando a largura da tela for menor ou igual a 900px
  @media (max-width: 900px) {
    .loading {
      width: 100%; // Define a largura como 100% do container
    }
  }
`;

// Exporta o componente 'Cards' estilizado como 'div'
export const Cards = styled.div`
  display: flex; // Define o layout de exibição como flexível
  flex-wrap: wrap; // Permite que os elementos sejam quebrados em linhas adicionais quando necessário
  gap: 2rem; // Define o espaçamento entre os elementos
  justify-content: center; // Alinha os elementos no centro horizontalmente
  padding-block: 2rem; // Define o espaçamento vertical interno
`;
