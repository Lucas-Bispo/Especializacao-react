// Importa ícones da biblioteca 'lucide-react' para serem usados no cabeçalho
import { ClipboardList, Home, Pizza, Star, UtensilsCrossed } from 'lucide-react'

// Importa componentes específicos que serão usados no cabeçalho
import { AccountMenu } from './account-menu'   // Componente para o menu de conta do usuário
import { NavLink } from './nav-link'           // Componente para links de navegação
import { ThemeToggle } from './theme-toggle'   // Componente para alternar entre temas
import { Separator } from './ui/separator'     // Componente para separar elementos visualmente

// Função que retorna o componente Header, responsável por exibir o cabeçalho
export function Header() {
  return (
    // Contêiner principal do cabeçalho, com uma borda na parte inferior
    <div className="border-b">
      
      {/* Contêiner para o conteúdo do cabeçalho, com altura fixa e espaçamento */}
      <div className="flex h-16 items-center gap-6 px-6">
        
        {/* Ícone de pizza, com dimensões definidas */}
        <Pizza className="h-6 w-6" />

        {/* Componente separador vertical entre a pizza e os links de navegação */}
        <Separator orientation="vertical" className="h-6" />

        {/* Navegação principal, com links para as seções do site */}
        <nav className="flex items-center space-x-4 lg:space-x-6">
          
          {/* Link para a página inicial */}
          <NavLink to="/">
            {/* Ícone de casa para o link "Início" */}
            <Home className="h-4 w-4" />
            Início
          </NavLink>

          {/* Link para a página de pedidos */}
          <NavLink to="/orders">
            {/* Ícone de utensílios cruzados para o link "Pedidos" */}
            <UtensilsCrossed className="h-4 w-4" />
            Pedidos
          </NavLink>
        </nav>

        {/* Contêiner para os ícones e menus à direita, com margem automática para empurrar os itens */}
        <div className="ml-auto flex items-center space-x-2">
          
          {/* Componente para alternar entre temas claro e escuro */}
          <ThemeToggle />

          {/* Menu de conta do usuário, com opções de configuração ou login */}
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
