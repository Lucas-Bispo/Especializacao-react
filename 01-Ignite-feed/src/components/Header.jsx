// Importa os estilos definidos no arquivo CSS específico para o componente Header.
// O arquivo "Header.module.css" contém classes CSS que são associadas diretamente ao componente Header.
// Isso garante isolamento de estilo, evitando conflitos com outros componentes.
import styles from './Header.module.css';

// Define e exporta a função Header, que é um componente funcional React.
// Este componente representa a seção de cabeçalho da aplicação.
export function Header() {
  return (
    // O elemento <header> recebe a classe "header" definida no arquivo CSS modular.
    // O uso de `styles.header` garante que a classe seja única, mesmo se houver outras classes
    // com o mesmo nome em diferentes módulos CSS.
    <header className={styles.header}>
      {/* Exibe o texto "Ignite Feed" dentro de um elemento <strong>, que geralmente é usado para destacar o texto */}
      <strong>Ignite Feed</strong>
    </header>
  );
}
