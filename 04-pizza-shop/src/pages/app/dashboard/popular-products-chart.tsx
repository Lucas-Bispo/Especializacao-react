// Importa os hooks e componentes necessários de várias bibliotecas
import { useQuery } from '@tanstack/react-query' // Hook para gerenciar estados de consulta de dados
import { Loader2 } from 'lucide-react' // Ícone para indicar carregamento
import {
  BarChart, // Ícone para título da seção
  Cell, // Representa cada fatia do gráfico
  Pie, // Gráfico de pizza
  PieChart, // Contêiner do gráfico de pizza
  ResponsiveContainer, // Contêiner para tornar o gráfico responsivo
  Tooltip, // Exibe informações adicionais no hover
  TooltipProps, // Tipos para propriedades do Tooltip
} from 'recharts'
import colors from 'tailwindcss/colors' // Paleta de cores do Tailwind CSS

// Importa função para buscar dados e componentes auxiliares
import { getPopularProducts } from '@/api/get-popular-products' // Função que obtém os produtos mais populares
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card' // Componentes estilizados para o layout

// Componente para criar um Tooltip customizado no gráfico
function CustomTooltip({ active, payload }: TooltipProps<number, number>) {
  // Se o Tooltip está ativo e há dados, exibe as informações
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-2 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <span className="text-base font-semibold">{payload[0].name}</span>
        <div className="flex flex-col gap-1">
          <span>
            <span className="font-semibold">Vendas:</span> {payload[0].value}
          </span>
        </div>
      </div>
    )
  }

  // Caso contrário, não exibe nada
  return null
}

// Define um array com cores personalizadas para as fatias do gráfico
const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
]

// Componente principal que renderiza o gráfico de produtos populares
export function PopularProductsChart() {
  // Usa o hook `useQuery` para buscar dados dos produtos populares
  const { data: popularProducts, isFetching: isLoadingPopularProducts } =
    useQuery({
      queryKey: ['metrics', 'popular-products'], // Chave única para cache
      queryFn: getPopularProducts, // Função que obtém os dados
    })

  return (
    // Cartão que envolve o gráfico
    <Card className="col-span-3">
      {/* Cabeçalho do cartão */}
      <CardHeader className="pb-8">
        <div className="flex flex-row items-center justify-between">
          {/* Título do gráfico */}
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            Produtos populares
            {/* Ícone de carregamento enquanto os dados estão sendo buscados */}
            {isLoadingPopularProducts && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
        {/* Descrição do conteúdo */}
        <CardDescription>Os 5 produtos com mais vendas</CardDescription>
      </CardHeader>

      {/* Conteúdo do cartão */}
      <CardContent>
        {popularProducts ? (
          // Gráfico de pizza com os dados
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 14 }}>
              <Pie
                data={popularProducts} // Dados para o gráfico
                dataKey="amount" // Chave para o valor das fatias
                nameKey="product" // Nome de cada fatia
                cx="50%" // Posição X do centro
                cy="50%" // Posição Y do centro
                outerRadius={86} // Raio externo
                innerRadius={64} // Raio interno
                strokeWidth={8} // Largura da borda
                fill={colors.emerald['500']} // Cor padrão das fatias
                label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                  const RADIAN = Math.PI / 180
                  const radius = 12 + innerRadius + (outerRadius - innerRadius)
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {/* Limita o nome do produto a 12 caracteres */}
                      {popularProducts[index].product
                        .substring(0, 12)
                        .concat('...')}{' '}
                      ({value})
                    </text>
                  )
                }}
                labelLine={false} // Remove a linha do rótulo
              >
                {/* Define as cores das fatias do gráfico */}
                {popularProducts.map((_, index) => {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="stroke-background hover:opacity-80"
                    />
                  )
                })}
              </Pie>

              {/* Tooltip customizado */}
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          // Exibe um ícone de carregamento enquanto os dados não chegam
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
