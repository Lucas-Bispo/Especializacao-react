import { useState } from "react";


import style from './ToDoList.module.css';


export function TodoList() {
    /* Criar um componente funcional TodoList que representará a lista de tarefas. 
     * Dentro dele, vamos criar um estado tasks que será um array de objetos contendo 
     * a descrição da tarefa e um booleano indicando se a tarefa foi concluída ou não.
     */
  const [tasks, setTasks] = useState<{ description: string; completed: boolean }[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState("");
  
  /*
    Dentro do componente TodoList, vamos criar um estado newTaskDescription que representará 
    o texto digitado pelo usuário na entrada de texto. Também vamos criar uma função handleNewTaskDescriptionChange 
    que será chamada sempre que o texto for modificado.
    */
  function handleNewTaskDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTaskDescription(event.target.value);
   
  }
   /**
     * Agora precisamos criar a lógica para adicionar uma nova tarefa ao clicar no botão. Para isso, vamos criar uma função
     *  handleAddTask que será chamada quando o usuário clicar no botão. Dentro dela, vamos criar uma nova tarefa com o texto 
     * digitado e adicioná-la ao estado tasks. Por fim, vamos limpar a entrada de texto.
     */
   function handleAddTask() {
    const newTask = { description: newTaskDescription, completed: false };
    setTasks([...tasks, newTask]);
    setNewTaskDescription("");
  }

  return (
  <div className={style.task}>
    {/* Entrada de texto */}
    <input className={style.layout} type="text" value={newTaskDescription} onChange={handleNewTaskDescriptionChange} />
    {/* Botão para adicionar tarefa */}
    <button className={style.buttonlayout} onClick={handleAddTask}>Criar</button>
    {/* Lista de tarefas */}
    {/* Campos de estatísticas */}
  </div>
  );
}