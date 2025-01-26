// Importa o componente Comment, que será utilizado para exibir comentários individuais
import { Comment } from './Comment';
// Importa o arquivo de estilos CSS para aplicar as classes estilizadas ao componente
import styles from './Post.module.css';

// Define o componente Post, que renderiza uma postagem com cabeçalho, conteúdo, um formulário de comentários e uma lista de comentários
export function Post() {
  return (
    // Define um elemento <article> com a classe CSS 'post', representando uma postagem
    <article className={styles.post}>
      
      {/* Cabeçalho da postagem */}
      <header>
        {/* Informações do autor da postagem */}
        <div className={styles.author}>
          {/* Imagem do avatar do autor */}
          <img className={styles.avatar} src="https://github.com/diego3g.png" />
          
          {/* Informações adicionais sobre o autor */}
          <div className={styles.authorInfo}>
            <strong>Diego Fernandes</strong> {/* Nome do autor em destaque */}
            <span>Web Developer</span> {/* Cargo ou profissão do autor */}
          </div>
        </div>

        {/* Data e hora da publicação */}
        <time 
          title="11 de Maio às 08:13h" // Tooltip exibido ao passar o mouse
          dateTime="2022-05-11 08:13:00" // Data e hora no formato ISO 8601
        >
          Publicado há 1h {/* Texto que exibe quanto tempo se passou desde a publicação */}
        </time>
      </header>

      {/* Conteúdo principal da postagem */}
      <div className={styles.content}>
        {/* Parágrafos e links dentro do conteúdo */}
        <p>Fala galeraa 👋</p>
        <p>
          Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀
        </p>
        <p>
          {/* Link para o projeto DoctorCare */}
          <a href="">jane.design/doctorcare</a>
        </p>
        <p>
          {/* Hashtags representadas como links */}
          <a href="">#novoprojeto</a>{' '}
          <a href="">#nlw</a>{' '}
          <a href="">#rocketseat</a>
        </p>
      </div>

      {/* Formulário para comentários */}
      <form className={styles.commentForm}>
        {/* Título do formulário */}
        <strong>Deixe seu feedback</strong>
        
        {/* Área de texto para o usuário escrever seu comentário */}
        <textarea
          placeholder="Deixe um comentário" // Placeholder exibido quando o campo está vazio
        />
        
        {/* Rodapé do formulário com um botão para enviar */}
        <footer>
          <button type="submit">Publicar</button> {/* Botão para enviar o comentário */}
        </footer>
      </form>

      {/* Lista de comentários */}
      <div className={styles.commentList}>
        {/* Renderiza múltiplos componentes Comment */}
        <Comment /> {/* Representa um comentário individual */}
        <Comment />
        <Comment />
      </div>
    </article>
  );
}
