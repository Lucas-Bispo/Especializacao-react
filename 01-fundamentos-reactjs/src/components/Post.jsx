import styles from './Post.module.css';



export function Post(){
    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <img className={styles.avatar} src="https://github.com/Lucas-Bispo.png" />
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

                <p>👉 jane.design/doctorcare </p>

                <p>#novoprojeto #nlw #rocketseat</p>
            </div>

        </article>
        
    )
}