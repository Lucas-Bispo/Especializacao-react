import { TbTrash } from 'react-icons/tb'; // Importa o ícone de lixeira
import styles from './task.module.css'; // Importa os estilos CSS específicos para o componente Task

// Define o componente funcional Task
export function Task() {
    return (
        <div className={styles.task}> {/* Container principal da tarefa com estilos aplicados */}
            <button className={styles.checkContainer}> {/* Botão para marcar a tarefa como concluída */}
                <div></div> {/* Indicador visual dentro do botão */}
            </button>

            <p> {/* Texto da tarefa */}
                Integrar 
            </p>

            <button className={styles.deleteButton}> {/* Botão para deletar a tarefa */}
                <TbTrash size={20} /> {/* Ícone de lixeira com tamanho de 20px */}
            </button>
        </div>
    );
}
