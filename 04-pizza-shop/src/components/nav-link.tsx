// Importa o tipo ComponentProps do React para pegar as propriedades do componente Link
import { ComponentProps } from 'react'
// Importa os componentes Link e useLocation do react-router-dom
import { Link, useLocation } from 'react-router-dom'

// Define um tipo NavLinkProps, que é baseado nas propriedades do componente Link
export type NavLinkProps = ComponentProps<typeof Link>

// Função do componente NavLink, que usa as propriedades do Link do react-router-dom
export function NavLink(props: NavLinkProps) {
  // Obtém o pathname (caminho da URL atual) da localização atual usando o hook useLocation
  const { pathname } = useLocation()

  return (
    // Componente Link do react-router-dom, para navegação
    <Link
      {...props} // Espalha todas as propriedades recebidas para o componente Link
      data-current={pathname === props.to} // Define um atributo personalizado 'data-current' se o link for o atual
      // Aplica classes de estilo com Tailwind CSS
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[current=true]:text-foreground"
    />
  )
}
