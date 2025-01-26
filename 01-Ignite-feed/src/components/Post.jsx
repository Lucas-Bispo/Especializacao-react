// Importa os estilos do arquivo CSS específico para o componente Post
import styles from './Post.module.css';

// Função que define o componente Post
export function Post() {
  return (
    // Define o elemento principal do post como um artigo
    <article className={styles.post}>
      
      {/* Cabeçalho do post */}
      <header>
        {/* Container para informações do autor */}
        <div className={styles.author}>
          
          {/* Imagem do avatar do autor */}
          <img 
            className={styles.avatar} 
            src="https://github.com/diego3g.png" // URL do avatar do autor
          />

          {/* Informações sobre o autor (nome e profissão) */}
          <div className={styles.authorInfo}>
            <strong>Diego Fernandes</strong> {/* Nome do autor */}
            <span>Web Developer</span> {/* Profissão ou cargo do autor */}
          </div>
        </div>

        {/* Data e hora da publicação */}
        <time 
          title="11 de Maio às 08:13h" // Texto exibido ao passar o mouse sobre o horário
          dateTime="2022-05-11 08:13:00" // Data e hora no formato padrão
        >
          Publicado há 1h {/* Texto exibido ao usuário */}
        </time>
      </header>

      {/* Conteúdo do post */}
      <div className={styles.content}>
        <p>Fala galeraa 👋</p> {/* Parágrafo de introdução */}
        <p>
          Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. 
          O nome do projeto é DoctorCare 🚀
        </p> {/* Parágrafo descrevendo o projeto */}
        <p>
          👉
          <a href="">jane.design/doctorcare</a> {/* Link para o projeto */}
        </p>
        <p>
          <a href="">#novoprojeto #nlw #rocketseat</a> {/* Hashtags relacionadas ao post */}
        </p>
      </div>


   <form className={styles.commentForm}> 
        {/* Título que indica o que o usuário deve fazer, ou seja, deixar um feedback */}
        <strong>Deixe seu feedback</strong> 
  
        {/* Campo de texto para o usuário digitar o comentário */}
        <textarea
        placeholder="Deixe um comentário" // Texto exibido quando o campo está vazio, incentivando o usuário a escrever um comentário
    />
  
    {/* Rodapé do formulário, utilizado para colocar o botão de envio */}
    <footer>
        {/* Botão que envia o comentário quando clicado. O tipo "submit" envia os dados do formulário */}
        <button type="submit">Publicar</button>
    </footer>
    </form>

    </article>
  );
}
