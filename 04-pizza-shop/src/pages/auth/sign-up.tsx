// Importa o resolvedor Zod, usado para conectar a validação do esquema ao React Hook Form
import { zodResolver } from '@hookform/resolvers/zod'

// Importa o hook useMutation do React Query, que gerencia requisições assíncronas (mutações de dados)
import { useMutation } from '@tanstack/react-query'

// Importa o hook useForm, responsável por gerenciar o estado e o funcionamento do formulário
import { useForm } from 'react-hook-form'

// Importa o hook useNavigate, usado para navegar entre rotas no React Router
import { useNavigate } from 'react-router-dom'

// Importa a biblioteca Sonner, utilizada para exibir notificações visuais
import { toast } from 'sonner'

// Importa a função twMerge, que combina classes Tailwind, permitindo personalização de estilos
import { twMerge } from 'tailwind-merge'

// Importa o Zod, uma biblioteca de validação de esquemas e dados
import { z } from 'zod'

// Importa a função RegisterRestaurant, que faz uma chamada à API para registrar um restaurante
import { RegisterRestaurant } from '@/api/register-restaurant'

// Importa componentes reutilizáveis de interface, como botões, inputs e labels
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Define o esquema de validação do formulário usando Zod
const signUpSchema = z.object({
  // Valida o campo "restaurantName" como uma string
  restaurantName: z.string(),
  // Valida o campo "managerName" como uma string
  managerName: z.string(),
  // Valida o campo "phone" como uma string
  phone: z.string(),
  // Valida o campo "email" como uma string e verifica se está no formato de e-mail
  email: z.string().email(),
})

// Cria um tipo TypeScript automaticamente baseado no esquema Zod definido acima
type SignUpSchema = z.infer<typeof signUpSchema>

// Componente funcional principal para o formulário de cadastro de restaurante
export function SignUp() {
  // Hook para navegação entre páginas do aplicativo
  const navigate = useNavigate()

  // Inicializa o formulário, conectando-o ao esquema de validação e gerenciando seu estado
  const {
    register, // Registra os campos do formulário para coleta e validação de dados
    handleSubmit, // Função usada para processar o envio do formulário
    formState: { isSubmitting }, // Fornece informações sobre o estado atual do formulário (ex.: se está sendo submetido)
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema), // Usa o esquema Zod para validação do formulário
  })

  // Configura a mutação para registrar um restaurante usando React Query
  const { mutateAsync: registerRestaurant } = useMutation({
    mutationFn: RegisterRestaurant, // Define a função de mutação que realiza a chamada para registrar o restaurante
  })

  // Função assíncrona chamada ao submeter o formulário
  async function handleRegisteRestaurant({
    restaurantName, // Nome do restaurante fornecido no formulário
    managerName, // Nome do responsável fornecido no formulário
    email, // E-mail fornecido no formulário
    phone, // Telefone fornecido no formulário
  }: SignUpSchema) {
    try {
      // Chama a função de mutação para enviar os dados para o backend
      await registerRestaurant({ restaurantName, managerName, email, phone })

      // Exibe uma notificação de sucesso informando que o restaurante foi cadastrado
      toast.success('Restaurante cadastrado!', {
        action: {
          label: 'Login', // Adiciona uma ação para navegar até a página de login
          onClick: () => {
            navigate(`/sign-in?email=${email}`) // Redireciona o usuário para a página de login com o e-mail preenchido
          },
        },
      })
    } catch (err) {
      // Exibe uma notificação de erro caso a operação falhe
      toast.error('Erro ao registrar restaurante!')
    }
  }

  // Retorna o JSX que renderiza o formulário e a interface do usuário
  return (
    <div className="lg:p-8">
      {/* Link de navegação para a página de login */}
      <a
        href="/sign-in"
        className={twMerge(
          buttonVariants({ variant: 'ghost' }), // Estilo de botão "ghost" (transparente)
          'absolute right-4 top-4 md:right-8 md:top-8' // Posiciona o botão no canto superior direito
        )}
      >
        Fazer login
      </a>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {/* Seção de introdução com título e descrição */}
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Seja um parceiro <span className="font-semibold">pizza.shop</span> e comece suas vendas!
          </p>
        </div>
        {/* Formulário de cadastro */}
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(handleRegisteRestaurant)}>
            {/* Campos do formulário */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome do negócio</Label>
                <Input
                  id="name"
                  type="text"
                  autoCorrect="off"
                  {...register('restaurantName')} // Conecta o campo ao formulário para validação e coleta de dados
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="managerName">Seu nome</Label>
                <Input
                  id="managerName"
                  type="text"
                  autoCorrect="off"
                  {...register('managerName')} // Conecta o campo ao formulário para validação e coleta de dados
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Seu e-mail</Label>
                <Input
                  id="email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  {...register('email')} // Conecta o campo ao formulário para validação e coleta de dados
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Celular</Label>
                <Input
                  id="phone"
                  placeholder="(99) 99999-9999"
                  type="tel"
                  {...register('phone')} // Conecta o campo ao formulário para validação e coleta de dados
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Finalizar cadastro
              </Button>
            </div>
          </form>
        </div>
        {/* Informações de termos e políticas */}
        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
          Ao continuar, você concorda com nossos{' '}
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Termos de serviço
          </a>{' '}
          e{' '}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Políticas de privacidade
          </a>.
        </p>
      </div>
    </div>
  )
}