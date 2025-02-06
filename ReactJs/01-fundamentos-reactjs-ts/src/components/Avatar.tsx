import { ImgHTMLAttributes } from 'react';

// Importa os estilos do arquivo CSS específico para o componente Avatar
import styles from './Avatar.module.css';

// Cria uma interface para as propriedades do componente Avatar
// Essa interface extende as propriedades padrão de uma tag <img>
// e adiciona uma propriedade opcional chamada `hasBorder`
interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  // Propriedade opcional que define se o avatar terá uma borda
  hasBorder?: boolean;
  // Propriedade obrigatória que define o caminho da imagem
  src: string;
  // Propriedade opcional que define o texto alternativo da imagem
  alt?: string;
}

// Define o componente Avatar como uma função que aceita as propriedades
// `hasBorder` e `src` e retorna um elemento <img>
export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
  return (
    <img
      // Define a classe CSS da imagem com base no valor de `hasBorder`:
      // - Se `hasBorder` for true, aplica a classe `avatarWithBorder`
      //   para uma borda ao redor do avatar.
      // - Caso contrário, aplica a classe `avatar` sem borda.
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      
      // Define o caminho da imagem usando a propriedade `src`, passada como argumento.
      // Os três pontos (...) são chamados de spread operator e
      // servem para espalhar as propriedades recebidas como parâmetro
      // para o elemento <img>, exceto a propriedade `hasBorder` que
      // foi extraída na linha acima.
      {...props}
    />
  );
}

