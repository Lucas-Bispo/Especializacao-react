// Importa o arquivo de estilos CSS modulados, garantindo que as classes sejam exclusivas deste componente
import styles from './Sidebar.module.css';

// Define e exporta o componente funcional Sidebar
export function Sidebar() {
  return (
    // Define uma seção lateral (<aside>) com a classe 'sidebar' estilizada no CSS
    <aside className={styles.sidebar}>
      {/* Renderiza uma imagem de capa na parte superior da barra lateral */}
      <img
        className={styles.cover} // Aplica a classe 'cover' para estilizar a imagem
        src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50" // URL da imagem de fundo
      />
      {/* Cria uma seção de perfil do usuário */}
      <div className={styles.profile}>
        <strong>Lucas Bispo</strong> {/* Exibe o nome do usuário em negrito */}
        <span>Full</span> {/* Mostra a função ou profissão do usuário */}
      </div>
      {/* Adiciona um rodapé com um link para editar o perfil */}
      <footer>
        <a href="#"> {/* Link estilizado para uma ação futura, como editar o perfil */}
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}
