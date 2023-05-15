// Importa o módulo CSS do componente Header
import styles from './Header.module.css';

// Importa a imagem do logo do Ignite
import igniteLogo from '../assets/ignite-logo.svg';

// Cria o componente Header
export function Header() {
  return (
    // Renderiza o elemento header com a classe definida no módulo CSS
    <header className={styles.header}>
      {/* Renderiza a imagem do logo do Ignite com um texto alternativo*/}
      <img src={igniteLogo} alt="Logotipo do Ignite" />
    </header>
  );
}
