import styles from './Comment.module.css'; // Importa os estilos CSS do arquivo Comment.module.css
import { Trash } from 'phosphor-react'; // Importa o ícone de lixeira da biblioteca phosphor-react
import { ThumbsUp } from 'phosphor-react'; // Importa o ícone de curtir da biblioteca phosphor-react

import { Avatar } from './Avatar'; // Importa o componente Avatar do arquivo Avatar.js

export function Comment() { // Define a função Comment como um componente React
    return ( // Retorna um elemento HTML

        <div className={styles.comment}> {/* Define uma div com a classe CSS comment */}
            <Avatar hasBorder={false} src="https://github.com/Lucas-Bispo.png" alt="" /> {/* Renderiza o avatar do autor do comentário */}

            <div className={styles.commentBox}> {/* Define uma div com a classe CSS commentBox */}
                <div className={styles.commentContent}> {/* Define uma div com a classe CSS commentContent */}
                    <header> {/* Define um cabeçalho para o comentário */}

                        <div className={styles.autorAndTime}> {/* Define uma div com a classe CSS autorAndTime */}
                            <strong> Lucas Bispo </strong> {/* Renderiza o nome do autor do comentário */}
                            <time title="31 de Janeiro as 07:04h" dateTime="2023-01-31">Publicado há 1h </time> {/* Renderiza a data de publicação do comentário */}
                        </div>

                        <button title="Deletar comentario"> {/* Renderiza um botão de lixeira */}
                            <Trash size={24} /> {/* Renderiza o ícone de lixeira importado da biblioteca phosphor-react */}
                        </button>
                    </header>
                </div>
                <footer> {/* Define um rodapé para o comentário */}
                    <button> {/* Define um botão de "curtir" */}
                        <ThumbsUp /> {/* Renderiza o ícone de curtir importado da biblioteca phosphor-react */}
                            Apludir <span>20</span> {/* Renderiza o número de curtidas */}
                    </button>
                </footer>
            </div>
        </div>
    )
}