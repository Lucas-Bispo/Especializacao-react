// Criando funcionalidade para que exporta html
// export function boa pratica anti erros
// * Componentes = partes da aplicação separadas 
// props = object que foram o {author:"" , content:""}

// para mostrar o conteudo de uma propriedade do html a sintaxy é {props.content}

export function Post(props){
    return (
        <div>
            <strong>{props.author}</strong>
            <strong>{props.content}</strong>
        </div>
    )
}
