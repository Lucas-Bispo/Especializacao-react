//Vite tem suporte a fazer css com modulos
import styles from '../components/Header.module.css';

import igniteLogo from '../assets/ignite-logo.svg';// Importando logo e setando o no Html atraves de encapsulamento
//Pois o valor fica aleatorio e segundo a sintaxy 



export function Header(){// Todos os componentes devem iniciar com letra maiuscula
    return (
        <header className={styles.header}>
            
            <img src={igniteLogo} alt="Logo tipo do ignite" />
            
            
            <strong >Ignete Feed</strong>
        
        </header>
    );
}