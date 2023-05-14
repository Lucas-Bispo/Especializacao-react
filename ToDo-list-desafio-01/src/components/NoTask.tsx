import styles from './NoTask.module.css'
import { ClipboardText } from 'phosphor-react'

export function NoTask() {

  return(
    <div className={styles.noTask}>
      <ClipboardText size={56} color="var(--gray-300)"/>
      <div className={styles.content}>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    </div>
  );
}