// Importação de ícones da biblioteca 'lucide-react' para navegação entre páginas
import {
    ChevronLeft, // Ícone para "voltar uma página"
    ChevronRight, // Ícone para "ir para a próxima página"
    ChevronsLeft, // Ícone para "voltar para a primeira página"
    ChevronsRight, // Ícone para "ir para a última página"
  } from 'lucide-react'
  
  // Importação do componente de botão personalizado
  import { Button } from './ui/button'
  
  // Definição da interface das propriedades que o componente Pagination aceita
  interface PaginationProps {
    pageIndex: number // Índice da página atual (começa de 0)
    totalCount: number // Número total de itens
    perPage: number // Número de itens por página
    onPageChange: (pageIndex: number) => Promise<void> | void // Função para lidar com a troca de página
  }
  
  // Componente funcional para exibir a paginação
  export function Pagination({
    pageIndex, // Página atual
    totalCount, // Total de itens
    perPage, // Itens por página
    onPageChange, // Callback para troca de página
  }: PaginationProps) {
    // Calcula o número total de páginas com base no total de itens e no número de itens por página
    const pages = Math.floor(totalCount / perPage) || 1
  
    return (
      <div className="flex items-center justify-between">
        {/* Exibição do total de itens */}
        <span className="text-sm text-muted-foreground">
          Total de {totalCount} item(s)
        </span>
  
        <div className="flex items-center space-x-6 lg:space-x-8">
          {/* Exibição do número da página atual e do total de páginas */}
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Página {pageIndex + 1} de {pages}
          </div>
  
          {/* Controles de navegação entre páginas */}
          <div className="flex items-center space-x-2">
            {/* Botão para ir para a primeira página */}
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex" // Escondido em telas pequenas (classe `lg:flex`)
              onClick={() => onPageChange(0)} // Vai para a primeira página (índice 0)
              disabled={pageIndex === 0} // Desativado se já estiver na primeira página
            >
              <span className="sr-only">Primeira página</span> {/* Texto acessível para leitores de tela */}
              <ChevronsLeft className="h-4 w-4" /> {/* Ícone de "primeira página" */}
            </Button>
  
            {/* Botão para voltar uma página */}
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(pageIndex - 1)} // Vai para a página anterior
              disabled={pageIndex === 0} // Desativado se já estiver na primeira página
            >
              <span className="sr-only">Página anterior</span> {/* Texto acessível */}
              <ChevronLeft className="h-4 w-4" /> {/* Ícone de "página anterior" */}
            </Button>
  
            {/* Botão para ir para a próxima página */}
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(pageIndex + 1)} // Vai para a próxima página
              disabled={pages <= pageIndex + 1} // Desativado se já estiver na última página
            >
              <span className="sr-only">Próxima página</span> {/* Texto acessível */}
              <ChevronRight className="h-4 w-4" /> {/* Ícone de "próxima página" */}
            </Button>
  
            {/* Botão para ir para a última página */}
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex" // Escondido em telas pequenas
              onClick={() => onPageChange(pages - 1)} // Vai para a última página
              disabled={pages <= pageIndex + 1} // Desativado se já estiver na última página
            >
              <span className="sr-only">Última página</span> {/* Texto acessível */}
              <ChevronsRight className="h-4 w-4" /> {/* Ícone de "última página" */}
            </Button>
          </div>
        </div>
      </div>
    )
  }
  