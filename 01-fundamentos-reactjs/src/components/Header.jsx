//Vite tem suporte a fazer css com modulos
import styles from '../components/Header.module.css';

import igniteLogo from '../assets/ignite-logo.svg';// Importando logo e setando o no Html atraves de encapsulamento
//Pois o valor fica aleatorio e segundo a sintaxy 



export function Header(){// Todos os componentes devem iniciar com letra maiuscula
    // componente que mexe com a sidebar e logo
    // Na linha 13 coloca em capsula a chamada da variavel styles e header que esta dentro de um arquivo style, Isso eh feito pois eh gerado um hash
    // aleatorio e pegamos esse hash atraves desse procedimento.
    return (
        <header className={styles.header}> 
            
            <img src={igniteLogo} alt="Logo tipo do ignite" />
            
            
            <strong >Ignete Feed</strong>
        
        </header>
    );
}