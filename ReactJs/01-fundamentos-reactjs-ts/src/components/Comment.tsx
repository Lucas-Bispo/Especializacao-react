import { useState } from "react";
import styles from './Comment.module.css';

import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from './Avatar';

// Interface que define as propriedades do componente Comment
interface CommentProps {
  // Conteúdo do comentário
  content: string;
  // Função que é chamada quando o usuário aperta o botão de deletar o comentário
  onDeleteComment: (comment: string) => void;
}

// Componente funcional que renderiza um comentário
export function Comment({ content, onDeleteComment }: CommentProps) {
  // Estado que armazena a quantidade de likes do comentário
  const [likeCount, setLikeCount] = useState(0);
  // Função que é chamada quando o usuário aperta o botão de deletar o comentário
  function handleDeleteComment() {
    // Chama a função onDeleteComment passando o conteúdo do comentário como parâmetro
    onDeleteComment(content);
  }

  // Função que é chamada quando o usuário aperta o botão de like do comentário
  function handleLikeComment() {
    // Atualiza o estado likeCount incrementando o valor em 1
    setLikeCount((state) => {
      return state + 1
    });
  }

  return (
    // Renderiza um elemento <div> com a classe CSS "comment"
    <div className={styles.comment}>
      {// Renderiza o componente Avatar com a imagem do usuário}
      <Avatar 
        // Propriedade que define se a borda do avatar deve ser renderizada
        hasBorder={false} 
        // URL da imagem do usuário
        src="https://github.com/diego3g.png" 
        // Alt text da imagem do usuário
        alt="" />

      // Renderiza um elemento <div> com a classe CSS "commentBox"
      <div className={styles.commentBox}>
        {// Renderiza um elemento <div> com a classe CSS "commentContent"}
        <div className={styles.commentContent}>
          {// Renderiza um elemento <header> com informações do autor do comentário}
          <header>
            {// Renderiza um elemento <div> com a classe CSS "authorAndTime"}
            <div className={styles.authorAndTime}>
              {// Renderiza um elemento <strong> com o nome do autor do comentário}
              <strong>Diego Fernandes</strong>
              {// Renderiza um elemento <time> com a data e hora do comentário}
              <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:00">Cerca de 1h atrás</time>
            </div>

            {// Renderiza um botão com o ícone de lixeira (Trash) que deleta o comentário quando apertado}
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          {// Renderiza um elemento <p> com o conteúdo do comentário}
          <p>{content}</p>
        </div>

        {// Renderiza um elemento <footer> com o botão de like do comentário}
        <footer>
          {// Renderiza um botão com o ícone de polegar para cima (ThumbsUp) que incrementa o likeCount quando apertado}
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            {// Renderiza o valor atual de likeCount}
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
