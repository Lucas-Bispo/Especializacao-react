// Importa os estilos do arquivo CSS específico para o componente Avatar
import styles from './Avatar.module.css';


interface AvatarProps {
  hasBorder?: boolean;
  src: string;
  alt?: string;
}



// Define o componente Avatar como uma função que aceita as propriedades `hasBorder` e `src`
export function Avatar({ hasBorder = true, src, alt }: AvatarProps) {
  return (
    <img
      /* Define a classe CSS da imagem com base no valor de `hasBorder`:
         - Se `hasBorder` for true, aplica a classe `avatarWithBorder` para uma borda ao redor do avatar.
         - Caso contrário, aplica a classe `avatar` sem borda. */
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      
      /* Define o caminho da imagem usando a propriedade `src`, passada como argumento. */
      src={src}
      alt={alt}
    />
  );
}
