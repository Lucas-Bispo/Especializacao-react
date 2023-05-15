// Importando módulos
import styles from './NewTask.module.css';
import { Task } from './Task';
import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from 'react';
import { NoTask } from './NoTask';

// Interface da tarefa
interface Task {
  id: number;
  content: string;
  isChecked: boolean;
}

// Componente principal
export function NewTask() {
  
  // Estado inicial das tarefas
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Recuperando tarefas armazenadas no LocalStorage
    const storageTask = localStorage.getItem('@taskList');
    if(storageTask) {
      return JSON.parse(storageTask);
    }
    return [];
  });

  // Estado para armazenar o valor da nova tarefa
  const [newTaskValue, setNewTaskValue] = useState('');

  // Estado para armazenar o número de tarefas concluídas
  const [checkedCount, setCheckedCount] = useState(0);

  // Efeito colateral para salvar tarefas no LocalStorage toda vez que houver uma alteração
  useEffect(() => {
    localStorage.setItem('@taskList', JSON.stringify(tasks));
  }, [tasks]);

  // Função para adicionar uma nova tarefa
  function handleAddNewTask(event: FormEvent) {
    event.preventDefault();
    const newTask = {
      id: Math.floor(Math.random() * 999999 + 1),
      content: newTaskValue,
      isChecked: false
    };
    setTasks([...tasks, newTask]);
    setNewTaskValue('');
  }

  // Função para atualizar o estado da nova tarefa toda vez que houver uma mudança no input
  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>){
    event.target.setCustomValidity('');
    setNewTaskValue(event.target.value);
  }

  // Função para exibir mensagem de erro caso o campo esteja inválido
  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>){
    event.target.setCustomValidity('Esse campo é obrigatório');
  }
  
  // Função para deletar uma tarefa
  function deleteTask(taskToDelete: number){
    const taskWithoutDeleteOne = tasks.filter(task=>{
      if(task.isChecked === true) {
        setCheckedCount(checkedCount - 1);
      }
      return (
        task.id !== taskToDelete
      );
    });
    setTasks(taskWithoutDeleteOne);
  }

  // Função para atualizar o estado de isChecked ao clicar no checkbox
  function handleCheckboxChange(id: number) {
    const taskComplete = tasks.map(task=>{
      if(task.id===id) task.isChecked = !task.isChecked;
      return task;
    });
    setTasks(taskComplete);
  }

  // Função para atualizar o estado do contador de tarefas concluídas
  function handleCompleteProgress(progress: number | boolean ) {
      if(!progress) {
        setCheckedCount(checkedCount + 1);
      } else {
        setCheckedCount(checkedCount - 1);
      }
  }

  return (
    <>
      {/* Formulário para adicionar nova tarefa */}
      <form className={styles.newTask} onSubmit={handleAddNewTask}>
        <input 
          type="text" 
          placeholder="Adicione uma nova tarefa"
          name='task'
          value={newTaskValue}
          onChange={handleNewTaskChange}
          required
          onInvalid={handleNewTaskInvalid}
        />
        <button type='submit'>
          Criar
          <PlusCircle size={16} weight="bold" />
        </button>
      </form>
  
      {/* Seção para exibir contadores de tarefas */}
      <section className={styles.containerCount}>
        <p>Tarefas criadas<span>{tasks.length}</span></p>
        <p>Concluídas
          {/* Verifica se há tarefas concluídas e exibe o contador */}
          {tasks.length === 0 ? 
            <span>{tasks.length}</span> : 
            <span>{checkedCount} de {tasks.length}</span>
          }
        </p>
      </section>
  
      {/* Verifica se há tarefas a serem exibidas */}
      {tasks.length === 0 ? 
        <NoTask/> : 
        // Se houver tarefas, exibe a lista de tarefas
        <section className={styles.taskList}> {tasks.map(task => {
          return (
            <Task 
              key={task.id} 
              id={task.id} 
              content={task.content} 
              isChecked={task.isChecked} 
              onDeleteTask={deleteTask} 
              progress={handleCompleteProgress} 
              completeTask={handleCheckboxChange}
            />
          ) 
        })}
        </section>
      }
    </>
  );
}