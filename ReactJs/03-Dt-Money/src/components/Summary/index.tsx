<<<<<<< HEAD
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";
import { useSummary } from "../../hooks/useSummary.js";
import { priceFormatter } from "../../utils/formatter";
import { SummaryContainer, SummaryCard } from "./styles";

// O componente `Summary` é usado para renderizar um resumo das transações.

export function Summary() {
  // O hook `useSummary` é usado para obter o resumo das transações.
  const summary = useSummary();

  // O componente `SummaryContainer` é usado para renderizar um container para o resumo das transações.
  return (
    <SummaryContainer>
      {/*/ O componente `SummaryCard` é usado para renderizar um cartão com um header e um strong.*/}
      <SummaryCard>
        <header>
          {/*// O header do cartão contém o texto "Entradas" e um ícone de seta para cima.*/}
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        {/*// O strong do cartão contém o valor das entradas formatado como moeda.*/}
        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>

      {/*// O código acima é repetido para renderizar os cards de saídas e total.*/}
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

=======
// Importa ícones do pacote `phosphor-react` para representar visualmente entradas, saídas e o total.
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';

// Importa o hook `useSummary`, que fornece um resumo das transações (entradas, saídas e total).
import { useSummary } from '../../hooks/useSummary';

// Importa uma função utilitária `priceFormatter` para formatar valores monetários.
import { priceFormatter } from '../../utils/formatter';

// Importa componentes estilizados do arquivo `./styles`.
import { SummaryCard, SummaryContainer } from './styles';

// Define o componente funcional `Summary`, que exibe um resumo das transações financeiras.
export function Summary() {
  // Usa o hook `useSummary` para obter os valores de entrada, saída e total das transações.
  const summary = useSummary();

  return (
    // O `SummaryContainer` é o contêiner principal que organiza os cartões de resumo.
    <SummaryContainer>
      {/* Primeiro cartão: Exibe o valor total de entradas. */}
      <SummaryCard>
        <header>
          {/* Título do cartão. */}
          <span>Entradas</span>
          {/* Ícone de seta para cima, representando entradas, com cor verde. */}
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        {/* Valor formatado das entradas usando a função `priceFormatter`. */}
        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>

      {/* Segundo cartão: Exibe o valor total de saídas. */}
      <SummaryCard>
        <header>
          {/* Título do cartão. */}
          <span>Saídas</span>
          {/* Ícone de seta para baixo, representando saídas, com cor vermelha. */}
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        {/* Valor formatado das saídas usando a função `priceFormatter`. */}
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>

      {/* Terceiro cartão: Exibe o saldo total (total = entradas - saídas). */}
      <SummaryCard variant="green">
        <header>
          {/* Título do cartão. */}
          <span>Total</span>
          {/* Ícone de cifrão, representando o saldo total, com cor branca. */}
          <CurrencyDollar size={32} color="#fff" />
        </header>
        {/* Valor formatado do saldo total usando a função `priceFormatter`. */}
>>>>>>> 03-Dt-Money
        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}