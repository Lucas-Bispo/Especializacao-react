// Importação de dependências e bibliotecas necessárias para o funcionamento do componente
import { useQuery } from '@tanstack/react-query' // Hook para fazer consultas assíncronas de dados com cache e atualização
import { Loader2Icon } from 'lucide-react' // Ícone de carregamento para exibir enquanto os dados estão sendo carregados
import { Helmet } from 'react-helmet-async' // Para definir o título da página no cabeçalho HTML
import { useSearchParams } from 'react-router-dom' // Hook para manipulação de parâmetros da URL
import { z } from 'zod' // Biblioteca para validação de dados

// Importação das funções e componentes personalizados
import { getOrders } from '@/api/get-orders' // Função para buscar os pedidos
import { Pagination } from '@/components/pagination' // Componente para paginação
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table' // Componentes para exibir dados em formato de tabela

import { OrderTableFilters } from './order-table-filters' // Filtro para a tabela de pedidos
import { OrderTableRow } from './order-table-row' // Linha da tabela que exibe cada pedido
import { OrdersTableSkeleton } from './orders-table-skeleton' // Skeleton loader para exibir enquanto os dados estão sendo carregados

export function Orders() {
  // Hook para acessar e manipular os parâmetros da URL (ex: filtro de pedidos, página, etc.)
  const [searchParams, setSearchParams] = useSearchParams()

  // Extração dos parâmetros de pesquisa (orderId, customerName, status) da URL
  const orderId = searchParams.get('orderId') 
  const customerName = searchParams.get('customerName') 
  const status = searchParams.get('status')

  // Parsing e transformação do parâmetro de página para um índice (de 1 para 0)
  const pageIndex = z.coerce
    .number() // Converte o valor para número
    .transform((page) => page - 1) // Subtrai 1 para usar a indexação baseada em 0
    .parse(searchParams.get('page') ?? '1') // Pega o parâmetro 'page' ou usa '1' por padrão

  // Hook do React Query para buscar os pedidos com os parâmetros filtrados
  const {
    data: result,
    isFetching: isFetchingOrders, // Indica se os dados estão sendo carregados
    isLoading: isLoadingOrders, // Indica se a consulta ainda está sendo carregada
  } = useQuery({
    queryKey: ['orders', customerName, orderId, status, pageIndex], // Chave única para identificar a consulta
    queryFn: () =>
      getOrders({
        pageIndex,
        customerName,
        orderId,
        status: status === 'all' ? null : status, // Se o status for "all", não aplica filtro de status
      }),
  })

  // Função para lidar com a paginação, alterando o parâmetro da página na URL
  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', (pageIndex + 1).toString()) // Atualiza o parâmetro de página na URL
      return prev
    })
  }

  return (
    <>
      {/* Definindo o título da página usando o Helmet */}
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        {/* Título da página */}
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          Pedidos
          {isFetchingOrders && (
            // Exibe o ícone de carregamento enquanto os pedidos estão sendo buscados
            <Loader2Icon className="h-5 w-5 animate-spin text-muted-foreground" />
          )}
        </h1>

        {/* Filtros da tabela de pedidos */}
        <div className="space-y-2.5">
          <OrderTableFilters />
          <div className="rounded-md border">
            {/* Tabela com dados dos pedidos */}
            <Table>
              <TableHeader>
                {/* Cabeçalho da tabela */}
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Exibe um skeleton loader enquanto os pedidos estão sendo carregados */}
                {isLoadingOrders && !result && <OrdersTableSkeleton />}

                {/* Exibe os dados dos pedidos quando carregados */}
                {result &&
                  result.orders.map((order) => {
                    return <OrderTableRow key={order.orderId} order={order} />
                  })}

                {/* Exibe uma mensagem se não houver pedidos */}
                {result && result.orders.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-10 text-center text-muted-foreground"
                    >
                      Nenhum resultado encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Exibe a paginação, se houver resultados */}
          {result && (
            <Pagination
              pageIndex={pageIndex} // Página atual
              totalCount={result.meta.totalCount} // Total de pedidos
              perPage={result.meta.perPage} // Número de pedidos por página
              onPageChange={handlePaginate} // Função para alterar a página
            />
          )}
        </div>
      </div>
    </>
  )
}
