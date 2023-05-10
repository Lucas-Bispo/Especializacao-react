import { ImgHTMLAttributes } from "react"; // Importa o tipo ImgHTMLAttributes de react, que define as propriedades aceitas em um elemento <img>.
import styles from './Avatar.module.css' // Importa um objeto contendo as classes CSS definidas em Avatar.module.css.

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> { // Cria uma interface chamada AvatarProps, que estende as propriedades aceitas por um elemento <img>.
  hasBorder?: boolean; // Define uma propriedade opcional chamada "hasBorder" que pode receber um valor booleano.
}

export function Avatar({ hasBorder = true, ...props}: AvatarProps) { // Declara uma função chamada Avatar que recebe como parâmetro um objeto que pode conter a propriedade "hasBorder" e outras propriedades aceitas em um elemento <img>.
  return (
    <img // Retorna um elemento <img> com as seguintes propriedades:
      className={hasBorder ? styles.avatarWithBorder : styles.avatar} // Adiciona uma classe CSS dependendo do valor de "hasBorder".
      {...props} // Adiciona as outras propriedades passadas como parâmetro.
    />
  );
}
