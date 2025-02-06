// Importação do módulo CSS de estilização específico da Task
import styles from './Task.module.css'

// Importação de dois ícones da biblioteca Phosphor React
import { Check, Trash } from 'phosphor-react'

// Criação da interface para definição das propriedades (props) que a Task irá receber
interface TasksProps {
  content: string // Conteúdo da tarefa
  id: number // Identificador único da tarefa
  isChecked: boolean // Estado de conclusão da tarefa
  onDeleteTask: (id: number) => void // Função que remove uma tarefa com o id informado
  progress: (progressTask: number | boolean) => void // Função que atualiza o progresso das tarefas
  completeTask: (taskChecked: number) => void // Função que marca uma tarefa como concluída
}

// Declaração do componente Task que recebe as props definidas na interface
export function Task(props: TasksProps) {

  // Função que marca uma tarefa como concluída, chamando a função completeTask com o id da tarefa
  function handleCheckbox() {
    props.completeTask(props.id)
  }
  
  // Função que remove uma tarefa, chamando a função onDeleteTask com o id da tarefa
  function handleDeleteTask() {
    props.onDeleteTask(props.id)
  }

  // Função que atualiza o progresso das tarefas, chamando a função progress com o estado de conclusão da tarefa
  function handleCountCompleteTask(){
    props.progress(props.isChecked)
  }

  // Renderização do componente Task, com base nas props recebidas
  return(
      // retorna um elemento HTML com a classe CSS "taskList"
    <div className={styles.taskList} >
        {/* retorna um elemento HTML com a classe CSS "task" */}
      <div className={styles.task}>
          {/* retorna um rótulo HTML com a classe CSS "checkbox" */}
        <label className={styles.checkbox}>
            {/* retorna um elemento HTML do tipo "checkbox" com a propriedade "checked" igual ao valor booleano da propriedade "isChecked". Também possui os eventos "onClick" e "onChange" que invocam as funções "handleCheckbox" e "handleCountCompleteTask" respectivamente */}
          <input 
            type="checkbox" 
            checked={props.isChecked} 
            onClick={handleCheckbox} 
            onChange={handleCountCompleteTask}
          />
            {/* retorna um elemento HTML do tipo "span" com o valor da propriedade "content" */}
          <span>
            {props.content}
          </span> 
          {/* verifica se a propriedade "isChecked" é verdadeira ou falsa e retorna um elemento HTML de acordo com a condição */}
          {props.isChecked ? 
            // retorna um elemento HTML com a classe CSS "checked" e ícone de "Check" da biblioteca "phosphor-react"
            <div className={styles.checked}>
              <Check size={12} weight="bold" color="var(--gray-100)" data-type="svg"/>
            </div> : 
            // retorna um elemento HTML vazio com a classe CSS "check"
            <div className={styles.check}></div>
          }
        </label>
          {/* retorna um ícone de "Lixo" da biblioteca "phosphor-react" com a classe CSS "trashIcon" e evento "onClick" que invoca a função "handleDeleteTask" */}
        <Trash onClick={handleDeleteTask} className={styles.trashIcon} size={24}/>
      </div>
    </div>
  );
}
