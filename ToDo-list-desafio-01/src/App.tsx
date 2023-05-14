import './global.css'//Importa um arquivo CSS global que contém estilos para serem aplicados em todo o projeto.
import styles from './App.module.css'//Importa um objeto styles de um arquivo CSS localizado em ./App.module.css. 
//O objeto styles é gerado automaticamente pelo webpack, que é um empacotador de módulos para JavaScript.
import { Header } from "./components/Header"// Importa o componente Header do arquivo Header.js localizado na pasta ./components.
import { NewTask } from './components/NewTask'// Importa o componente NewTask do arquivo NewTask.js localizado na pasta ./components.

export function App() {// Exporta a função App, que é o componente principal da aplicação.
//A função App retorna um JSX (JavaScript XML), que é uma extensão da sintaxe do JavaScript 
//para permitir a inclusão de elementos HTML. Esse JSX é composto por:
/**
 * <div>: Abre uma div.
<Header/>: Renderiza o componente Header.
<div className={styles.container}>: Abre uma div com uma classe container definida no objeto styles importado anteriormente.
<main className={styles.main}>: Abre um elemento main com uma classe main definida no objeto styles.
<NewTask/>: Renderiza o componente NewTask.
</main>: Fecha o elemento main.
</div>: Fecha a div com a classe container.
</div>: Fecha a div principal.
Resumindo, este código renderiza os componentes Header e 
NewTask em um layout definido por estilos CSS. O componente Header contém um título e o componente NewTask contém um formulário para adicionar novas tarefas.
 */
  return (
    // JSX para um elemento pai, que contém um Header e um main
  <div>
  <Header/> {/*// Renderiza o componente Header*/}
  <div className={styles.container}> {/*// JSX para um elemento div com a classe container*/}
    <main className={styles.main}> {/*// JSX para um elemento main com a classe main*/}
      <NewTask/>{/*Renderiza o componente NewTask*/}
    </main>
  </div>
  </div>
  );
}