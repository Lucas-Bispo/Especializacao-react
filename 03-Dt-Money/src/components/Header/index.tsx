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

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}