// Importa o componente Post do arquivo Post.js ou Post.jsx.
// Esse componente será usado dentro do componente App.
import Post from "./Post";

// Define o componente principal da aplicação, chamado App.
function App() {
  return (
      // Retorna um elemento <div> que agrupa vários componentes Post.
      <div>
          {/* Renderiza o componente Post com uma propriedade "content" definida como "Post 1". */}
          <Post content="Post 1" />
          {/* Renderiza outro componente Post com a propriedade "content" definida como "Post 2". */}
          <Post content="Post 2" />
          {/* Renderiza um terceiro componente Post com a propriedade "content" definida como "Post 3". */}
          <Post content="Post 3" />
      </div>
  );
}

// Exporta o componente App como a exportação padrão deste módulo.
// Outros arquivos podem importar e usar o App diretamente, por exemplo: import App from './App';
export default App;
