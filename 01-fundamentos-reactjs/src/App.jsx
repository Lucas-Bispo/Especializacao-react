// JSX = JavaScript + XML
import { Post } from '../src/components/Post';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
// Devesse de importar as funcoes dentro o app
// Propriedades ou atributos, sao elementos de cada teg
import './global.css';
import styles from './App.module.css';


export function App() {
  // Sintax correta
  return (
    <div> 

      <Header />

      <div className={styles.wrapper}>

        <Sidebar />

        <main>
          <Post 
          author="Lucas Bispo"
          content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus in magnam veniam dicta assumenda. Incidunt rerum voluptates fugit velit pariatur consequuntur aspernatur perferendis porro, ut quo laborum soluta atque repellendus."   
          />
          <Post 
          author="Lucas Oliveira"
          content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus in magnam veniam dicta assumenda. Incidunt rerum voluptates fugit velit pariatur consequuntur aspernatur perferendis porro, ut quo laborum soluta atque repellendus."   
        />
        </main>
    </div>

    
    
    </div>
  )
}

