import styled from 'styled-components';

// Define um componente estilizado 'PostContainer' que representa a seção principal do post
export const PostContainer = styled.main`
  max-width: calc(864px + 2rem); /* Define a largura máxima do post com base no tamanho do conteúdo e margens */
  margin-inline: auto; /* Centraliza o post horizontalmente */
  padding-inline: 1rem; /* Define um espaçamento interno horizontal */
`;

// Define um componente estilizado 'Content' que representa o conteúdo do post
export const Content = styled.div`
  margin-top: -5rem; /* Move o conteúdo para cima, para sobrepor o banner */
  padding: 2rem; /* Define um espaçamento interno */
  
  p {
    margin-block: .5rem; /* Define um espaçamento entre os parágrafos */
  }

  strong {
    color: ${props => props.theme['subtitle']}; /* Define a cor para os textos em negrito */
  }

  h2 {
    margin-block: 2.5rem 1.5rem; /* Define um espaçamento entre os títulos de nível 2 */
  }

  h3 {
    margin-block: 1.5rem 1rem; /* Define um espaçamento entre os títulos de nível 3 */
  }

  a {
    color: ${props => props.theme['blue']}; /* Define a cor para os links */
    text-decoration: none; /* Remove a decoração de texto dos links */
    
    :hover {
      text-decoration: underline; /* Adiciona uma linha sublinhada quando o link é hoverado */
    }
  }

  ul {
    margin-block: 1rem; /* Define um espaçamento entre as listas */
    list-style-position: inside; /* Define a posição do marcador da lista dentro do elemento */

    li + li {
      margin-top: .5rem; /* Define um espaçamento entre os itens da lista */
    }
  }

  img {
    width: 100%; /* Define a largura da imagem como 100% */
    margin-block: 1rem; /* Define um espaçamento entre as imagens */
  }

  @media (max-width: 900px)
    margin-top: -3rem;
    padding: .5rem;
  }
`;