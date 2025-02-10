import todoLogo from "../../assets/todoLogo.svg"; // Importa a logo do ToDo
import { AiOutlinePlusCircle } from "react-icons/ai";


import styles from "./header.module.css"; // Importa os estilos do header
import { ChangeEvent, FormEvent, useState } from "react";

// Define a interface Props para o componente Header
// Essa interface tem um atributo onAddTask que é uma função que recebe uma string como parâmetro
interface Props {
    onAddTask: (taskTitle: string) => void;
}


// Define a função Header
export function Header({onAddTask}: Props) { 
   // Cria um estado para armazenar o título da tarefa
   const [title, setTitle] = useState("");
    
    
    // Função que é chamada quando o formulário é submetido
    function handleSubmit(event:FormEvent){
        // Evita que o formulário faça o reload da página
        event.preventDefault();

        // Chama a função onAddTask passando o título da tarefa como parâmetro
        onAddTask(title);
        // Limpa o estado do título da tarefa
        setTitle("");
    }
    
    // Função que é chamada quando o input de título da tarefa muda
    function onChangeTitle(event: ChangeEvent<HTMLInputElement>){
        // Atualiza o estado do título da tarefa com o valor do input
        setTitle(event.target.value);
    }
    
    return (
        // Renderiza o header com a logo do ToDo, um formulário para adicionar uma tarefa e um botão para criar a tarefa
        <header className={styles.header}>
            {/* 
                Logo do ToDo
                Essa imagem é renderizada a partir de uma URL
                e tem um atributo alt para acessibilidade
            */}
            <img src={todoLogo} alt="ToDo Logo" />
            

            <form className={styles.newTaskForm} onSubmit={handleSubmit}>
                <input placeholder="Adicionar nova tarefa" 
                        // Chama a função onChangeTitle quando o valor do input muda
                        onChange={onChangeTitle}
                        // Mostra o valor do estado title no input
                        value={title}
                        />
                <button>
                    Criar
                    {/* Renderiza o icone de adicionar */}
                    <AiOutlinePlusCircle size={20}/>
                </button>
            </form>
        </header>
    );
}

