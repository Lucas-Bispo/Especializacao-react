// Importa os ícones da biblioteca lucide-react
import { Search, X } from 'lucide-react'
// Importa os hooks e utilitários da biblioteca react-hook-form
import { Controller, useForm } from 'react-hook-form'
// Importa os hooks do react-router-dom para manipular parâmetros da URL
import { useSearchParams } from 'react-router-dom'
// Importa a biblioteca zod para validação de esquema
import { z } from 'zod'

// Importa componentes da interface de usuário
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Define o esquema de validação para os filtros, onde todos os campos são opcionais
const ordersFiltersSchema = z.object({
  orderId: z.string().optional(), // ID do pedido
  customerName: z.string().optional(), // Nome do cliente
  status: z.string().optional(), // Status do pedido
})

// Infere o tipo TypeScript a partir do esquema definido
type OrderFiltersSchema = z.infer<typeof ordersFiltersSchema>

// Componente que renderiza o formulário de filtros para pedidos
export function OrderTableFilters() {
  // Hook para acessar e manipular os parâmetros de pesquisa da URL
  const [searchParams, setSearchParams] = useSearchParams()

  // Obtém os parâmetros de pesquisa atuais
  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  // Configura o formulário usando react-hook-form, com valores iniciais baseados nos parâmetros de URL
  const { register, handleSubmit, reset, control } =
    useForm<OrderFiltersSchema>({
      defaultValues: {
        orderId: orderId ?? '', // Se não houver parâmetro, define como string vazia
        customerName: customerName ?? '', // Se não houver parâmetro, define como string vazia
        status: status ?? 'all', // Se não houver parâmetro, define como "all"
      },
    })

  // Função que aplica os filtros baseados nos valores enviados pelo formulário
  function handleFilter(data: OrderFiltersSchema) {
    const orderId = data.orderId?.toString()
    const customerName = data.customerName?.toString()
    const status = data.status?.toString()

    // Atualiza os parâmetros de pesquisa na URL
    setSearchParams((prev) => {
      if (orderId) {
        prev.set('orderId', orderId) // Define o ID do pedido
      } else {
        prev.delete('orderId') // Remove o parâmetro se vazio
      }

      if (customerName) {
        prev.set('customerName', customerName) // Define o nome do cliente
      } else {
        prev.delete('customerName') // Remove o parâmetro se vazio
      }

      if (status) {
        prev.set('status', status) // Define o status
      } else {
        prev.delete('status') // Remove o parâmetro se vazio
      }

      // Reseta a página para 1 sempre que os filtros forem alterados
      prev.set('page', '1')

      return prev
    })
  }

  // Função que limpa todos os filtros
  function handleClearFilters() {
    setSearchParams((prev) => {
      prev.delete('orderId') // Remove o ID do pedido
      prev.delete('customerName') // Remove o nome do cliente
      prev.delete('status') // Remove o status
      prev.set('page', '1') // Reseta a página para 1

      return prev
    })

    // Reseta o formulário para os valores padrão
    reset({
      orderId: '',
      customerName: '',
      status: 'all',
    })
  }

  // Verifica se há algum filtro aplicado
  const hasAnyFilter = !!orderId || !!customerName || !!status

  // Renderiza o formulário de filtros
  return (
    <form
      onSubmit={handleSubmit(handleFilter)} // Função que será executada ao submeter o formulário
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      
      {/* Campo para filtrar pelo ID do pedido */}
      <Input
        placeholder="ID do pedido"
        className="h-8 w-auto"
        {...register('orderId')} // Associa o campo ao react-hook-form
      />
      
      {/* Campo para filtrar pelo nome do cliente */}
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register('customerName')} // Associa o campo ao react-hook-form
      />
      
      {/* Campo para filtrar pelo status do pedido */}
      <Controller
        control={control} // Controlador do react-hook-form
        name="status" // Nome do campo
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              name={name} // Nome do seletor
              onValueChange={onChange} // Atualiza o valor selecionado
              value={value} // Valor atual
              disabled={disabled} // Desativa o seletor, se necessário
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      {/* Botão para aplicar os filtros */}
      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      {/* Botão para remover todos os filtros */}
      <Button
        type="button"
        variant="outline"
        size="xs"
        disabled={!hasAnyFilter} // Desativa o botão se não houver filtros aplicados
        onClick={handleClearFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
