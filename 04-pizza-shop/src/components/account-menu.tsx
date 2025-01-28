// Importação de hooks e componentes necessários
import { useMutation, useQuery } from '@tanstack/react-query' // Hooks do react-query para consulta e mutação de dados
import { Building, ChevronDown, LogOut } from 'lucide-react' // Ícones da biblioteca lucide-react
import { useNavigate } from 'react-router-dom' // Hook de navegação do React Router

// Funções para fazer chamadas à API
import { getManagedRestaurant } from '@/api/get-managed-restaurant' // Função para obter o restaurante gerido pelo usuário
import { getProfile } from '@/api/get-profile' // Função para obter o perfil do usuário
import { signOut } from '@/api/sign-out' // Função para realizar o logout do usuário

// Componentes personalizados usados na interface
import { StoreProfile } from './store-profile' // Exibe o perfil da loja
import { Button } from './ui/button' // Botão personalizado
import { Dialog, DialogTrigger } from './ui/dialog' // Diálogo e trigger para abri-lo
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu' // Componentes para criar um menu suspenso
import { Skeleton } from './ui/skeleton' // Componente de esqueleto (loading)

export function AccountMenu() {
  const navigate = useNavigate() // Hook de navegação para redirecionar o usuário

  // Consulta para obter o perfil do usuário, com dados sendo carregados (isLoadingProfile)
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['me'], // Chave única para esta consulta
    queryFn: getProfile, // Função que busca os dados do perfil
    staleTime: Infinity, // Impede que os dados da consulta expirem
  })

  // Consulta para obter o restaurante gerido pelo usuário, com dados sendo carregados (isLoadingManagedRestaurant)
  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['managed-restaurant'], // Chave única para esta consulta
      queryFn: getManagedRestaurant, // Função que busca os dados do restaurante
      staleTime: Infinity, // Impede que os dados da consulta expirem
    })

  // Mutação para realizar o logout do usuário
  const { isPending: isSigningOut, mutateAsync: handleSignOut } = useMutation({
    mutationFn: signOut, // Função que realiza o logout
    onSuccess: () => {
      // Após sucesso no logout, redireciona o usuário para a página de login
      navigate('/sign-in', { replace: true })
    },
  })

  return (
    <Dialog> {/* Componente que exibe o conteúdo em forma de diálogo */}
      <DropdownMenu> {/* Menu suspenso */}
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {/* Exibe o nome do restaurante ou esqueleto de carregamento */}
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-40" /> // Exibe esqueleto de carregamento enquanto os dados do restaurante não são carregados
            ) : (
              managedRestaurant?.name // Exibe o nome do restaurante se os dados foram carregados
            )}
            <ChevronDown className="h-4 w-4" /> {/* Ícone de seta para baixo */}
          </Button>
        </DropdownMenuTrigger>

        {/* Conteúdo do menu suspenso */}
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {/* Exibe o nome e email do perfil do usuário ou esqueletos de carregamento */}
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" /> {/* Esqueleto para nome */}
                <Skeleton className="h-3 w-24" /> {/* Esqueleto para email */}
              </div>
            ) : (
              <>
                {profile?.name} {/* Nome do usuário */}
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email} {/* Email do usuário */}
                </span>
              </>
            )}
          </DropdownMenuLabel>

          {/* Linha de separação entre os itens do menu */}
          <DropdownMenuSeparator />

          {/* Grupo de itens do menu */}
          <DropdownMenuGroup>
            {/* Trigger para abrir o perfil da loja em um diálogo */}
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Building className="mr-2 h-4 w-4" /> {/* Ícone de prédio */}
                <span>Perfil da loja</span> {/* Texto do item */}
              </DropdownMenuItem>
            </DialogTrigger>

            {/* Item de menu para logout */}
            <DropdownMenuItem
              asChild
              className="text-rose-500 dark:text-rose-400" // Estilos para o item de logout
              disabled={isSigningOut} // Desabilita o item de logout enquanto o processo de logout está em andamento
            >
              <button className="w-full" onClick={() => handleSignOut()}>
                <LogOut className="mr-2 h-4 w-4" /> {/* Ícone de logout */}
                <span>Sair</span> {/* Texto do botão */}
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Exibe o perfil da loja */}
      <StoreProfile />
    </Dialog>
  )
}
