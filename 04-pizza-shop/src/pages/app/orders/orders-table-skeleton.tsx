// Importa o ícone de pesquisa da biblioteca 'lucide-react'
import { Search } from 'lucide-react'

// Importa o componente de botão reutilizável
import { Button } from '@/components/ui/button'
// Importa o componente de esqueleto para placeholders de carregamento
import { Skeleton } from '@/components/ui/skeleton'
// Importa componentes de célula e linha de tabela para estruturar os dados
import { TableCell, TableRow } from '@/components/ui/table'

// Componente responsável por exibir o estado de carregamento para a tabela de pedidos
export function OrdersTableSkeleton() {
  return (
    <>
      {/* Cria um array de 10 elementos e mapeia para gerar placeholders */}
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          // Cada linha da tabela representa uma linha de pedido fictícia
          <TableRow key={i}>
            {/* Célula com botão desativado para detalhes do pedido */}
            <TableCell>
              <Button variant="outline" size="xs" disabled>
                {/* Ícone de pesquisa desativado */}
                <Search className="h-3 w-3" />
                {/* Texto oculto para acessibilidade */}
                <span className="sr-only">Detalhes do pedido</span>
              </Button>
            </TableCell>

            {/* Célula com texto fictício para identificador do pedido */}
            <TableCell className="font-mono text-xs font-medium">
              <Skeleton className="h-4 w-[172px]" />
            </TableCell>

            {/* Célula com texto fictício para a data do pedido */}
            <TableCell className="text-muted-foreground">
              <Skeleton className="h-4 w-[148px]" />
            </TableCell>

            {/* Célula com texto fictício para status do pedido */}
            <TableCell>
              <Skeleton className="h-4 w-[110px]" />
            </TableCell>

            {/* Célula com texto fictício para o nome do cliente */}
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-[200px]" />
            </TableCell>

            {/* Célula contendo dois placeholders: valor e método de pagamento */}
            <TableCell>
              <div className="flex flex-col gap-0.5">
                {/* Placeholder para valor total */}
                <Skeleton className="h-5 w-[64px]" />
                {/* Placeholder para método de pagamento */}
                <Skeleton className="h-4 w-[80px]" />
              </div>
            </TableCell>

            {/* Célula com texto fictício para subtotal */}
            <TableCell>
              <Skeleton className="h-4 w-[92px]" />
            </TableCell>

            {/* Célula com texto fictício para ações adicionais */}
            <TableCell>
              <Skeleton className="h-4 w-[92px]" />
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}
