// Importa o hook `useQuery` da biblioteca `@tanstack/react-query` para realizar requisições e gerenciar seu estado
import { useQuery } from '@tanstack/react-query';

// Importa a função `formatDistanceToNow` da biblioteca `date-fns` para calcular a distância entre duas datas
import { formatDistanceToNow } from 'date-fns';

// Importa o idioma português brasileiro para uso com a biblioteca `date-fns`
import { ptBR } from 'date-fns/locale';

// Importa o ícone `Loader2` da biblioteca `lucide-react` para exibir uma animação de carregamento
import { Loader2 } from 'lucide-react';

// Importa a função `getOrderDetails` que faz a requisição para buscar os detalhes de um pedido
import { getOrderDetails } from '@/api/get-order-details';

// Importa o componente `OrderStatus` para exibir o status do pedido
import { OrderStatus } from '@/components/order-status';

// Importa componentes de interface para criar a estrutura do modal
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Importa componentes de tabela para exibir informações tabulares
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Importa o componente esqueleto `OrderDetailsSkeleton` para exibir enquanto os dados estão sendo carregados
import { OrderDetailsSkeleton } from './order-details-skeleton';

// Define a interface para as propriedades aceitas pelo componente `OrderDetails`
interface OrderDetailsProps {
  orderId: string; // Identificador único do pedido
  open: boolean; // Indica se o modal está aberto
}

// Define o componente funcional `OrderDetails`
export function OrderDetails({ orderId, open }: OrderDetailsProps) {
  // Utiliza o hook `useQuery` para buscar os detalhes do pedido com base no `orderId`
  const {
    data: order, // Armazena os dados do pedido quando a requisição é bem-sucedida
    isLoading: isLoadingOrder, // Indica se a requisição ainda está em andamento
    isFetching: isFetchingOrder, // Indica se há uma atualização em segundo plano dos dados
  } = useQuery({
    queryKey: ['order', orderId], // Chave única para a consulta (usada para cache e invalidação)
    queryFn: () => getOrderDetails({ orderId }), // Função que executa a requisição para buscar os detalhes do pedido
    staleTime: 1000 * 60 * 15, // Define o tempo de validade dos dados como 15 minutos
    enabled: open, // Apenas executa a requisição se o modal estiver aberto
  });

  // Retorna o conteúdo do componente
  return (
    // Define o conteúdo principal do modal
    <DialogContent className="sm:max-w-[520px]">
      {/* Cabeçalho do modal */}
      <DialogHeader>
        {/* Título do modal */}
        <DialogTitle className="flex items-center gap-2">
          Pedido: {orderId} {/* Exibe o identificador do pedido */}
          {isFetchingOrder && ( // Exibe um ícone de carregamento se os dados estiverem sendo atualizados
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </DialogTitle>
        {/* Descrição do modal */}
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      {/* Exibe o componente esqueleto enquanto os dados estão sendo carregados */}
      {isLoadingOrder && <OrderDetailsSkeleton />}

      {/* Exibe os dados do pedido quando a requisição é bem-sucedida */}
      {order && (
        // Define um contêiner para as tabelas
        <div className="space-y-6">
          {/* Primeira tabela: informações gerais do pedido */}
          <Table>
            <TableBody>
              <TableRow>
                {/* Linha com o status do pedido */}
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <OrderStatus status={order.status} /> {/* Componente de status */}
                </TableCell>
              </TableRow>
              <TableRow>
                {/* Linha com o nome do cliente */}
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="text-right">{order.customer.name}</TableCell>
              </TableRow>
              <TableRow>
                {/* Linha com o telefone do cliente */}
                <TableCell className="text-muted-foreground">Telefone</TableCell>
                <TableCell className="text-right">
                  {/* Exibe o telefone ou uma mensagem se não informado */}
                  {order.customer.phone ?? (
                    <span className="italic text-muted-foreground">
                      Não informado
                    </span>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                {/* Linha com o e-mail do cliente */}
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="text-right">{order.customer.email}</TableCell>
              </TableRow>
              <TableRow>
                {/* Linha com a data de criação do pedido */}
                <TableCell className="text-muted-foreground">Criado há</TableCell>
                <TableCell className="text-right">
                  {formatDistanceToNow(new Date(order.createdAt), {
                    locale: ptBR, // Define o idioma como português
                    addSuffix: true, // Adiciona sufixo, como "há X dias"
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Segunda tabela: itens do pedido */}
          <Table>
            <TableHeader>
              <TableRow>
                {/* Cabeçalhos da tabela */}
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Renderiza uma linha para cada item do pedido */}
              {order.orderItems.map((orderItem) => {
                return (
                  <TableRow key={orderItem.id}>
                    {/* Coluna com o nome do produto */}
                    <TableCell>{orderItem.product.name}</TableCell>
                    {/* Coluna com a quantidade */}
                    <TableCell className="text-right">{orderItem.quantity}</TableCell>
                    {/* Coluna com o preço formatado em reais */}
                    <TableCell className="text-right">
                      {(orderItem.priceInCents / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                    {/* Coluna com o subtotal (preço * quantidade) formatado em reais */}
                    <TableCell className="text-right">
                      {(
                        (orderItem.priceInCents * orderItem.quantity) / 100
                      ).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                {/* Linha com o total do pedido */}
                <TableCell colSpan={3}>Total do pedido</TableCell>
                <TableCell className="text-right font-medium">
                  {/* Formata o total em reais */}
                  {(order.totalInCents / 100).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </DialogContent>
  );
}
