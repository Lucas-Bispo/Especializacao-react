import { Dialog } from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal/index.tsx";
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles.ts";


export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
