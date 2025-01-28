import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import { z } from "zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext.tsx";
import { SearchFormContainer } from "./styles.ts";

// O módulo `zod` é usado para validar os dados do formulário.
// O módulo `phosphor-react` é usado para renderizar um ícone de lupa.
// O módulo `react-hook-form` é usado para criar e manipular formulários.
// O módulo `use-context-selector` é usado para acessar o contexto `TransactionsContext`.

const searchFormSchema = z.object({
  // O campo `query` é um campo de texto que é usado para buscar transações.
  query: z.string(),
});

// O tipo `SearchFormInputs` é o tipo de dados do formulário de busca de transações.
type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  // O hook `useContextSelector` é usado para acessar a função `fetchTransactions` do contexto `TransactionsContext`.
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  );

  // O hook `useForm` é usado para criar e manipular o formulário de busca de transações.
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  // A função `handleSearchTransactions` é usada para buscar transações.
  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  // O componente `SearchFormContainer` é usado para renderizar o formulário de busca de transações.
  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      // O campo de texto `query` é renderizado.
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      // O botão de submit é renderizado.
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
