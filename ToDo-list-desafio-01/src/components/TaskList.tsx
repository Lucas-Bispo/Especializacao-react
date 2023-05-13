import { useState } from 'react';
import styles from './TaskList.module.css';
import { Task } from './Task';


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
      <div >
        <Task onCreateTask={handleAddTask} />
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
        <div>
          <span className={styles.TarefasConcluidas}>Tarefas concluídas: {completedTasks.length}</span>
          <span className={styles.Total}>  Total de tarefas: {totalTasks}</span>
        </div>
      </div>
    );
  }