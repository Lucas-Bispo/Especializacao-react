// Importa os hooks para lidar com mutações e gerenciamento de cache do react-query
import { useMutation, useQueryClient } from '@tanstack/react-query'
// Importa a função para formatar datas em uma distância legível
import { formatDistanceToNow } from 'date-fns'
// Importa a localidade para português do Brasil
import { ptBR } from 'date-fns/locale'
// Importa ícones da biblioteca lucide-react
import { ArrowRight, Loader2, Search, X } from 'lucide-react'
// Importa o hook useState para gerenciar estados locais
import { useState } from 'react'
// Importa a biblioteca de notificações toast
import { toast } from 'sonner'

// Importa funções de API para manipular pedidos
import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
// Importa o tipo de resposta para pedidos
import { GetOrdersResponse } from '@/api/get-orders'
// Importa o componente que exibe o status do pedido
import { OrderStatus } from '@/components/order-status'
// Importa componentes de botão e diálogo
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
// Importa componentes para estruturação de tabelas
import { TableCell, TableRow } from '@/components/ui/table'

// Importa o componente que exibe os detalhes do pedido
import { OrderDetails } from './order-details'

// Define os possíveis status de um pedido
type OrderStatus =
  | 'pending' // Pedido pendente
  | 'canceled' // Pedido cancelado
  | 'processing' // Pedido em processamento
  | 'delivering' // Pedido em entrega
  | 'delivered' // Pedido entregue

// Define as propriedades esperadas para o componente OrderTableRow
export interface OrderTableRowProps {
  order: {
    orderId: string // ID do pedido
    createdAt: string // Data de criação do pedido
    customerName: string // Nome do cliente
    total: number // Total do pedido (em centavos)
    status: OrderStatus // Status do pedido
  }
}

// Componente que renderiza uma linha da tabela de pedidos
export function OrderTableRow({ order }: OrderTableRowProps) {
  // Estado para controlar se os detalhes do pedido estão abertos
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
  // Acessa o gerenciador de cache do react-query
  const queryClient = useQueryClient()

  // Atualiza o status de um pedido no cache local
  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    // Obtém os dados em cache da listagem de pedidos
    const ordersListingCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    console.log(ordersListingCache)

    // Atualiza cada entrada do cache correspondente
    ordersListingCache.forEach(([cacheKey, cached]) => {
      if (!cached) {
        return // Ignora se o cache estiver vazio
      }

      // Atualiza os dados no cache para refletir o novo status
      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cached,
        orders: cached.orders.map((order) => {
          if (order.orderId !== orderId) {
            return order // Mantém os pedidos que não foram alterados
          }

          return {
            ...order,
            status, // Atualiza o status do pedido correspondente
          }
        }),
      })
    })

    // Exibe uma notificação de sucesso
    toast.success('Pedido alterado com sucesso!')
  }

  // Hook para aprovar um pedido
  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder, // Função de API para aprovar
      onSuccess: async (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'processing') // Atualiza o cache
      },
    })

  // Hook para cancelar um pedido
  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder, // Função de API para cancelar
      onSuccess: async (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'canceled') // Atualiza o cache
      },
    })

  // Hook para despachar um pedido
  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder, // Função de API para despachar
      onSuccess: async (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'delivering') // Atualiza o cache
      },
    })

  // Hook para marcar um pedido como entregue
  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder, // Função de API para entrega
      onSuccess: async (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'delivered') // Atualiza o cache
      },
    })

  // Renderiza uma linha da tabela com informações e ações relacionadas ao pedido
  return (
    <TableRow>
      {/* Célula com botão para abrir detalhes do pedido */}
      <TableCell>
        <Dialog onOpenChange={setIsOrderDetailsOpen} open={isOrderDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          {/* Detalhes do pedido */}
          <OrderDetails open={isOrderDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>

      {/* Célula com ID do pedido */}
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      {/* Célula com data de criação do pedido */}
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(new Date(order.createdAt), {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>

      {/* Célula com status do pedido */}
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      {/* Célula com nome do cliente */}
      <TableCell className="font-medium">{order.customerName}</TableCell>

      {/* Célula com total e quantidade de produtos */}
      <TableCell>
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">
            {(order.total / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
          <span className="text-xs text-muted-foreground">3 produto(s)</span>
        </div>
      </TableCell>

      {/* Célula com botão para alterar status baseado no estado atual */}
      <TableCell>
        {/* Botões para aprovar, despachar ou entregar o pedido */}
        {order.status === 'processing' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isDispatchingOrder}
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
          >
            Em entrega
            {isDispatchingOrder ? (
              <Loader2 className="ml-2 h-3 w-3 animate-spin" />
            ) : (
              <ArrowRight className="ml-2 h-3 w-3" />
            )}
          </Button>
        )}
        {/* Mais botões para outros estados... */}
      </TableCell>

      {/* Célula com botão para cancelar o pedido */}
      <TableCell>
        <Button
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          }
          variant="ghost"
          size="xs"
        >
          {isCancelingOrder ? (
            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
          ) : (
            <ArrowRight className="mr-2 h-3 w-3" />
          )}
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
