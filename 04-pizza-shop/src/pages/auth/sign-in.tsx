// Importa o `zodResolver` do pacote '@hookform/resolvers/zod' para usar o Zod como validador para o React Hook Form.
import { zodResolver } from '@hookform/resolvers/zod'

// Importa o hook `useMutation` do React Query para fazer mutações assíncronas, como a autenticação.
import { useMutation } from '@tanstack/react-query'

// Importa o hook `useForm` do React Hook Form para manipulação e validação de formulários.
import { useForm } from 'react-hook-form'

// Importa o hook `useSearchParams` do React Router para acessar parâmetros de busca na URL.
import { useSearchParams } from 'react-router-dom'

// Importa a função `toast` da biblioteca `sonner` para exibir notificações do tipo toast.
import { toast } from 'sonner'

// Importa o `twMerge` da biblioteca `tailwind-merge` para combinar as classes do Tailwind de forma segura e evitar conflitos.
import { twMerge } from 'tailwind-merge'

// Importa o Zod para definir esquemas de validação e inferir tipos com base nesses esquemas.
import { z } from 'zod'

// Importa a função `signIn` que será responsável por autenticar o usuário e os componentes de UI personalizados (Button, Input e Label).
import { signIn } from '@/api/sign-in'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Define um esquema de validação usando o Zod para garantir que o campo de e-mail seja uma string válida e no formato de e-mail.
const signInSchema = z.object({
  email: z.string().email(), // Verifica se o campo 'email' contém um valor válido do tipo string e no formato de e-mail.
})

// Inferir o tipo de dados a partir do esquema `signInSchema`, criando um tipo `SignInSchema` para usar no formulário.
type SignInSchema = z.infer<typeof signInSchema>

// Componente principal de login que irá renderizar o formulário de autenticação.
export function SignIn() {
  // Utiliza o hook `useSearchParams` para obter os parâmetros de consulta da URL, como o e-mail para pré-preencher o campo de e-mail.
  const [searchParams] = useSearchParams()

  // Configura o React Hook Form para gerenciar o estado e a validação do formulário.
  // O resolver usa o `zodResolver` para aplicar o esquema de validação do Zod.
  const {
    register, // Função para registrar os campos do formulário.
    handleSubmit, // Função que lida com a submissão do formulário.
    formState: { isSubmitting }, // Estado indicando se o formulário está sendo submetido.
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema), // Usa o Zod para resolver a validação do formulário.
    defaultValues: {
      email: searchParams.get('email') ?? '', // Define o valor inicial do campo de e-mail, caso um e-mail esteja presente na URL.
    },
  })

  // Configura a mutação para autenticar o usuário usando a função `signIn` da API.
  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn, // Função que será chamada para autenticar o usuário.
  })

  // Função assíncrona que será chamada ao submeter o formulário de login.
  async function handleAuthenticate({ email }: SignInSchema) {
    try {
      // Chama a função de autenticação passando o e-mail inserido no formulário.
      await authenticate({ email })

      // Exibe uma notificação de sucesso com o `toast.success` após a autenticação bem-sucedida.
      // A notificação oferece a opção de reenviar o link de autenticação para o e-mail.
      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Reenviar', // Rótulo do botão de ação.
          onClick: () => authenticate({ email }), // Ação que será executada quando o botão for clicado: reenviar o link.
        },
      })
    } catch (err) {
      // Se a autenticação falhar, exibe uma notificação de erro.
      toast.error('Credenciais inválidas') // Mensagem de erro exibida para o usuário.
    }
  }

  // Renderiza a interface do componente, incluindo o layout do formulário de login.
  return (
    <div className="lg:p-8">
      {/* Link para a página de cadastro (sign-up), posicionado no canto superior direito */}
      <a
        href="/sign-up" // Define o link para a página de cadastro.
        className={twMerge(
          buttonVariants({ variant: 'ghost' }), // Aplica um estilo de botão "ghost" (sem fundo).
          'absolute right-4 top-4 md:right-8 md:top-8', // Posiciona o botão de forma absoluta no canto superior direito, com margens específicas em telas médias (md).
        )}
      >
        Novo estabelecimento
      </a>

      {/* Contêiner principal do formulário, com centralização e responsividade */}
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {/* Cabeçalho do formulário com título e descrição */}
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas vendas pelo painel do parceiro!
          </p>
        </div>

        {/* Formulário de login */}
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(handleAuthenticate)} /* Envia os dados do formulário e chama a função `handleAuthenticate` */>
            <div className="grid gap-4">
              {/* Campo de e-mail */}
              <div className="grid gap-2">
                {/* Rótulo para o campo de e-mail */}
                <Label htmlFor="email">Seu e-mail</Label>
                <Input
                  id="email" // Define o id do campo de entrada para associá-lo ao rótulo.
                  type="email" // Define o tipo de campo como e-mail.
                  autoCapitalize="none" // Desativa a capitalização automática do e-mail.
                  autoComplete="email" // Sugere que o campo seja preenchido automaticamente com o e-mail.
                  autoCorrect="off" // Desativa a correção automática do e-mail.
                  {...register('email')} // Registra o campo 'email' com o React Hook Form para gerenciamento do estado.
                />
              </div>

              {/* Botão de submissão do formulário */}
              <Button type="submit" disabled={isSubmitting}>
                Acessar painel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
