//Vite tem suporte a fazer css com modulos
import styles from '../components/Header.module.css';

export function Header(){// Todos os componentes devem iniciar com letra maiuscula
    return (
        <header className={styles.header}>
            <strong >Ignete Feed</strong>
        
        </header>
    );
}