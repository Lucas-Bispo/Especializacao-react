// Importa o componente Header do arquivo './components/Header'
import { Header } from './components/Header';

// Importa o componente Post do arquivo './Post'
import { Post } from './components/Post';

// Importa os estilos específicos do módulo CSS para o componente App
import styles from './App.module.css';

// Importa os estilos globais aplicados à aplicação
import './global.css';

// Importa o componente Sidebar do arquivo './components/Sidebar'
import { Sidebar } from './components/Sidebar';

// Define e exporta o componente principal da aplicação
export function App() {
  return (
    <div>
      {/* Renderiza o componente Header no topo da aplicação */}
      <Header />

      {/* Cria uma estrutura com dois componentes principais: Sidebar e Post */}
      <div className={styles.wrapper}>
        {/* Renderiza o componente Sidebar, que geralmente contém navegação ou informações complementares */}
        <Sidebar />

        {/* Define a área principal da aplicação, onde os posts serão exibidos */}
        <main>
          {/* Renderiza um componente Post com as propriedades de autor e conteúdo */}
          <Post
            author="Lucas Bispo"
            content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime itaque quas corporis beatae veritatis, reprehenderit asperiores vitae quod possimus qui dignissimos unde deleniti consequatur quae, repellat debitis sunt, est rerum!"
          />
          {/* Renderiza outro componente Post com um autor e conteúdo diferentes */}
          <Post
            author="Gabriel Buzzi"
            content="Um novo post muito legal"
          />
        </main>
      </div>
    </div>
  );
}
