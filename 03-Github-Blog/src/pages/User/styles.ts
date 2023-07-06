import styled from 'styled-components';

// Importa a biblioteca 'styled-components' para criar componentes estilizados

// Define um componente estilizado 'UserContainer' que representa a seção principal do usuário
export const UserContainer = styled.main``;

// Define um componente estilizado 'Cards' que representa um container para os cartões
export const Cards = styled.div`
  display: flex; /* Define o container como um flex container */
  flex-wrap: wrap; /* Permite que os elementos filhos quebrem linha quando necessário */
  gap: 2rem; /* Define um espaçamento horizontal entre os elementos filhos */
  justify-content: center; /* Centraliza os elementos horizontalmente */
  padding-block: 2rem; /* Define um espaçamento vertical */
  
  .loading {
    width: calc(50% - 1rem); /* Define a largura dos elementos de carregamento como 50% menos 1rem */
    transform: translateX(0); /* Define um deslocamento horizontal de 0 */
  }

  @media (max-width: 900px) {
    .loading {
      width: 100%; /* Define a largura dos elementos de carregamento como 100% */
    }
  }
`;
