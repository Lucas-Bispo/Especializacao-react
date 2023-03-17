import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';



 // fazer desestruturacao 
export function Post({author, publishedAt, content}){ // A ideai de componentes é separar pontos repetitivos atraves de html e exportar atraves das funcoes
    
    const publishedDataFormated = format(publishedAt, "d 'de' LLLL 'as' HH:mm'h'",{
            locale: ptBr,
    }) // Implentando data de maneira dinamica e formatada em ptbr com a ultilizacao da biblioteca date-fns
    
    const publishedDaateRelativeRoNow = formatDistanceToNow(publishedAt,{
        locale: ptBR,
        addSuffix: true,
    })


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
            
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                   {publishedDateRelativeTonow}
                
                </time>



            </header> 

            <div className={styles.content}>
                {content.map(line=>{
                    if(line.type === 'paragraph'){
                        return <p>{line.content}</p>;
                    }else if (line.type === 'link'){
                        return <p><a href="">{line.content}</a></p>
                    }
                })}
                
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