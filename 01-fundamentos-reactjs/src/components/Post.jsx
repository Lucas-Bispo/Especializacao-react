import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';



 // fazer desestruturacao 
export function Post({author, publishedAt}){ // A ideai de componentes é separar pontos repetitivos atraves de html e exportar atraves das funcoes
    
    const publishedDataFormatted = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        timeStyle: 'full',
    });
    
    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar scr={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
            
                <time title="31 de Janeiro as 07:04h" dateTime="2023-01-31">
                    {publishedAt.toString()} 
                
                </time>



            </header> 

            <div className={styles.content}>
                <p>Fala galeraa 👋</p>

                <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>

                <p> <a href=''> 👉 jane.design/doctorcare </a></p>

                <p> 
                    <a>  #novoprojeto</a>{' '}
                    <a>#nlw</a> 
                    <a>#rocketseat</a>
                </p>
            </div>

            <form className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    placeholder="Deixe um comentario"
                />

                <button type="subimit">Publicar</button>

            </form>

            <div className={styles.commentList}>

                <Comment />

            </div>

        </article>
    )
}