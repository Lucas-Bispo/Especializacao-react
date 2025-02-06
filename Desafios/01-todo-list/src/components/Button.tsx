import styles from './Button.module.css';

interface ButtonProps {
    onClick: () => void;
}

const Button = ({ onClick }: ButtonProps) => {
    return (
        <button className={styles.button} onClick={onClick}>
            Adicionar
        </button>
    );
};

export default Button;