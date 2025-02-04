// Importa o `zodResolver` do pacote `@hookform/resolvers/zod`, que integra o Zod (validação de esquemas) com o React Hook Form.
import { zodResolver } from '@hookform/resolvers/zod';

// Importa componentes do pacote `@radix-ui/react-dialog`, uma biblioteca para criar modais acessíveis e personalizáveis.
import * as Dialog from '@radix-ui/react-dialog';

// Importa ícones do pacote `phosphor-react` para serem usados no modal.
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';

// Importa hooks do `react-hook-form` para gerenciar formulários React de forma eficiente.
import { Controller, useForm } from 'react-hook-form';

// Importa o hook `useContextSelector` do pacote `use-context-selector`, que permite selecionar partes específicas de um contexto.
import { useContextSelector } from 'use-context-selector';

// Importa o pacote `zod` para definir e validar esquemas de dados.
import * as z from 'zod';

// Importa o contexto `TransactionsContext`, que fornece métodos para manipular transações.
import { TransactionsContext } from '../../contexts/TransactionsContext';

// Importa componentes estilizados do arquivo `./styles`.
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles';

// Define o esquema de validação para o formulário de nova transação usando o Zod.
const newTransactionFormSchema = z.object({
  description: z.string(), // Campo obrigatório para a descrição da transação.
  price: z.number(), // Campo obrigatório para o preço da transação.
  category: z.string(), // Campo obrigatório para a categoria da transação.
  type: z.enum(['income', 'outcome']), // Campo obrigatório para o tipo da transação (entrada ou saída).
});

// Inferimos o tipo TypeScript a partir do esquema Zod para garantir tipagem segura no formulário.
type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

// Define o componente funcional `NewTransactionModal`, que representa o modal de criação de novas transações.
export function NewTransactionModal() {
  // Usa o `useContextSelector` para acessar a função `createTransaction` do contexto `TransactionsContext`.
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction; // Seleciona apenas a função `createTransaction` do contexto.
    },
  );

  // Configura o formulário usando o React Hook Form com validação baseada no esquema Zod.
  const {
    control, // Usado para campos controlados (como o campo de tipo de transação).
    register, // Registra os campos do formulário.
    handleSubmit, // Função para lidar com o envio do formulário.
    formState: { isSubmitting }, // Estado do formulário (ex.: se está sendo submetido).
    reset, // Função para resetar o formulário após o envio.
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema), // Integra o Zod com o React Hook Form.
    defaultValues: {
      type: 'income', // Define o valor padrão do campo "type" como "income" (entrada).
    },
  });

  // Função assíncrona para lidar com a criação de uma nova transação.
  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, category, type } = data; // Extrai os dados do formulário.

    // Chama a função `createTransaction` do contexto para criar a transação.
    await createTransaction({
      description,
      price,
      category,
      type,
    });

    // Reseta o formulário após a criação da transação.
    reset();
  }

  return (
    // O `Dialog.Portal` é usado pelo Radix UI para renderizar o modal fora do fluxo normal do DOM.
    <Dialog.Portal>
      {/* O `Overlay` é um componente estilizado que escurece o fundo do modal. */}
      <Overlay />

      {/* O `Content` é o contêiner principal do modal, onde o conteúdo é exibido. */}
      <Content>
        {/* Título do modal. */}
        <Dialog.Title>Nova Transação</Dialog.Title>

        {/* Botão para fechar o modal, usando o ícone "X" do Phosphor Icons. */}
        <CloseButton>
          <X size={24} />
        </CloseButton>

        {/* Formulário para criar uma nova transação. */}
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          {/* Campo de descrição da transação. */}
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')} // Registra o campo no React Hook Form.
          />

          {/* Campo de preço da transação. */}
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })} // Converte o valor para número.
          />

          {/* Campo de categoria da transação. */}
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')} // Registra o campo no React Hook Form.
          />

          {/* Componente controlado para selecionar o tipo da transação (entrada ou saída). */}
          <Controller
            control={control} // Controla o campo usando o React Hook Form.
            name="type" // Nome do campo.
            render={({ field }) => {
              return (
                // Componente estilizado para selecionar o tipo da transação.
                <TransactionType
                  onValueChange={field.onChange} // Atualiza o valor do campo quando alterado.
                  value={field.value} // Define o valor atual do campo.
                >
                  {/* Botão para selecionar transação de entrada. */}
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} /> Entrada
                  </TransactionTypeButton>

                  {/* Botão para selecionar transação de saída. */}
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} /> Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />

          {/* Botão de envio do formulário. */}
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}