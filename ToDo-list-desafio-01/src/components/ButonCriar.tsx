import styles from './Buton.module.css';


export function Buton(){
    return (
        <div className={styles.button}>
            <button className={styles.buttonlayout}>
                Criar
            </button>
        </div>
    );
}