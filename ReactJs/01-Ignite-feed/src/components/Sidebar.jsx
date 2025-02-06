// Importa o ícone PencilLine da biblioteca Phosphor React
import { PencilLine } from 'phosphor-react';

// Importa o componente Avatar de um arquivo local chamado Avatar
import { Avatar } from './Avatar';

// Importa os estilos CSS do módulo Sidebar.module.css
import styles from './Sidebar.module.css';

// Define e exporta o componente funcional Sidebar
export function Sidebar() {
  return (
    // Renderiza um elemento <aside> com a classe CSS "sidebar" definida no módulo de estilos
    <aside className={styles.sidebar}>
      {/* Renderiza uma imagem de capa com a classe CSS "cover" */}
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50"
      />

      {/* Contêiner para as informações do perfil */}
      <div className={styles.profile}>
        {/* Renderiza o componente Avatar com a imagem do usuário */}
        <Avatar src="https://github.com/maykbrito.png" />

        {/* Nome do usuário */}
        <strong>Diego Fernandes</strong>

        {/* Cargo ou função do usuário */}
        <span>Web Developer</span>
      </div>

      {/* Rodapé da sidebar */}
      <footer>
        {/* Link para editar o perfil */}
        <a href="#">
          {/* Renderiza o ícone de lápis (PencilLine) com tamanho 20 */}
          <PencilLine size={20} />

          {/* Texto do link */}
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}