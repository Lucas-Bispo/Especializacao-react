// Importando os componentes estilizados de um arquivo de estilos (presumivelmente com styled-components)
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

// Importando a imagem do logo que será exibida no cabeçalho
import logoImg from "../../assets/logo.svg";

// Definindo o componente funcional Header
export function Header() {
  // Retorna a estrutura do cabeçalho
  return (
    // HeaderContainer é o componente que pode conter o layout geral do cabeçalho
    <HeaderContainer>
      {/* HeaderContent pode ser usado para agrupar os itens dentro do cabeçalho */}
      <HeaderContent>
        {/* A imagem do logo é exibida aqui. A propriedade 'src' aponta para o caminho da imagem importada */}
        <img src={logoImg} alt="" />
        {/* O botão de nova transação é exibido aqui com o texto "Nova transação" */}
        <NewTransactionButton>Nova transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  );
}
