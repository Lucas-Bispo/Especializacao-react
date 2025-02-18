import { TbClipboardText } from 'react-icons/tb';
import { ITask } from '../../App';

import { Task } from '../Task';
import styles from './tasks.module.css';


// Interface que define as propriedades do componente Tasks
interface Props{
    tasks: ITask []; // lista de tarefas
    onDelete: (taskId: string) => void // função para deletar uma tarefa
    onComplete: (taskId: string) => void // função para completar uma tarefa
}

// Componente Tasks
export function Tasks({tasks, onDelete, onComplete}: Props) {
    
    // Calcula a quantidade de tarefas
    const tasksQuantity = tasks.length;
    
    // Calcula a quantidade de tarefas concluídas
    const completedTasks = tasks.filter((task)=> task.isCompleted).length;
    
    return (
        <section className={styles.tasks}>
            {/* Header do componente */}
            <header className={styles.header}>
                {/* Quantidade de tarefas criadas */}
                <div>
                    <p>Tarefas criadas</p>
                    <span>{tasksQuantity}</span>
                </div>

                {/* Quantidade de tarefas concluídas */}
                <div>
                    <p className={styles.textPurple}>
                        Concluídas
                    </p>
                    <span>{completedTasks} de {tasksQuantity}</span>
                </div>

            </header>

            {/* Lista de tarefas */}
            <div className={styles.list}>
             {tasks.map((task) => (
                // Renderiza o componente Task para cada tarefa da lista
                <Task
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onComplete={onComplete}
                />
                ))}

                {/* Se não houver tarefas, exibe uma mensagem */}
                {tasks.length === 0 && (
                    <section className={styles.empty}>
                        <TbClipboardText size={50} />
                        <p>Voce ainda n„o tem tarefas cadastradas.</p>
                        <span> Crie tarefas e organize seus itens a fazer</span>
                    </section>
                )}
                
            </div>

        </section>
    )
}
