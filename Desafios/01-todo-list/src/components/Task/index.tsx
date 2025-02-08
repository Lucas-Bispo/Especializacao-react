import { TbTrash } from 'react-icons/tb';
import styles from './task.module.css'


export function Task() {
    return (
        <div className={styles.task}>
        <button className={styles.checkContainer}>

            <div></div>

        </button>

        <p>
            Integrar 
        </p>

        <button className={styles.deleteButton}>
            <TbTrash size={20} />
        </button>


        </div>
    );
}