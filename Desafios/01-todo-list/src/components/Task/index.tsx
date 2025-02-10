import { TbTrash } from "react-icons/tb"; // Importa o ícone de lixeira para deletar tarefas
import { BsFillCheckCircleFill } from "react-icons/bs"; // Importa o ícone de círculo para marcar tarefas como completas

import styles from "./task.module.css"; // Importa os estilos CSS específicos para o componente Task
import { ITask } from "../../App"; // Importa a interface ITask para tipagem das tarefas

interface Props {
  task: ITask; // Propriedade que representa uma tarefa individual
  onComplete: (taskId: string) => void; // Função chamada ao completar uma tarefa
  onDelete: (taskId: string) => void; // Função chamada ao deletar uma tarefa
}

// Componente funcional Task que recebe propriedades definidas pela interface Props
export function Task({ task, onComplete, onDelete }: Props) {
  return (
    <div className={styles.task}> {/* Div que contém o layout da tarefa, estilizada com CSS */}
      <button
        className={styles.checkContainer} // Estilos para o botão de completar tarefa
        onClick={() => onComplete(task.id)} // Chama a função onComplete ao clicar, passando o ID da tarefa
      >
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />} {/* Renderiza o ícone de completado ou um div vazio */}
      </button>

      <p className={task.isCompleted ? styles.textCompleted : ""}> {/* Parágrafo que exibe o título da tarefa */}
        {task.title} {/* Título da tarefa */}
      </p>

      <button className={styles.deleteButton} onClick={() => onDelete(task.id)}> {/* Botão para deletar a tarefa */}
        <TbTrash size={20} /> {/* Ícone de lixeira */}
      </button>
    </div>
  );
}
