import { useState } from 'react';
import styles from './Task.module.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}
interface TaskProps {
    onCreateTask: (task: string) => void;
  }
  

export function Task({ onCreateTask }: TaskProps) {
  const [taskText, setTaskText] = useState('');

  function handleTaskTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskText(event.target.value);
  }

  return(
    <div className={styles.task}>
      <input
        className={styles.layout}
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={taskText}
        onChange={handleTaskTextChange}
      />
      <div className={styles.button}>
        <button className={styles.buttonlayout} onClick={() => {
          if (taskText.trim() === '') {
            return;
          }
          onCreateTask(taskText);
          setTaskText('');
        }}>
          Criar
        </button>
      </div>
    </div>
  );
}