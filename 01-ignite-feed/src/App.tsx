/*Aqui estamos importando módulos do nosso projeto. O Header, Post e Sidebar são componentes que estão 
localizados na pasta components. O styles é um objeto que representa a classe CSS definida no arquivo 
App.module.css e o arquivo global.css contém estilos globais que serão aplicados a todo o projeto.
 */
import { Header } from './components/Header';
import { Post, PostType } from './components/Post'
import { Sidebar } from './components/Sidebar';

import styles from './App.module.css';

import './global.css';

/* Aqui estamos criando uma variável posts do tipo PostType[] que é uma interface que define o formato de um post. 
 * Essa variável contém um array de objetos que representam cada post, com propriedades como id, autor, conteúdo e data de publicação.
*/

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO @Rocketseat'
    },
    content: [
      { type: 'paragraph', content: 'Fala galera 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-05-03 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educator @Rocketseat'
    },
    content: [
      { type: 'paragraph', content: 'Fala galera 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-05-10 20:00:00'),
  },
];
/**
 * 
 * A função "App" é exportada para ser utilizada em outras partes do código.
  A função retorna uma estrutura HTML, que é composta pelo componente Header, Sidebar, main e o array de posts. 
  A classe "wrapper" é adicionada à div que contém o Sidebar e o main, que possuem os posts.
  O array de posts é mapeado e cada objeto é renderizado no componente Post, passando o id e o conteúdo do post.
 */
export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                post={post}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}