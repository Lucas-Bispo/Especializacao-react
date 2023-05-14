import styles from './Task.module.css'
import { Check, Trash } from 'phosphor-react'

interface TasksProps {
  content: string
  id: number
  isChecked: boolean
  onDeleteTask: (id: number) => void 
  progress: (progressTask: number | boolean) => void
  completeTask: (taskChecked: number) => void
}

export function Task(props: TasksProps) {

  function handleCheckbox() {
    props.completeTask(props.id)
  }
  
  function handleDeleteTask() {
    props.onDeleteTask(props.id)
  
  }

  function handleCountCompleteTask(){
    props.progress(props.isChecked)
  }

  return(
    <div className={styles.taskList} >
      <div className={styles.task}>
        <label className={styles.checkbox}>
          <input 
            type="checkbox" 
            checked={props.isChecked} 
            onClick={handleCheckbox} 
            onChange={handleCountCompleteTask}
          />
          <span>
            {props.content}
          </span> 
          {props.isChecked ? 
            <div className={styles.checked}>
              <Check size={12} weight="bold" color="var(--gray-100)" data-type="svg"/>
            </div> : 
            <div className={styles.check}></div>
          }
        </label>
        <Trash onClick={handleDeleteTask} className={styles.trashIcon} size={24}/>
      </div>
    </div>
  );
}