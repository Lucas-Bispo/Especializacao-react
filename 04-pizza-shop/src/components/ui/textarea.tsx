import * as React from "react" 
// Importa todo o módulo do React, que é necessário para criar componentes React e usar hooks.

import { cn } from "@/lib/utils" 
// Importa uma função utilitária chamada `cn` de um arquivo utilitário. Geralmente usada para concatenar classes CSS condicionalmente.

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
// Define uma interface chamada `TextareaProps` que estende as propriedades HTML padrão de um `<textarea>`. 
// Isso garante que todas as propriedades padrão do `<textarea>` estejam disponíveis neste componente.

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    // Define um componente funcional chamado `Textarea` utilizando `React.forwardRef`. 
    // Isso permite encaminhar referências (refs) para o elemento DOM subjacente, neste caso, um `<textarea>`.
    // O componente recebe `className` e outras propriedades (`...props`) como entrada e as passa para o `<textarea>`.

    return (
      <textarea
        className={cn(
          // Aplica uma combinação de classes CSS usando a função `cn`.
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          // Classe padrão que define estilo básico: largura total, borda arredondada, fundo, padding, fonte, entre outros. 
          // Estiliza estados como foco (`focus-visible`) e desabilitado (`disabled`).
          className 
          // Adiciona classes CSS adicionais recebidas pela propriedade `className` (se houver).
        )}
        ref={ref} 
        // Encaminha a referência (ref) passada ao componente para o elemento `<textarea>`.
        {...props} 
        // Desestrutura todas as outras propriedades passadas ao componente e as aplica ao elemento `<textarea>`. 
        // Permite adicionar atributos HTML como `value`, `onChange`, etc.
      />
    )
  }
)
// Finaliza a definição do componente `Textarea`.

Textarea.displayName = "Textarea"
// Define um nome legível para o componente, útil para depuração e ferramentas de desenvolvimento.

export { Textarea }
// Exporta o componente `Textarea` para que possa ser importado e usado em outros arquivos.
