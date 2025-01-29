// Importando o ThemeProvider do styled-components para fornecer um tema global para o aplicativo
import { ThemeProvider } from "styled-components";

// Importando o componente Transactions, que provavelmente lida com as transações financeiras
import { Transactions } from "./pages/Transactions";

// Importando o GlobalStyle, que define estilos globais aplicados a todo o aplicativo
import { GlobalStyle } from "./styles/global";

// Importando o tema padrão que será aplicado ao aplicativo
import { defaultTheme } from "./styles/themes/default";

// Definindo o componente funcional App
export function App() {
  // Retorna a estrutura principal do aplicativo
  return (
    // O ThemeProvider envolve o aplicativo e fornece o tema global para todos os componentes
    <ThemeProvider theme={defaultTheme}>
      {/* GlobalStyle é aplicado para garantir que os estilos globais sejam carregados */}
      <GlobalStyle />

      {/* O componente Transactions é renderizado dentro do ThemeProvider e GlobalStyle */}
      <Transactions />
    </ThemeProvider>
  )
}
