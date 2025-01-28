// Importa o componente Avatar de um arquivo local chamado Avatar
import { Avatar } from './Avatar';

// Importa o componente Comment de um arquivo local chamado Comment
import { Comment } from './Comment';

// Importa os estilos CSS do módulo Post.module.css
import styles from './Post.module.css';

// Define e exporta o componente funcional Post
export function Post() {
  return (
    // Renderiza um elemento <article> com a classe CSS "post" definida no módulo de estilos
    <article className={styles.post}>
      {/* Renderiza o cabeçalho do post */}
      <header>
        {/* Contêiner para as informações do autor */}
        <div className={styles.author}>
          {/* Renderiza o componente Avatar com a imagem do autor */}
          <Avatar src="https://github.com/diego3g.png" />
          {/* Contêiner para as informações detalhadas do autor */}
          <div className={styles.authorInfo}>
            {/* Nome do autor */}
            <strong>Diego Fernandes</strong>
            {/* Cargo ou função do autor */}
            <span>Web Developer</span>
          </div>
        </div>

        {/* Renderiza a data e hora da publicação */}
        <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:00">Publicado há 1h</time>
      </header>

      {/* Contêiner para o conteúdo do post */}
      <div className={styles.content}>
        {/* Parágrafo com uma saudação */}
        <p>Fala galeraa 👋</p>
        {/* Parágrafo com informações sobre o projeto */}
        <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>
        {/* Link para o projeto */}
        <p><a href="">jane.design/doctorcare</a></p>
        {/* Hashtags relacionadas ao post */}
        <p>
          <a href="">#novoprojeto</a>{' '}
          <a href="">#nlw</a>{' '}
          <a href="">#rocketseat</a>
        </p>
      </div>

      {/* Formulário para adicionar comentários */}
      <form className={styles.commentForm}>
        {/* Título do formulário */}
        <strong>Deixe seu feedback</strong>

        {/* Área de texto para o usuário digitar o comentário */}
        <textarea
          placeholder="Deixe um comentário"
        />

        {/* Rodapé do formulário com o botão de envio */}
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      {/* Contêiner para a lista de comentários */}
      <div className={styles.commentList}>
        {/* Renderiza três componentes Comment (comentários) */}
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  );
}