import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { MagnifyingGlass } from "phosphor-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TransactionsContext } from "../../contexts/TransactionsContext.tsx";
import { SearchFormContainer } from "./styles.ts";

// O componente `SearchForm` é usado para criar um formulário de busca de transações.

const searchFormSchema = z.object({
  // O campo `query` é um campo de texto que é usado para buscar transações.
  query: z.string(),
});

// O tipo `SearchFormInputs` é o tipo de dados do formulário de busca de transações.
type SearchFormInputs = z.infer<typeof searchFormSchema>;

// O componente `SearchForm` recebe o contexto `TransactionsContext` como um prop.
// O contexto `TransactionsContext` fornece uma função para buscar transações.
export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext);

  // O componente `useForm` é usado para criar um formulário.
  // O formulário é composto por um campo de texto para a consulta de busca e um botão de submit.
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    // O resolver `zodResolver` é usado para resolver o esquema Zod do formulário.
    resolver: zodResolver(searchFormSchema),
  });

  // A função `handleSearchTransactions` é usada para buscar transações.
  async function handleSearchTransactions(data: SearchFormInputs) {
    // A função `fetchTransactions` é usada para buscar transações.
    await fetchTransactions(data.query);
  }

  // O componente `SearchFormContainer` é usado para renderizar o formulário de busca de transações.
  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      // O campo de texto para a consulta de busca é renderizado.
      <input type="text" placeholder="Busque por transações" {...register('query')} />
      // O botão de submit é renderizado.
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
