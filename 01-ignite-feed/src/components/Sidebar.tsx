import { PencilLine } from 'phosphor-react'; // Importação de componentes
import { Avatar } from './Avatar'; // Importação de componente local

import styles from './Sidebar.module.css'; // Importação de estilos

/**
 * Componente Sidebar
 * 
 * @returns Componente de barra lateral com informações de perfil do usuário
 */
export function Sidebar() {
  return (
    <aside className={styles.sidebar}> {/* Componente de barra lateral */}
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50"
      />

      <div className={styles.profile}> {/* Componente de perfil do usuário */}
        <Avatar src="https://github.com/Lucas-Bispo.png" /> {/* Componente de avatar do usuário */}

        <strong>Lucas Bispo</strong> {/* Nome do usuário */}
        <span>Web Developer</span> {/* Cargo do usuário */}
      </div>

      <footer> {/* Rodapé da barra lateral */}
        <a href="#"> {/* Link para editar o perfil */}
          <PencilLine size={20} /> {/* Ícone de lápis */}
          Editar seu perfil {/* Texto do link */}
        </a>
      </footer>
    </aside>
  );
}