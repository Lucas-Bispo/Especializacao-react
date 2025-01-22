import { format, formatDistanceToNow } from 'date-fns'; // Importa funções para formatar datas: 'format' para formatação específica e 'formatDistanceToNow' para calcular a distância entre datas.
import ptBR from 'date-fns/locale/pt-BR'; // Importa a localização brasileira para formatar datas em português.

import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'; 
// Importa hooks do React: 
// - useState para gerenciar estados do componente.
// - ChangeEvent, FormEvent, InvalidEvent para tipagem de eventos em campos de formulário.

import { Avatar } from './Avatar'; // Importa o componente Avatar, usado para exibir a foto de perfil do autor.
import { Comment } from './Comment'; // Importa o componente Comment, usado para renderizar comentários.

import styles from './Post.module.css'; // Importa os estilos do componente Post, aplicando CSS modularizado.

// Define a interface para o autor do post, incluindo nome, função e URL do avatar.
interface Author {
  name: string; // Nome do autor.
  role: string; // Função ou cargo do autor.
  avatarUrl: string; // URL da imagem do avatar.
}

// Define a interface para o conteúdo do post.
interface Content {
  type: 'paragraph' | 'link'; // Define o tipo de conteúdo: parágrafo ou link.
  content: string; // Texto do conteúdo.
}

// Define a interface para o tipo de post.
export interface PostType {
  id: number; // ID único do post.
  author: Author; // Informações do autor do post.
  publishedAt: Date; // Data de publicação do post.
  content: Content[]; // Conteúdo do post, como texto ou links.
}

// Define a interface para as props do componente Post.
interface PostProps {
  post: PostType; // O post que será renderizado.
}

// Função principal que representa o componente Post.
export function Post({ post }: PostProps) {
  // Estado que armazena os comentários do post.
  const [comments, setComments] = useState([
    'Post muito bacana, hein?!' // Comentário inicial.
  ]);

  // Estado que armazena o texto do novo comentário.
  const [newCommentText, setNewCommentText] = useState('');

  // Formata a data de publicação do post para um formato legível.
  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR, // Define a localização brasileira.
  });

  // Calcula a distância da data de publicação para o tempo atual.
  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR, // Define a localização brasileira.
    addSuffix: true, // Adiciona sufixo como "há X tempo".
  });

  // Função que lida com a submissão de um novo comentário.
  function handleCrateNewComment(event: FormEvent) {
    event.preventDefault(); // Impede o comportamento padrão do formulário.

    setComments([...comments, newCommentText]); // Adiciona o novo comentário ao estado.

    setNewCommentText(''); // Limpa o campo de texto do novo comentário.
  }

  // Função que lida com mudanças no campo de texto do novo comentário.
  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity(''); // Reseta mensagens de erro de validação.
    setNewCommentText(event.target.value); // Atualiza o estado com o novo valor do texto.
  }

  // Função que lida com a validação do campo de texto do comentário.
  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!'); // Define a mensagem de erro para campo vazio.
  }

  // Função que exclui um comentário específico.
  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => comment !== commentToDelete);
    // Filtra o estado para remover o comentário especificado.
    setComments(commentsWithoutDeletedOne); // Atualiza o estado com os comentários restantes.
  }

  // Verifica se o campo de texto do novo comentário está vazio.
  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        {/* Renderiza as informações do autor do post */}
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} /> {/* Componente Avatar com a URL do avatar */}
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong> {/* Nome do autor */}
            <span>{post.author.role}</span> {/* Cargo ou função do autor */}
          </div>
        </div>

        {/* Renderiza a data de publicação formatada */}
        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {/* Renderiza o conteúdo do post, diferenciando entre parágrafos e links */}
        {post.content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === 'link') {
            return <p key={line.content}><a href="#">{line.content}</a></p>;
          }
        })}
      </div>

      {/* Formulário para adicionar comentários */}
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

      {/* Renderiza a lista de comentários */}
      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment} // Passa a função de exclusão como prop.
          />
        ))}
      </div>
    </article>
  );
}
