// Importa o módulo de estilos específico para este componente
import styles from './Header.module.css'
// Importa a imagem do logo que será exibida no cabeçalho
import logo from '../assets/logo.svg'

// Cria o componente Header
export function Header() {
  // Retorna o cabeçalho com a classe CSS definida no arquivo Header.module.css
  // e uma imagem dentro dele
  return(
    <header className={styles.header}>
       <img src={logo} alt="ToDo List"/>
    </header>
  );
}
