<<<<<<< HEAD
import * as Dialog from "@radix-ui/react-dialog";
// Importa o Dialog do Radix UI, uma biblioteca de componentes React.
import { NewTransactionModal } from "../NewTransactionModal/index";
// Importa o componente NewTransactionModal, que é um modal para criar uma nova transação.
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
// Importa os estilos do componente Header.
import logoImg from '../../assets/logo.svg';
// Importa o logo da aplicação.
export function Header() {
// Define o componente Header.
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        {/*// Renderiza o logo da aplicação.*/}

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
           {/*// Renderiza o modal para criar uma nova transação.*/}

=======
// Importa componentes estilizados do arquivo './styles'.
// `HeaderContainer`, `HeaderContent` e `NewTransactionButton` são componentes estilizados criados usando uma biblioteca como styled-components.
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

// Importa componentes do pacote '@radix-ui/react-dialog', uma biblioteca para criar diálogos (modais) acessíveis e personalizáveis.
import * as Dialog from '@radix-ui/react-dialog';

// Importa a imagem do logo da aplicação, que será usada no cabeçalho.
import logoImg from "../../assets/logo.svg";

// Importa o componente `NewTransactionModal`, que representa o modal de criação de novas transações.
import { NewTransactionModal } from "../NewTransactionModal";

// Define o componente funcional `Header`, que representa o cabeçalho da aplicação.
export function Header() {
  return (
    // O `HeaderContainer` é um componente estilizado que envolve todo o conteúdo do cabeçalho.
    <HeaderContainer>
      {/* O `HeaderContent` é outro componente estilizado que organiza o layout interno do cabeçalho. */}
      <HeaderContent>
        {/* Exibe a imagem do logo da aplicação. A propriedade `alt` é deixada em branco, pois o logo é decorativo. */}
        <img src={logoImg} alt="" />

        {/* O `Dialog.Root` é o componente raiz do modal fornecido pelo Radix UI. Ele gerencia o estado aberto/fechado do modal. */}
        <Dialog.Root>
          {/* O `Dialog.Trigger` é o botão que abre o modal. 
              A propriedade `asChild` faz com que o `Dialog.Trigger` use o elemento filho (`NewTransactionButton`) como o gatilho. */}
          <Dialog.Trigger asChild>
            {/* O `NewTransactionButton` é um componente estilizado que atua como o botão "Nova transação". */}
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          {/* O `NewTransactionModal` é o componente que representa o conteúdo do modal. 
              Ele será renderizado quando o modal for aberto. */}
>>>>>>> 03-Dt-Money
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}