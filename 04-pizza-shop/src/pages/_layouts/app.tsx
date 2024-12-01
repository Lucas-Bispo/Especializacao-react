// Importa a função `isAxiosError` da biblioteca Axios para verificar se um erro é do tipo Axios.
import { isAxiosError } from 'axios'

// Importa o hook `useLayoutEffect` do React para lidar com efeitos que precisam ser executados
// sincronicamente após a renderização do layout.
import { useLayoutEffect } from 'react'

// Importa componentes da biblioteca React Router, incluindo `Outlet` para renderizar rotas aninhadas
// e `useNavigate` para programaticamente navegar entre rotas.
import { Outlet, useNavigate } from 'react-router-dom'

// Importa o componente de cabeçalho personalizado da aplicação.
import { Header } from '@/components/header'

// Importa uma instância configurada do Axios usada para realizar chamadas HTTP.
import { api } from '@/lib/axios'

// Define o componente `AppLayout`, responsável por estruturar a interface da aplicação.
export function AppLayout() {
  // Obtém a função `navigate` do React Router para redirecionamento de rotas.
  const navigate = useNavigate()

  // Utiliza o hook `useLayoutEffect` para configurar efeitos relacionados ao layout.
  // Neste caso, é usado para configurar um interceptor de resposta do Axios.
  useLayoutEffect(() => {
    // Adiciona um interceptor de resposta na instância do Axios.
    const interceptorId = api.interceptors.response.use(
      (response) => response, // Retorna a resposta normalmente se não houver erro.
      (error) => {
        // Verifica se o erro capturado é do tipo Axios.
        if (isAxiosError(error)) {
          // Obtém o status HTTP e o código do erro da resposta.
          const status = error.response?.status
          const code = error.response?.data.code

          // Se o status for 401 (não autorizado) e o código específico for 'UNAUTHORIZED',
          // redireciona o usuário para a página de login ('/sign-in').
          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('/sign-in', {
              replace: true, // Substitui a rota atual no histórico para evitar retorno.
            })
          }
        }

        // Propaga o erro para ser tratado em outro lugar, se necessário.
        return Promise.reject(error)
      },
    )

    // Limpa o interceptor configurado quando o componente for desmontado.
    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate]) // Adiciona `navigate` como dependência para garantir que o hook reaja a mudanças na função.

  // Renderiza a estrutura principal do layout da aplicação.
  return (
    <div className="flex min-h-screen flex-col antialiased">
      {/* Renderiza o componente de cabeçalho. */}
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        {/* Renderiza as rotas aninhadas definidas na configuração do React Router. */}
        <Outlet />
      </div>
    </div>
  )
}
