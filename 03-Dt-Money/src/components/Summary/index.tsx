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

        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}