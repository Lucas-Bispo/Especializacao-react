// Definindo o componente Summary utilizando a sintaxe de função React com TypeScript (React.FC).
const Summary: React.FC = () => {
  return (
    // SummaryContainer é o contêiner principal do componente, provavelmente um componente estilizado.
    <SummaryContainer>
      
      {/* SummaryCard é um componente que representa cada card de resumo (Entradas, Saídas, Total). */}
      <SummaryCard>
        {/* A tag <header> agrupa o título e o ícone de cada card */}
        <header>
          {/* Exibindo o título do card, "Entradas". */}
          <span>Entradas</span>
          {/* O ícone de "ArrowCircleUp" representa um símbolo de aumento (entrada). A cor é verde (#00B37E). */}
          <ArrowCircleUp size={32} color="#00B37E" />
        </header>
        {/* Exibindo o valor das entradas, "R$ 17.000". */}
        <strong>R$ 17.000</strong>
      </SummaryCard>

      {/* Repetindo o padrão do primeiro card, mas para as "Saídas". */}
      <SummaryCard>
        <header>
          {/* Exibindo o título do card, "Saídas". */}
          <span>Saídas</span>
          {/* O ícone de "ArrowCircleDown" representa um símbolo de diminuição (saída). A cor é vermelha (#F75A68). */}
          <ArrowCircleDown size={32} color="#F75A68" />
        </header>
        {/* Exibindo o valor das saídas, "R$ 5.000". */}
        <strong>R$ 5.000</strong>
      </SummaryCard>

      {/* O terceiro card exibe o "Total", que é calculado como Entradas - Saídas. */}
      <SummaryCard>
        <header>
          {/* Exibindo o título do card, "Total". */}
          <span>Total</span>
          {/* O ícone de "CurrencyDollar" representa um símbolo de valor monetário. A cor é branca (#FFF). */}
          <CurrencyDollar size={32} color="#FFF" />
        </header>
        {/* Exibindo o total calculado, "R$ 12.000" (17.000 - 5.000). */}
        <strong>R$ 12.000</strong>
      </SummaryCard>

    </SummaryContainer>
  );
};
