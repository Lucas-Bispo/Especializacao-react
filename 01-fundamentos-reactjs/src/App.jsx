// JSX = JavaScript + XML
import { Post } from './components/Post';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
// Devesse de importar as funcoes dentro o app
// Propriedades ou atributos, sao elementos de cada teg
import styles from './App.module.css';
import './global.css';


// author: {avatar_url: "", name: "", role: ""}
// publisher: Date
// content: String
// Criacao de Objeto

const posts = [ // array de objetos
  {
    id: 1,
    author: {
      avatar: 'https://github.com/diego3g.png',
      name: 'Diego Fernades',
      role: 'CTO'
    },
    content
  },
];


export function App() { // funçã que exporta html
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

