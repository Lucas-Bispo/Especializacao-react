import { useState } from 'react';
import styles from './TaskList.module.css';
import { Task } from './Task';
import Clipboard from '../assets/Clipboard.svg';

interface TaskItemProps {
    task: Task;
    onToggleTaskCompleted: (id: number) => void;
    onDeleteTask: (id: number) => void;
  }
  
  export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
  
    function handleAddTask(text: string) {
      const newTask: Task = {
        id: new Date().getTime(),
        text: text,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
  
    function handleToggleTaskCompleted(id: number) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  
    function handleDeleteTask(id: number) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    }
  
    const completedTasks = tasks.filter((task) => task.completed);
    const totalTasks = tasks.length;
  
    return (
        <div>
        <div>
        <Task onCreateTask={handleAddTask} />
        {tasks.length > 0 ? (
          <ul className={styles.lista}>
            {tasks.map((task) => (
              <li key={task.id}>
                <label>
                  <input
                    className={styles.check}
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTaskCompleted(task.id)}
                  />
                  {task.text}
                </label>
                <button onClick={() => handleDeleteTask(task.id)}>Excluir</button>
              </li>
            ))}
          </ul>
        ) : (

            <>
                <img src={Clipboard} className={styles.clipe}/>
                <div className={styles.paragrafo}>
                    <p>Você ainda não tem tarefas cadastradas. Crie tarefas e organize seus itens a fazer.</p>
                </div>
            </>
        )}
        <div>
          <span className={styles.TarefasConcluidas}>Tarefas concluídas: {completedTasks.length}</span>
          <span className={styles.Total}>  Total de tarefas: {totalTasks}</span>
        </div>
        </div>
      </div>
    );
  }