import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import * as Dialog from "@radix-ui/react-dialog";
import { X, ArrowCircleUp, ArrowCircleDown } from 'phosphor-react'
import { useForm, Controller } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import { z } from 'zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
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
      description,
      price,
      category,
      type,
    };
  
    // Por fim, é preciso salvar a nova transação no banco de dados.
    await createTransaction(newTransaction);
  
    // Depois de salvar a nova transação, é preciso resetar o formulário.
    reset();
  }

  return (
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
  
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          // O componente `input` é usado para criar um campo de entrada de texto.
          // O atributo `placeholder` é usado para definir o texto que é exibido no campo de entrada quando o campo está vazio.
          // O atributo `required` é usado para definir se o campo é obrigatório.
          // A função `register` é usada para registrar um campo no formulário.
  
          // O componente `register` recebe dois argumentos:
          //   * O primeiro argumento é o nome do campo.
          //   * O segundo argumento é um objeto que define as opções do campo.
  
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          // O componente `input` é usado para criar um campo de entrada de número.
          // O atributo `placeholder` é usado para definir o texto que é exibido no campo de entrada quando o campo está vazio.
          // O atributo `required` é usado para definir se o campo é obrigatório.
          // A função `register` é usada para registrar um campo no formulário.
          // O segundo argumento do `register` é um objeto que define as opções do campo.
          // No caso do `valueAsNumber`, o campo será renderizado como um número.
  
          />
          <input
            type="text"
            placeholder="Categoria"
            required
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
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
