  // Importa todas as funcionalidades do React como um objeto, permitindo o uso de componentes e hooks.
import * as React from 'react'

// Importa uma função utilitária personalizada chamada "cn" do diretório especificado.
// Essa função geralmente é usada para unir classes CSS dinamicamente.
import { cn } from '@/lib/utils'

// Define um tipo chamado "InputProps" que estende os atributos padrão de um elemento HTML <input>.
// Isso permite passar qualquer propriedade nativa de <input> ao componente personalizado.
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

// Cria um componente funcional "Input" usando React.forwardRef.
// React.forwardRef é usado para repassar referências (refs) para o elemento DOM nativo.
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  // O componente recebe "props", incluindo uma classe CSS opcional, o tipo do input, e outras propriedades.
  ({ className, type, ...props }, ref) => {
    return (
      // Retorna um elemento HTML <input> estilizado.
      <input
        // Define o tipo do input, que pode ser "text", "password", etc.
        type={type}
        // Define as classes CSS do elemento, combinando classes padrão e personalizadas (passadas via "className").
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className, // Adiciona classes adicionais, se fornecidas como prop.
        )}
        // Atribui a referência externa ao elemento <input>.
        ref={ref}
        // Passa todas as outras propriedades para o elemento <input>.
        {...props}
      />
    )
  },
)

// Define um nome de exibição para o componente.
// Isso é útil para depuração e ferramentas como React DevTools.
Input.displayName = 'Input'

// Exporta o componente Input para que possa ser usado em outros lugares.
export { Input }
