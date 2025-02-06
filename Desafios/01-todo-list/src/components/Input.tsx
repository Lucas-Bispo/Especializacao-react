// Importa o módulo CSS para aplicar estilos ao componente
import styles from './Input.module.css'

// Define a interface Props que especifica os tipos das propriedades esperadas pelo componente
interface Props {
    // valor do input, string
    value: string;
    // função chamada ao alterar o valor do input
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Componente funcional Input que recebe propriedades definidas pela interface Props
const Input = ({ value, onChange }: Props) => {
    return ( 
        // Renderiza um elemento input com estilos e propriedades passadas
        <input 
            className={styles.input} // Aplica a classe CSS ao input para estilização
            value={value} // Define o valor do input
            onChange={onChange} // Define o manipulador de evento para alterações no input
        />
    );    
};

// Exporta o componente Input como padrão
export default Input;
