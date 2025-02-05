// Importa as funções format e formatDistanceToNow da biblioteca date-fns, que são usadas para manipular e formatar datas.
import { format, formatDistanceToNow } from 'date-fns';
// Importa o locale pt-BR da biblioteca date-fns, que é usado para formatar datas em português do Brasil.
import ptBR from 'date-fns/locale/pt-BR';
// Importa o hook useState da biblioteca React, que permite criar e gerenciar estados dentro de componentes funcionais.
import { useState } from 'react';
// Importa o componente Avatar, que será usado para exibir a imagem do autor do post.
import { Avatar } from './Avatar';
// Importa o componente Comment, que será usado para exibir os comentários do post.
import { Comment } from './Comment';
// Importa os estilos CSS específicos deste componente Post.
import styles from './Post.module.css';

// Exporta a função Post, que recebe como parâmetros author (autor), publishedAt (data de publicação) e content (conteúdo do post).
export function Post({ author, publishedAt, content }) {
  // Cria um estado inicial chamado "comments", que armazena um array de números representando os IDs dos comentários.
  const [comments, setComments] = useState([
    1,
    2,
  ]);

  // Formata a data de publicação no formato "d 'de' LLLL 'às' HH:mm'h'" usando o locale pt-BR.
  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  // Calcula a distância entre a data de publicação e o momento atual, adicionando um sufixo como "há X horas" ou "há X dias".
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  });

  // Função chamada quando o formulário de comentário é submetido.
  function handleCrateNewComment() {
    // Previne o comportamento padrão do formulário, que seria recarregar a página.
    event.preventDefault();
    // Atualiza o estado "comments" adicionando um novo comentário ao array. O novo comentário é identificado pelo próximo número na sequência.
    setComments([...comments, comments.length + 1]);
  }

  // Retorna o JSX que representa o componente Post.
  return (
    // Cria um elemento article com a classe "post", que envolve todo o conteúdo do post.
    <article className={styles.post}>
      {/* Cria um elemento header que contém informações sobre o autor e a data de publicação. */}
      <header>
        {/* Cria uma div com a classe "author", que contém o avatar e as informações do autor. */}
        <div className={styles.author}>
          {/* Renderiza o componente Avatar, passando a URL da imagem do autor como propriedade. */}
          <Avatar src={author.avatarUrl} />
          {/* Cria uma div com a classe "authorInfo", que contém o nome e o papel do autor. */}
          <div className={styles.authorInfo}>
            {/* Renderiza o nome do autor dentro de um elemento strong. */}
            <strong>{author.name}</strong>
            {/* Renderiza o papel do autor dentro de um elemento span. */}
            <span>{author.role}</span>
          </div>
        </div>
        {/* Cria um elemento time que exibe a data de publicação formatada. O atributo title mostra a data completa, enquanto o conteúdo interno mostra a distância relativa à data atual. */}
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      {/* Cria uma div com a classe "content", que contém o conteúdo do post. */}
      <div className={styles.content}>
        {/* Mapeia o conteúdo do post e renderiza parágrafos ou links dependendo do tipo de cada linha. */}
        {content.map(line => {
          if (line.type === 'paragraph') {
            // Se o tipo for "paragraph", renderiza um parágrafo com o conteúdo.
            return <p>{line.content}</p>;
          } else if (line.type === 'link') {
            // Se o tipo for "link", renderiza um link com o conteúdo.
            return <p><a href="#">{line.content}</a></p>
          }
        })}
      </div>

      {/* Cria um formulário com a classe "commentForm", que permite aos usuários adicionar novos comentários. */}
      <form onSubmit={handleCrateNewComment} className={styles.commentForm}>
        {/* Renderiza um texto que pede feedback ao usuário. */}
        <strong>Deixe seu feedback</strong>
        {/* Cria um elemento textarea onde o usuário pode digitar o comentário. */}
        <textarea
          placeholder="Deixe um comentário"
        />
        {/* Cria um footer que contém o botão de envio do formulário. */}
        <footer>
          {/* Cria um botão para publicar o comentário. O tipo "submit" garante que o formulário seja enviado ao clicar no botão. */}
          <button type="submit">Publicar</button>
        </footer>
      </form>

      {/* Cria uma div com a classe "commentList", que contém a lista de comentários. */}
      <div className={styles.commentList}>
        {/* Mapeia os comentários e renderiza o componente Comment para cada um deles. */}
        {comments.map(comment => {
          return <Comment />
        })}
      </div>
    </article>
  )
}