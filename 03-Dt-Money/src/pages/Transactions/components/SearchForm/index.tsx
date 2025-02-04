// Importa o ícone `MagnifyingGlass` do pacote `phosphor-react`, usado para representar visualmente a busca.
import { MagnifyingGlass } from 'phosphor-react';

// Importa o hook `useForm` do pacote `react-hook-form`, usado para gerenciar formulários React de forma eficiente.
import { useForm } from 'react-hook-form';

// Importa o componente estilizado `SearchFormContainer` do arquivo `./styles`.
import { SearchFormContainer } from './styles';

// Importa o pacote `zod` para definir e validar esquemas de dados.
import * as z from 'zod';

// Importa o `zodResolver` do pacote `@hookform/resolvers/zod`, que integra o Zod com o React Hook Form.
import { zodResolver } from '@hookform/resolvers/zod';

// Importa o contexto `TransactionsContext`, que fornece métodos para manipular transações.
import { TransactionsContext } from '../../../../contexts/TransactionsContext';

// Importa o hook `useContextSelector` do pacote `use-context-selector`, que permite selecionar partes específicas de um contexto.
import { useContextSelector } from 'use-context-selector';

// Define o esquema de validação para o formulário de busca usando o Zod.
const searchFormSchema = z.object({
  query: z.string(), // Campo obrigatório para a consulta de busca (pode ser uma string vazia).
});

// Inferimos o tipo TypeScript a partir do esquema Zod para garantir tipagem segura no formulário.
type SearchFormInputs = z.infer<typeof searchFormSchema>;

// Define o componente funcional `SearchForm`, que representa o formulário de busca de transações.
export function SearchForm() {
  // Usa o `useContextSelector` para acessar a função `fetchTransactions` do contexto `TransactionsContext`.
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions; // Seleciona apenas a função `fetchTransactions` do contexto.
    },
  );

  // Configura o formulário usando o React Hook Form com validação baseada no esquema Zod.
  const {
    register, // Registra os campos do formulário.
    handleSubmit, // Função para lidar com o envio do formulário.
    formState: { isSubmitting }, // Estado do formulário (ex.: se está sendo submetido).
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema), // Integra o Zod com o React Hook Form.
  });

  // Função assíncrona para lidar com a busca de transações.
  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query); // Chama a função `fetchTransactions` com o termo de busca.
  }

  return (
    // O `SearchFormContainer` é um componente estilizado que envolve todo o formulário de busca.
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      {/* Campo de entrada para o termo de busca. */}
      <input
        type="text"
        placeholder="Busque por transações" // Placeholder para orientar o usuário.
        {...register('query')} // Registra o campo no React Hook Form.
      />

      {/* Botão de envio do formulário. */}
      <button type="submit" disabled={isSubmitting}>
        {/* Ícone de lupa para representar a busca. */}
        <MagnifyingGlass size={20} />
        Buscar {/* Texto do botão. */}
      </button>
    </SearchFormContainer>
  );
}