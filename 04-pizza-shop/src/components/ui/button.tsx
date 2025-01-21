import { Slot } from '@radix-ui/react-slot'
// Importa o componente `Slot` da biblioteca Radix UI. Ele permite substituir o elemento principal de um componente por outro definido pelo usuário.

import { cva, type VariantProps } from 'class-variance-authority'
// Importa `cva`, uma função para gerenciar variações de classes CSS com base em opções de configuração.
// `VariantProps` é um tipo que extrai as propriedades de variantes definidas em `cva`.

import * as React from 'react'
// Importa todo o módulo do React, necessário para criar componentes React e utilizar hooks.

import { cn } from '@/lib/utils'
// Importa uma função utilitária chamada `cn`, normalmente usada para concatenar classes CSS de forma condicional.

const buttonVariants = cva(
  // Cria um gerenciador de variações de classes CSS para o botão.
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  // Define as classes CSS padrão para o botão, que incluem:
  // - Layout flexível, centralização de itens, espaçamento do texto.
  // - Estilização de bordas, tamanhos de fonte e anéis de foco.
  // - Transições de cores e estados desabilitados.
  {
    variants: {
      // Define as variações do botão, como estilos (`variant`) e tamanhos (`size`).
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        // Variante padrão com fundo e texto primário e um hover mais escuro.

        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        // Variante para ações destrutivas, com cores específicas.

        success:
          'bg-emerald-500 text-white hover:bg-emerald-500/90 dark:bg-emerald-600 dark:hover:bg-emerald-600/80',
        // Variante de sucesso, com verde para fundo e texto branco.

        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        // Variante com borda e fundo transparente, destacando ao passar o mouse.

        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        // Variante secundária, com cores alternativas.

        ghost: 'hover:bg-accent hover:text-accent-foreground',
        // Variante fantasma, com apenas hover para destacar.

        link: 'text-primary underline-offset-4 hover:underline',
        // Variante de link, com sublinhado ao passar o mouse.
      },
      size: {
        // Define os tamanhos disponíveis para o botão.
        default: 'h-10 px-4 py-2',
        // Tamanho padrão com altura e padding médios.

        sm: 'h-9 rounded-md px-3',
        // Tamanho pequeno, com altura e padding reduzidos.

        xs: 'h-8 rounded-md px-2.5',
        // Tamanho extra pequeno.

        xxs: 'h-6 rounded-md px-2',
        // Tamanho muito pequeno, útil para botões compactos.

        lg: 'h-11 rounded-md px-8',
        // Tamanho grande, com maior altura e padding.

        icon: 'h-10 w-10',
        // Tamanho para ícones, com altura e largura iguais.
      },
    },
    defaultVariants: {
      // Define as variantes padrão, usadas quando nenhuma variação é especificada.
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
// Define a interface `ButtonProps` para o componente `Button`.
// - Estende as propriedades HTML padrão de um botão.
// - Inclui propriedades de variantes geradas por `cva`.
// - Adiciona a propriedade `asChild`, que permite substituir o botão por outro componente.

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  // Cria o componente `Button` utilizando `React.forwardRef`, que permite encaminhar referências ao elemento subjacente.
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Desestrutura as propriedades recebidas: `className`, `variant`, `size`, `asChild` e outras.

    const Comp = asChild ? Slot : 'button'
    // Define o componente base a ser renderizado. Se `asChild` for `true`, usa `Slot`; caso contrário, usa um `<button>`.

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} 
        // Aplica as classes CSS geradas por `buttonVariants` com base nas variantes especificadas.
        ref={ref} 
        // Encaminha a referência para o componente renderizado.
        {...props} 
        // Propaga as propriedades restantes para o componente renderizado.
      />
    )
  },
)
Button.displayName = 'Button'
// Define um nome legível para o componente, útil para ferramentas de depuração.

export { Button, buttonVariants }
// Exporta o componente `Button` e as variantes de estilo `buttonVariants`.
