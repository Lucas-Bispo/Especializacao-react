import { Header } from './components/Header';

// Importação do componente Post do arquivo './Post'.
// Este componente será utilizado dentro do componente App para exibir informações sobre posts.
import { Post } from './Post';


// Importa o arquivo de estilos globais chamado "global.css".
// Este arquivo contém estilos CSS que serão aplicados globalmente à aplicação,
// afetando todos os componentes e elementos, a menos que sejam sobrescritos por estilos específicos.
import './global.css';


// Exportação da função App, que representa o componente principal da aplicação.
export function App() {
  // O componente App retorna um elemento JSX que representa a estrutura da interface.
  return (
    <div>

      <Header />

      {/* Instância do componente Post com duas propriedades (props): 
          - author: Representa o nome do autor do post.
          - content: Representa o conteúdo textual do post.
          Este componente será renderizado com base nas informações fornecidas nas props. */}
      <Post
        author="Diego Fernandes"
        content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime itaque quas corporis beatae veritatis, reprehenderit asperiores vitae quod possimus qui dignissimos unde deleniti consequatur quae, repellat debitis sunt, est rerum!"
      />
      
      {/* Outra instância do componente Post, mas com um autor e conteúdo diferentes. 
          Isso mostra como o mesmo componente pode ser reutilizado com diferentes dados. */}
      <Post
        author="Gabriel Buzzi"
        content="Um novo post muito legal"
      />
    </div>
  );
}

// Este código exporta o componente App, permitindo que ele seja utilizado em outros arquivos,
// como no ponto de entrada da aplicação (geralmente no arquivo main.jsx).
