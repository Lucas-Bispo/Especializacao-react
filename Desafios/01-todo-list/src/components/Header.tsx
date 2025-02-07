// src/components/Header.tsx

import { useState } from "react";
import styles from "./Header.module.css";

interface Props {
  onAddTask: (title: string) => void;
}

export function Header({ onAddTask }: Props) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return;

    onAddTask(newTaskTitle);
    setNewTaskTitle("");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <img className={styles.rocketLogo} src="/rocket.svg" alt="Rocket Logo" />
          <img className={styles.todoLogo} src="/todo.svg" alt="Todo Logo" />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button onClick={handleAddTask}>Criar</button>
        </div>
      </div>
    </header>
  );
}