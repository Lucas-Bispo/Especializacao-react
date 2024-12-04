// Importação de hooks e ícones necessários
import { useQuery } from '@tanstack/react-query' // Hook para fazer requisições assíncronas
import { DollarSign, Loader2 } from 'lucide-react' // Ícones para exibição de estado de carregamento e valor

// Função que realiza a requisição para obter a receita do mês
import { getMonthReceipt } from '@/api/get-month-receipt'

// Componentes de UI, como o Card para estruturação visual
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Importação do esqueleto de carregamento do cartão
import { CardSkeleton } from './card-skeleton'

// Função que representa o cartão de receita do mês
export function MonthReceiptCard() {
  // Usando o hook 'useQuery' para buscar a receita do mês
  const { data: monthReceipt, isFetching: isLoadingMonthReceipt } = useQuery({
    queryKey: ['metrics', 'month-receipt'], // Definição da chave única da query
    queryFn: getMonthReceipt, // Função que faz a requisição para buscar a receita
  })

  return (
    <Card>
      {/* Cabeçalho do cartão */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {/* Título do cartão */}
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        {/* Exibindo o ícone de carregamento enquanto os dados estão sendo buscados */}
        {isLoadingMonthReceipt ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> // Ícone de carregamento
        ) : (
          <DollarSign className="h-4 w-4 text-muted-foreground" /> // Ícone de valor monetário
        )}
      </CardHeader>
      
      {/* Corpo do cartão, onde os dados ou o esqueleto de carregamento serão exibidos */}
      <CardContent className="space-y-1">
        {/* Se os dados da receita do mês estão disponíveis, exibe-os */}
        {monthReceipt ? (
          <>
            {/* Exibe o valor da receita formatado como moeda */}
            <span className="text-2xl font-bold">
              {monthReceipt.receipt.toLocaleString('pt-BR', {
                currency: 'BRL',
                style: 'currency',
              })}
            </span>
            {/* Exibe a diferença da receita em relação ao mês anterior */}
            <p className="text-xs text-muted-foreground">
              <span
                className={ // Estilo condicional com base no valor da diferença
                  monthReceipt.diffFromLastMonth > 0
                    ? 'text-emerald-500' // Se a diferença for positiva, exibe em verde
                    : 'text-red-500' // Se for negativa, exibe em vermelho
                }
              >
                {monthReceipt.diffFromLastMonth > 0
                  ? `+${monthReceipt.diffFromLastMonth}` // Exibe o valor positivo com sinal de +
                  : monthReceipt.diffFromLastMonth} {/* Exibe o valor negativo sem sinal de + */}
                %
              </span>{' '}
              em relação ao mês passado
            </p>
          </>
        ) : (
          // Caso os dados ainda não tenham sido carregados, exibe o esqueleto de carregamento
          <CardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
