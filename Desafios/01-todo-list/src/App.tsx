import { useEffect, useState } from "react"; // Importa hooks do React para gerenciar estado e efeitos colaterais
import { Header } from "./components/Header"; // Importa o componente Header
import { Tasks } from "./components/Tasks"; // Importa o componente Tasks

const LOCAL_STORAGE_KEY = "todo:savedTasks"; // Define a chave para acesso ao localStorage

export interface ITask {
  id: string; // Define a interface ITask com um campo id do tipo string
  title: string; // Define a interface ITask com um campo title do tipo string
  isCompleted: boolean; // Define a interface ITask com um campo isCompleted do tipo boolean
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]); // Declara um estado para armazenar as tarefas

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY); // Obtém as tarefas salvas no localStorage
    if (saved) {
      setTasks(JSON.parse(saved)); // Atualiza o estado com as tarefas salvas
    }
  }

  useEffect(() => {
    loadSavedTasks(); // Carrega as tarefas salvas ao montar o componente
  }, []);

  function setTasksAndSave(newTasks: ITask[]) {
    setTasks(newTasks); // Atualiza o estado das tarefas
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks)); // Salva as novas tarefas no localStorage
  }

  function addTask(taskTitle: string) {
    setTasksAndSave([
      ...tasks, // Copia as tarefas existentes
      {
        id: crypto.randomUUID(), // Gera um novo id único para a nova tarefa
        title: taskTitle, // Define o título da nova tarefa
        isCompleted: false, // Define o status inicial da tarefa como não concluída
      },
    ]);
  }

  function deleteTaskById(taskId: string) {
    const newTasks = tasks.filter((task) => task.id !== taskId); // Filtra as tarefas removendo a tarefa com id especificado
    setTasksAndSave(newTasks); // Atualiza e salva o novo estado das tarefas
  }

  function toggleTaskCompletedById(taskId: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task, // Copia a tarefa existente
          isCompleted: !task.isCompleted, // Alterna o status de conclusão
        };
      }
      return task; // Retorna a tarefa sem alterações
    });
    setTasksAndSave(newTasks); // Atualiza e salva o novo estado das tarefas
  }

  return (
    <>
      <Header onAddTask={addTask} /> {/* Renderiza o componente Header passando a função de adicionar tarefa */}
      <Tasks
        tasks={tasks} // Passa as tarefas para o componente Tasks
        onDelete={deleteTaskById} // Passa a função de deletar tarefa para o componente Tasks
        onComplete={toggleTaskCompletedById} // Passa a função de alternar estado de conclusão para o componente Tasks
      />
    </>
  );
}

export default App; // Exporta o componente App como padrão
