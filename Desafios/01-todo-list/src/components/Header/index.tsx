import todoLogo from "../../assets/todoLogo.svg"; // importa a logo do ToDo
import { AiOutlinePlusCircle } from "react-icons/ai";


import styles from "./header.module.css"; // importa os estilos do header

export function Header() { // define a funcao Header
    return (
        <header className={styles.header}>
            {/* 
                Logo do ToDo
                Essa imagem é renderizada a partir de uma URL
                e tem um atributo alt para acessibilidade
            */}
            <img src={todoLogo} alt="ToDo Logo" />
            

            <form className={styles.newTaskForm}>
                <input placeholder="Adicionar nova tarefa" />
                <button>
                    Criar
                    <AiOutlinePlusCircle size={20}/>
                </button>
            </form>
        </header>
    );
}
