<<<<<<< HEAD
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import * as Dialog from "@radix-ui/react-dialog";
import { X, ArrowCircleUp, ArrowCircleDown } from 'phosphor-react'
import { useForm, Controller } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import { z } from 'zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
=======
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
>>>>>>> 03-Dt-Money
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
<<<<<<< HEAD
} from './styles'


const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
/*
Este código define um esquema Zod para um formulário de nova transação. 
O esquema Zod é usado para validar os dados inseridos pelo usuário no formulário.
O esquema Zod é composto por um conjunto de campos, cada um dos quais tem um tipo. 
Os tipos podem ser strings, números, enums, etc.
*/
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const createTransaction = useContextSelector(
    // O gancho `useContextSelector` é usado para obter um valor do contexto.
    // O primeiro argumento é o contexto do qual você deseja obter o valor.
    // O segundo argumento é uma função que é usada para obter o valor do contexto.
    TransactionsContext,
    // A função passada ao gancho `useContextSelector` recebe o contexto como argumento.
    // A função deve retornar o valor que você deseja obter do contexto.
    (context) => {
      // O contexto `TransactionsContext` contém uma propriedade chamada `createTransaction`.
      // A função `createTransaction` é usada para criar uma nova transação.
      return context.createTransaction;
    },
  )
  const {
    control,  // `control` é um objeto que representa o controle do formulário.
    register, //  `register` é uma função que é usada para registrar um campo no formulário.
    handleSubmit, // `handleSubmit` é uma função que é usada para lidar com o envio do formulário.
    formState: { isSubmitting }, // `formState` é um objeto que representa o estado do formulário.
    reset, // `reset` é uma função que é usada para resetar o formulário.
  } = useForm<NewTransactionFormInputs>({ // `useForm` é um gancho do React que é usado para criar um formulário.
    resolver: zodResolver(newTransactionFormSchema), // `resolver` é uma função que é usada para resolver um esquema Zod.
    defaultValues: { // `defaultValues` é um objeto que define os valores padrão dos campos do formulário.
      type: 'income', 
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    // `handleCreateNewTransaction` é uma função que é usada para criar uma nova transação.
    // `data` é um objeto que contém os dados do formulário.
  
    // O primeiro passo é obter os dados do formulário.
    const { description, price, category, type } = data;
  
    // Em seguida, é preciso criar uma nova transação com os dados do formulário.
    const newTransaction = {
=======
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
>>>>>>> 03-Dt-Money
      description,
      price,
      category,
      type,
<<<<<<< HEAD
    };
  
    // Por fim, é preciso salvar a nova transação no banco de dados.
    await createTransaction(newTransaction);
  
    // Depois de salvar a nova transação, é preciso resetar o formulário.
=======
    });

    // Reseta o formulário após a criação da transação.
>>>>>>> 03-Dt-Money
    reset();
  }

  return (
<<<<<<< HEAD
    <Dialog.Portal>
      <Overlay />
  
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
  
        <CloseButton>
          <X size={24} />
        </CloseButton>
  
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          // O componente `form` é usado para criar um formulário.
          // O atributo `onSubmit` é usado para definir uma função que é chamada quando o formulário é enviado.
          // A função `handleSubmit` é uma função que é usada para lidar com o envio do formulário.
  
=======
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
>>>>>>> 03-Dt-Money
          <input
            type="text"
            placeholder="Descrição"
            required
<<<<<<< HEAD
            {...register('description')}
          // O componente `input` é usado para criar um campo de entrada de texto.
          // O atributo `placeholder` é usado para definir o texto que é exibido no campo de entrada quando o campo está vazio.
          // O atributo `required` é usado para definir se o campo é obrigatório.
          // A função `register` é usada para registrar um campo no formulário.
  
          // O componente `register` recebe dois argumentos:
          //   * O primeiro argumento é o nome do campo.
          //   * O segundo argumento é um objeto que define as opções do campo.
  
          />
=======
            {...register('description')} // Registra o campo no React Hook Form.
          />

          {/* Campo de preço da transação. */}
>>>>>>> 03-Dt-Money
          <input
            type="number"
            placeholder="Preço"
            required
<<<<<<< HEAD
            {...register('price', { valueAsNumber: true })}
          // O componente `input` é usado para criar um campo de entrada de número.
          // O atributo `placeholder` é usado para definir o texto que é exibido no campo de entrada quando o campo está vazio.
          // O atributo `required` é usado para definir se o campo é obrigatório.
          // A função `register` é usada para registrar um campo no formulário.
          // O segundo argumento do `register` é um objeto que define as opções do campo.
          // No caso do `valueAsNumber`, o campo será renderizado como um número.
  
          />
=======
            {...register('price', { valueAsNumber: true })} // Converte o valor para número.
          />

          {/* Campo de categoria da transação. */}
>>>>>>> 03-Dt-Money
          <input
            type="text"
            placeholder="Categoria"
            required
<<<<<<< HEAD
            {...register('category')}
          // O componente `input` é usado para criar um campo de entrada de texto.
          // O atributo `placeholder` é usado para definir o texto que é exibido no campo de entrada quando o campo está vazio.
          // O atributo `required` é usado para definir se o campo é obrigatório.
          // A função `register` é usada para registrar um campo no formulário.
  
          />
  
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              // O componente `Controller` é usado para renderizar um campo de controle.
              // O atributo `control` é usado para definir o controle do campo.
              // O atributo `name` é usado para definir o nome do campo.
              // A função `render` é usada para renderizar o campo.
              // A função `render` recebe um objeto como argumento.
              // O objeto contém as propriedades do campo.
  
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />
  
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          // O componente `button` é usado para criar um botão.
          // O atributo `type` é usado para definir o tipo do botão.
          // O atributo `disabled` é usado para definir se o botão está desabilitado.
=======
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
>>>>>>> 03-Dt-Money
          </button>
        </form>
      </Content>
    </Dialog.Portal>
<<<<<<< HEAD
  )
}
=======
  );
}
>>>>>>> 03-Dt-Money
