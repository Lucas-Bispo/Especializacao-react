import { ThemeProvider } from "styled-components"; // biblioteca que fornece a possibilidade de 
import { TransactionsProvider } from "./contexts/TransactionsContext";
import { Transactions } from "./pages/Transactions";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";



export function App() {
  return (
    <ThemeProvider theme={defaultTheme}> {/* Claro. O ThemeProvider é um componente do React que fornece um tema para seus componentes filhos. 
    O tema é um objeto que contém as configurações de estilo para sua aplicação, como as cores, fontes e tamanhos de fonte.Para usar o ThemeProvider, 
    você precisa importá-lo do React-UI. Em seguida, você pode usar o ThemeProvider para envolver seus componentes filhos. Por exemplo, o seguinte código 
    usa o ThemeProvider para envolver o componente App: */}
      <GlobalStyle /> {/*é um arquivo que vem como variael exportada, dentro dele tem o styles da pagina feito em css.*/}

      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  )
}
