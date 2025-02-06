// src/App.tsx
import React, { useState } from 'react';
import TaskList from './components/List/TaskList';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') return;

    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleAddTask();
      }}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Adicione uma nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;