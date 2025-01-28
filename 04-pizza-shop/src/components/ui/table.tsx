import * as React from "react"
// Importa o React e todos os seus métodos como um único objeto, permitindo o uso de funcionalidades do React.

import { cn } from "@/lib/utils"
// Importa a função `cn` do módulo utilitário, usada para combinar classes de CSS condicionalmente.

const Table = React.forwardRef<
  HTMLTableElement, 
  React.HTMLAttributes<HTMLTableElement>
>(
  // Cria um componente `Table` usando `React.forwardRef`, que permite encaminhar a referência para o elemento DOM nativo.
  ({ className, ...props }, ref) => (
    // Recebe as propriedades `className` e quaisquer outras (`...props`) passadas para o componente.
    <div className="relative w-full overflow-auto">
      // Envolve a tabela em um contêiner `div` que permite rolagem horizontal, garantindo que ela seja responsiva.
      <table
        ref={ref}
        // Encaminha a referência para o elemento `<table>`.
        className={cn("w-full caption-bottom text-sm", className)}
        // Define classes de estilo padrão para a tabela e permite adicionar classes adicionais via `className`.
        {...props}
        // Espalha todas as propriedades restantes no elemento `<table>`.
      />
    </div>
  )
)
Table.displayName = "Table"
// Define um nome para o componente, útil para depuração no React DevTools.

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(
  // Cria o componente `TableHeader`, representando o cabeçalho da tabela (`<thead>`).
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
    // Adiciona classes padrão e passa as propriedades para o elemento `<thead>`.
  )
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(
  // Cria o componente `TableBody`, representando o corpo da tabela (`<tbody>`).
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      // Adiciona estilos padrão para remover a borda inferior do último `<tr>` e aplica classes adicionais.
      {...props}
    />
  )
)
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(
  // Cria o componente `TableFooter`, representando o rodapé da tabela (`<tfoot>`).
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
)
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(
  // Cria o componente `TableRow`, representando uma linha da tabela (`<tr>`).
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      // Define classes padrão para estilos e interações, como hover e estado selecionado.
      {...props}
    />
  )
)
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(
  // Cria o componente `TableHead`, representando uma célula de cabeçalho (`<th>`).
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      // Aplica classes padrão, incluindo estilos específicos para células contendo caixas de seleção.
      {...props}
    />
  )
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(
  // Cria o componente `TableCell`, representando uma célula de tabela comum (`<td>`).
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
      // Define classes padrão e aplica classes adicionais passadas pelo usuário.
      {...props}
    />
  )
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(
  // Cria o componente `TableCaption`, representando a legenda da tabela (`<caption>`).
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      // Aplica estilos padrão para a legenda e permite adicionar classes personalizadas.
      {...props}
    />
  )
)
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
// Exporta todos os componentes relacionados à tabela, permitindo sua reutilização em outros arquivos.

