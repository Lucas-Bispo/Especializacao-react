// Importando o arquivo global de estilos CSS
import './global.css'

// Importando bibliotecas necessárias para funcionalidade do app
import { QueryClientProvider } from '@tanstack/react-query' // Fornece o cliente React Query para todo o app
import { Helmet, HelmetProvider } from 'react-helmet-async' // Usado para manipular metadados (como título da página) dinamicamente
import { RouterProvider } from 'react-router-dom' // Usado para gerenciar a navegação entre páginas do app
import { Toaster } from 'sonner' // Usado para mostrar notificações (toasts) para o usuário

// Importando componentes personalizados do app
import { ThemeProvider } from './components/theme/theme-provider' // Gerencia o tema do app
import { queryClient } from './lib/react-query' // Instância do cliente do React Query para gerenciar cache e consultas
import { router } from './routes' // Definindo as rotas da aplicação

// Função principal do componente App
export function App() {
  return (
    // HelmetProvider permite o uso do Helmet para gerenciamento de metadados
    <HelmetProvider>
      {/* ThemeProvider fornece o contexto do tema para todo o app */}
      <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme">
        {/* Helmet é utilizado para definir o título da página dinâmicamente */}
        <Helmet titleTemplate="%s | pizza.shop" />

        {/* Toaster é o componente que gerencia as notificações no app */}
        <Toaster richColors />

        {/* QueryClientProvider fornece o cliente do React Query para a aplicação inteira */}
        <QueryClientProvider client={queryClient}>
          {/* RouterProvider configura as rotas e renderiza as páginas baseadas na URL atual */}
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
