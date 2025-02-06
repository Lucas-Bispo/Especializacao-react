import styles from './Input.module.css'

interface Props {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ value, onChange }: Props) => {
    return ( 
        <input 
            className={styles.input} 
            value={value} 
            onChange={onChange} 
        />
    );    
};

export default Input;