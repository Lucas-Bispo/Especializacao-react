import styles from 'Header.module.css';
//Componente de cabeçalho
//Esse componente provavelmente contém o cabeçalho do seu aplicativo. 
// Pode incluir elementos como o logotipo, o título ou qualquer outra 
// informação estática que apareça na parte superior da página.

/**
 * Interface com a estrutura de dados necessária para o componente de
 * cabeçalho
 * tasksCout - quantidade total de tarefas
 * checkedTasksCount - quantidade de tarefas concluídas
 */
interface Props {
    tasksCout: number;
    checkedTasksCount: number;
}

/**
 * Componente de cabeçalho
 * {Props} props - propriedades recebidas pelo componente
 * {JSX.Element} - elemento JSX do componente
 */
function Header({ tasksCout, checkedTasksCount }: Props) {
    return (
        <header className={styles.container}>
            {/* bloco de tarefas criadas */}
            <aside>
                {/* texto que acompanha a quantidade de tarefas criadas */}
                <p> Tarefas criadas</p>
                {/* quantidade de tarefas criadas */}
                <span>{tasksCout}</span>
            </aside>

            {/* bloco de tarefas concluídas */}
            <aside>
                {/* texto que acompanha a quantidade de tarefas concluídas */}
                <p>Concluídas</p>
                {/* 
                 * se a quantidade de tarefas criadas for igual a 0, 
                 * exibe a quantidade de tarefas criadas, 
                 * senão exibe a quantidade de tarefas concluídas e 
                 * a quantidade total de tarefas
                 */}
                <span>
                    {tasksCout === 0 
                    ? tasksCout
                    : `${checkedTasksCount} de ${tasksCout}` 
                    }
                </span>
            </aside>
        </header>
    );
}   
    
export default Header;
