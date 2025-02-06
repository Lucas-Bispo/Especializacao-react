import { api } from '@/lib/axios'
// Importa uma instância configurada do Axios a partir de uma biblioteca local. 
// `api` é usado para fazer chamadas HTTP para um endpoint.

export interface GetOrdersQuery {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}
// Define a interface `GetOrdersQuery`, que descreve os parâmetros opcionais para consultar pedidos.
// - `pageIndex`: número da página para paginação.
// - `orderId`: ID do pedido para consulta específica.
// - `customerName`: Nome do cliente para filtragem.
// - `status`: Status do pedido para filtragem.

export interface GetOrdersResponse {
  orders: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  // Lista de pedidos retornados na resposta.
  // - `orderId`: ID único do pedido.
  // - `createdAt`: Data de criação do pedido.
  // - `status`: Status atual do pedido, com valores restritos a um conjunto predefinido.
  // - `customerName`: Nome do cliente que fez o pedido.
  // - `total`: Valor total do pedido.

  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
  // Metadados da resposta.
  // - `pageIndex`: Número da página atual.
  // - `perPage`: Número de itens por página.
  // - `totalCount`: Total de pedidos disponíveis.
}

export async function getOrders({
  pageIndex,
  customerName,
  orderId,
  status,
}: GetOrdersQuery) {
  // Declara uma função assíncrona para buscar pedidos, recebendo um objeto com os parâmetros opcionais.

  const response = await api.get<GetOrdersResponse>('/orders', {
    // Faz uma requisição GET para o endpoint `/orders`.
    params: {
      pageIndex,
      orderId,
      customerName,
      status,
    },
    // Passa os parâmetros da consulta como um objeto.
    // Axios inclui automaticamente os parâmetros na URL da requisição.
  })

  return response.data
  // Retorna os dados da resposta (`response.data`), que estão no formato de `GetOrdersResponse`.
}
