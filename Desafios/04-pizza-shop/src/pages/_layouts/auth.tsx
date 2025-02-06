// Importa o ícone de pizza da biblioteca `lucide-react`, que fornece ícones SVG como componentes React.
import { Pizza } from 'lucide-react'

// Importa o componente `Outlet` do React Router, usado para renderizar rotas aninhadas.
import { Outlet } from 'react-router-dom'

// Define o componente `AuthLayout`, responsável pelo layout das páginas relacionadas à autenticação.
export function AuthLayout() {
  return (
    // Contêiner principal do layout. 
    // Define uma grade responsiva para organizar os elementos e aplica classes de estilo usando utilitários CSS (provavelmente TailwindCSS).
    <div className="container relative hidden min-h-screen flex-col items-center justify-center antialiased md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      
      {/* Primeira coluna da grade - visível apenas em telas grandes (lg). 
          Contém uma barra lateral com estilo e informações. */}
      <div className="relative hidden h-full flex-col border-r border-foreground/5 bg-muted p-10 text-muted-foreground dark:border-r lg:flex">
        
        {/* Cabeçalho da barra lateral com o ícone de pizza e o nome da aplicação. */}
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          {/* Renderiza o ícone de pizza com tamanhos de altura e largura definidos. */}
          <Pizza className="h-5 w-5" />
          {/* Nome estilizado da aplicação. */}
          <span className="font-semibold">pizza.shop</span>
        </div>
        
        {/* Rodapé da barra lateral - posicionado na parte inferior (mt-auto garante isso). */}
        <div className="mt-auto">
          {/* Renderiza o rodapé com uma mensagem e o ano atual. */}
          <footer className="text-sm">
            Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
          </footer>
        </div>
      </div>

      {/* Segunda coluna da grade - visível em todas as telas. 
          Contém o conteúdo principal das páginas de autenticação. */}
      <div className="relative flex min-h-screen flex-col items-center justify-center">
        {/* Renderiza as rotas aninhadas definidas no React Router. */}
        <Outlet />
      </div>
    </div>
  )
}
