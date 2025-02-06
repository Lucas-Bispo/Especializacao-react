// Importa os hooks do React: createContext, useContext, useEffect e useState
import { createContext, useContext, useEffect, useState } from 'react'

// Define o tipo 'Theme' que pode ser 'dark', 'light' ou 'system' (tema do sistema)
type Theme = 'dark' | 'light' | 'system'

// Define as propriedades que o ThemeProvider pode receber
type ThemeProviderProps = {
  children: React.ReactNode // Os componentes filhos que serão renderizados dentro do ThemeProvider
  defaultTheme?: Theme // O tema padrão a ser usado, se não definido, será 'system'
  storageKey?: string // A chave para armazenar o tema no localStorage
}

// Define o estado do ThemeProvider, com o tema atual e a função para definir o tema
type ThemeProviderState = {
  theme: Theme // O tema atual
  setTheme: (theme: Theme) => void // Função para alterar o tema
}

// Estado inicial com tema 'system' e uma função vazia para 'setTheme'
const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

// Cria o contexto para o ThemeProvider, com o estado inicial
const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// Função que cria o ThemeProvider, o provedor do contexto de tema
export function ThemeProvider({
  children, // Componentes filhos
  defaultTheme = 'system', // Tema padrão, caso não seja passado
  storageKey = 'vite-ui-theme', // Chave no localStorage onde o tema será salvo
  ...props // Outras propriedades que podem ser passadas
}: ThemeProviderProps) {
  // Inicializa o estado do tema a partir do localStorage ou do tema padrão
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  )

  // Efeito colateral que atualiza a classe do documento com o tema selecionado
  useEffect(() => {
    const root = window.document.documentElement // Obtém o elemento raiz (<html>)

    // Remove as classes 'light' e 'dark' do elemento raiz
    root.classList.remove('light', 'dark')

    // Se o tema for 'system', verifica o tema preferido pelo sistema
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches // Verifica se o sistema prefere o modo escuro
        ? 'dark'
        : 'light'

      // Adiciona a classe correspondente ao tema do sistema
      root.classList.add(systemTheme)
      return
    }

    // Caso contrário, adiciona a classe do tema explicitamente (escuro ou claro)
    root.classList.add(theme)
  }, [theme]) // O efeito é executado sempre que o tema mudar

  // Define o valor do contexto, incluindo o tema e a função de atualização do tema
  const value = {
    theme, // O tema atual
    setTheme: (theme: Theme) => {
      // Armazena o tema no localStorage
      localStorage.setItem(storageKey, theme)
      // Atualiza o estado do tema
      setTheme(theme)
    },
  }

  // Retorna o provedor do contexto, passando o valor do tema para os filhos
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children} {/* Renderiza os filhos dentro do provedor */}
    </ThemeProviderContext.Provider>
  )
}

// Hook personalizado que permite acessar o contexto de tema
export const useTheme = () => {
  // Obtém o contexto de tema
  const context = useContext(ThemeProviderContext)

  // Se o contexto não estiver disponível, lança um erro (garante que o hook seja usado dentro do ThemeProvider)
  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  // Retorna o contexto (o tema atual e a função para mudar o tema)
  return context
}
