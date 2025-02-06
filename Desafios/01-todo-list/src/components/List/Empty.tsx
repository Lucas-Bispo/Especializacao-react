// Se a lista tiver vazia mostrar essa mensagem

import styles from './Empty.module.css'

export function Empty() {
    return (
        <div className={styles.container}>
            <img src="/clipboard.png" alt="icone de prancheta" />

            <p>
                <strong>Voce ainda nao tem tarefas cadastradas</strong>
                Crie tarefas e organize seus itens a fazer
            </p>
        </div>
    )
}