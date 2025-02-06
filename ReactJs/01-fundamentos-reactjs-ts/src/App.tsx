

/**
 * Componente principal da aplicacao, responsavel por renderizar a estrutura
 * basica da pagina, incluindo o header, sidebar e posts.
 */
import { Header } from './components/Header.tsx';
import { Post, PostType } from './components/Post.tsx';
import { Sidebar } from './components/Sidebar.tsx';

import styles from './App.module.css';

import './global.css';


/*************  ✨ Codeium Command 🌟  *************/
/**
 * Array de objetos que representam os posts da aplicacao. Cada item do array
 * eh um objeto com as seguintes propriedades:
 * - id: numero unico que identifica o post
 * - author: objeto com as seguintes propriedades:
 *   - avatarUrl: URL da imagem do avatar do autor do post
 *   - name: nome do autor do post
 *   - role: cargo ou funcao do autor do post
 * - content: array de objetos que representam o conteudo do post.
 *   Cada item do array eh um objeto com as seguintes propriedades:
 *   - type: tipo do conteudo do post (ou seja, se eh um paragrafo, um link, etc.)
 *   - content: conteudo do post (ou seja, o texto do paragrafo, o enderenco
 *     do link, etc.)
 * - publishedAt: data de publicacao do post
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
      { type: 'paragraph', content: 'Fala galera ' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. ' +
        '   um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto   ' +
        'DoctorCare ' },
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
      { type: 'paragraph', content: 'Fala galera ' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. ' +
        '   um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto   ' +
        'DoctorCare ' },
      { type: 'paragraph', content: 'Fala galera 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-05-10 20:00:00'),
  },
];

export function App() {
  return (
    <div>
      {/* Componente de header, responsavel por renderizar o cabecalho da pagina */}
      <Header />

      {/* Container que envolve a sidebar e os posts, responsavel por definir a estrutura
       * basica da pagina
       */}
      <div className={styles.wrapper}>
        {/* Componente de sidebar, responsavel por renderizar a barra lateral da pagina */}
        <Sidebar />

        {/* Container que envolve os posts, responsavel por definir a estrutura
         * basica dos posts
         */}
        <main>
          {/* Renderiza os posts, passando cada item do array 'posts' como props
           * para o componente Post
           */}
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
