import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';




export function Post(props){ // A ideai de componentes é separar pontos repetitivos atraves de html e exportar atraves das funcoes
    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar scr={props.author.avatarUrl} />
                    <div>
                        <strong>Val pao com ovo</strong>
                        <span>Web Developer</span>
                    </div>
                </div>
            
                <time title="31 de Janeiro as 07:04h" dateTime="2023-01-31">Publicado há 1h </time>


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