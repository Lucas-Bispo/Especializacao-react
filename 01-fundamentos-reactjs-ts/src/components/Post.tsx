import { format, formatDistanceToNow } from 'date-fns'; // importando funções de formatação de data
import ptBR from 'date-fns/locale/pt-BR'; // importando locale para formatação de data em português do Brasil
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'; // importando hooks do React

import { Avatar } from './Avatar'; // importando componente Avatar
import { Comment } from './Comment'; // importando componente Comment

import styles from './Post.module.css'; // importando estilos do módulo Post

// interface de autor do post
interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

// interface de conteúdo do post
interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

// interface de tipo de post
export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

// interface de props do componente Post
interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  // estado para armazenar os comentários do post
  const [comments, setComments] = useState([
    'Post muito bacana, hein?!'
  ]);

  // estado para armazenar o texto do novo comentário
  const [newCommentText, setNewCommentText] = useState('');

  // formata a data de publicação do post
  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  // formata a data de publicação do post em relação ao tempo atual
  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true
  });

  // função para lidar com a criação de um novo comentário
  function handleCrateNewComment(event: FormEvent) {
    event.preventDefault()

    // adiciona o novo comentário ao array de comentários
    setComments([...comments, newCommentText]);

    // limpa o campo de texto do novo comentário
    setNewCommentText('');
  }

  // função para lidar com a mudança do texto do novo comentário
  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    // remove a mensagem de erro de campo obrigatório, se houver
    event.target.setCustomValidity('');

    // atualiza o estado do texto do novo comentário
    setNewCommentText(event.target.value);
  }

  // função para lidar com o evento de campo inválido do novo comentário
  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    // define a mensagem de erro para campo obrigatório
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  // função para deletar um comentário
  function deleteComment(commentToDelete: string) {
    // filtra os comentários, removendo o comentário a ser deletado
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })

    // atualiza o estado dos comentários
    setComments(commentsWithoutDeletedOne);
  }

  // verifica se o campo de texto do novo comentário está vazio

  const isNewCommentEmpty = newCommentText.length === 0; // verifica se o campo de novo comentário está vazio

return (
  <article className={styles.post}>
    <header>
      {/* Seção de informações do autor do post */}
      <div className={styles.author}>
        <Avatar src={post.author.avatarUrl} />
        <div className={styles.authorInfo}>
          <strong>{post.author.name}</strong>
          <span>{post.author.role}</span>
        </div>
      </div>

      {/* Seção de data de publicação do post */}
      <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
        {publishedDateRelativeToNow}
      </time>
    </header>

    <div className={styles.content}>
      {/* Renderiza o conteúdo do post, incluindo parágrafos e links */}
      {post.content.map(line => {
        if (line.type === 'paragraph') {
          return <p key={line.content}>{line.content}</p>;
        } else if (line.type === 'link') {
          return <p key={line.content}><a href="#">{line.content}</a></p>
        }
      })}
    </div>

    {/* Formulário para adicionar um novo comentário */}
    <form onSubmit={handleCrateNewComment} className={styles.commentForm}>
      <strong>Deixe seu feedback</strong>

      <textarea
        name="comment"
        placeholder="Deixe um comentário"
        value={newCommentText}
        onChange={handleNewCommentChange}
        onInvalid={handleNewCommentInvalid}
        required
      />

      <footer>
        <button type="submit" disabled={isNewCommentEmpty}>
          Publicar
        </button>
      </footer>
    </form>

    {/* Lista de comentários */}
    <div className={styles.commentList}>
      {comments.map(comment => {
        return (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        )
      })}
    </div>
  </article>
)
}