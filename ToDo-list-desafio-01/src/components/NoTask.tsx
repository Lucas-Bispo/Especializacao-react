import styles from './NoTask.module.css'; // Importa o arquivo CSS local para estilização
import { ClipboardText } from 'phosphor-react'; // Importa o ícone ClipboardText da biblioteca Phosphor React

export function NoTask() {
  return(
    <div className={styles.noTask}> {/* Define a classe CSS para o contêiner da div */}
      <ClipboardText size={56} color="var(--gray-300)"/> {/* Renderiza o ícone ClipboardText com tamanho 56 e cor cinza */}
      <div className={styles.content}> {/* Define a classe CSS para o contêiner da div */}
        <strong>Você ainda não tem tarefas cadastradas</strong> {/* Renderiza um texto em negrito indicando que não há tarefas */}
        <p>Crie tarefas e organize seus itens a fazer</p> {/* Renderiza um parágrafo sugerindo que o usuário crie tarefas */}
      </div>
    </div>
  );
}
