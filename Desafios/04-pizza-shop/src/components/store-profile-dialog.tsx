// Importando dependências necessárias
import { zodResolver } from '@hookform/resolvers/zod' // Usado para integrar o Zod com o React Hook Form
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query' // Usado para manipulação de dados assíncronos e cache
import { useForm } from 'react-hook-form' // Usado para gerenciamento do estado dos formulários
import { toast } from 'sonner' // Biblioteca para exibição de notificações (toast)
import { z } from 'zod' // Usado para validação de esquema (schemas)

// Importando funções e componentes para interagir com a API e UI
import {
  getManagedRestaurant, // Função para buscar o restaurante gerenciado
  GetManagedRestaurantResponse, // Tipo de dado para a resposta da API de restaurante gerenciado
} from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile' // Função para atualizar o perfil do restaurante

// Importação de componentes UI customizados
import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

// Definindo o esquema de validação do formulário usando Zod
const storeProfileSchema = z.object({
  name: z.string().min(1), // Nome não pode ser vazio
  description: z.string().nullable(), // Descrição pode ser nula
})

// Tipo derivado do esquema de validação
type StoreProfileSchema = z.infer<typeof storeProfileSchema>

// Componente principal para o diálogo de edição do perfil da loja
export function StoreProfileDialog() {
  const queryClient = useQueryClient() // Instância do client para manipular o cache de consultas

  // Consulta para buscar as informações do restaurante gerenciado
  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity, // Nunca considerar as informações como obsoletas
  })

  // Configuração do hook de formulário para lidar com dados de entrada do usuário
  const {
    register, // Função para registrar os campos do formulário
    handleSubmit, // Função para submeter o formulário
    formState: { isSubmitting }, // Estado do formulário (indicando se está sendo enviado)
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema), // Integração com Zod para validação
    values: {
      name: managedRestaurant?.name ?? '', // Valor inicial do campo 'name'
      description: managedRestaurant?.description ?? '', // Valor inicial do campo 'description'
    },
  })

  // Mutation para atualizar o perfil do restaurante
  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile, // Função de atualização do perfil
    onMutate({ description, name }) {
      // Antes de fazer a mutação, atualizamos o cache para otimizar a experiência do usuário
      const { cached } = updateManagedRestaurantCache({ description, name })
      return { previousProfile: cached } // Retorna o estado anterior do perfil para possibilitar rollback em caso de erro
    },
    onError(_, __, context) {
      // Em caso de erro, restauramos o estado anterior do perfil
      if (context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile)
      }
    },
  })

  // Função que atualiza o cache de restaurante gerenciado
  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreProfileSchema) {
    // Obtém os dados do restaurante gerenciado do cache
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    // Se os dados estiverem no cache, atualizamos com as novas informações
    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(['managed-restaurant'], {
        ...cached,
        name,
        description,
      })
    }

    return { cached }
  }

  // Função chamada quando o formulário é enviado
  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      // Chama a mutação para atualizar o perfil
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      // Exibe uma mensagem de sucesso
      toast.success('Perfil atualizado com sucesso!')
    } catch {
      // Exibe uma mensagem de erro caso a atualização falhe
      toast.error('Falha ao atualizar o perfil, tente novamente')
    }
  }

  // Renderizando o componente do diálogo para edição do perfil
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      {/* Formulário para editar as informações da loja */}
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          {/* Campo para o nome da loja */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>

          {/* Campo para a descrição da loja */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>

        {/* Rodapé do diálogo com botões */}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
