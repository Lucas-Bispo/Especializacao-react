import styles from './Comment.module.css'; // Importa os estilos CSS específicos para o componente "Comment"

import { ThumbsUp, Trash } from 'phosphor-react'; // Importa os ícones "ThumbsUp" (like) e "Trash" (lixeira) da biblioteca phosphor-react
import { Avatar } from './Avatar'; // Importa o componente "Avatar" para exibição da imagem do usuário

// Define e exporta o componente funcional "Comment"
export function Comment() {
  return (
    <div className={styles.comment}>
      {/* Renderiza o componente Avatar com uma imagem e sem borda */}
      <Avatar hasBorder={false} src="https://github.com/diego3g.png" alt="" />

      {/* Contém a estrutura e os estilos do comentário */}
      <div className={styles.commentBox}>
        {/* Área de conteúdo do comentário */}
        <div className={styles.commentContent}>
          <header>
            {/* Exibe o autor e o horário do comentário */}
            <div className={styles.authorAndTime}>
              <strong>Diego Fernandes</strong> {/* Nome do autor */}
              <time 
                title="11 de Maio às 08:13h" 
                dateTime="2022-05-11 08:13:00"
              >
                Cerca de 1h atrás
              </time> {/* Data e hora formatadas para exibição */}
            </div>

            {/* Botão para deletar o comentário */}
            <button title="Deletar comentário">
              <Trash size={24} /> {/* Ícone da lixeira com tamanho 24px */}
            </button>
          </header>

          {/* Texto do comentário */}
          <p>Muito bom Devon, parabéns!! 👏👏</p>
        </div>

        {/* Rodapé do comentário */}
        <footer>
          {/* Botão de "aplaudir" o comentário */}
          <button>
            <ThumbsUp /> {/* Ícone de "curtir" */}
            Aplaudir <span>20</span> {/* Contador de aplausos */}
          </button>
        </footer>
      </div>
    </div>
  );
}
