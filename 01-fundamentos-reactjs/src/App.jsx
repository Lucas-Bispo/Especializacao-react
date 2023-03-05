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
    content: [
      { type: 'paragraph', content: 'Fala galera', },
      { type: 'paragraph', content: 'Acabe de subir um projeto no meu protifolio, E um projeto que fiz no NLW, Return, evento da rockeseat. O nome' },
      {tyoe: 'paragraph', content: 'jane.desegin/doctorcare'},
    ],
    publishedAt: new Date('2022-05-03 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatar: 'https://github.com/diego3g.png',
      name: 'Diego Fernades',
      role: 'CTO'
    },
    content: [
      { type: 'paragraph', content: 'Fala galera', },
      { type: 'paragraph', content: 'Acabe de subir um projeto no meu protifolio, E um projeto que fiz no NLW, Return, evento da rockeseat. O nome' },
      {tyoe: 'paragraph', content: 'jane.desegin/doctorcare'},
    ],
    publishedAt: new Date('2022-05-03 20:00:00'),
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
          {posts.map(post => { // percorre o arry mas nao tem retorno
            return ( 
              <Post
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}

        </main>
    </div>

    
    
    </div>
  )
}

