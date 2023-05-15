// Importando as bibliotecas React e ReactDOM/client
import React from 'react'
import ReactDOM from 'react-dom/client'

// Importando o componente App do arquivo App.js
import { App } from './App';

// Criando a raiz do React e renderizando o componente App dentro da div com o id 'root'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

/*
import React from 'react': Importa a biblioteca React para usar em nosso código.
import ReactDOM from 'react-dom/client': Importa a biblioteca ReactDOM/client para manipulação da árvore de componentes do React.
import { App } from './App';: Importa o componente App do arquivo App.js.
ReactDOM.createRoot(document.getElementById('root')!).render(: Cria uma nova raiz para o React com o elemento HTML que possui o id 'root'.
<React.StrictMode>: Define que o componente deve ser executado em modo estrito.
<App />: Renderiza o componente App dentro da raiz do React.
): Finaliza a chamada do método render().
*/