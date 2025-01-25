// Importa o ícone PencilLine da biblioteca phosphor-react para ser usado como ícone de edição
import { PencilLine } from 'phosphor-react';

// Importa os estilos CSS do módulo Sidebar.module.css
import styles from './Sidebar.module.css';

// Define e exporta o componente Sidebar
export function Sidebar() {
  return (
    // Cria uma seção lateral <aside> com a classe CSS `sidebar` definida no módulo de estilos
    <aside className={styles.sidebar}>
      
      {/* Imagem de capa exibida na parte superior da sidebar */}
      <img
        className={styles.cover} // Aplica os estilos da classe `cover`
        src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50" // URL da imagem de capa
      />

      {/* Seção de perfil com avatar, nome e cargo */}
      <div className={styles.profile}> 
        {/* Imagem de avatar do usuário */}
        <img
          className={styles.avatar} // Aplica os estilos da classe `avatar`
          src="https://github.com/Lucas-Bispo.png" // Avatar vindo do GitHub
        />
        <strong>Lucas Bispo</strong> {/* Nome do usuário em negrito */}
        <span>Full Stack</span> {/* Descrição do cargo */}
      </div>

      {/* Rodapé da sidebar com link para editar o perfil */}
      <footer>
        {/* Link com ícone e texto */}
        <a href="#"> {/* O `#` significa que o link não aponta para lugar nenhum */}
          <PencilLine size={20} /> {/* Ícone de lápis com tamanho 20 */}
          Editar seu perfil {/* Texto do link */}
        </a>
      </footer>
    </aside>
  );
}
