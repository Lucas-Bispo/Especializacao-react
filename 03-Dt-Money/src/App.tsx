<<<<<<< HEAD
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
=======
// Importa o `ThemeProvider` do pacote `styled-components`, que permite aplicar um tema global à aplicação.
import { ThemeProvider } from "styled-components";

// Importa o provedor de contexto `TransactionsProvider`, que gerencia as transações da aplicação.
import { TransactionsProvider } from "./contexts/TransactionsContext";

// Importa o componente `Transactions`, que representa a página principal de transações.
import { Transactions } from "./pages/Transactions";

// Importa o componente `GlobalStyle`, que define estilos globais para a aplicação.
import { GlobalStyle } from "./styles/global";

// Importa o tema padrão (`defaultTheme`) da aplicação.
import { defaultTheme } from "./styles/themes/default";

// Define o componente funcional `App`, que é o ponto de entrada da aplicação.
export function App() {
  return (
    // O `ThemeProvider` fornece o tema padrão (`defaultTheme`) para toda a aplicação.
    <ThemeProvider theme={defaultTheme}>
      {/* Aplica os estilos globais definidos no componente `GlobalStyle`. */}
      <GlobalStyle />

      {/* O `TransactionsProvider` envolve a aplicação e fornece o contexto de transações. */}
      <TransactionsProvider>
        {/* Renderiza a página de transações (`Transactions`). */}
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  );
}
>>>>>>> 03-Dt-Money
