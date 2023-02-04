import styles from './Comment.module.css';
import { Trash } from 'phosphor-react';

export function Comment() {
    return (
        
        <div className={styles.comment}>
            <img src="https://github.com/Lucas-Bispo.png" alt="" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.autorAndTime}>
                            <strong> Lucas Bispo </strong>
                            <time title="31 de Janeiro as 07:04h" dateTime="2023-01-31">Publicado há 1h </time>
                        </div>

                        <button title="Deletar comentario">
                            <Trash size={20} />

                            
                        </button>
                    </header>

                </div>

                <footer>
                    <button>
                        <ThumbsUp />
                            Apludir <span>20</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}