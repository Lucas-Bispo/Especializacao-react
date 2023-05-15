import { useState } from "react"; // Importa o hook useState do React
import styles from './Comment.module.css'; // Importa o arquivo CSS para estilização do componente
import { ThumbsUp, Trash } from 'phosphor-react'; // Importa ícones da biblioteca Phosphor React
import { Avatar } from './Avatar'; // Importa o componente Avatar

// Define o tipo das propriedades passadas para o componente
interface CommentProps {
  content: string; // Conteúdo do comentário
  onDeleteComment: (comment: string) => void; // Função que deleta o comentário passado como argumento
}

// Define o componente Comment como uma função que recebe as propriedades definidas acima
export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0); // Cria um estado local para a contagem de curtidas

  // Define a função que será executada quando o usuário clicar no botão de deletar comentário
  function handleDeleteComment() {
    onDeleteComment(content); // Chama a função passada como propriedade, passando o conteúdo do comentário como argumento
  }

  // Define a função que será executada quando o usuário clicar no botão de curtir comentário
  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1 // Atualiza o estado local da contagem de curtidas, incrementando em 1
    });
  }

  // Renderiza o componente
  return (
    <div className={styles.comment}> {/* Define uma div com a classe CSS comment */}
      <Avatar // Renderiza o componente Avatar
        hasBorder={false} // Define se o Avatar terá ou não borda
        src="https://github.com/diego3g.png" // Define a URL da imagem do Avatar
        alt="" // Define o texto alternativo da imagem do Avatar
      />

      <div className={styles.commentBox}> {/* Define uma div com a classe CSS commentBox */}
        <div className={styles.commentContent}> {/* Define uma div com a classe CSS commentContent */}
          <header> {/* Define um cabeçalho */}
            <div className={styles.authorAndTime}> {/* Define uma div com a classe CSS authorAndTime */}
              <strong>Diego Fernandes</strong> {/* Define um nome de autor em negrito */}
              <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:00">Cerca de 1h atrás</time> {/* Define uma data e hora para o comentário */}
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário"> {/* Define um botão para deletar o comentário */}
              <Trash size={24} /> {/* Renderiza o ícone de lixeira com o tamanho 24 */}
            </button>
          </header>

          <p>{content}</p> {/* Renderiza o conteúdo do comentário passado como propriedade */}
        </div>

        <footer> {/* Define um rodapé */}
          <button onClick={handleLikeComment}> {/* Define um botão para curtir o comentário */}
            <ThumbsUp /> {/* Renderiza o ícone de curtida */}
            Aplaudir <span>{likeCount}</span> {/* Exibe a contagem de curtidas */}
          </button>
        </footer>
      </div>
    </div>
  )
}
