import { ThemeProvider } from "styled-components";
import { TransactionsProvider } from "./contexts/TransactionsContext.tsx";
import { Transactions } from "./pages/Transactions/index.tsx";
import { GlobalStyle } from "./styles/global.ts";
import { defaultTheme } from "./styles/themes/default.ts";


export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  )
}
