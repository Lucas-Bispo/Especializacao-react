import { useState } from "react";
import style from "./ToDoList.module.css";

export function TodoList() {/**
 * Nesta parte do código, estão sendo importados os módulos useState e o estilo da lista de tarefas. 
   A função TodoList é um componente funcional que representa a lista de tarefas.
   Dentro do componente TodoList, estão sendo criados quatro estados utilizando a função useState do React:
   tasks: é um array de objetos que representa as tarefas. Cada objeto tem um id (número único), uma descrição 
   (string) e um booleano que indica se a tarefa foi concluída ou não (completed).
   newTaskDescription: é uma string que representa o texto digitado pelo usuário na entrada de texto para criar uma nova tarefa.
   totalTasks: é um número que representa o total de tarefas criadas.
   completedTasksIds: é um array de números que representa os ids das tarefas concluídas.
   Em seguida, a função handleNewTaskDescriptionChange é criada para lidar com as mudanças na entrada de texto para criar uma nova tarefa. 
   Essa função é chamada sempre que o usuário modifica o texto e atualiza o estado newTaskDescription com o valor do texto digitado pelo usuário.
 */
  const [tasks, setTasks] = useState<{ id: number; description: string; completed: boolean }[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasksIds, setCompletedTasksIds] = useState<number[]>([]);

  function handleNewTaskDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTaskDescription(event.target.value);
    /**
     * Essa função handleNewTaskDescriptionChange é chamada sempre que o usuário digita algo no campo de texto da nova tarefa. 
     * Ela recebe um evento ChangeEvent do React que representa a mudança ocorrida no campo de texto.
      A função então extrai o valor do campo de texto usando event.target.value, que é a string que representa o texto digitado pelo usuário. 
      Em seguida, ela chama a função setNewTaskDescription para atualizar o estado newTaskDescription com o novo valor. Isso faz com que o componente TodoList seja renderizado novamente com o novo valor do campo de texto.
      Em resumo, essa função é responsável por atualizar o estado newTaskDescription com o valor do campo de texto sempre que houver uma mudança no seu valor.
     */

  }

  function handleAddTask() {
    const newTask = { id: Date.now(), description: newTaskDescription, completed: false };
    setTasks([...tasks, newTask]);
    setNewTaskDescription("");
    setTotalTasks(totalTasks + 1);
    /**
    * A função handleAddTask é responsável por adicionar uma nova tarefa à lista de tarefas. Ela é chamada quando o usuário clica no botão "Criar" na interface.
    A primeira linha da função cria um novo objeto de tarefa, que tem três propriedades: id, description e completed. O id é gerado com base na data atual (usando o método Date.now()), 
    description é definido com o valor atual da entrada de texto (que está armazenado no estado newTaskDescription) e completed é inicializado como false.
    Na segunda linha, o novo objeto de tarefa é adicionado à lista de tarefas usando o operador spread (...) para desestruturar o array atual de tarefas e adicionar a nova tarefa ao final.
    Na terceira linha, o estado newTaskDescription é resetado para uma string vazia, para limpar o campo de entrada de texto.
    Por fim, na quarta linha, o estado totalTasks é incrementado em 1, para refletir a adição da nova tarefa à lista.
    */
  }

  function handleTaskCompleted(event: React.ChangeEvent<HTMLInputElement>, taskId: number) {
    if (event.target.checked) {
      setCompletedTasksIds([...completedTasksIds, taskId]);
    } else {
      setCompletedTasksIds(completedTasksIds.filter((id) => id !== taskId));
    }
    /**A função handleTaskCompleted é responsável por atualizar o estado completedTasksIds, que contém os IDs das tarefas que foram concluídas pelo usuário.
    Ela recebe dois parâmetros: o primeiro é um evento de mudança de estado de um input HTML, que é do tipo React.ChangeEvent<HTMLInputElement>. 
    Esse evento é disparado quando o usuário marca ou desmarca uma checkbox associada a uma tarefa.
    O segundo parâmetro é o ID da tarefa que teve seu estado concluído. Essa informação é importante para que possamos atualizar corretamente o estado.
    Dentro da função, primeiro verificamos se o checkbox foi marcado ou desmarcado. Se ele foi marcado, adicionamos o ID da tarefa ao array completedTasksIds 
    usando o operador spread para criar uma cópia do array original e adicionar o novo ID.
    Se o checkbox foi desmarcado, removemos o ID da tarefa do array completedTasksIds usando o método filter, que cria um novo array contendo apenas os elementos 
    que passam em um teste lógico. Nesse caso, o teste lógico é se o ID da tarefa é diferente do ID que estamos tentando remover.
    */
  }

  return (
    <div className={style.task}>
      <input
        className={style.layout}
        type="text"
        value={newTaskDescription}
        onChange={handleNewTaskDescriptionChange}
      />
      <button className={style.buttonlayout} onClick={handleAddTask}>
        Criar
      </button>
      <div className={style.listul}>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={completedTasksIds.includes(task.id) ? style.completed : ""}>
            <input
              type="checkbox"
              checked={completedTasksIds.includes(task.id)}
              onChange={(event) => handleTaskCompleted(event, task.id)}
            />
            {task.description}
          </li>
        ))}
      </ul>
      </div>
      <div>
        Total de tarefas: {totalTasks}, concluídas: {completedTasksIds.length}
      </div>
    </div>
  );
}
