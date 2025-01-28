// Importação de componentes específicos para o dashboard
import { DayOrdersAmountCard } from './day-orders-amount-card' // Exibe o total de pedidos por dia
import { MonthCanceledOrdersAmountCard } from './month-canceled-orders-amount-card' // Exibe o total de pedidos cancelados no mês
import { MonthOrdersAmountCard } from './month-orders-amount-card' // Exibe o total de pedidos no mês
import { MonthReceiptCard } from './month-receipt-card' // Exibe o total de recebimentos no mês
import { PopularProductsChart } from './popular-products-chart' // Exibe gráfico de produtos populares
import { ReceiptChart } from './receipt-chart' // Exibe gráfico de recebimentos

// Função que representa o Dashboard
export function Dashboard() {
  return (
    <>
      {/* Define o título da página como "Dashboard" usando o Helmet */}
      <Helmet title="Dashboard" />
      
      {/* Contêiner principal que organiza o conteúdo do dashboard */}
      <div className="flex flex-col gap-4">
        
        {/* Cabeçalho do dashboard */}
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        {/* Primeira seção com cartões dispostos em uma grid com 4 colunas */}
        <div className="grid grid-cols-4 gap-4">
          {/* Cartões com diferentes informações relacionadas ao mês e aos pedidos */}
          <MonthReceiptCard /> {/* Cartão de Recebimentos do Mês */}
          <MonthOrdersAmountCard /> {/* Cartão de Total de Pedidos no Mês */}
          <DayOrdersAmountCard /> {/* Cartão de Total de Pedidos por Dia */}
          <MonthCanceledOrdersAmountCard /> {/* Cartão de Pedidos Cancelados no Mês */}
        </div>

        {/* Segunda seção com gráficos dispostos em uma grid com 9 colunas */}
        <div className="grid grid-cols-9 gap-4">
          {/* Gráficos de recebimentos e produtos populares */}
          <ReceiptChart /> {/* Gráfico de Recebimentos */}
          <PopularProductsChart /> {/* Gráfico de Produtos Populares */}
        </div>
      </div>
    </>
  )
}
