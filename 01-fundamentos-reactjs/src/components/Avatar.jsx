import styles from './Avatar.module.css'; // Importa um arquivo CSS específico para o componente Avatar e atribui a uma constante "styles".

export function Avatar({ hasBorder = true, src }) { // Define uma função chamada Avatar que recebe dois parâmetros: hasBorder e src. O parâmetro hasBorder tem o valor padrão de true.

    return (
        <img // Retorna uma imagem HTML
        className={hasBorder ? styles.avatarWithBorder : styles.avatar} // Atribui uma classe CSS à imagem com base no valor de hasBorder. Se for verdadeiro, a classe será "avatarWithBorder"; caso contrário, a classe será "avatar".
        src={src} // Atribui a propriedade "src" da imagem com o valor passado como argumento para a função.
        />
    );
}
