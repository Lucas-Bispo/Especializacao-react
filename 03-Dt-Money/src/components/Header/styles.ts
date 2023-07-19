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