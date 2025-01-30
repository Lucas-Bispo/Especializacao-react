// Importa o componente Header de um arquivo local
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";

// Define e exporta o componente funcional Transactions
export function Transactions() {
  return (
    // Renderiza uma div como contêiner principal
    <div>
      {/* Renderiza o componente Header dentro da div */}
      <Header />

      <Summary/>

    </div>
  );
}